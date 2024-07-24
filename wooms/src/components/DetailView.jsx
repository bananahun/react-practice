import React from 'react';

function DetailView({ group, onBack, onImageClick }) {
  return (
    <div className="relative flex flex-col items-center">
      <button className="absolute top-2 left-2 text-xl" onClick={onBack}>
        &times;
      </button>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {group.images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`detail-${index}`}
            className="w-24 h-24 object-cover cursor-pointer"
            onClick={() => onImageClick(src)}
          />
        ))}
      </div>
    </div>
  );
}

export default DetailView;