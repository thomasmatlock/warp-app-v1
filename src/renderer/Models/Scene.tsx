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
import Test from './Test';
import Audio from './Audio';
import Video from './Video';
import Bundle from './Bundle';

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
  const { threeScene } = props;

  return (
    <div className={styles.scene}>
      {/* {threeScene === 'audioPersonalEdition' && <Ballpit />} */}
      {/* {threeScene === 'audioPersonalEdition' && <Test />} */}
      {threeScene === 'audioPersonalEdition' && <Audio />}
      {threeScene === 'videoPersonalEdition' && <Video />}
      {threeScene === 'bundlePersonalEdition' && <Bundle />}
    </div>
  );
}
