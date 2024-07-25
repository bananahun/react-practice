import React, { useState } from 'react';
import './index.css';
import PhotoModal from './photo/PhotoModal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="bg-blue-500 text-white p-4 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Photo
      </button>

      {isModalOpen && <PhotoModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default App;
