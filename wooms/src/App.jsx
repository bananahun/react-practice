import React, { useState } from 'react';
import './index.css';
import PhotoModal from './components/groupSpace/photo/PhotoModal';
import GuestbookModal from './components/groupSpace/guestBook/GuestbookModal';

function App() {
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [isGuestbookModalOpen, setIsGuestbookModalOpen] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-4">
      {/* photo */}
      <button
        className="bg-blue-500 text-white p-4 rounded"
        onClick={() => setIsPhotoModalOpen(true)}
      >
        Photo
      </button>

      {isPhotoModalOpen && <PhotoModal onClose={() => setIsPhotoModalOpen(false)} />}

      {/* guestbook */}
      <button
        className="bg-blue-500 text-white p-4 rounded"
        onClick={() => setIsGuestbookModalOpen(true)}
      >
        Guestbook
      </button>

      {isGuestbookModalOpen && <GuestbookModal onClose={() => setIsGuestbookModalOpen(false)} />}
    </div>
  );
}

export default App;
