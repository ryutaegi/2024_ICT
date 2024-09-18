import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const RealTimeChart = ({ sensorData, updateInterval, line1, line2 }) => {
  const [chartData, setChartData] = useState({
    labels: [], // 시간 레이블
    datasets: [
      {
        label: line1,
        data: [], // 첫 번째 데이터 라인
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
      {
        label: line2,
        data: [], // 두 번째 데이터 라인
        borderColor: 'rgba(192,75,75,1)',
        fill: false,
      },
    ],
  });

  useEffect(() => {
    if (!sensorData || !Array.isArray(sensorData)) {
      console.error('Invalid sensorData');
      return;
    }

    let lastUpdateTime = new Date(); // 마지막 업데이트 시간을 저장

    const interval = setInterval(() => {
      setChartData((prevData) => {
        // 새로운 데이터가 있는지 확인
        const currentDataIndex = prevData.datasets[0].data.length;
        const newSensorData = sensorData[currentDataIndex];

        if (newSensorData) {
          // 새 데이터가 있을 때
          const newLine1Data = [...prevData.datasets[0].data, newSensorData[0]];
          const newLine2Data = [...prevData.datasets[1].data, newSensorData[1]];

          // 새로운 레이블(현재 시간 추가)
          const newLabels = [...prevData.labels, new Date().toLocaleTimeString()];
          lastUpdateTime = new Date(); // 마지막 업데이트 시간 갱신

          // 데이터가 20개를 넘으면 오래된 데이터 삭제
          if (newLine1Data.length > 20) {
            newLine1Data.shift();
            newLine2Data.shift();
            newLabels.shift();
          }

          return {
            labels: newLabels,
            datasets: [
              {
                ...prevData.datasets[0],
                data: newLine1Data,
              },
              {
                ...prevData.datasets[1],
                data: newLine2Data,
              },
            ],
          };
        } else {
          // 새 데이터가 없으면 이전 데이터를 그대로 유지
          return prevData;
        }
      });
    }, updateInterval || 1000); // 기본 업데이트 간격은 1000ms

    return () => clearInterval(interval);
  }, [sensorData, updateInterval]);

  // sensorData가 없으면 렌더링하지 않음
  if (!sensorData || sensorData.length === 0) {
    return null;
  }

  return (
    <div style={{display : 'flex', justifyContent : 'center', alignItems : 'center', height : '30%'}}>
      <div style={{width : '100%', height : '100%'}}>
	  <Line data={chartData} options={{ maintainAspectRatio: false }}/>
	</div>
    </div>
  );
};

export default RealTimeChart;

