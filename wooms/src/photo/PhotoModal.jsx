import React, { useState } from 'react';
import ItemModal from './ItemModal';
import DetailModal from './DetailModal';
import UploadModal from './UploadModal';

const imageGroups = [
  {
    date: 1,
    images: ['assets/image1.jpg', 'assets/image2.jpg', 'assets/image3.jpg'],
  },
  {
    date: 2,
    images: ['assets/image4.jpg', 'assets/image5.jpg', 'assets/image6.jpg'],
  },
  {
    date: 3,
    images: ['assets/image7.jpg', 'assets/image8.jpg', 'assets/image9.jpg'],
  },
  {
    date: 4,
    images: ['assets/image10.jpg', 'assets/image11.jpg', 'assets/image12.jpg'],
  },
  {
    date: 5,
    images: ['assets/image13.jpg', 'assets/image14.jpg', 'assets/image15.jpg'],
  },
  {
    date: 6,
    images: ['assets/image16.jpg', 'assets/image17.jpg', 'assets/image18.jpg'],
  },
  {
    date: 7,
    images: ['assets/image19.jpg', 'assets/image20.jpg', 'assets/image21.jpg'],
  },
  {
    date: 8,
    images: ['assets/image22.jpg', 'assets/image23.jpg', 'assets/image24.jpg'],
  },
];

function PhotoModal({ onClose }) {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(imageGroups.length / itemsPerPage);

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setSelectedImage(null);
  };

  const handleBackToGroups = () => {
    setSelectedGroup(null);
  };

  const handleImageClick = (src) => {
    setSelectedImage(src);
  };

  const handleImageClose = () => {
    setSelectedImage(null);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
  };

  const handleUploadClick = () => {
    setIsUploadModalOpen(true);
  };

  const handleUploadClose = () => {
    setIsUploadModalOpen(false);
  };

  const currentGroups = imageGroups.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const emptyDivs = Array.from({ length: itemsPerPage - currentGroups.length }, (_, index) => (
    <div key={`empty-${index}`} className="w-32 h-32" />
  ));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center m-0 p-0">
      <div className="bg-white p-0 rounded-lg w-[700px] h-[500px] relative flex flex-col justify-center m-0 p-0">
        <button className="absolute top-2 left-2 text-xl" onClick={onClose}>
          &times;
        </button>
        <button className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded" onClick={handleUploadClick}>
          Upload
        </button>

        {selectedImage ? (
          <DetailModal src={selectedImage} onClose={handleImageClose} />
        ) : selectedGroup ? (
          <ItemModal
            group={selectedGroup}
            onBack={handleBackToGroups}
            onImageClick={handleImageClick}
          />
        ) : (
          <>
            <div className="flex justify-center mt-4">
              <div className="grid grid-cols-3 gap-4 max-w-[600px]">
                {currentGroups.map((group) => (
                  <div key={group.date} onClick={() => handleGroupClick(group)} className="cursor-pointer">
                    <img 
                      src={group.images[0]} 
                      alt={`Group ${group.date}`} 
                      className="w-32 h-32 object-cover"
                    />
                  </div>
                ))}
                {emptyDivs}
              </div>
            </div>
            <div>
              <div className="absolute left-0 right-0 flex justify-between items-center transform -translate-y-1/2 top-1/2">
                <button
                  className={`bg-blue-500 text-white p-2 rounded ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                >
                  Prev
                </button>
                <button
                  className={`bg-blue-500 text-white p-2 rounded ${currentPage >= totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={handleNextPage}
                  disabled={currentPage >= totalPages - 1}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {isUploadModalOpen && <UploadModal onClose={handleUploadClose} />} 
    </div>
  );
}

export default PhotoModal;
