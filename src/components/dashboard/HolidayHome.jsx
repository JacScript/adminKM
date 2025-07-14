import React, { useEffect, useState, useCallback } from 'react';
import { Edit, Save, X, Plus, Trash2, Upload, Star, MapPin, Users, DollarSign, Home } from 'lucide-react';
import { keepPreviousData, useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { getHome, updateHome } from '../../http';
import { enqueueSnackbar } from 'notistack';

// Move PropertyCard outside the main component to prevent re-creation on every render
const PropertyCard = React.memo(({ data, type, isEditing, onEdit, onSave, onCancel, onImageUpload, onAddAmenity, onRemoveAmenity, onAmenityChange, onInputChange, isLoading }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 p-6">
        <div className="text-center text-gray-500">
          <p>No data available for {type === 'room' ? 'room' : 'house'}</p>
        </div>
      </div>
    );
  }

  const images = data.images || [];
  
  const nextImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };
  
  const prevImage = () => {
    if (images.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
      <div className="relative">
        <div className="relative h-64 overflow-hidden">
          {images.length > 0 ? (
            <>
              <div 
                className="flex transition-transform duration-300 ease-in-out h-full"
                style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
              >
                {images.map((img, index) => (
                  <div key={index} className="relative min-w-full h-full group">
                    <img 
                      src={img} 
                      alt={`${data.title || 'Property'} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {isEditing && (
                      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => onImageUpload(type, index)}
                          className="bg-white text-gray-800 px-3 py-1 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                        >
                          <Upload className="w-4 h-4 inline mr-1" />
                          Replace
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 text-gray-800 p-2 rounded-full shadow-md transition-all duration-200 hover:scale-110"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'bg-white shadow-lg' 
                            : 'bg-white bg-opacity-60 hover:bg-opacity-80'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
              
              <div className="absolute top-4 left-4 bg-black bg-opacity-50 text-white px-2 py-1 rounded-lg text-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            </>
          ) : (
            <div className="h-full bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">No images available</p>
            </div>
          )}
        </div>
        
        <div className="absolute top-4 right-4 flex gap-2">
          {data.rating && (
            <div className="bg-white px-2 py-1 rounded-lg shadow-sm flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-sm font-medium">{data.rating}</span>
            </div>
          )}
          <div className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm font-medium">
            {type === 'room' ? 'Private Room' : 'Entire House'}
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={data.title || ''}
                  onChange={(e) => onInputChange(type, 'title', e.target.value)}
                  className="text-xl font-bold bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={data.subtitle || ''}
                  onChange={(e) => onInputChange(type, 'subtitle', e.target.value)}
                  className="text-gray-600 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{data.title || 'Untitled Property'}</h3>
                <p className="text-gray-600 mb-3">{data.subtitle || 'No subtitle'}</p>
              </div>
            )}
          </div>
          
          <div className="flex gap-2 ml-4">
            {isEditing ? (
              <>
                <button
                  onClick={onSave}
                  disabled={isLoading}
                  className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                </button>
                <button
                  onClick={onCancel}
                  disabled={isLoading}
                  className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            ) : (
              <button
                onClick={onEdit}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-gray-500" />
            {isEditing ? (
              <input
                type="text"
                value={data.location || ''}
                onChange={(e) => onInputChange(type, 'location', e.target.value)}
                className="text-sm bg-gray-50 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <span className="text-sm text-gray-600">{data.location || 'Location not specified'}</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-gray-500" />
            {isEditing ? (
              <input
                type="number"
                value={data.guests || ''}
                onChange={(e) => onInputChange(type, 'guests', parseInt(e.target.value) || 0)}
                className="text-sm bg-gray-50 border border-gray-300 rounded px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <span className="text-sm text-gray-600">Up to {data.guests || 0} guests</span>
            )}
          </div>
        </div>

        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
            What's included:
            {isEditing && (
              <button
                onClick={() => onAddAmenity(type)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}
          </h4>
          <div className="space-y-2">
            {(data.features || []).map((amenity, index) => (
              <div key={index} className="flex items-center gap-2">
                {isEditing ? (
                  <div className="flex items-center gap-2 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 flex-1">
                    <input
                      type="text"
                      value={amenity}
                      onChange={(e) => onAmenityChange(type, index, e.target.value)}
                      className="bg-transparent border-none focus:outline-none flex-1"
                    />
                    <button
                      onClick={() => onRemoveAmenity(type, index)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <span className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                    {amenity}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          {isEditing ? (
            <textarea
              value={data.description || ''}
              onChange={(e) => onInputChange(type, 'description', e.target.value)}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          ) : (
            <p className="text-sm text-gray-600">{data.description || 'No description available'}</p>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              data.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {data.available ? 'Available' : 'Not available'}
            </div>
            {isEditing && (
              <button
                onClick={() => onInputChange(type, 'available', !data.available)}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Toggle
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isEditing ? (
              <input
                type="number"
                value={data.price || ''}
                onChange={(e) => onInputChange(type, 'price', parseInt(e.target.value) || 0)}
                className="text-lg font-bold bg-gray-50 border border-gray-300 rounded px-2 py-1 w-20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <span className="text-lg font-bold text-gray-900">Tsh {data.price || 0}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

const HolidayHome = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [editingRoom, setEditingRoom] = useState(false);
  const [editingHouse, setEditingHouse] = useState(false);

  // State to hold the data for editing, initialized from fetched data
  const [roomData, setRoomData] = useState({});
  const [houseData, setHouseData] = useState({});

  // State to store the original fetched data for 'cancel' operations
  const [originalRoomData, setOriginalRoomData] = useState({});
  const [originalHouseData, setOriginalHouseData] = useState({});

  const queryClient = useQueryClient();

  // Cloudinary configuration
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  // Fetch houseData
  const { data: resData, isError, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: async () => {
      return await getHome();
    },
    placeholderData: keepPreviousData,
  });

  // Mutation for updating home/room data
  const homeMutation = useMutation({
    mutationFn: async ({ id, data }) => updateHome(id, data),
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ["home"] });
      enqueueSnackbar('Home updated successfully', {
        variant: 'success'
      });
      // After successful update, also update the original data state
      if (result.data?.data) {
        if (result.data.data._id === roomData._id) {
          setOriginalRoomData(result.data.data);
        } else if (result.data.data._id === houseData._id) {
          setOriginalHouseData(result.data.data);
        }
      }
    },
    onError: (error) => {
      enqueueSnackbar('Error updating home: ' + error.message, {
        variant: 'error',
      });
    },
  });

  // Update roomData and houseData with fetched data and set original data for rollback
  useEffect(() => {
    if (resData?.data?.data && resData.data.data.length > 0) {
      const fetchedRoom = resData.data.data.find(item => item.type === 'room') || {};
      const fetchedHouse = resData.data.data.find(item => item.type === 'house') || {};

      setRoomData(fetchedRoom);
      setOriginalRoomData(fetchedRoom);
      
      setHouseData(fetchedHouse);
      setOriginalHouseData(fetchedHouse);
    }
  }, [resData]);

  // Memoize event handlers to prevent unnecessary re-renders
  const handleImageUpload = useCallback(async (type, index) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        const newImageUrl = data.secure_url;

        if (!newImageUrl) throw new Error('Upload failed');

        if (type === 'room') {
          setRoomData(prev => {
            const newImages = [...(prev.images || [])];
            newImages[index] = newImageUrl;
            return { ...prev, images: newImages };
          });
        } else {
          setHouseData(prev => {
            const newImages = [...(prev.images || [])];
            newImages[index] = newImageUrl;
            return { ...prev, images: newImages };
          });
        }

        enqueueSnackbar('Image uploaded successfully', { variant: 'success' });

      } catch (error) {
        enqueueSnackbar('Failed to upload image: ' + error.message, { variant: 'error' });
      }
    };

    input.click();
  }, [CLOUDINARY_UPLOAD_PRESET, CLOUDINARY_CLOUD_NAME]);

  const addAmenity = useCallback((type) => {
    const newAmenity = 'New Amenity';
    if (type === 'room') {
      setRoomData(prev => ({ ...prev, features: [...(prev.features || []), newAmenity] }));
    } else {
      setHouseData(prev => ({ ...prev, features: [...(prev.features || []), newAmenity] }));
    }
  }, []);

  const removeAmenity = useCallback((type, index) => {
    if (type === 'room') {
      setRoomData(prev => ({ ...prev, features: (prev.features || []).filter((_, i) => i !== index) }));
    } else {
      setHouseData(prev => ({ ...prev, features: (prev.features || []).filter((_, i) => i !== index) }));
    }
  }, []);

  const handleAmenityItemChange = useCallback((type, amenityIndex, value) => {
    if (type === 'room') {
      setRoomData(prev => {
        const newAmenities = [...(prev.features || [])];
        newAmenities[amenityIndex] = value;
        return { ...prev, features: newAmenities };
      });
    } else {
      setHouseData(prev => {
        const newAmenities = [...(prev.features || [])];
        newAmenities[amenityIndex] = value;
        return { ...prev, features: newAmenities };
      });
    }
  }, []);

  const handlePropertyInputChange = useCallback((type, field, value) => {
    if (type === 'room') {
      setRoomData(prev => ({ ...prev, [field]: value }));
    } else {
      setHouseData(prev => ({ ...prev, [field]: value }));
    }
  }, []);

  // Handler for saving room data
  const handleSaveRoom = useCallback(() => {
    if (roomData._id) {
      homeMutation.mutate({ id: roomData._id, data: roomData });
      setEditingRoom(false);
    } else {
      enqueueSnackbar('Room ID not found, cannot save.', { variant: 'error' });
    }
  }, [roomData, homeMutation]);

  // Handler for canceling room edit
  const handleCancelRoom = useCallback(() => {
    setRoomData(originalRoomData);
    setEditingRoom(false);
  }, [originalRoomData]);

  // Handler for saving house data
  const handleSaveHouse = useCallback(() => {
    if (houseData._id) {
      homeMutation.mutate({ id: houseData._id, data: houseData });
      setEditingHouse(false);
    } else {
      enqueueSnackbar('House ID not found, cannot save.', { variant: 'error' });
    }
  }, [houseData, homeMutation]);

  // Handler for canceling house edit
  const handleCancelHouse = useCallback(() => {
    setHouseData(originalHouseData);
    setEditingHouse(false);
  }, [originalHouseData]);

  if (isLoading) {
    return <div className="text-gray-600">Loading AirBnB...</div>;
  }

  if (isError) {
    return <div className="text-red-500">Error loading AirBnB</div>;
  }

  return (
    <div className="min-h-screen w-5/6 mx-auto bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6">
        <nav className="flex space-x-8">
          {[
            { id: 'overview', label: 'Overview', icon: Home },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Property Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">Total Properties</h3>
                  <p className="text-2xl font-bold text-blue-600">
                    {(roomData._id ? 1 : 0) + (houseData._id ? 1 : 0)}
                  </p>
                </div>
                <div className="bg-green-50 rounded-lg p-4">
                  <h3 className="font-semibold text-green-900 mb-2">Available Now</h3>
                  <p className="text-2xl font-bold text-green-600">
                    {(roomData && roomData.available ? 1 : 0) + (houseData && houseData.available ? 1 : 0)}
                  </p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4">
                  <h3 className="font-semibold text-purple-900 mb-2">Total Capacity</h3>
                  <p className="text-2xl font-bold text-purple-600">
                    {(roomData.guests || 0) + (houseData.guests || 0)} guests
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <PropertyCard
                data={roomData}
                type="room"
                isEditing={editingRoom}
                onEdit={() => setEditingRoom(true)}
                onSave={handleSaveRoom}
                onCancel={handleCancelRoom}
                onImageUpload={handleImageUpload}
                onAddAmenity={addAmenity}
                onRemoveAmenity={removeAmenity}
                onAmenityChange={handleAmenityItemChange}
                onInputChange={handlePropertyInputChange}
                isLoading={homeMutation.isPending}
              />
              
              <PropertyCard
                data={houseData}
                type="house"
                isEditing={editingHouse}
                onEdit={() => setEditingHouse(true)}
                onSave={handleSaveHouse}
                onCancel={handleCancelHouse}
                onImageUpload={handleImageUpload}
                onAddAmenity={addAmenity}
                onRemoveAmenity={removeAmenity}
                onAmenityChange={handleAmenityItemChange}
                onInputChange={handlePropertyInputChange}
                isLoading={homeMutation.isPending}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HolidayHome;