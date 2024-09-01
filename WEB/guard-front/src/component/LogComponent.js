import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const LogContainer = styled.div`
  width: 100%;
  height: 90%; 
  overflow-y: auto;
  background-color: #f0f0f0;  /* 밝은 배경색 */
  border-radius: 8px;
  padding: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LogTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-family: 'Arial', sans-serif;
`;

const LogRow = styled.tr`
  &:nth-child(even) {
    background-color: #eaeaea;  /* 줄무늬 배경 */
  }
`;

const LogCell = styled.td`
  padding: 10px;  /* 패딩 추가 */
  text-align: left;
  font-size: 14px;
  color: #333;  /* 텍스트 색상 */
  border-bottom: 1px solid #ccc;
`;

const TimestampCell = styled(LogCell)`
  width: 20%;
  font-weight: bold;
  color: #ff6f61;  /* 시간을 강조하는 색상 */
`;

const LogHeaderCell = styled.th`
  padding: 10px;
  text-align: left;
  font-size: 16px;
  color: #222;
  background-color: #ddd;
  font-weight: bold;
`;

const formatData = (data) => {
  return data.map((item) => {
    if (typeof item === 'number') {
      return item.toFixed(2); // 소수점 두 자리 제한
    }
    return item;
  });
};

const splitData = (data) => {
  const formattedData = formatData(data); 
  const firstPart = formattedData.slice(0, 8).join(', ');
  const secondPart = formattedData.slice(8).join(', ');
  return `${firstPart}\n${secondPart}`;
};

const trimEdges = (str) => {
    if (str.length > 2) {
      return str.substring(1, str.length - 1);
    }
    return str;
  };
  
const LogComponent = ({ sensorData }) => {
  const logEndRef = useRef(null);

  useEffect(() => {
    // 항상 최신 로그로 스크롤
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sensorData]);

  return (
    <LogContainer>
      <LogTable>
        <tbody>
          {sensorData.map((con, idx) => (
            <LogRow key={idx}>
              <TimestampCell>{new Date().toLocaleTimeString('en-GB', { hour12: false })}</TimestampCell>
              <LogCell>
                {splitData(trimEdges(JSON.stringify(con)).split(',').map(item => parseFloat(item) || item))}
              </LogCell>
            </LogRow>
          ))}
          <tr ref={logEndRef} />
        </tbody>
      </LogTable>
    </LogContainer>
  );
};

export default LogComponent;

