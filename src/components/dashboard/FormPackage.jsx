// import React from "react";

// const FormPackage = ({handleSave,formData,closeModal}) => {
//   return (
//     <form onSubmit={handleSave} className="space-y-6">
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <div className="space-y-4">
//           <div>
//             <label
//               htmlFor="title"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Title *
//             </label>
//             <input
//               type="text"
//               id="title"
//               value={formData.title}
//               onChange={(e) => handleInputChange("title", e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="subtitle"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Subtitle *
//             </label>
//             <input
//               type="text"
//               id="subtitle"
//               value={formData.subtitle}
//               onChange={(e) => handleInputChange("subtitle", e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               required
//             />
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label
//                 htmlFor="duration"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Duration *
//               </label>
//               <input
//                 type="text"
//                 id="duration"
//                 value={formData.duration}
//                 onChange={(e) => handleInputChange("duration", e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="e.g., 3 days"
//                 required
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="price"
//                 className="block text-sm font-medium text-gray-700 mb-2"
//               >
//                 Price *
//               </label>
//               <input
//                 type="number"
//                 id="price"
//                 value={formData.price}
//                 onChange={(e) => handleInputChange("price", e.target.value)}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 placeholder="0"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="priceNote"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Price Note
//             </label>
//             <input
//               type="text"
//               id="priceNote"
//               value={formData.priceNote}
//               onChange={(e) => handleInputChange("priceNote", e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="e.g., per person"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="description"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Short Description *
//             </label>
//             <textarea
//               id="description"
//               value={formData.description}
//               onChange={(e) => handleInputChange("description", e.target.value)}
//               rows="3"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="A brief summary of the package..."
//               required
//             ></textarea>
//           </div>

//           <div>
//             <label
//               htmlFor="longDescription"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Long Description
//             </label>
//             <textarea
//               id="longDescription"
//               value={formData.longDescription}
//               onChange={(e) =>
//                 handleInputChange("longDescription", e.target.value)
//               }
//               rows="5"
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               placeholder="Detailed description of the package, itinerary, etc."
//             ></textarea>
//           </div>
//         </div>

//         <div className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Includes
//             </label>
//             {formData.features.map((item, index) => (
//               <div key={index} className="flex items-center gap-2 mb-2">
//                 <input
//                   type="text"
//                   value={item}
//                   onChange={(e) =>
//                     handleArrayChange("includes", index, e.target.value)
//                   }
//                   className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="e.g., Flight tickets"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeArrayItem("includes", index)}
//                   className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
//                   title="Remove item"
//                 >
//                   <FaTrash className="w-4 h-4" />
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => addArrayItem("includes")}
//               className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
//             >
//               <FaPlus className="w-3 h-3" /> Add Inclusion
//             </button>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Image URLs
//             </label>
//             {formData.images.map((item, index) => (
//               <div key={index} className="flex items-center gap-2 mb-2">
//                 <input
//                   type="url"
//                   value={item}
//                   onChange={(e) =>
//                     handleArrayChange("images", index, e.target.value)
//                   }
//                   className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="https://example.com/image.jpg"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => removeArrayItem("images", index)}
//                   className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
//                   title="Remove image"
//                 >
//                   <FaTrash className="w-4 h-4" />
//                 </button>
//               </div>
//             ))}
//             <button
//               type="button"
//               onClick={() => addArrayItem("images")}
//               className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
//             >
//               <FaPlus className="w-3 h-3" /> Add Image URL
//             </button>
//           </div>

//           <div>
//             <label
//               htmlFor="color"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Card Color
//             </label>
//             <select
//               id="color"
//               value={formData.color}
//               onChange={(e) => handleInputChange("color", e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               {colorOptions.map((option) => (
//                 <option key={option.value} value={option.value}>
//                   {option.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label
//               htmlFor="status"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Status
//             </label>
//             <select
//               id="status"
//               value={formData.status}
//               onChange={(e) => handleInputChange("status", e.target.value)}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="active">Active</option>
//               <option value="draft">Draft</option>
//               <option value="archived">Archived</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-6">
//         <button
//           type="button"
//           onClick={closeModal}
//           className="px-5 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
//         >
//           <FaTimes className="w-4 h-4" /> Cancel
//         </button>
//         <button
//           type="submit"
//           className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
//         >
//           <FaSave className="w-4 h-4" /> Save Package
//         </button>
//       </div>
//     </form>
//   );
// };

// export default FormPackage;


import React from 'react';
import { FaPlus, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const PackageForm = ({ formData, handleInputChange, handleArrayChange, addArrayItem, removeArrayItem, handleSave, closeModal, modalType }) => {
  const colorOptions = [
    { name: 'Red to Orange', value: 'from-red-500 to-orange-500' },
    { name: 'Blue to Purple', value: 'from-blue-500 to-purple-500' },
    { name: 'Green to Emerald', value: 'from-green-500 to-emerald-500' },
    { name: 'Yellow to Cyan', value: 'from-yellow-500 to-cyan-500' },
    { name: 'Pink to Rose', value: 'from-pink-500 to-rose-500' },
    { name: 'Indigo to Blue', value: 'from-indigo-500 to-blue-500' }
  ];

  return (
    <form onSubmit={handleSave} className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title *
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="subtitle" className="block text-sm font-medium text-gray-700 mb-2">
              Subtitle *
            </label>
            <input
              type="text"
              id="subtitle"
              value={formData.subtitle}
              onChange={(e) => handleInputChange('subtitle', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-2">
                Duration *
              </label>
              <input
                type="text"
                id="duration"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., 3 days"
                required
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price *
              </label>
              <input
                type="number"
                id="price"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="priceNote" className="block text-sm font-medium text-gray-700 mb-2">
              Price Note
            </label>
            <input
              type="text"
              id="priceNote"
              value={formData.priceNote}
              onChange={(e) => handleInputChange('priceNote', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., per person"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Short Description *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="A brief summary of the package..."
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="longDescription" className="block text-sm font-medium text-gray-700 mb-2">
              Long Description
            </label>
            <textarea
              id="longDescription"
              value={formData.longDescription}
              onChange={(e) => handleInputChange('longDescription', e.target.value)}
              rows="5"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Detailed description of the package, itinerary, etc."
            ></textarea>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Includes
            </label>
            {formData.includes.map((item, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange('includes', index, e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g., Flight tickets"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('includes', index)}
                  className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
                  title="Remove item"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('includes')}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <FaPlus className="w-3 h-3" /> Add Inclusion
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Image URLs
            </label>
            {formData.images.map((item, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="url"
                  value={item}
                  onChange={(e) => handleArrayChange('images', index, e.target.value)}
                  className="flex-grow px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
                <button
                  type="button"
                  onClick={() => removeArrayItem('images', index)}
                  className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 transition-colors"
                  title="Remove image"
                >
                  <FaTrash className="w-4 h-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => addArrayItem('images')}
              className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <FaPlus className="w-3 h-3" /> Add Image URL
            </button>
          </div>

          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
              Card Color
            </label>
            <select
              id="color"
              value={formData.color}
              onChange={(e) => handleInputChange('color', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {colorOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => handleInputChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 mt-6">
        <button
          type="button"
          onClick={closeModal}
          className="px-5 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
        >
          <FaTimes className="w-4 h-4" /> Cancel
        </button>
        <button
          type="submit"
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2"
        >
          <FaSave className="w-4 h-4" /> Save Package
        </button>
      </div>
    </form>
  );
};

export default PackageForm;