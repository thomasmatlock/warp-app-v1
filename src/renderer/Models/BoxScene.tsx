import React, { useRef } from 'react';
// import { Canvas, useFrame } from 'react-three-fiber';
import { Canvas, useFrame, extend } from '@react-three/fiber';

import {
  Center,
  OrbitControls,
  Loader,
  useGLTF,
  Plane,
  Box,
} from '@react-three/drei'; // import './styles.css';

const Scene = () => {
  const boxRef = useRef();
  useFrame(() => {
    boxRef.current.rotation.y += 0.004;
    boxRef.current.rotation.x += 0.004;
    boxRef.current.rotation.z += 0.004;
  });
  // Set receiveShadow on any mesh that should be in shadow,
  // and castShadow on any mesh that should create a shadow.
  return (
    <group>
      <Box castShadow receiveShadow ref={boxRef} position={[0, 0.5, 0]}>
        <meshStandardMaterial attach="material" color="white" />
      </Box>
      <Plane
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1, 0]}
        args={[1000, 1000]}
      >
        <meshStandardMaterial attach="material" color="white" />
      </Plane>
    </group>
  );
};

export default function Test() {
  return (
    <Canvas
      shadows
      orthographic
      camera={{ position: [-3, 5, 5], fov: 90, zoom: 50 }}
    >
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.5}
        autoRotate
        autoRotateSpeed={-1}
        enablePan={false}
        enableZoom
        target={[0, 0, 0]}
      />
      <fog attach="fog" args={['white', 0, 40]} />
      <ambientLight intensity={0.1} />
      <directionalLight
        intensity={1}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-near={0.1}
      />

      <Scene />
    </Canvas>
  );
}
