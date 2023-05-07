import { Center, OrbitControls, Loader, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

import { Canvas, extend } from '@react-three/fiber';
// extend Canvas
extend({ Canvas });
const Model = () => {
  const { scene } = useGLTF('./video.glb');
  return <primitive object={scene} />;
};

export default function Scene(props: any) {
  return (
    // <Suspense fallback={<Preloader />}>
    <Suspense fallback="loading">
      <Canvas
        // flat
        dpr={[1, 2]}
        gl={{
          powerPreference: 'high-performance',
          antialias: true,
          // logarithmicDepthBuffer: true,
        }}
        orthographic
        camera={{
          near: -1500,
          // zoom: isMobile ? 4500 : 8000, // for orthographic camera
          // zoom: isMobile ? 170 : 300, // dinocrisis
          // zoom: isMobile ? 2 : 2.5, // telescope
          zoom: 200, // video camera
          far: 1500,
          position: [-0.67, 0.3, 0.67],
        }}
      >
        {/* {isDevelopment && <Perf position={'top-left'} matrixUpdate />} */}
        <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.15}
          autoRotate
          autoRotateSpeed={-0.5}
          enablePan={false}
          enableZoom
          target={[0, 0, 0]}
        />
        {/* <directionalLight intensity={1} /> */}
        <color args={['#FFF']} attach="background" />
        <Center>
          <ambientLight intensity={1.5} color="#fff" />
          <mesh>
            <boxBufferGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#ff0000" />
          </mesh>

          {/* <Model /> */}
          {/* <EveryFrame /> */}
        </Center>
      </Canvas>
      <Loader />
    </Suspense>
  );
}
