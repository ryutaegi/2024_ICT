import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

mapboxgl.accessToken = 'pk.eyJ1IjoidGFleW91IiwiYSI6ImNsZHY2ajVkejA4MGszdm5vaWpvdG41Nm0ifQ.05ZauoKkriS9v4sp6ozTAA';

const ThreeDObject = () => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

const MapWith3DObject = ({ latitude, longitude }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (mapContainerRef.current && !mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [longitude, latitude],
        zoom: 14,
        pitch: 45,
        bearing: 0,
      });

      mapRef.current.on('style.load', () => {
        const renderer = new THREE.WebGLRenderer({ alpha: true });
        renderer.setSize(mapContainerRef.current.clientWidth, mapContainerRef.current.clientHeight);
        renderer.setClearColor(0x000000, 0);
        mapContainerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(45, mapContainerRef.current.clientWidth / mapContainerRef.current.clientHeight, 0.1, 1000);
        camera.position.set(0, 0, 10);
        cameraRef.current = camera;

        const animate = () => {
          requestAnimationFrame(animate);
          if (rendererRef.current && sceneRef.current && cameraRef.current) {
            rendererRef.current.render(sceneRef.current, cameraRef.current);
          }
        };

        animate();

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        const altitude = 0;
        const mercator = mapboxgl.MercatorCoordinate.fromLngLat({ lng: longitude, lat: latitude }, altitude);
        cube.position.set(mercator.x, mercator.y, mercator.z);

        mapRef.current.on('move', () => {
          const center = mapRef.current.getCenter();
          const mercatorCenter = mapboxgl.MercatorCoordinate.fromLngLat(center);
          camera.position.set(mercatorCenter.x, mercatorCenter.y, camera.position.z);
          const pitch = mapRef.current.getPitch() * Math.PI / 180;
          const bearing = -mapRef.current.getBearing() * Math.PI / 180;
          camera.setRotationFromEuler(new THREE.Euler(pitch, bearing, 0, 'YXZ'));
        });
      });
    }
  }, [latitude, longitude]);

  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
  );
};

const Mapbox3DObject = ({ latitude, longitude }) => (
  <div style={{ position: 'relative' }}>
    <MapWith3DObject latitude={latitude} longitude={longitude} />
    <Canvas style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}>
      <ambientLight intensity={0.5} />
      <ThreeDObject />
    </Canvas>
  </div>
);

export default Mapbox3DObject;

