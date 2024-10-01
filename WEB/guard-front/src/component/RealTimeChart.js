import React, { useState, useEffect, useRef } 
from 'react'; import { Line } from 
'react-chartjs-2'; import 'chart.js/auto'; 
const RealTimeChart = ({ sensorData, 
updateInterval, line1, line2 }) => {
  const maxDataPoints = 20; // 유지할 최대 데이터 포인트 수 
	const [chartData, 
  setChartData] = useState({
    labels: [], datasets: [ { label: line1, 
        data: [], borderColor: 
        'rgba(75,192,192,1)', fill: false,
      },
      { label: line2, data: [], borderColor: 
        'rgba(192,75,75,1)', fill: false,
      },
    ],
  });
  const dataIndexRef = useRef(0); 
  useEffect(() => {
    if (!sensorData || 
    !Array.isArray(sensorData)) {
      console.error('Invalid sensorData'); 
      return;
    }
    const interval = setInterval(() => { 
      setChartData((prevData) => {
        const currentDataIndex = 
        dataIndexRef.current;
        // sensorData의 길이를 벗어나는 경우 
        // 더 이상 업데이트하지 않음
        if (currentDataIndex >= 
        sensorData.length) {
          return prevData;
        }
        const newSensorData = 
        sensorData[currentDataIndex]; 
        dataIndexRef.current += 1; // 데이터 인덱스 증가 
	      if (newSensorData) {
          const newLine1Data = 
          [...prevData.datasets[0].data, 
          newSensorData[0]]; const 
          newLine2Data = 
          [...prevData.datasets[1].data, 
          newSensorData[1]]; const newLabels 
          = [...prevData.labels, new 
          Date().toLocaleTimeString()];
          // 데이터가 최대 개수를 넘으면 
          // 오래된 데이터 삭제
          if (newLine1Data.length > 
          maxDataPoints) {
            newLine1Data.shift(); 
            newLine2Data.shift(); 
            newLabels.shift();
          }
          return { labels: newLabels, 
            datasets: [
              { ...prevData.datasets[0], 
                data: newLine1Data,
              },
              { ...prevData.datasets[1], 
                data: newLine2Data,
              },
            ],
          };
        }
        return prevData; // 새 데이터가  없으면 이전 상태 유지
      });
    }, updateInterval || 1000);
    return () => clearInterval(interval);
  }, [sensorData, updateInterval]); // sensorData가 변경될 때마다 useEffect 실행
  // sensorData가 없으면 렌더링하지 않음
  if (!sensorData || sensorData.length === 0) 
  {
    return null;
  }
  return ( <div style={{ display: 'flex', 
    justifyContent: 'center', alignItems: 
    'center', height: '30%' }}>
      <div style={{ width: '100%', height: 
      '100%' }}>
        <Line data={chartData} options={{ 
        maintainAspectRatio: false }} />
      </div> </div> );
};
export default RealTimeChart;
