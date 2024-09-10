import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const RealTimeChart = ({ data, labels, updateInterval }) => {
  const [chartData, setChartData] = useState({
    labels: labels || [],
    datasets: [
      {
        label: 'Real-time Data',
        data: data || [],
        borderColor: 'rgba(75,192,192,1)',
        fill: false,
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setChartData((prevData) => {
        const newData = [...prevData.datasets[0].data, Math.random() * 100]; // 새로운 데이터 추가
        const newLabels = [...prevData.labels, new Date().toLocaleTimeString()]; // 새로운 라벨 추가

        // 데이터가 100개를 넘으면 오래된 데이터 삭제
        if (newData.length > 20) {
          newData.shift(); // 첫 번째 데이터 제거
          newLabels.shift(); // 첫 번째 라벨 제거
        }

        return {
          ...prevData,
          labels: newLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: newData,
            },
          ],
        };
      });
    }, updateInterval || 1000); // 기본 업데이트 간격은 1000ms

    return () => clearInterval(interval);
  }, [updateInterval]);

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default RealTimeChart;

