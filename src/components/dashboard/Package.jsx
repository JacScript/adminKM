import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import {
  FaPlus, FaEdit, FaTrash, FaEye, FaSearch, FaFilter, FaSave, FaTimes,
  FaImage, FaMapMarkerAlt, FaClock, FaUsers, FaDollarSign, FaCalendar,
  FaChevronDown, FaChevronUp, FaExternalLinkAlt, FaCopy, FaCheck,
  FaChevronLeft, FaChevronRight // Added for image carousel
} from 'react-icons/fa';
import { getPackages, updatePackage } from '../../http';
import PackageForm from './FormPackage';
import PackageViewModalContent from './PackageViewModalContent';
import PackageListView from './PackageListView';
import PackageGridCard from './PackageGridCard';

const Package = () => {

   const queryClient = useQueryClient(); 
  const [packages, setPackages] = useState([
    // {
    //   id: 1,
    //   title: "PARIS,BRUSSELS & AMSTERDAM PACKAGE!",
    //   subtitle: "10 Days Tour (Paris, Brussels & Amsterdam)",
    //   duration: "10 Days",
    //   price: "4,000",
    //   priceNote: "/person",
    //   status: "active",
    //   bookings: 24,
    //   revenue: "96,000",
    //   lastUpdated: "2024-01-15",
    //   images: [
    //     "https://res.cloudinary.com/dwkivuqts/image/upload/v1750421429/barcelona_ncfpxj.jpg",
    //     "https://res.cloudinary.com/dwkivuqts/image/upload/v1750390239/brussels_nhf7b5.jpg",
    //     "https://res.cloudinary.com/dwkivuqts/image/upload/v1750421429/paris_w6bixu.jpg" // Added an extra image for better demo
    //   ],
    //   description: "The enchanting City of Light and Love...",
    //   longDescription: "Experience the magic of three European capitals in one unforgettable journey. From the romantic streets of Paris to the historic charm of Brussels and the vibrant canals of Amsterdam, this tour offers the perfect blend of culture, history, and modern European lifestyle.",
    //   includes: [
    //     "Include flights tickets",
    //     "3 Star Hotel Accommodation with Breakfast",
    //     "Airport meet-and-greet services",
    //     "Guided city tours in all three cities",
    //     "Daily breakfast and selected dinners"
    //   ],
    //   color: "from-red-500 to-orange-500"
    // },
    // {
    //   id: 2,
    //   title: "SPECIAL PILGRIMAGE PACKAGE!",
    //   subtitle: "For a group of 10 or more",
    //   duration: "7 Days",
    //   price: "2,900",
    //   priceNote: "/person",
    //   status: "active",
    //   bookings: 12,
    //   revenue: "34,800",
    //   lastUpdated: "2024-01-12",
    //   images: [
    //     "https://res.cloudinary.com/dwkivuqts/image/upload/v1750398579/img12_kaclmj.jpg",
    //     "https://res.cloudinary.com/dwkivuqts/image/upload/v1750552405/WhatsApp_Image_2025-06-21_at_18.24.53_woicog.jpg",
    //     "https://res.cloudinary.com/dwkivuqts/image/upload/v1750552407/WhatsApp_Image_2025-06-21_at_18.24.02_1_yttvfn.jpg"
    //   ],
    //   description: "Jiunge nasi katika safari ya kipekee ya hija ya kidini, ambapo tutatembelea maeneo matakatifu na kuimarisha imani yetu.",
    //   longDescription: "Join us on a spiritual journey that will strengthen your faith and create lasting memories. This pilgrimage package is designed specifically for groups seeking a meaningful religious experience, visiting sacred sites and participating in special ceremonies.",
    //   includes: [
    //     "Airfare",
    //     "Accommodation",
    //     "Guided Pilgrimage Tours",
    //     "Bed and breakfast",
    //     "Airport meet-and-greet services and transportation services"
    //   ],
    //   color: "from-blue-500 to-purple-500"
    // },
    // {
    //   id: 3,
    //   title: "CHAMPAGNE PACKAGE",
    //   subtitle: "12 Days Paris City Tour and Champagne Tasting",
    //   duration: "12 Days",
    //   price: "2,500",
    //   priceNote: "/person",
    //   status: "draft",
    //   bookings: 8,
    //   revenue: "20,000",
    //   lastUpdated: "2024-01-10",
    //   images: [
    //     "https://res.cloudinary.com/dwkivuqts/image/upload/v1750423439/img15_drg7n7.jpg",
    //     "https://res.cloudinary.com/dwkivuqts/image/upload/v1750423439/champagne_vineyard.jpg" // Example image
    //   ],
    //   description: "There is more to France than Paris...",
    //   longDescription: "Discover the sophisticated world of French champagne while exploring the beautiful city of Paris. This premium package combines cultural exploration with exclusive wine tasting experiences in the Champagne region.",
    //   includes: [
    //     "All in PARIS PACKAGE",
    //     "Transport to and from Paris",
    //     "2 Nights Stay in 4 Star hotel",
    //     "Champagne house tours and tastings",
    //     "Fine dining experiences"
    //   ],
    //   color: "from-green-500 to-emerald-500"
    // }
  ]);

  const [view, setView] = useState('grid'); // 'grid' or 'list'
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [modalType, setModalType] = useState(''); // 'view', 'edit', 'add'
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('lastUpdated');
  const [expandedCards, setExpandedCards] = useState({});
  const [copiedId, setCopiedId] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // For image carousel in view modal

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

  const stats = {
    totalPackages: packages.length,
    activePackages: packages.filter(p => p.status === 'active').length,
    // totalBookings: packages.reduce((sum, p) => sum + p.bookings, 0),
    // totalRevenue: packages.reduce((sum, p) => sum + parseInt(p.revenue.replace(/,/g, '') || '0'), 0) // Ensure revenue is parsed as int, handle empty/invalid
  };



  const { data: resData, isLoading, isError } = useQuery({
    queryKey: ['packages'],
    queryFn: async () => {
      return await getPackages(); // Assuming getPackages is defined elsewhere to fetch packages
    },
    placeholderData: keepPreviousData,
  });

  // console.log('resData', resData?.data?.data);


  useEffect(() => {
    if(resData?.data.data){
      setPackages(resData?.data?.data);
    }
  }, [resData]);

  
  if (isLoading) {
    return <div className="text-white">Loading Packages...</div>;
  }

  if (isError) {
    return <div className="text-red-500">Error loading Packages</div>;
  }


  // Update testimonial mutation
  // const updatePackageMutation = useMutation({
  //   mutationFn: (packageData) => updatePackage(packageData.id, packageData),
  //   onSuccess: (result) => {
  //     QueryClient.invalidateQueries({ queryKey: ['packages'] });
  //     if(onUpdate) {
  //       onUpdate(result);
  //     }

      
  //   }
  // })
  const updatePackageMutation = useMutation({
    mutationFn: (packageData) => updatePackage(packageData._id, packageData),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['packages'] }); // ✅ Invalidate the cache
      console.log('Package updated successfully', result);
    },
    onError: (error) => {
      console.error('Error updating package:', error);
    }
  });



  const filteredPackages = packages
    .filter(pkg =>
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(pkg => filterStatus === 'all' || pkg.status === filterStatus)
    .sort((a, b) => {
      switch(sortBy) {
        case 'title': return a.title.localeCompare(b.title);
        case 'price': return (parseInt(a.price.replace(/,/g, '') || '0')) - (parseInt(b.price.replace(/,/g, '') || '0'));
        // case 'bookings': return b.bookings - a.bookings;
        // case 'revenue': return (parseInt(b.revenue.replace(/,/g, '') || '0')) - (parseInt(a.revenue.replace(/,/g, '') || '0'));
        // default: return new Date(b.lastUpdated) - new Date(a.lastUpdated);
      }
    });

  const openModal = (type, pkg = null) => {
    console.log(pkg)
    setModalType(type);
    setSelectedPackage(pkg);
    setCurrentImageIndex(0); // Reset image index on modal open
    if (type === 'edit' && pkg) {
      setFormData({
        title: pkg.title,
        subtitle: pkg.subtitle,
        duration: pkg.duration,
        price: pkg.price,
        priceNote: pkg.priceNote,
        description: pkg.description,
        longDescription: pkg.longDescription || '',
        includes: pkg.features.length > 0 ? [...pkg.features] : [''], // Ensure at least one empty string if array is empty
        images: pkg.images.length > 0 ? [...pkg.images] : [''], // Ensure at least one empty string if array is empty
        color: pkg.color,
        status: pkg.status
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
    setCurrentImageIndex(0); // Reset image index
  };

  // const handleSave = (e) => {
  //   e.preventDefault(); // Prevent default form submission

  //   // Basic validation for required fields
  //   if (!formData.title.trim() || !formData.subtitle.trim() || !formData.price.trim() || !formData.description.trim()) {
  //     alert('Please fill in all required fields: Title, Subtitle, Price, and Description.');
  //     return;
  //   }

  //   const cleanedFormData = {
  //     ...formData,
  //     // Filter out empty strings from arrays
  //     includes: formData.includes.filter(item => item.trim() !== ''),
  //     images: formData.images.filter(item => item.trim() !== ''),
  //     // Ensure price is stored consistently, e.g., without commas for calculations if needed later
  //     price: formData.price.replace(/,/g, ''),
  //   };


  //   if (modalType === 'edit') {
  //     setPackages(packages.map(pkg =>
  //       pkg.id === selectedPackage.id
  //         ? { ...pkg, ...cleanedFormData, lastUpdated: new Date().toISOString().split('T')[0] }
  //         : pkg
  //     ));
  //   } else if (modalType === 'add') {
  //     const newPackage = {
  //       ...cleanedFormData,
  //       id: packages.length > 0 ? Math.max(...packages.map(p => p.id)) + 1 : 1, // Handle empty packages array
  //       bookings: 0,
  //       revenue: '0',
  //       lastUpdated: new Date().toISOString().split('T')[0]
  //     };
  //     setPackages([...packages, newPackage]);
  //   }
  //   closeModal();
  // };

   // Modify handleSave to call mutation when editing
  const handleSave = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.subtitle || !formData.price || !formData.description) {
      alert('Please fill in all required fields: Title, Subtitle, Price, and Description.');
      return;
    }

    const cleanedFormData = {
      ...formData,
      features: formData.features.filter(item => item.trim() !== ''),
      images: formData.images.filter(item => item.trim() !== ''),
      price: formData.price.replace(/,/g, ''),
    };

    if (modalType === 'edit') {
      updatePackageMutation.mutate({ id: selectedPackage._id, ...cleanedFormData }); // ✅ Call mutation
    } else if (modalType === 'add') {
      const newPackage = {
        ...cleanedFormData,
        id: packages._id
      };
      setPackages([...packages, newPackage]);
    }
    closeModal();
  };


  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      setPackages(packages.filter(pkg => pkg.id !== id));
    }
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
      id: packages.length > 0 ? Math.max(...packages.map(p => p.id)) + 1 : 1,
      title: pkg.title + ' (Copy)',
      status: 'draft',
      bookings: 0,
      revenue: '0',
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    setPackages([...packages, newPackage]);
    setCopiedId(newPackage.id);
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
    // Ensure at least one item remains if field is 'images' or 'includes'
    if ((field === 'images' || field === 'includes') && formData[field].length === 1) {
      alert(`You must have at least one ${field === 'images' ? 'image' : 'include'} URL.`);
      return;
    }
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  // Image carousel navigation for view modal
  const nextImage = () => {
    if (selectedPackage && selectedPackage.images) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedPackage.images.length);
    }
  };

  const prevImage = () => {
    if (selectedPackage && selectedPackage.images) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedPackage.images.length) % selectedPackage.images.length);
    }
  };

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className=" w-4/5 mx-auto shadow-sm ">
        <div className="bg-white border-b border-gray-200 rounded-lg  max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Bookings</p>
                <p className="text-3xl font-bold text-purple-600">{stats.totalBookings}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <FaUsers className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold text-orange-600">€{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <FaDollarSign className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div> */}

        {/* Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  disabled
                  type="text"
                  placeholder="Search packages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-64"
                />
              </div>
              <select
                disabled
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
                disabled
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="lastUpdated">Last Updated</option>
                <option value="title">Title</option>
                <option value="price">Price</option>
                <option value="bookings">Bookings</option>
                <option value="revenue">Revenue</option>
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
          <div className="text-center py-10 text-gray-500 text-lg">No packages found matching your criteria.</div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredPackages.map((pkg, idx) => (
               <PackageGridCard
                key={pkg.id}
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

      {/* Modal */}
      {modalType && (
        <div className="fixed inset-0 mt-20 flex items-center justify-center p-4 z-50">
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
                  modalType={modalType} // Passing modalType might be useful for conditional rendering within the form
                />
            
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Package;