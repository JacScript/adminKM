// import React, { useState } from 'react';
// import { CiStar} from "react-icons/ci";
// import { IoClose, IoChevronDown } from "react-icons/io5";
// import {createTestimonial} from '../../http'; // Adjust the import based on your file structure

// const AddTestimonialModal = ({ isOpen, onClose, onAdd }) => {
//   const [formData, setFormData] = useState({
//     name: '',
//     flag: '',
//     rating: 5,
//     description: '',
//     profileImg: '',
//     featured: false
//   });

//   const [errors, setErrors] = useState({});
//   const [isLoading, setIsLoading] = useState(false);
//   const [isUploadingImage, setIsUploadingImage] = useState(false);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [showCountryDropdown, setShowCountryDropdown] = useState(false);
//   const [countrySearch, setCountrySearch] = useState('');

//   // Popular countries with flags
//   const countries = [
//     { code: 'US', name: 'United States', flag: '🇺🇸' },
//     { code: 'CA', name: 'Canada', flag: '🇨🇦' },
//     { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
//     { code: 'AU', name: 'Australia', flag: '🇦🇺' },
//     { code: 'DE', name: 'Germany', flag: '🇩🇪' },
//     { code: 'FR', name: 'France', flag: '🇫🇷' },
//     { code: 'JP', name: 'Japan', flag: '🇯🇵' },
//     { code: 'IN', name: 'India', flag: '🇮🇳' },
//     { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
//     { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
//     { code: 'ES', name: 'Spain', flag: '🇪🇸' },
//     { code: 'IT', name: 'Italy', flag: '🇮🇹' },
//     { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
//     { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
//     { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
//     { code: 'NO', name: 'Norway', flag: '🇳🇴' },
//     { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
//     { code: 'FI', name: 'Finland', flag: '🇫🇮' },
//     { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
//     { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
//     { code: 'CN', name: 'China', flag: '🇨🇳' },
//     { code: 'RU', name: 'Russia', flag: '🇷🇺' },
//     { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
//     { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
//     { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
//     { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
//     { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
//     { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
//     { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
//     { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
//     { code: 'CL', name: 'Chile', flag: '🇨🇱' },
//     { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
//     { code: 'PE', name: 'Peru', flag: '🇵🇪' },
//     { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
//     { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
//     { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
//     { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
//     { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
//     { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
//     { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
//     { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
//     { code: 'AT', name: 'Austria', flag: '🇦🇹' },
//     { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
//     { code: 'GR', name: 'Greece', flag: '🇬🇷' },
//     { code: 'PL', name: 'Poland', flag: '🇵🇱' },
//     { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
//     { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
//     { code: 'IL', name: 'Israel', flag: '🇮🇱' },
//     { code: 'LU', name: 'Luxembourg', flag: '🇱🇺' },
//     { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' }
//   ];

//   // Cloudinary configuration
//   const CLOUDINARY_UPLOAD_PRESET = 'your_upload_preset';
//   const CLOUDINARY_CLOUD_NAME = 'your_cloud_name';

//   const filteredCountries = countries.filter(country =>
//     country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
//     country.code.toLowerCase().includes(countrySearch.toLowerCase())
//   );

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
    
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }));
//     }
//   };

//   const handleCountrySearch = (e) => {
//     setCountrySearch(e.target.value);
//     setShowCountryDropdown(true);
//   };

//   const selectCountry = (country) => {
//     setFormData(prev => ({
//       ...prev,
//       flag: `${country.flag} ${country.name}`
//     }));
//     setCountrySearch('');
//     setShowCountryDropdown(false);
//     if (errors.flag) {
//       setErrors(prev => ({
//         ...prev,
//         flag: ''
//       }));
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         setErrors(prev => ({
//           ...prev,
//           profileImg: 'Please select a valid image file'
//         }));
//         return;
//       }
      
//       if (file.size > 5 * 1024 * 1024) {
//         setErrors(prev => ({
//           ...prev,
//           profileImg: 'Image size should be less than 5MB'
//         }));
//         return;
//       }
      
//       setSelectedFile(file);
//       setErrors(prev => ({
//         ...prev,
//         profileImg: ''
//       }));
//     }
//   };

//   const uploadToCloudinary = async (file) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
//     formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);

//     try {
//       const response = await fetch(
//         `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
//         {
//           method: 'POST',
//           body: formData,
//         }
//       );

//       if (!response.ok) {
//         throw new Error('Failed to upload image');
//       }

//       const data = await response.json();
//       return data.secure_url;
//     } catch (error) {
//       console.error('Cloudinary upload error:', error);
//       throw error;
//     }
//   };

//   const handleRatingClick = (rating) => {
//     setFormData(prev => ({
//       ...prev,
//       rating
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.name.trim()) {
//       newErrors.name = 'Name is required';
//     }
    
//     if (!formData.flag.trim()) {
//       newErrors.flag = 'Country/Flag is required';
//     }
    
//     if (!formData.description.trim()) {
//       newErrors.description = 'Description is required';
//     }
    
//     if (formData.description.length > 500) {
//       newErrors.description = 'Description must be less than 500 characters';
//     }
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const submitTestimonial = async (testimonialData) => {
//     try {
//       const response = await fetch('/api/testimonials', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(testimonialData),
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();
//       return result;
//     } catch (error) {
//       console.error('Error submitting testimonial:', error);
//       throw error;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       return;
//     }

//     setIsLoading(true);
    
//     try {
//       let profileImageUrl = formData.profileImg;

//       if (selectedFile) {
//         setIsUploadingImage(true);
//         try {
//           profileImageUrl = await uploadToCloudinary(selectedFile);
//         } catch (uploadError) {
//           setErrors({ profileImg: 'Failed to upload image. Please try again.' });
//           setIsLoading(false);
//           setIsUploadingImage(false);
//           return;
//         }
//         setIsUploadingImage(false);
//       }

//       const testimonialData = {
//         name: formData.name.trim(),
//         flag: formData.flag.trim(),
//         rating: formData.rating,
//         description: formData.description.trim(),
//         profileImg: profileImageUrl || null,
//         featured: formData.featured,
//         createdAt: new Date().toISOString()
//       };

//       const result = await submitTestimonial(testimonialData);
      
//       const newTestimonial = {
//         ...testimonialData,
//         id: result.id || Date.now()
//       };

//       onAdd(newTestimonial);
//       handleClose();
//       alert('Testimonial added successfully!');
      
//     } catch (error) {
//       setErrors({
//         submit: 'Failed to save testimonial. Please try again.'
//       });
//       console.error('Submit error:', error);
//     } finally {
//       setIsLoading(false);
//       setIsUploadingImage(false);
//     }
//   };

//   const handleClose = () => {
//     setFormData({
//       name: '',
//       flag: '',
//       rating: 5,
//       description: '',
//       profileImg: '',
//       featured: false
//     });
//     setErrors({});
//     setSelectedFile(null);
//     setCountrySearch('');
//     setShowCountryDropdown(false);
//     onClose();
//   };

//   const renderStars = (rating) => {
//     return Array.from({ length: 5 }, (_, i) => (
//       <CiStar
//         key={i}
//         size={24}
//         className={`cursor-pointer transition-colors ${
//           i < rating ? 'text-yellow-400 fill-current hover:text-yellow-500' : 'text-gray-300 hover:text-gray-400'
//         }`}
//         onClick={() => handleRatingClick(i + 1)}
//       />
//     ));
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-scroll scrollbar-y-hide shadow-2xl py-10">
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-100">
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900">Add New Testimonial</h2>
//             <p className="text-sm text-gray-500 mt-1">Share your customer's experience</p>
//           </div>
//           <button
//             onClick={handleClose}
//             className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
//             disabled={isLoading}
//           >
//             <IoClose size={24} />
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-6">
//           {/* Submit Error */}
//           {errors.submit && (
//             <div className="bg-red-50 border border-red-200 rounded-xl p-4">
//               <div className="flex">
//                 <div className="flex-shrink-0">
//                   <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
//                     <span className="text-white text-xs">!</span>
//                   </div>
//                 </div>
//                 <div className="ml-3">
//                   <p className="text-red-700 text-sm font-medium">{errors.submit}</p>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Name */}
//           <div>
//             <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
//               Customer Name *
//             </label>
//             <input
//               type="text"
//               id="name"
//               name="name"
//               value={formData.name}
//               onChange={handleInputChange}
//               disabled={isLoading}
//               className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 ${
//                 errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
//               }`}
//               placeholder="Enter customer's full name"
//             />
//             {errors.name && (
//               <p className="text-red-500 text-sm mt-2 flex items-center">
//                 <span className="mr-1">⚠️</span>
//                 {errors.name}
//               </p>
//             )}
//           </div>

//           {/* Country/Flag with Dropdown */}
//           <div className="relative">
//             <label htmlFor="flag" className="block text-sm font-semibold text-gray-700 mb-2">
//               Country *
//             </label>
//             <div className="relative">
//               <input
//                 type="text"
//                 id="flag"
//                 name="flag"
//                 value={formData.flag || countrySearch}
//                 onChange={formData.flag ? handleInputChange : handleCountrySearch}
//                 onFocus={() => !formData.flag && setShowCountryDropdown(true)}
//                 disabled={isLoading}
//                 className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 ${
//                   errors.flag ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
//                 }`}
//                 placeholder={formData.flag ? formData.flag : "Search for a country..."}
//               />
//               {!formData.flag && (
//                 <IoChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               )}
//               {formData.flag && (
//                 <button
//                   type="button"
//                   onClick={() => setFormData(prev => ({ ...prev, flag: '' }))}
//                   className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 w-5 h-5"
//                 >
//                   <IoClose />
//                 </button>
//               )}
//             </div>
            
//             {/* Dropdown */}
//             {showCountryDropdown && !formData.flag && (
//               <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-48 overflow-y-auto">
//                 {filteredCountries.length > 0 ? (
//                   filteredCountries.map((country) => (
//                     <button
//                       key={country.code}
//                       type="button"
//                       onClick={() => selectCountry(country)}
//                       className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150"
//                     >
//                       <span className="text-2xl">{country.flag}</span>
//                       <span className="text-sm font-medium text-gray-900">{country.name}</span>
//                     </button>
//                   ))
//                 ) : (
//                   <div className="px-4 py-3 text-gray-500 text-sm">No countries found</div>
//                 )}
//               </div>
//             )}
            
//             {errors.flag && (
//               <p className="text-red-500 text-sm mt-2 flex items-center">
//                 <span className="mr-1">⚠️</span>
//                 {errors.flag}
//               </p>
//             )}
//           </div>

//           {/* Rating */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Rating *
//             </label>
//             <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
//               {renderStars(formData.rating)}
//               <span className="ml-3 text-sm font-medium text-gray-700 bg-white px-3 py-1 rounded-full">
//                 {formData.rating}/5
//               </span>
//             </div>
//           </div>

//           {/* Profile Image Upload */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-700 mb-2">
//               Profile Image
//             </label>
            
//             <div className="space-y-4">
//               {/* File Upload */}
//               <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors duration-200">
//                 <input
//                   type="file"
//                   id="profileImgFile"
//                   accept="image/*"
//                   onChange={handleFileChange}
//                   disabled={isLoading}
//                   className="hidden"
//                 />
//                 <label
//                   htmlFor="profileImgFile"
//                   className="cursor-pointer flex flex-col items-center"
//                 >
//                   <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
//                     <span className="text-blue-500 text-2xl">📁</span>
//                   </div>
//                   <p className="text-sm font-medium text-gray-700">Click to upload image</p>
//                   <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
//                 </label>
//               </div>
              
//               {selectedFile && (
//                 <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-xl">
//                   <div className="flex items-center space-x-3">
//                     <span className="text-green-500">✓</span>
//                     <span className="text-sm font-medium text-green-700">{selectedFile.name}</span>
//                   </div>
//                   <button
//                     type="button"
//                     onClick={() => setSelectedFile(null)}
//                     className="text-red-500 hover:text-red-700 p-1"
//                   >
//                     <IoClose size={16} />
//                   </button>
//                 </div>
//               )}

//               {/* OR Divider */}
//               <div className="flex items-center">
//                 <div className="flex-1 border-t border-gray-200"></div>
//                 <span className="px-3 text-sm text-gray-500 bg-white">OR</span>
//                 <div className="flex-1 border-t border-gray-200"></div>
//               </div>

//               {/* URL Input */}
//               <input
//                 type="url"
//                 id="profileImg"
//                 name="profileImg"
//                 value={formData.profileImg}
//                 onChange={handleInputChange}
//                 disabled={isLoading || selectedFile}
//                 className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 ${
//                   errors.profileImg ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
//                 }`}
//                 placeholder="Or paste image URL here..."
//               />
//             </div>
            
//             {errors.profileImg && (
//               <p className="text-red-500 text-sm mt-2 flex items-center">
//                 <span className="mr-1">⚠️</span>
//                 {errors.profileImg}
//               </p>
//             )}
//           </div>

//           {/* Description */}
//           <div>
//             <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
//               Testimonial *
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleInputChange}
//               rows={4}
//               disabled={isLoading}
//               className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 ${
//                 errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
//               }`}
//               placeholder="Share the customer's experience and feedback..."
//             />
//             <div className="flex justify-between items-center mt-2">
//               {errors.description && (
//                 <p className="text-red-500 text-sm flex items-center">
//                   <span className="mr-1">⚠️</span>
//                   {errors.description}
//                 </p>
//               )}
//               <p className={`text-sm ml-auto ${
//                 formData.description.length > 450 ? 'text-red-500' : 'text-gray-500'
//               }`}>
//                 {formData.description.length}/500
//               </p>
//             </div>
//           </div>

//           {/* Featured */}
//           <div className="flex items-center p-4 bg-blue-50 rounded-xl">
//             <input
//               type="checkbox"
//               id="featured"
//               name="featured"
//               checked={formData.featured}
//               onChange={handleInputChange}
//               disabled={isLoading}
//               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
//             />
//             <label htmlFor="featured" className="ml-3 block text-sm font-medium text-gray-700">
//               ⭐ Mark as featured testimonial
//             </label>
//           </div>

//           {/* Actions */}
//           <div className="flex gap-3 pt-6 border-t border-gray-100">
//             <button
//               type="button"
//               onClick={handleClose}
//               disabled={isLoading}
//               className="flex-1 px-6 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={isLoading}
//               className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
//             >
//               {isLoading ? (
//                 <>
//                   <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
//                   {isUploadingImage ? 'Uploading...' : 'Adding...'}
//                 </>
//               ) : (
//                 <>
//                   <span>✨</span>
//                   Add Testimonial
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddTestimonialModal;

import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CiStar} from "react-icons/ci";
import { IoClose, IoChevronDown } from "react-icons/io5";
import {createTestimonial} from '../../http'; // Adjust the import based on your file structure
import { enqueueSnackbar} from 'notistack'


const AddTestimonialModal = ({ isOpen, onClose, onAdd }) => {
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    name: '',
    flag: '',
    rating: 5,
    description: '',
    profileImg: '',
    featured: false
  });

  const [errors, setErrors] = useState({});
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');

  // React Query mutation for creating testimonial
  // const testimonialMutation = useMutation({
  //   mutationFn: async (testimonialData) => {
  //     const response = await fetch('/api/testimonials', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(testimonialData),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     return response.json();
  //   },
  //   onSuccess: (result, variables) => {
  //     // Invalidate and refetch testimonials
  //     queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      
  //     // Optionally, you can also update the cache optimistically
  //     queryClient.setQueryData(['testimonials'], (old) => {
  //       if (!old) return [{ ...variables, id: result.id }];
  //       return [...old, { ...variables, id: result.id }];
  //     });

  //     const newTestimonial = {
  //       ...variables,
  //       id: result.id || Date.now()
  //     };

  //     onAdd(newTestimonial);
  //     handleClose();
  //     alert('Testimonial added successfully!');
  //   },
  //   onError: (error) => {
  //     console.error('Submit error:', error);
  //     setErrors({
  //       submit: error.message || 'Failed to save testimonial. Please try again.'
  //     });
  //   }
  // });
const testimonialMutation = useMutation({
  mutationFn: createTestimonial,
  onSuccess: (result, variables) => {
    queryClient.invalidateQueries({ queryKey: ['testimonials'] });

    const newTestimonial = {
      ...variables,
      id: result.id || Date.now()
    };

    onAdd(newTestimonial);
    handleClose();
// console.log(result);
    
    enqueueSnackbar('Testimonial added successfully!', { variant: 'success' });
  },
  onError: (error) => {
    setErrors({
      submit: error.message || 'Failed to save testimonial. Please try again.'
    });

    enqueueSnackbar('Failed to save testimonial. Please try again.', { variant: 'error' });
    handleClose();
  }
});


  // Cloudinary upload mutation
  // const uploadMutation = useMutation({
  //   mutationFn: async (file) => {
  //     const formData = new FormData();
  //     formData.append('file', file);
  //     formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  //     formData.append('cloud_name', CLOUDINARY_CLOUD_NAME);

  //     const response = await fetch(
  //       `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
  //       {
  //         method: 'POST',
  //         body: formData,
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error('Failed to upload image');
  //     }

  //     return response.json();
  //   },
  //   onSuccess: (data) => {
  //     setIsUploadingImage(false);
  //   },
  //   onError: (error) => {
  //       console.log(error);
  //     setIsUploadingImage(false);
  //     setErrors({ profileImg: 'Failed to upload image. Please try again77.' });
  //   }
  // });

  const uploadMutation = useMutation({
  mutationFn: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Cloudinary upload failed: ${errorText}`);
    }

    const data = await response.json();

    if (!data.secure_url) {
      throw new Error('Upload succeeded but no image URL returned.');
    }

    return data;
  },

  onSuccess: (data) => {
    setIsUploadingImage(false);
    // You can also set the image preview here if needed
    // setFormData(prev => ({ ...prev, profileImg: data.secure_url }));
  },

  onError: (error) => {
    console.error('Upload error:', error);
    setIsUploadingImage(false);
    setErrors(prev => ({
      ...prev,
      profileImg: 'Failed to upload image. Please try again.'
    }));
  }
});


  // Popular countries with flags
  const countries = [
    { code: 'US', name: 'United States', flag: '🇺🇸' },
    { code: 'CA', name: 'Canada', flag: '🇨🇦' },
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'AU', name: 'Australia', flag: '🇦🇺' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'JP', name: 'Japan', flag: '🇯🇵' },
    { code: 'IN', name: 'India', flag: '🇮🇳' },
    { code: 'BR', name: 'Brazil', flag: '🇧🇷' },
    { code: 'MX', name: 'Mexico', flag: '🇲🇽' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹' },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
    { code: 'CH', name: 'Switzerland', flag: '🇨🇭' },
    { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
    { code: 'NO', name: 'Norway', flag: '🇳🇴' },
    { code: 'DK', name: 'Denmark', flag: '🇩🇰' },
    { code: 'FI', name: 'Finland', flag: '🇫🇮' },
    { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
    { code: 'KR', name: 'South Korea', flag: '🇰🇷' },
    { code: 'CN', name: 'China', flag: '🇨🇳' },
    { code: 'RU', name: 'Russia', flag: '🇷🇺' },
    { code: 'ZA', name: 'South Africa', flag: '🇿🇦' },
    { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪' },
    { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: 'TR', name: 'Turkey', flag: '🇹🇷' },
    { code: 'EG', name: 'Egypt', flag: '🇪🇬' },
    { code: 'NG', name: 'Nigeria', flag: '🇳🇬' },
    { code: 'KE', name: 'Kenya', flag: '🇰🇪' },
    { code: 'AR', name: 'Argentina', flag: '🇦🇷' },
    { code: 'CL', name: 'Chile', flag: '🇨🇱' },
    { code: 'CO', name: 'Colombia', flag: '🇨🇴' },
    { code: 'PE', name: 'Peru', flag: '🇵🇪' },
    { code: 'TH', name: 'Thailand', flag: '🇹🇭' },
    { code: 'VN', name: 'Vietnam', flag: '🇻🇳' },
    { code: 'PH', name: 'Philippines', flag: '🇵🇭' },
    { code: 'ID', name: 'Indonesia', flag: '🇮🇩' },
    { code: 'MY', name: 'Malaysia', flag: '🇲🇾' },
    { code: 'NZ', name: 'New Zealand', flag: '🇳🇿' },
    { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
    { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
    { code: 'AT', name: 'Austria', flag: '🇦🇹' },
    { code: 'PT', name: 'Portugal', flag: '🇵🇹' },
    { code: 'GR', name: 'Greece', flag: '🇬🇷' },
    { code: 'PL', name: 'Poland', flag: '🇵🇱' },
    { code: 'CZ', name: 'Czech Republic', flag: '🇨🇿' },
    { code: 'HU', name: 'Hungary', flag: '🇭🇺' },
    { code: 'IL', name: 'Israel', flag: '🇮🇱' },
    { code: 'LU', name: 'Luxembourg', flag: '🇱🇺' },
    { code: 'TZ', name: 'Tanzania', flag: '🇹🇿' }
  ];

  // Cloudinary configuration
  const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;


  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
    country.code.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleCountrySearch = (e) => {
    setCountrySearch(e.target.value);
    setShowCountryDropdown(true);
  };

  const selectCountry = (country) => {
    setFormData(prev => ({
      ...prev,
      flag: `${country.flag}`
    }));
    setCountrySearch('');
    setShowCountryDropdown(false);
    if (errors.flag) {
      setErrors(prev => ({
        ...prev,
        flag: ''
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          profileImg: 'Please select a valid image file'
        }));
        return;
      }
      
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          profileImg: 'Image size should be less than 5MB'
        }));
        return;
      }
      
      setSelectedFile(file);
      setErrors(prev => ({
        ...prev,
        profileImg: ''
      }));
    }
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.flag.trim()) {
      newErrors.flag = 'Country/Flag is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    try {
      let profileImageUrl = formData.profileImg;

      // Upload image if file is selected
      if (selectedFile) {
        setIsUploadingImage(true);
        const uploadResult = await uploadMutation.mutateAsync(selectedFile);
        profileImageUrl = uploadResult.secure_url;
      }

      // Prepare testimonial data
      const testimonialData = {
        name: formData.name.trim(),
        flag: formData.flag.trim(),
        rating: formData.rating,
        description: formData.description.trim(),
        profileImg: profileImageUrl || null,
        featured: formData.featured,
        createdAt: new Date().toISOString()
      };

      // Submit testimonial
      await testimonialMutation.mutateAsync(testimonialData);
      
    } catch (error) {
      // Error handling is done in the mutation's onError callback
      console.error('Submit error:', error);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      flag: '',
      rating: 5,
      description: '',
      profileImg: '',
      featured: false
    });
    setErrors({});
    setSelectedFile(null);
    setCountrySearch('');
    setShowCountryDropdown(false);
    onClose();
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <CiStar
        key={i}
        size={24}
        className={`cursor-pointer transition-colors ${
          i < rating ? 'text-yellow-400 fill-current hover:text-yellow-500' : 'text-gray-300 hover:text-gray-400'
        }`}
        onClick={() => handleRatingClick(i + 1)}
      />
    ));
  };

  // Loading state from mutations
  const isLoading = testimonialMutation.isPending || uploadMutation.isPending;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-scroll scrollbar-y-hide shadow-2xl py-10">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Add New Testimonial</h2>
            <p className="text-sm text-gray-500 mt-1">Share your customer's experience</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-all duration-200"
            disabled={isLoading}
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Submit Error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">!</span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-red-700 text-sm font-medium">{errors.submit}</p>
                </div>
              </div>
            </div>
          )}

          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
              Customer Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 ${
                errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              placeholder="Enter customer's full name"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.name}
              </p>
            )}
          </div>

          {/* Country/Flag with Dropdown */}
          <div className="relative">
            <label htmlFor="flag" className="block text-sm font-semibold text-gray-700 mb-2">
              Country *
            </label>
            <div className="relative">
              <input
                type="text"
                id="flag"
                name="flag"
                value={formData.flag || countrySearch}
                onChange={formData.flag ? handleInputChange : handleCountrySearch}
                onFocus={() => !formData.flag && setShowCountryDropdown(true)}
                disabled={isLoading}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 ${
                  errors.flag ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder={formData.flag ? formData.flag : "Search for a country..."}
              />
              {!formData.flag && (
                <IoChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              )}
              {formData.flag && (
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, flag: '' }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 w-5 h-5"
                >
                  <IoClose />
                </button>
              )}
            </div>
            
            {/* Dropdown */}
            {showCountryDropdown && !formData.flag && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => selectCountry(country)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 transition-colors duration-150"
                    >
                      <span className="text-2xl">{country.flag}</span>
                      <span className="text-sm font-medium text-gray-900">{country.name}</span>
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-gray-500 text-sm">No countries found</div>
                )}
              </div>
            )}
            
            {errors.flag && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.flag}
              </p>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Rating *
            </label>
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
              {renderStars(formData.rating)}
              <span className="ml-3 text-sm font-medium text-gray-700 bg-white px-3 py-1 rounded-full">
                {formData.rating}/5
              </span>
            </div>
          </div>

          {/* Profile Image Upload */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Profile Image
            </label>
            
            <div className="space-y-4">
              {/* File Upload */}
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors duration-200">
                <input
                  type="file"
                  id="profileImgFile"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={isLoading}
                  className="hidden"
                />
                <label
                  htmlFor="profileImgFile"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-3">
                    <span className="text-blue-500 text-2xl">📁</span>
                  </div>
                  <p className="text-sm font-medium text-gray-700">Click to upload image</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                </label>
              </div>
              
              {selectedFile && (
                <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center space-x-3">
                    <span className="text-green-500">✓</span>
                    <span className="text-sm font-medium text-green-700">{selectedFile.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedFile(null)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <IoClose size={16} />
                  </button>
                </div>
              )}

              {/* OR Divider */}
              {/* <div className="flex items-center">
                <div className="flex-1 border-t border-gray-200"></div>
                <span className="px-3 text-sm text-gray-500 bg-white">OR</span>
                <div className="flex-1 border-t border-gray-200"></div>
              </div> */}

              {/* URL Input */}
              {/* <input
                type="url"
                id="profileImg"
                name="profileImg"
                value={formData.profileImg}
                onChange={handleInputChange}
                disabled={isLoading || selectedFile}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 ${
                  errors.profileImg ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                }`}
                placeholder="Or paste image URL here..."
              /> */}
            </div>
            
            {errors.profileImg && (
              <p className="text-red-500 text-sm mt-2 flex items-center">
                <span className="mr-1">⚠️</span>
                {errors.profileImg}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
              Testimonial *
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              disabled={isLoading}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none disabled:bg-gray-50 disabled:text-gray-500 transition-all duration-200 ${
                errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              placeholder="Share the customer's experience and feedback..."
            />
            <div className="flex justify-between items-center mt-2">
              {errors.description && (
                <p className="text-red-500 text-sm flex items-center">
                  <span className="mr-1">⚠️</span>
                  {errors.description}
                </p>
              )}
              <p className={`text-sm ml-auto ${
                formData.description.length > 450 ? 'text-red-500' : 'text-gray-500'
              }`}>
                {formData.description.length}/500
              </p>
            </div>
          </div>

          {/* Featured */}
          <div className="flex items-center p-4 bg-blue-50 rounded-xl">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              checked={formData.featured}
              onChange={handleInputChange}
              disabled={isLoading}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded disabled:opacity-50"
            />
            <label htmlFor="featured" className="ml-3 block text-sm font-medium text-gray-700">
              ⭐ Mark as featured testimonial
            </label>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6 border-t border-gray-100">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-6 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  {isUploadingImage ? 'Uploading...' : 'Adding...'}
                </>
              ) : (
                <>
                  <span>✨</span>
                  Add Testimonial
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTestimonialModal;