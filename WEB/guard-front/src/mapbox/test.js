import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import Map, { useMap } from 'react-map-gl';
import mapboxgl from 'mapbox-gl';
import * as THREE from 'three';

mapboxgl.accessToken = 'pk.eyJ1IjoidGFleW91IiwiYSI6ImNsZHY2ajVkejA4MGszdm5vaWpvdG41Nm0ifQ.05ZauoKkriS9v4sp6ozTAA';

const Box = ({ position }) => {
  const mesh = useRef();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.x += 0.01;
      mesh.current.rotation.y += 0.01;
      mesh.current.position.set(position[0], position[1], position[2]);
    }
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={'orange'} />
    </mesh>
  );
};

const ThreeOverlay = ({ map, position }) => {
  const { scene, camera, gl } = useThree();

  useEffect(() => {
    if (!map) return;

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 0, 10).normalize();
    scene.add(light);

    const render = () => {
      const { lng, lat } = map.getCenter();
      const mercator = mapboxgl.MercatorCoordinate.fromLngLat({ lng, lat }, 0);

      camera.position.set(mercator.x, mercator.y, 2);
      camera.lookAt(mercator.x, mercator.y, 0);

      gl.autoClear = false;
      gl.clearDepth();
      gl.render(scene, camera);

      map.triggerRepaint();
    };

    map.on('render', render);
    render();

    return () => {
      map.off('render', render);
    };
  }, [map, scene, camera, gl]);

  return null;
};

const Mapbox3DObject = () => {
  const mapRef = useRef();
  const [position, setPosition] = useState([0, 0, 0]);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.getMap();

      const updatePosition = () => {
        const { lng, lat } = map.getCenter();
        const mercator = mapboxgl.MercatorCoordinate.fromLngLat({ lng, lat }, 0);
        setPosition([mercator.x, mercator.y, mercator.z || 0]);
      };

      map.on('move', updatePosition);
      updatePosition();

      return () => {
        map.off('move', updatePosition);
      };
    }
  }, []);

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: -74.006,
          latitude: 40.7128,
          zoom: 15,
        }}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={mapboxgl.accessToken}
      />
      {mapRef.current && (
        <Canvas
          style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }}
          camera={{ position: [0, 0, 2], fov: 75 }}
        >
          <ThreeOverlay map={mapRef.current.getMap()} position={position} />
          <Box position={position} />
        </Canvas>
      )}
    </div>
  );
};

export default Mapbox3DObject;

