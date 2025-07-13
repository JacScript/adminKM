import React from 'react';
import { FaChevronLeft, FaChevronRight, FaCheck } from 'react-icons/fa';

const PackageViewModalContent = ({ selectedPackage, currentImageIndex, setCurrentImageIndex }) => {
  if (!selectedPackage) {
    return <div className="text-center py-8 text-gray-500">No package selected for viewing.</div>;
  }

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex + 1) % selectedPackage.images.length
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      (prevIndex - 1 + selectedPackage.images.length) % selectedPackage.images.length
    );
  };

  return (
    <div className="space-y-6">
      {/* Image Carousel for View Modal */}
      {selectedPackage.images && selectedPackage.images.length > 0 && (
        <div className="relative h-64 sm:h-80 md:h-96 bg-gray-100 rounded-lg overflow-hidden mb-6">
          <img
            src={selectedPackage.images[currentImageIndex]}
            alt={selectedPackage.title}
            className="w-full h-full object-cover transition-opacity duration-300"
          />
          {selectedPackage.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors"
                title="Previous Image"
              >
                <FaChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75 transition-colors"
                title="Next Image"
              >
                <FaChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full">
            {currentImageIndex + 1} / {selectedPackage.images.length}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Details</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <p className="mt-1 text-sm text-gray-900">{selectedPackage.title}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Subtitle</label>
              <p className="mt-1 text-sm text-gray-900">{selectedPackage.subtitle}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <p className="mt-1 text-sm text-gray-900">{selectedPackage.duration}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <p className="mt-1 text-sm text-gray-900">€{selectedPackage.price} {selectedPackage.priceNote}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <p className="mt-1 text-sm text-gray-900">{selectedPackage.description}</p>
            </div>
            {selectedPackage.longDescription && (
               <div>
               <label className="block text-sm font-medium text-gray-700">Full Description</label>
               <p className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{selectedPackage.longDescription}</p>
             </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Inclusions</h3>
          <div className="space-y-2">
            {/* Corrected from selectedPackage.features to selectedPackage.includes */}
            {selectedPackage.features && selectedPackage.features.length > 0 ? (
                selectedPackage.features.map((inclusion, index) => (
                    <div key={index} className="flex items-start space-x-2">
                    <FaCheck className="w-4 h-4 text-green-500 mt-1" />
                    <span className="text-sm text-gray-900">{inclusion}</span>
                    </div>
                ))
            ) : (
                <p className="text-sm text-gray-500">No inclusions listed.</p>
            )}
          </div>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-4">Meta Data</h3>
          <div className="space-y-3">
             <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <span className={`mt-1 px-2 py-1 text-xs font-semibold rounded-full ${
                    selectedPackage.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : selectedPackage.status === 'draft'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                }`}>
                    Active
                    {/* {selectedPackage.status.charAt(0).toUpperCase() + selectedPackage.status.slice(1)} */}
                </span>
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Bookings</label>
                <p className="mt-1 text-sm text-gray-900">{selectedPackage.bookings}</p>
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Revenue</label>
                <p className="mt-1 text-sm text-gray-900">€{selectedPackage.revenue}</p>
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700">Last Updated</label>
                <p className="mt-1 text-sm text-gray-900">{selectedPackage.lastUpdated}</p>
             </div>
          </div>
        </div>
      </div>

      {selectedPackage.images && selectedPackage.images.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {selectedPackage.images.map((image, index) => (
              <div key={index} className="aspect-video rounded-lg overflow-hidden border border-gray-200">
                <img
                  src={image}
                  alt={`Package ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageViewModalContent;