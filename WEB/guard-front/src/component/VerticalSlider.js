import React, { useState } from 'react';

const VerticalSlider = ({ type, setControlData, controlData }) => {
  const [value, setValue] = useState(50);

  const handleChange = (event) => {
    setValue(event.target.value);
    if(type == "L/R"){
          setControlData([controlData[0], parseInt(event.target.value), controlData[2], controlData[3], controlData[4]])
    }
    if(type == "F/B"){
          setControlData([parseInt(event.target.value), controlData[1], controlData[2], controlData[3], controlData[4]])
    }
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
          writingMode: 'bt-lr', // 슬라이더를 세로로 변경
          WebkitAppearance: 'slider-vertical', // 웹킷 브라우저에서 세로 슬라이더 지원
          width: '5px', // 슬라이더의 너비(굵기)
          height: '100%', // 슬라이더의 높이
        borderRadius : '50%',  
        background: 'transparent', // 기본 배경을 투명으로 설정
        }}
      />
      <p>{type}: {value}</p>
      <style jsx>{`
        input[type='range']::-webkit-slider-runnable-track {
          width: 100%;
          height: 100%;
          cursor: pointer;
          background: transparent;
        }
        input[type='range']::-webkit-slider-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ff44b4b; // 슬라이더 버튼 색상을 빨간색으로 변경
          cursor: pointer;
	  box-shadow : 0 2px 4px rgba(0,0,0,0.2);
          margin : 0 auto; /* 슬라이더 버튼 위치 조정 */
        }
      input[type='range']:focus {
          outline: none;
        }
          `}</style>
    </div>
  );
};

export default VerticalSlider;

