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
import BoxScene from './BoxScene';
import Audio from './Audio';
import Video from './Video';
import Bundle from './Bundle';
import VideoModel from './VideoModel';

// extend Canvas
extend({ Canvas });

export default function Scene(props: any) {
  const { threeScene } = props;
  // window.electron.ipcRenderer.on('global', (arg) => {
  //   console.log(arg);
  // });

  return (
    <div className={styles.scene}>
      {/* {threeScene === 'audioPersonalEdition' && <Ballpit />} */}
      {/* {threeScene === 'audioPersonalEdition' && <BoxScene />} */}
      {threeScene === 'audioPersonalEdition' && <Audio />}
      {threeScene === 'videoPersonalEdition' && <Video />}
      {/* {threeScene === 'videoPersonalEdition' && <VideoModel />} */}
      {threeScene === 'bundlePersonalEdition' && <Bundle />}
    </div>
  );
}
