import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { CiStar, CiEdit, CiTrash, CiSearch, CiFilter } from "react-icons/ci";
import { FaPlus } from "react-icons/fa";
import { getTestimonials, deleteTestimonial } from '../../http';
import AddTestimonialModal from './AddTestimonialModal';
import EditTestimonialModal from './EditTestimonialModal';
import { enqueueSnackbar } from 'notistack';

const Testimonial = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRating, setFilterRating] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [testimonialToDelete, setTestimonialToDelete] = useState(null);
  const [testimonialToEdit, setTestimonialToEdit] = useState(null);
  const queryClient = useQueryClient();

  // Fetch testimonials using React Query
  const { data: resData, isError, isLoading } = useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      return await getTestimonials();
    },
    placeholderData: keepPreviousData,
  });

  // Mutation for deleting a testimonial
  const deleteMutation = useMutation({
    mutationFn: (id) => deleteTestimonial(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      enqueueSnackbar('Testimonial deleted successfully!', { variant: 'success' });
      setShowDeleteModal(false);
      setTestimonialToDelete(null);
    },
    onError: (error) => {
      enqueueSnackbar('Testimonial deletion failed. Please try again.', { variant: 'error' });
      setShowDeleteModal(false);
    },
  });

  // Update testimonials when data is fetched
  useEffect(() => {
    if (resData?.data?.data) {
      setTestimonials(resData.data.data);
    }
  }, [resData]);

  if (isLoading) {
    return <div className="text-white">Loading testimonials...</div>;
  }

  if (isError) {
    return <div className="text-red-500">Error loading testimonials</div>;
  }

  const filteredTestimonials = testimonials.filter(testimonial => {
    const matchesSearch = testimonial.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         testimonial.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRating = filterRating === 'all' || testimonial.rating?.toString() === filterRating;
    
    return matchesSearch && matchesRating;
  });

  const handleEdit = (testimonial) => {
    setTestimonialToEdit(testimonial);
    setShowEditModal(true);
  };

  const handleDelete = (testimonial) => {
    setTestimonialToDelete(testimonial);
    setShowDeleteModal(true);
  };

  // Confirm delete handler
  const confirmDelete = () => {
    if (testimonialToDelete?._id) {
      deleteMutation.mutate(testimonialToDelete._id);
    }
  };

  const toggleFeatured = (id) => {
    setTestimonials(testimonials.map(t => 
      t._id === id ? { ...t, featured: !t.featured } : t
    ));
  };

  // Add new testimonial handler - should invalidate queries to refetch data
  const handleAddTestimonial = (newTestimonial) => {
    // Instead of manually updating state, refetch the data
    queryClient.invalidateQueries({ queryKey: ['testimonials'] });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <CiStar
        key={i}
        size={30}
        className={`${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-transparent p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white">Testimonials</h1>
              <p className="text-gray-600 mt-2">Manage customer feedback and reviews</p>
            </div>
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <FaPlus size={20} />
              Add Testimonial
            </button>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search testimonials..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <CiFilter className="text-gray-400" size={20} />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-blue-600">{testimonials.length}</div>
            <div className="text-gray-600">Total Reviews</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-green-600">
              {testimonials.filter(t => t.featured).length}
            </div>
            <div className="text-gray-600">Featured</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-yellow-600">
              {testimonials.length > 0 ? (testimonials.reduce((sum, t) => sum + (t.rating || 0), 0) / testimonials.length).toFixed(1) : '0.0'}
            </div>
            <div className="text-gray-600">Avg Rating</div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="text-2xl font-bold text-purple-600">
              {testimonials.filter(t => t.rating === 5).length}
            </div>
            <div className="text-gray-600">5-Star Reviews</div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredTestimonials.map((testimonial) => (
            <div key={testimonial._id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              {testimonial.featured && (
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium px-4 py-2 rounded-t-lg">
                  ⭐ Featured Testimonial
                </div>
              )}
              
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.profileImg || 'https://images.unsplash.com/photo-1494790108755-2616b332c3b3?w=60&h=60&fit=crop&crop=face'}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                      <p className="text-sm text-blue-600 font-medium">{testimonial.flag}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit testimonial"
                    >
                      <CiEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete testimonial"
                    >
                      <CiTrash size={18} />
                    </button>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex gap-1">
                    {renderStars(testimonial.rating || 0)}
                  </div>
                  <span className="text-sm text-gray-600">({testimonial.rating || 0}/5)</span>
                </div>

                {/* Content */}
                <blockquote className="text-gray-700 italic mb-4">
                  "{testimonial.description}"
                </blockquote>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t">
                  <span>{testimonial.createdAt ? new Date(testimonial.createdAt).toLocaleDateString() : 'No date'}</span>
                  <button
                    onClick={() => toggleFeatured(testimonial._id)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      testimonial.featured
                        ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {testimonial.featured ? 'Featured' : 'Feature'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredTestimonials.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No testimonials found</div>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Add Testimonial Modal */}
        <AddTestimonialModal
          isOpen={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddTestimonial}
        />

        {/* Edit Testimonial Modal */}
        <EditTestimonialModal
          isOpen={showEditModal}
          onClose={() => {
            setShowEditModal(false);
            setTestimonialToEdit(null);
          }}
          testimonial={testimonialToEdit}
        />

        {/* Delete Confirmation Modal */}
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delete Testimonial</h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete the testimonial from{' '}
                <span className="font-medium">{testimonialToDelete?.name}</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleteMutation.isPending}
                  className={`px-4 py-2 rounded-lg text-white transition-colors ${
                    deleteMutation.isPending
                      ? 'bg-red-400 cursor-not-allowed'
                      : 'bg-red-600 hover:bg-red-700'
                  }`}
                >
                  {deleteMutation.isPending ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Testimonial;