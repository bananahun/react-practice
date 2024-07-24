import React, { useState } from 'react';
import Modal from './components/Modal';
import './index.css';

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

      {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}

export default App;
