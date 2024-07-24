import React, { useState, useEffect, useRef } from 'react';
import pixelit from '../libs/pixelit';

function UploadModal({ onClose }) {
  const [files, setFiles] = useState([]);
  const [pixelCanvas, setPixelCanvas] = useState(null);
  const canvasRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
  };

  const handleUpload = () => {
    if (files.length > 0) {
      alert(`${files.length}개의 사진이 업로드되었습니다!`);
      setFiles([]);
    } else {
      alert('업로드할 파일이 없습니다.');
    }
    onClose();
  };

  useEffect(() => {
    if (files.length > 0) {
      const imgFile = files[0]; // 첫 번째 파일을 사용
      const canvas = canvasRef.current;
      if (!canvas) {
        console.error('Canvas element not found');
        return;
      }

      const px = new pixelit({
        to: canvas,
        scale: 8, // 원하는 픽셀화 정도 설정
      });

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result; // FileReader로 읽은 이미지 URL 설정
        img.onload = () => {
          // 이미지가 완전히 로드된 후에 픽셀화 처리
          px.setFromImgSource(img.src).draw().pixelate();
          setPixelCanvas(canvas.toDataURL()); // 캔버스의 데이터를 상태에 저장
        };
      };
      reader.readAsDataURL(imgFile);
    }
  }, [files]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-[400px]">
        <h2 className="text-lg font-bold mb-4">사진 업로드</h2>
        <div
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className="border-2 border-dashed border-gray-400 p-4 mb-4 text-center"
          style={{ minHeight: '100px' }}
        >
          <p>여기에 파일을 드래그 앤 드롭하세요!</p>
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileChange} 
            multiple 
          />
          <label className="cursor-pointer text-blue-500 underline">
            파일 선택하기
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              multiple 
              className="hidden" 
            />
          </label>
        </div>
        <div>
          {files.length > 0 && (
            <ul className="list-disc pl-5 mb-4">
              {files.map((file, index) => (
                <li key={index}>
                  {file.name}
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt={file.name} 
                    className="mt-2 w-20 h-20 object-cover" 
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
        {pixelCanvas && (
          <div className="mt-4">
            <h3 className="text-lg font-bold">픽셀 아트 변환 결과</h3>
            <img src={pixelCanvas} alt="픽셀 아트" className="mt-2" />
          </div>
        )}
        <canvas id="pixelitcanvas" ref={canvasRef} className="hidden"></canvas>
        <div className="flex justify-end">
          <button className="bg-blue-500 text-white p-2 rounded mr-2" onClick={handleUpload}>
            업로드
          </button>
          <button className="bg-gray-300 p-2 rounded" onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadModal;
