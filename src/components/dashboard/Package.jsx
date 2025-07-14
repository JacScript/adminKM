import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import {
  FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter, FaSave, FaTimes,
  FaImage, FaMapMarkerAlt, FaClock, FaUsers, FaDollarSign, FaCalendar,
  FaChevronDown, FaChevronUp, FaExternalLinkAlt, FaCopy, FaCheck,
  FaChevronLeft, FaChevronRight
} from 'react-icons/fa';
import { createPackage, deletePackage, getPackages, updatePackage } from '../../http';
import PackageForm from './FormPackage';
import PackageViewModalContent from './PackageViewModalContent';
import PackageListView from './PackageListView';
import PackageGridCard from './PackageGridCard';
import { enqueueSnackbar } from 'notistack';

const Package = () => {
  const queryClient = useQueryClient();
  const [packages, setPackages] = useState([]);
  const [view, setView] = useState('grid');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [modalType, setModalType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('lastUpdated');
  const [expandedCards, setExpandedCards] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [packageToDelete, setPackageToDelete] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    duration: '',
    price: '',
    priceNote: '/person',
    description: '',
    longDescription: '',
    includes: [''],
    images: [''],
    color: 'from-blue-500 to-purple-500',
    status: 'draft'
  });

  const colorOptions = [
    { name: 'Red to Orange', value: 'from-red-500 to-orange-500' },
    { name: 'Blue to Purple', value: 'from-blue-500 to-purple-500' },
    { name: 'Green to Emerald', value: 'from-green-500 to-emerald-500' },
    { name: 'Yellow to Cyan', value: 'from-yellow-500 to-cyan-500' },
    { name: 'Pink to Rose', value: 'from-pink-500 to-rose-500' },
    { name: 'Indigo to Blue', value: 'from-indigo-500 to-blue-500' }
  ];

  const { data: resData, isLoading, isError } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      return await getPackages();
    },
    placeholderData: keepPreviousData,
  });

  // Fixed delete mutation
  const deletePackageMutation = useMutation({
    mutationFn: (id) => {
      return deletePackage(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      enqueueSnackbar('Package deleted successfully!', { variant: 'success' });
      setShowDeleteModal(false);
      setPackageToDelete(null);
    },
    onError: (error) => {
      // console.error('Delete error:', error);
      enqueueSnackbar('Failed to delete package. Please try again.', { variant: 'error' });
      setShowDeleteModal(false);
      setPackageToDelete(null);
    }
  });

  useEffect(() => {
    if (resData?.data?.data) {
      setPackages(resData.data.data);
    }
  }, [resData]);

  // Add packages mutation
  const addPackageMutation = useMutation({
    mutationFn: createPackage,
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      closeModal();
      enqueueSnackbar('Package added successfully!', { variant: 'success' });
    },
    onError: (error) => {
      enqueueSnackbar('Failed to save Package. Please try again.', { variant: 'error' });
      closeModal();
    }
  });

  // Update package mutation
  const updatePackageMutation = useMutation({
    mutationFn: (packageData) => updatePackage(packageData._id, packageData),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['packages'] });
      enqueueSnackbar('Package updated successfully!', { variant: 'success' });
      closeModal();
    },
    onError: (error) => {
      enqueueSnackbar('Failed to update package. Please try again.', { variant: 'error' });
      closeModal();
    }
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading Packages...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-lg">Error loading Packages</div>
      </div>
    );
  }

  const stats = {
    totalPackages: packages.length,
    activePackages: packages.filter(p => p.status === 'active').length,
  };

  const filteredPackages = packages
    .filter(pkg =>
      pkg.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.subtitle?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(pkg => filterStatus === 'all' || pkg.status === filterStatus)
    .sort((a, b) => {
      switch(sortBy) {
        case 'title': 
          return (a.title || '').localeCompare(b.title || '');
        case 'price': 
          return (parseInt((a.price || '0').toString().replace(/,/g, '')) || 0) - 
                 (parseInt((b.price || '0').toString().replace(/,/g, '')) || 0);
        default: 
          return new Date(b.lastUpdated || 0) - new Date(a.lastUpdated || 0);
      }
    });

  const openModal = (type, pkg = null) => {
    console.log('Opening modal with package:', pkg);
    setModalType(type);
    setSelectedPackage(pkg);
    setCurrentImageIndex(0);
    
    if (type === 'edit' && pkg) {
      setFormData({
        title: pkg.title || '',
        subtitle: pkg.subtitle || '',
        duration: pkg.duration || '',
        price: pkg.price || '',
        priceNote: pkg.priceNote || '/person',
        description: pkg.description || '',
        longDescription: pkg.longDescription || '',
        includes: (pkg.features && pkg.features.length > 0) ? [...pkg.features] : [''],
        images: (pkg.images && pkg.images.length > 0) ? [...pkg.images] : [''],
        color: pkg.color || 'from-blue-500 to-purple-500',
        status: pkg.status || 'draft'
      });
    } else if (type === 'add') {
      setFormData({
        title: '',
        subtitle: '',
        duration: '',
        price: '',
        priceNote: '/person',
        description: '',
        longDescription: '',
        includes: [''],
        images: [''],
        color: 'from-blue-500 to-purple-500',
        status: 'draft'
      });
    }
  };

  const closeModal = () => {
    setModalType('');
    setSelectedPackage(null);
    setFormData({
      title: '',
      subtitle: '',
      duration: '',
      price: '',
      priceNote: '/person',
      description: '',
      longDescription: '',
      includes: [''],
      images: [''],
      color: 'from-blue-500 to-purple-500',
      status: 'draft'
    });
    setCurrentImageIndex(0);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // console.log('Saving package with formData:', formData);

    if (!formData?.title?.trim() || !formData?.subtitle?.trim() || !formData?.price || !formData?.description?.trim()) {
      alert('Please fill in all required fields: Title, Subtitle, Price, and Description.');
      return;
    }

    const cleanedFormData = {
      ...formData,
      features: formData.includes.filter(item => item.trim() !== ''),
      images: formData.images.filter(item => item.trim() !== ''),
      price: formData.price,
    };

    if (modalType === 'edit' && selectedPackage) {
      updatePackageMutation.mutate({ 
        _id: selectedPackage._id, 
        ...cleanedFormData 
      });
    } else if (modalType === 'add') {
      addPackageMutation.mutate(cleanedFormData);
    }
  };

  // Fixed delete handler - opens confirmation modal
  const handleDelete = (pkg) => {
    // console.log('Requesting delete for package:', pkg);
    setPackageToDelete(pkg);
    setShowDeleteModal(true);
  };

  // Confirm delete handler
  const confirmDelete = () => {
    // console.log('Confirming delete for package:', packageToDelete);
    // setShowDeleteModal(false);
    // setPackageToDelete(null);
    if (packageToDelete) {
      deletePackageMutation.mutate(packageToDelete._id);
    }
  };

  // Cancel delete handler
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setPackageToDelete(null);
  };

  const toggleExpanded = (id) => {
    setExpandedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyPackage = (pkg) => {
    const newPackage = {
      ...pkg,
      _id: Date.now().toString(),
      title: pkg.title + ' (Copy)',
      status: 'draft',
      bookings: 0,
      revenue: '0',
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setPackages([...packages, newPackage]);
    setCopiedId(newPackage._id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field, index, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

  const addArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeArrayItem = (field, index) => {
    if ((field === 'images' || field === 'includes') && formData[field].length === 1) {
      alert(`You must have at least one ${field === 'images' ? 'image' : 'include'} URL.`);
      return;
    }
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const isSubmitting = addPackageMutation.isLoading || updatePackageMutation.isLoading;

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="w-4/5 mx-auto shadow-sm">
        <div className="bg-white border-b border-gray-200 rounded-lg max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Package Management</h1>
              <p className="text-sm text-gray-600">Manage your travel packages and bookings</p>
            </div>
            <button
              onClick={() => openModal('add')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              <FaPlus className="w-4 h-4" />
              Add Package
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Packages</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalPackages}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <FaMapMarkerAlt className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Packages</p>
                <p className="text-3xl font-bold text-green-600">{stats.activePackages}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FaCheck className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search packages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="lastUpdated">Last Updated</option>
                <option value="title">Title</option>
                <option value="price">Price</option>
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setView('grid')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  view === 'grid'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Grid
              </button>
              <button
                onClick={() => setView('list')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  view === 'list'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                List
              </button>
            </div>
          </div>
        </div>

        {/* Packages Grid/List */}
        {filteredPackages.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-lg">
            No packages found matching your criteria.
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPackages.map((pkg) => (
              <PackageGridCard
                key={pkg._id}
                pkg={pkg}
                expandedCards={expandedCards}
                toggleExpanded={toggleExpanded}
                copiedId={copiedId}
                copyPackage={copyPackage}
                openModal={openModal}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        ) : (
          <PackageListView
            filteredPackages={filteredPackages}
            openModal={openModal}
            copyPackage={copyPackage}
            handleDelete={handleDelete}
          />
        )}
      </div>

      {/* Main Modal */}
      {modalType && (
        <div className="fixed inset-0  flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900">
                {modalType === 'view' ? 'View Package' : modalType === 'edit' ? 'Edit Package' : 'Add New Package'}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <FaTimes className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {modalType === 'view' ? (
                <PackageViewModalContent
                  selectedPackage={selectedPackage}
                  currentImageIndex={currentImageIndex}
                  setCurrentImageIndex={setCurrentImageIndex}
                />
              ) : (
                <PackageForm
                  formData={formData}
                  handleInputChange={handleInputChange}
                  handleArrayChange={handleArrayChange}
                  addArrayItem={addArrayItem}
                  removeArrayItem={removeArrayItem}
                  handleSave={handleSave}
                  closeModal={closeModal}
                  modalType={modalType}
                  colorOptions={colorOptions}
                  isLoading={isSubmitting}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Package</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete the package{' '}
              <span className="font-medium">"{packageToDelete?.title}"</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                disabled={deletePackageMutation.isPending}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={deletePackageMutation.isPending}
                className={`px-4 py-2 rounded-lg text-white transition-colors ${
                  deletePackageMutation.isPending
                    ? 'bg-red-400 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {deletePackageMutation.isPending ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Package;