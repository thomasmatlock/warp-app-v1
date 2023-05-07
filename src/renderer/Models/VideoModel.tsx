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

extend({ Canvas });
const Model = () => {
  // const modelURL =
  // 'https://github.com/thomasmatlock/react-next-three-fiber-template/raw/main/public/portal.glb';
  // const modelURL =
  // 'https://github.com/thomasmatlock/react-next-three-fiber-template/raw/main/public/video.glb';
  // 'https://github.com/thomasmatlock/react-next-three-fiber-template/blob/main/public/video.glb';
  //
  // const modelURL = 'https://modelviewer.dev/shared-assets/models/Astronaut.glb';
  const modelURL =
    // 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/Sponza/glTF/Sponza.gltf';
    'https://raw.githubusercontent.com/thomasmatlock/react-next-three-fiber-template/main/public/video.gltf';
  // const { scene } = useGLTF(modelURL);
  // const modelURL = `/Users/nikkirincon/Documents/GitHub/warp-app/assets/video.glb`;
  const { scene } = useGLTF(modelURL);
  return <primitive object={scene} />;
};

export default function Scene(props: any) {
  // window.electron.ipcRenderer.on('global', (arg) => {
  //   console.log(arg);

  // });
  // const { threeScene } = props;
  function EveryFrame() {
    useFrame((state) => {
      //  handleResize();
      console.log(state.camera.zoom);
      // rotate camera around the origin
      // state.camera.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1;
    });
    return null;
  }
  return (
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
        // fov: 90,
        zoom: 100,
        near: 0.1,
        far: 1000,
      }}
    >
      <OrbitControls
        makeDefault
        enableDamping
        dampingFactor={0.1}
        autoRotate
        autoRotateSpeed={-1}
        enablePan={false}
        enableZoom={false}
        target={[0, 1, 0]}
      />
      <ambientLight intensity={0.1} />
      <directionalLight
        intensity={1}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
        position={[0, 10, 10]}
      />

      <fog attach="fog" args={['white', 0, 40]} />

      <Model />
      <EveryFrame />
    </Canvas>
  );
}
