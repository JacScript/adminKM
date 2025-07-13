import React from 'react';
import { FaClock, FaUsers, FaChevronUp, FaChevronDown, FaCheck, FaCopy, FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const PackageGridCard = ({
  pkg,
  expandedCards,
  toggleExpanded,
  copiedId,
  copyPackage,
  openModal,
  handleDelete,
}) => {
  return (
    <div key={pkg.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={pkg.images[0]}
          alt={pkg.title}
          className="w-full h-48 object-cover"
        />
        <div className={`absolute top-4 right-4 bg-gradient-to-r ${pkg.color} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
          €{pkg.price}
        </div>
        <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
          pkg.status === 'active'
            ? 'bg-green-100 text-green-800'
            : pkg.status === 'draft'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
            active
          {/* {pkg.status.charAt(0).toUpperCase() + pkg.status.slice(1)} */}
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">{pkg.title}</h3>
          <p className="text-sm text-gray-600 line-clamp-2">{pkg.subtitle}</p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <FaClock className="w-4 h-4" />
            <span>{pkg.duration || "" }</span>
          </div>
          {/* Uncomment if you want to show bookings */}
          {/* <div className="flex items-center gap-1">
            <FaUsers className="w-4 h-4" />
            <span>{pkg.bookings} bookings</span>
          </div> */}
        </div>

        {/* Uncomment if you want to show revenue and last updated in the grid card */}
        {/* <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <span className="text-gray-500">Revenue:</span>
            <div className="font-semibold text-green-600">€{pkg.revenue}</div>
          </div>
          <div>
            <span className="text-gray-500">Updated:</span>
            <div className="font-semibold">{pkg.lastUpdated}</div>
          </div>
        </div> */}

        {expandedCards[pkg.id] && (
          <div className="mb-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-700 mb-2">{pkg.description}</p>
            <div className="text-xs text-gray-600">
              <strong>Includes:</strong> {pkg.features.slice(0, 2).join(', ')}
              {pkg.features.length > 2 && '...'}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <button
            onClick={() => toggleExpanded(pkg._id)}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            {expandedCards[pkg.id] ? (
              <>Less <FaChevronUp className="w-3 h-3" /></>
            ) : (
              <>More <FaChevronDown className="w-3 h-3" /></>
            )}
          </button>
          <div className="flex items-center gap-2">
            {/* <button
              onClick={() => copyPackage(pkg)}
              className={`p-2 rounded-lg transition-all duration-300 ${
                copiedId === pkg.id
                  ? 'bg-green-100 text-green-600'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Copy Package"
            >
              {copiedId === pkg._id ? <FaCheck className="w-4 h-4" /> : <FaCopy className="w-4 h-4" />}
            </button> */}
            <button
              onClick={() => openModal('view', pkg)}
              className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
              title="View Package"
            >
              <FaEye className="w-4 h-4" />
            </button>
            <button
              onClick={() => openModal('edit', pkg)}
              className="p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition-colors"
              title="Edit Package"
            >
              <FaEdit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(pkg.id)}
              className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
              title="Delete Package"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageGridCard;