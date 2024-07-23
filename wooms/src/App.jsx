import { useState } from 'react';
import Modal from './Modal';
import Photo1 from './photos/Photo1';
import Photo2 from './photos/Photo2';
import Photo3 from './photos/Photo3';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePhoto, setActivePhoto] = useState(null);

  const openModal = (photo) => {
    setActivePhoto(photo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActivePhoto(null);
  };

  const renderPhotoContent = () => {
    switch (activePhoto) {
      case 'Photo1':
        return <Photo1 />;
      case 'Photo2':
        return <Photo2 />;
      case 'Photo3':
        return <Photo3 />;
      default:
        return null;
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button onClick={() => openModal('Photo1')} className="px-4 py-2 bg-blue-500 text-white rounded m-2">Photo 1</button>
      <button onClick={() => openModal('Photo2')} className="px-4 py-2 bg-blue-500 text-white rounded m-2">Photo 2</button>
      <button onClick={() => openModal('Photo3')} className="px-4 py-2 bg-blue-500 text-white rounded m-2">Photo 3</button>

      {isModalOpen && (
        <Modal closeModal={closeModal}>
          <div className="p-4 bg-white rounded shadow-lg">
            {renderPhotoContent()}
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;
