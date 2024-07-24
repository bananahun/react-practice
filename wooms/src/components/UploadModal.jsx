import React, { useState } from 'react';

function UploadModal({ onClose }) {
  const [files, setFiles] = useState([]);

  const handleDragOver = (e) => {
    e.preventDefault(); // 기본 동작 방지
    e.dataTransfer.dropEffect = 'copy'; // 드래그 효과 설정
  };

  const handleDrop = (e) => {
    e.preventDefault(); // 기본 동작 방지
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]); // 드롭된 파일 추가
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // 선택된 파일 추가
  };

  const handleUpload = () => {
    if (files.length > 0) {
      alert(`${files.length}개의 사진이 업로드되었습니다!`); // 예시
      setFiles([]); // 업로드 후 파일 리스트 초기화
    } else {
      alert('업로드할 파일이 없습니다.');
    }
    onClose(); // 모달 닫기
  };

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
