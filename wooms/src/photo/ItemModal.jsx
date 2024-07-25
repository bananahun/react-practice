import React, { useState } from 'react';

function ItemModal({ group, onBack, onImageClick }) {
  const itemsPerPage = 6; // 한 페이지당 표시할 이미지 수
  const totalPages = Math.ceil(group.images.length / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(0);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const currentImages = group.images.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  // 빈 div를 추가하여 항상 6개의 요소가 있도록 함
  const emptyDivs = Array.from({ length: itemsPerPage - currentImages.length }, (_, index) => (
    <div key={`empty-${index}`} className="w-32 h-32" />
  ));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center m-0 p-0">
      <div className="bg-white p-0 rounded-lg w-[700px] h-[500px] relative flex flex-col justify-center m-0 p-0">
        <button className="absolute top-2 left-2 text-xl" onClick={onBack}>
          &times;
        </button>
        <div className="flex justify-center mt-4">
          <div className="grid grid-cols-3 gap-4 max-w-[600px]">
            {currentImages.map((src, index) => (
              <div key={index} className="cursor-pointer">
                <img
                  src={src}
                  alt={`detail-${index}`}
                  className="w-32 h-32 object-cover"
                  onClick={() => onImageClick(src)}
                />
              </div>
            ))}
            {emptyDivs} {/* 빈 div 추가 */}
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
      </div>
    </div>
  );
}

export default ItemModal;
