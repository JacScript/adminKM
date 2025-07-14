import React from 'react';
import { FaEye, FaEdit, FaCopy, FaTrash } from 'react-icons/fa';

const PackageListView = ({ filteredPackages, openModal, copyPackage, handleDelete }) => {
  if (!filteredPackages || filteredPackages.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500 text-lg">
        No packages found matching your criteria.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Package</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPackages.map((pkg) => (
              <tr key={pkg.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img src={pkg.images[0]} alt={pkg.title} className="w-12 h-12 rounded-lg object-cover mr-4" />
                    <div>
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate">{pkg.title}</div>
                      <div className="text-sm text-gray-500 max-w-xs truncate">{pkg.subtitle}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  €{pkg.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                 {pkg.updatedAt ? new Date(pkg.updatedAt).toLocaleDateString() : 'No date'}{/* Using lastUpdated from your state */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openModal('view', pkg)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                      title="View"
                    >
                      <FaEye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openModal('edit', pkg)}
                      className="text-yellow-600 hover:text-yellow-800 transition-colors"
                      title="Edit"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    {/* <button
                      onClick={() => copyPackage(pkg)}
                      className="text-green-600 hover:text-green-800 transition-colors"
                      title="Copy"
                    >
                      <FaCopy className="w-4 h-4" />
                    </button> */}
                    <button
                      onClick={() => handleDelete(pkg)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                      title="Delete"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PackageListView;