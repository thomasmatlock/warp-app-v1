import { Center, OrbitControls, Loader, useGLTF } from '@react-three/drei';
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
function Cylinder() {
  const myref = useRef();

  useFrame(() => (myref.current.rotation.x = myref.current.rotation.y += 0.01));

  return (
    <mesh ref={myref}>
      <cylinderBufferGeometry
        attach="geometry"
        args={[2, 2, 2]}
        receiveShadow
        castShadow
      />
      <meshBasicMaterial attach="material" color="red" />
    </mesh>
  );
}

export default function Scene(props: any) {
  return (
    <div className={styles.scene}>
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
            zoom: 90, // video camera
            far: 1500,
            position: [-0.67, 0.3, 0.67],
          }}
        >
          {/* {isDevelopment && <Perf position={'top-left'} matrixUpdate />} */}
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
          <directionalLight intensity={1} castShadow />
          <color args={['#1a1a1a']} attach="background" />
          {/* <color args={['#fff']} attach="background" /> */}
          <Center>
            <ambientLight intensity={1} color="#fff" />
            {/* <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="#ff0000" />
            </mesh> */}

            {/* <Model /> */}
            {/* <Cylinder /> */}
            {/* <EveryFrame /> */}
          </Center>
        </Canvas>
        <Loader />
      </Suspense>
    </div>
  );
}
