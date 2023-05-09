import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Physics, usePlane, useSphere } from '@react-three/cannon';
import { EffectComposer, SSAO, Bloom } from '@react-three/postprocessing';

function Plane({ color, ...props }) {
  usePlane(() => ({ ...props }));
  return null;
}

function Mouse() {
  const { viewport } = useThree();
  const [, api] = useSphere(() => ({ type: 'Kinematic', args: [6] }));
  return useFrame((state) =>
    api.position.set(
      (state.mouse.x * viewport.width) / 2,
      (state.mouse.y * viewport.height) / 2,
      7
    )
  );
}
function InstancedSpheresRed({ count = 15 }) {
  const { viewport } = useThree();
  const [ref] = useSphere((index) => ({
    mass: 100,
    position: [4 - Math.random() * 8, viewport.height, 0, 0],
    args: [1],
  }));
  const randomColor = () => {
    const colors = ['#FF4C3C'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  return (
    <instancedMesh
      ref={ref}
      castShadow
      receiveShadow
      args={[null, null, count]}
    >
      <sphereGeometry args={[1, 32, 32]} />
      {/* <meshLambertMaterial color="#5D3FD3" /> */}
      <meshLambertMaterial color={randomColor()} />
    </instancedMesh>
  );
}
function InstancedSpheresBlue({ count = 15 }) {
  const { viewport } = useThree();
  const [ref] = useSphere((index) => ({
    mass: 100,
    position: [4 - Math.random() * 8, viewport.height, 0, 0],
    args: [1],
  }));
  const randomColor = () => {
    const colors = ['#19a9fc'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  return (
    <instancedMesh
      ref={ref}
      castShadow
      receiveShadow
      args={[null, null, count]}
    >
      <sphereGeometry args={[1, 32, 32]} />
      {/* <meshLambertMaterial color="#5D3FD3" /> */}
      <meshLambertMaterial color={randomColor()} />
    </instancedMesh>
  );
}
function InstancedSpheresPurple({ count = 15 }) {
  const { viewport } = useThree();
  const [ref] = useSphere((index) => ({
    mass: 100,
    position: [4 - Math.random() * 8, viewport.height, 0, 0],
    args: [1],
  }));
  const randomColor = () => {
    const colors = ['#5D3FD3', '#800080', '#C4B5FD', '#E0D9FE'];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  return (
    <instancedMesh
      ref={ref}
      castShadow
      receiveShadow
      args={[null, null, count]}
    >
      <sphereGeometry args={[1, 32, 32]} />
      {/* <meshLambertMaterial color="#5D3FD3" /> */}
      <meshLambertMaterial color={randomColor()} />
    </instancedMesh>
  );
}

function Borders() {
  const { viewport } = useThree();
  return (
    <>
      <Plane
        position={[0, -viewport.height / 2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <Plane
        position={[-viewport.width / 2 - 1, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <Plane
        position={[viewport.width / 2 + 1, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
      />
      <Plane position={[0, 0, -1]} rotation={[0, 0, 0]} />
      <Plane position={[0, 0, 12]} rotation={[0, -Math.PI, 0]} />
    </>
  );
}
export default function Ballpit() {
  return (
    <Canvas
      shadows
      gl={{
        stencil: false,
        powerPreference: 'high-performance',
        antialias: true,
      }}
      camera={{ position: [0, 0, 20], fov: 20, near: 17, far: 40 }}
    >
      {/* <fog attach="fog" args={['#7F00FF', 25, 35]} /> */}
      {/* <color attach="background" args={['#1a1a1a']} /> */}
      <ambientLight intensity={1} />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      <directionalLight
        castShadow
        intensity={2}
        position={[50, 50, 25]}
        shadow-mapSize={[256, 256]}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <Physics
        gravity={[0, -50, 0]}
        defaultContactMaterial={{ restitution: 0.5 }}
      >
        <group position={[0, 0, -10]}>
          <Mouse />
          <Borders />
          <InstancedSpheresRed />
          <InstancedSpheresBlue />
          <InstancedSpheresPurple />
        </group>
      </Physics>
      {/* <EffectComposer> */}
      {/* <SSAO
          radius={0.4}
          intensity={50}
          luminanceInfluence={0.4}
          color="red"
        /> */}
      {/* <Bloom
          intensity={1.25}
          kernelSize={3}
          luminanceThreshold={0.5}
          luminanceSmoothing={0.0}
        /> */}
      {/* </EffectComposer> */}
    </Canvas>
  );
}
