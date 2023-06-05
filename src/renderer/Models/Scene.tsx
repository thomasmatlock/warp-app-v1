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
// import BoxScene from './BoxScene';
import Audio from './AudioProductScene';
import Video from './VideoProductScene';
import Warpstagram from './WarpstagramProductScene';
import Bundle from './BundleProductScene';
import VideoModel from './VideoProductModel';

// extend Canvas
extend({ Canvas });

type SceneProps = {
  threeScene: string;
  expanded: boolean;
};
export default function Scene(props: SceneProps) {
  const { threeScene, expanded } = props;
  const sceneStyle = expanded ? styles.scene__expanded : styles.scene;
  return (
    <div className={sceneStyle}>
      {threeScene === 'audioPersonalEdition' && <Audio />}
      {threeScene === 'videoPersonalEdition' && <Video />}
      {/* {threeScene === 'videoPersonalEdition' && <VideoModel />} */}
      {/* {threeScene === 'warpstagramPersonalEdition' && <Warpstagram />} */}
      {threeScene === 'bundlePersonalEdition' && <Bundle />}
    </div>
  );
}
