import './Modal.css'; // CSS 파일을 import

function Modal({ closeModal, children }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-overlay">
        <div className="relative bg-white p-6 rounded shadow-lg w-11/12 max-w-lg mx-auto">
          <button onClick={closeModal} className="absolute top-4 right-4 text-gray-600 hover:text-gray-800">
            Close
          </button>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Modal;
