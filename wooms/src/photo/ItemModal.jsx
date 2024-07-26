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
      {/* 모달창 */}
      <div className="bg-modal-bg bg-cover bg-center p-0 rounded-lg w-[700px] h-[447px] relative flex flex-col justify-center m-0 p-0">
        {/* 닫힘 버튼 */}
        <button className="absolute top-3 left-5 w-6 h-6 bg-close-bt bg-cover" onClick={onBack} />
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
          {/* 이전페이지 이동 버튼 */}
          {/* 다음페이지 이동 버튼 */}
          <div className="absolute left-2 right-2 flex justify-between items-center transform -translate-y-1/2 top-1/2">
            <button
              className={`w-8 h-8 bg-left-bt bg-cover ${currentPage === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handlePrevPage}
              disabled={currentPage === 0}
            />
            <button
              className={`w-8 h-8 bg-right-bt bg-cover ${currentPage >= totalPages - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={handleNextPage}
              disabled={currentPage >= totalPages - 1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;