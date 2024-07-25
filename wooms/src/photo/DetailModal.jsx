import React from 'react';

function DetailModal({ src, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-0 rounded-lg w-[700px] h-[500px] relative flex flex-col justify-center">
        <button className="absolute top-2 left-2 text-xl" onClick={onClose}>
          &times;
        </button>
        <div className="flex justify-center items-center h-full">
          <img src={src} alt="selected" className="max-w-full max-h-full object-contain" />
        </div>
      </div>
    </div>
  );
}

export default DetailModal;
