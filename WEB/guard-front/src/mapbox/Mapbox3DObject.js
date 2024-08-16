import "maplibre-gl/dist/maplibre-gl.css"
import { createRoot } from 'react-dom/client'
import React, { useRef, useState } from 'react'
import { useFrame } from "@react-three/fiber"
import Map from "react-map-gl/maplibre"
import { Canvas } from "react-three-map/maplibre" 
// import { Canvas } from "react-three-map" // if you are using MapBox
import { Box } from '@react-three/drei';

const Mapbox3DObject = () => {
  return <Map
    antialias
    initialViewState={{
      latitude: 37.57796,
      longitude: 126.97658,
      zoom: 13,
      pitch: 60
    }}
    mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
  >
    <Canvas latitude={37.57796} longitude={126.97658}>
      <hemisphereLight
        args={["#ffffff", "#60666C"]}
        position={[1, 4.5, 3]}
      />
      <object3D scale={500}>
        <Box position={[-1.2, 1, 0]} />
        <Box position={[1.2, 1, 0]} />
      </object3D>
    </Canvas>
  </Map>
}
export default Mapbox3DObject;
