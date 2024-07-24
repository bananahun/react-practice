import React from 'react';

function ImageModal({ src, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg relative">
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}>
          &times;
        </button>
        <img src={src} alt="selected" className="w-full h-auto object-cover" />
      </div>
    </div>
  );
}

export default ImageModal;