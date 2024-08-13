
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import ThreeDModel from './ThreeDModel';


mapboxgl.accessToken = 'pk.eyJ1IjoidGFleW91IiwiYSI6ImNsZHY2ajVkejA4MGszdm5vaWpvdG41Nm0ifQ.05ZauoKkriS9v4sp6ozTAA';
const Mapbox3DObject = ({ latitude, longitude, altitude }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [modelPosition, setModelPosition] = useState([0, 0, 0]);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [longitude, latitude],
        zoom: 14,
        pitch: 60,
        bearing: -60,
      });

      mapRef.current.on('style.load', () => {
        const mercator = mapboxgl.MercatorCoordinate.fromLngLat(
          { lng: longitude, lat: latitude },
          altitude
        );

        setModelPosition([mercator.x, mercator.y, mercator.z]);
      });
    }
  }, [latitude, longitude, altitude]);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
      <Canvas
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        camera={{ position: [0, 0, 10] }}
      >
        <ambientLight intensity={0.5} />
        <OrbitControls />
        <ThreeDModel position={modelPosition} />
      </Canvas>
    </div>
  );
};

export default Mapbox3DObject;

