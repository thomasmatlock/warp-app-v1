import {
  Center,
  OrbitControls,
  Loader,
  useGLTF,
  Plane,
  Box,
} from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { Canvas, useFrame, extend } from '@react-three/fiber';
import styles from './Scene.module.scss';

// extend Canvas
extend({ Canvas });
const Model = () => {
  const modelURL = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';
  // const modelURL =
  // 'https://github.com/thomasmatlock/react-next-three-fiber-template/raw/main/public/portal.glb';
  // const modelURL =
  // 'https://github.com/thomasmatlock/react-next-three-fiber-template/raw/main/public/video.glb';
  // 'https://github.com/thomasmatlock/react-next-three-fiber-template/blob/main/public/video.glb';
  // const { scene } = useGLTF('./video.glb');
  const { scene } = useGLTF(modelURL);
  return <primitive object={scene} />;
};

export default function Scene(props: any) {
  // const { threeScene } = props;

  return (
    <div className={styles.scene}>
      {/* <Suspense fallback="loading"> */}
      <Canvas
        // flat
        // colorManagement
        // shadowMap
        shadows
        dpr={[1, 2]}
        gl={{
          powerPreference: 'high-performance',
          antialias: true,
          // logarithmicDepthBuffer: true,
        }}
        orthographic
        camera={{
          position: [-3, 2, 5],
          fov: 90,
          zoom: 50,
          near: 0.1,
          far: 1000,
        }}
      >
        {/* {isDevelopment && <Perf position={'top-left'} matrixUpdate />} */}
        {/* <OrbitControls
          makeDefault
          enableDamping
          dampingFactor={0.5}
          autoRotate
          autoRotateSpeed={-1}
          enablePan={false}
          enableZoom
          target={[0, 0, 0]}
        /> */}
        {/* <ambientLight intensity={0.1} /> */}
        {/* <directionalLight
          intensity={1}
          castShadow
          shadow-mapSize-height={512}
          shadow-mapSize-width={512}
          position={[0, 10, 0]}
        /> */}
        {/* <spotLight
            castShadow
            intensity={1}
            args={['blue', 1, 100]}
            position={[-1, 1, 1]}
          /> */}
        <color args={['#1a1a1a']} attach="background" />
        <fog attach="fog" args={['white', 0, 40]} />

        <Model />
      </Canvas>
    </div>
  );
}
