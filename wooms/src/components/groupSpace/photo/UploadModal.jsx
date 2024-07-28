import React, { useState, useEffect, useRef } from 'react';
import pixelit from '../../../libs/pixelit';

function UploadModal({ onClose }) {
  const [files, setFiles] = useState([]);
  const [pixelCanvas, setPixelCanvas] = useState(null);
  const [pixelScale, setPixelScale] = useState(10);
  const [loading, setLoading] = useState(false);
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

  const handleTransform = () => {
    if (files.length > 0) {
      setLoading(true);
      const imgFile = files[0]; // 첫 번째 파일을 사용
      const canvas = canvasRef.current;
      if (!canvas) {
        console.error('Canvas element not found');
        setLoading(false);
        return;
      }

      const px = new pixelit({
        to: canvas,
        scale: pixelScale, // 픽셀화 정도를 상태값으로 설정
        palette: [ // 사용자 정의 팔레트 설정 (RGB 값)
          [46, 34, 47],    // FF2e222f
          [62, 53, 70],    // FF3e3546
          [98, 85, 101],   // FF625565
          [150, 108, 108], // FF966c6c
          [171, 148, 122], // FFab947a
          [105, 79, 98],   // FF694f62
          [127, 112, 138], // FF7f708a
          [155, 171, 178], // FF9babb2
          [199, 220, 208], // FFc7dcd0
          [255, 255, 255], // FFffffff
          [110, 39, 39],   // FF6e2727
          [179, 56, 49],   // FFb33831
          [234, 79, 54],   // FFea4f36
          [245, 125, 74],  // FFf57d4a
          [174, 35, 52],   // FFae2334
          [232, 59, 59],   // FFe83b3b
          [251, 107, 29],  // FFfb6b1d
          [247, 150, 23],  // FFf79617
          [249, 194, 43],  // FFf9c22b
          [122, 48, 69],   // FF7a3045
          [158, 69, 57],   // FF9e4539
          [205, 104, 61],  // FFcd683d
          [230, 144, 78],  // FFe6904e
          [251, 185, 84],  // FFfbb954
          [76, 62, 36],    // FF4c3e24
          [103, 102, 51],  // FF676633
          [162, 169, 71],  // FFa2a947
          [213, 224, 75],  // FFd5e04b
          [251, 255, 134], // FFfbff86
          [22, 90, 76],    // FF165a4c
          [35, 144, 99],   // FF239063
          [30, 188, 115],  // FF1ebc73
          [145, 219, 105], // FF91db69
          [205, 223, 108], // FFcddf6c
          [49, 54, 56],    // FF313638
          [55, 78, 74],    // FF374e4a
          [84, 126, 100],  // FF547e64
          [146, 169, 132], // FF92a984
          [178, 186, 144], // FFb2ba90
          [11, 94, 101],   // FF0b5e65
          [11, 138, 143],  // FF0b8a8f
          [14, 175, 155],  // FF0eaf9b
          [48, 225, 185],  // FF30e1b9
          [143, 248, 226], // FF8ff8e2
          [50, 51, 83],    // FF323353
          [72, 74, 119],   // FF484a77
          [77, 101, 180],  // FF4d65b4
          [77, 155, 230],  // FF4d9be6
          [143, 211, 255], // FF8fd3ff
          [69, 41, 63],    // FF45293f
          [107, 62, 117],  // FF6b3e75
          [144, 94, 169],  // FF905ea9
          [168, 132, 243], // FFa884f3
          [234, 173, 237], // FFeaaded
          [117, 60, 84],   // FF753c54
          [162, 75, 111],  // FFa24b6f
          [207, 101, 127], // FFcf657f
          [237, 128, 153], // FFed8099
          [131, 28, 93],   // FF831c5d
          [195, 36, 84],   // FFc32454
          [240, 79, 120],  // FFf04f78
          [246, 129, 129], // FFf68181
          [252, 167, 144], // FFfca790
          [253, 203, 176]  // FFfdcbb0
        ]
      });

      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result; // FileReader로 읽은 이미지 URL 설정
        img.onload = () => {
          // 이미지가 완전히 로드된 후에 픽셀화 처리
          px.setFromImgSource(img.src).draw().pixelate().convertPalette();
          setPixelCanvas(canvas.toDataURL()); // 캔버스의 데이터를 상태에 저장
          setLoading(false);
        };
      };
      reader.readAsDataURL(imgFile);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center m-0 p-0">
      {/* 모달창 */}
      <div className="bg-modal-bg bg-cover bg-center p-0 rounded-lg w-[700px] h-[447px] relative flex flex-col justify-center m-0 p-0">
        {/* 닫힘 버튼 */}
        <button className="absolute top-3 left-5 w-6 h-6 bg-close-bt bg-cover" onClick={onClose} />
        {!pixelCanvas && !loading ? (
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="w-[300px] h-[200px] border-2 border-dashed p-4 mb-4 text-center mx-auto"
            style={{ borderColor: '#aa7959' }}
          >
            <p style={{ color: '#aa7959' }}>여기에 파일을 드래그 앤 드롭하세요!</p>
            <label className="cursor-pointer">
              <img 
                src="assets/FileBt.png" // 여기에 이미지 경로를 입력하세요
                alt="파일 선택 아이콘"
                className="w-20 h-20 mx-auto" // 이미지 크기를 조정합니다
              />
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                multiple 
                className="hidden" 
              />
            </label>
          </div>
        ) : (
          <div className="flex justify-center space-x-4 mb-4">
            <div className="flex flex-col items-center">
              <img 
                src={URL.createObjectURL(files[0])} 
                alt={files[0].name} 
                className="w-40 h-40 object-cover" 
              />
              <span className="mt-2">{files[0].name}</span>
            </div>
            <div className="flex flex-col items-center">
              {loading ? (
                <p>로딩중...</p>
              ) : (
                <>
                  <img 
                    src={pixelCanvas} 
                    alt="픽셀 아트" 
                    className="w-40 h-40 object-cover" 
                  />
                  <span className="mt-2">픽셀 아트</span>
                </>
              )}
            </div>
          </div>
        )}
        <canvas id="pixelitcanvas" ref={canvasRef} className="hidden"></canvas>
        <div className="flex flex-col items-center mb-4">
          <label htmlFor="pixel-range" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            픽셀화 정도: {pixelScale}
          </label>
          <input 
            id="pixel-range" 
            type="range" 
            min="2" 
            max="25" 
            value={pixelScale} 
            onChange={(e) => setPixelScale(parseInt(e.target.value))} 
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
          />
        </div>
        <div className="flex justify-end">
          {files.length > 0 && (
            <button className="bg-green-500 text-white p-2 rounded mr-2" onClick={handleTransform}>
              변환하기
            </button>
          )}
          {pixelCanvas && (
            <button className="bg-blue-500 text-white p-2 rounded mr-2" onClick={handleUpload}>
              업로드
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default UploadModal;
