import React, { useState } from 'react';
import DetailView from './DetailView';
import ImageModal from './ImageModal';
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

function Modal({ onClose }) {
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false); // 상태 정의


  const itemsPerPage = 6; // 한 페이지당 표시할 이미지 그룹 수
  const totalPages = Math.ceil(imageGroups.length / itemsPerPage);

  const handleGroupClick = (group) => {
    setSelectedGroup(group);
    setSelectedImage(null);
  };

  const handleBackToGroups = () => {
    setSelectedGroup(null);
    setCurrentPage(0);
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
  }

  const handleUploadClose = () => {
    setIsUploadModalOpen(false);
  }

  // 현재 페이지에서 보여줄 이미지 그룹 가져오기
  const currentGroups = imageGroups.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  
  // 빈 div를 추가하여 항상 6개의 요소가 있도록 함
  const emptyDivs = Array.from({ length: itemsPerPage - currentGroups.length }, (_, index) => (
    <div key={`empty-${index}`} className="w-32 h-32" /> // 빈 div 설정
  ));

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center m-0 p-0">
      <div className="bg-white p-0 rounded-lg w-[800px] h-[600px] relative flex flex-col justify-center m-0 p-0">
        <button className="absolute top-2 left-2 text-xl" onClick={onClose}>
          &times;
        </button>
        <button className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded" onClick={handleUploadClick}>
          Upload
        </button>

        {selectedImage ? (
          <ImageModal src={selectedImage} onClose={handleImageClose} />
        ) : selectedGroup ? (
          <DetailView
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
                      className="w-32 h-32 object-cover" // 사진 크기 고정
                    />
                  </div>
                ))}
                {emptyDivs} {/* 빈 div 추가 */}
              </div>
            </div>
            <div>
              <div className="absolute left-0 right-0 flex justify-between items-center transform -translate-y-1/2 top-1/2">
                <button
                  className="bg-blue-500 text-white p-2 rounded"
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                >
                  Prev
                </button>
                <button
                  className="bg-blue-500 text-white p-2 rounded"
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
      {isUploadModalOpen && <UploadModal onClose={handleUploadClose} />} {/* 업로드 모달 렌더링 */}
    </div>
  );
}

export default Modal;