import React, { useState } from 'react';

const VerticalSlider = ( props ) => {
  const [value, setValue] = useState(50);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div style={{ height: '300px',margin : '0 auto',  textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={handleChange}
        style={{
          writingMode: 'bt-lr', // 슬라이더를 세로로 변경
          WebkitAppearance: 'slider-vertical', // 웹킷 브라우저에서 세로 슬라이더 지원
          width: '3px', // 슬라이더의 너비(굵기)
          height: '100%', // 슬라이더의 높이
        borderRadius : '50%',  
	background: 'transparent', // 기본 배경을 투명으로 설정
        }}
      />
      <p>{props.type}: {value}</p>
      <style jsx>{`
        input[type='range']::-webkit-slider-runnable-track {
          width: 100%;
          height: 100%;
          cursor: pointer;
          background: rgb(255,60,60); // 트랙 배경색을 빨간색으로 변경
        }
        input[type='range']::-webkit-slider-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: red; // 슬라이더 버튼 색상을 빨간색으로 변경
          cursor: pointer;
          margin-left: -8px; /* 슬라이더 버튼 위치 조정 */
        }
      input[type='range']:focus {
          outline: none;
        }
	  `}</style>
    </div>
  );
};

export default VerticalSlider;

