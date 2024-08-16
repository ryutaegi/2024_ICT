import 'maplibre-gl/dist/maplibre-gl.css';
import { createRoot } from 'react-dom/client';
import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import Map from 'react-map-gl/maplibre';
import { Canvas } from 'react-three-map/maplibre';
import { Box } from '@react-three/drei';

const Mapbox3DObject = ({ latitude, longitude }) => {

  // 위도와 경도를 3D 위치로 변환하는 함수
  const convertCoordinatesToPosition = (lat, lon) => {
    const scale = 1000; // 맵 크기에 따라 조정 가능한 스케일 값
    const x = (lon - longitude) * scale;
    const z = (lat - latitude) * scale;
    return [x, 1, z]; // y는 높이 값을 필요에 따라 조정
  };

  return (
    <Map
      antialias
      initialViewState={{
        latitude: latitude,
        longitude: longitude,
        zoom: 17,
        pitch: 60,
      }}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    >
      <Canvas latitude={latitude} longitude={longitude}>
        <hemisphereLight
          args={['#ffffff', '#60666C']}
          position={[1, 4.5, 3]}
        />
        <object3D scale={10}>
          <Box position={convertCoordinatesToPosition(latitude, longitude)}>
            <meshStandardMaterial attach="material" color="green" />
          </Box>
          <Box position={convertCoordinatesToPosition(latitude + 0.0001, longitude + 0.0002)}>
            <meshStandardMaterial attach="material" color="blue" />
          </Box>
        </object3D>
      </Canvas>
    </Map>
  );
};

export default Mapbox3DObject;

