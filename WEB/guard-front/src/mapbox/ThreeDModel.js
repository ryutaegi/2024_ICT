import React from 'react';
import { useGLTF } from '@react-three/drei';

const ThreeDModel = ({ position }) => {
  const { scene } = useGLTF('https://threejs.org/examples/models/gltf/DamagedHelmet/glTF/DamagedHelmet.gltf');

  return <primitive object={scene} position={position} scale={[10, 10, 10]} />;
};

export default ThreeDModel;

