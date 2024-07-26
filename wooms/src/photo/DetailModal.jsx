import React from 'react';

function DetailModal({ src, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      {/* 모달창 */}
      <div className="bg-modal-bg bg-cover bg-center p-0 rounded-lg w-[700px] h-[447px] relative flex flex-col justify-center m-0 p-0">
        {/* 닫힘 버튼 */}
        <button className="absolute top-3 left-5 w-6 h-6 bg-close-bt bg-cover" onClick={onClose} />
        <div className="flex justify-center items-center h-full">
          <img src={src} alt="selected" className="max-w-full max-h-full object-contain" />
        </div>
      </div>
    </div>
  );
}

export default DetailModal;
