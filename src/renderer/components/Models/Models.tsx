import React, { useRef, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
// import GLTF
import { useFrame } from '@react-three/fiber';

import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader';

type GLTFResult = GLTF & {
    nodes: {
        Circle: THREE.Mesh;
    };
};
const wormholeMaterial = new THREE.MeshPhongMaterial({
    color: 0x000000,
    wireframe: true,
    opacity: 0,
    transparent: true,
});
export function Model(props) {
    const desktopScaleMultiplier = 450;
    const mobileScaleMultiplier = 4000;
    const opacityLimit = 0.125;
    const [desktopScale, setDesktopScale] = useState([
        desktopScaleMultiplier,
        desktopScaleMultiplier / 1.5,
        desktopScaleMultiplier,
    ]);
    const [mobileScale, setMobileScale] = useState([
        mobileScaleMultiplier,
        mobileScaleMultiplier,
        mobileScaleMultiplier,
    ]);

    const { nodes } = useGLTF('/wormhole.glb') as GLTFResult;
    const groupRef = useRef(null!);
    function increaseSpinSpeed() {
        // console.log(groupRef.current.rotation.x, groupRef.current.rotation.z);

        if (props.isMobile) {
            groupRef.current.rotation.y -= 0.005;
        } else {
            groupRef.current.rotation.y -= 0.01;
            groupRef.current.rotation.x -= 0.001;
        }
        // props.isMobile ? (groupRef.current.rotation.y -= mobileSpeed) : (groupRef.current.rotation.y -= desktopSpeed);
    }
    function increaseScale() {
        // console.log(groupRef.current.scale.x, groupRef.current.scale.y, groupRef.current.scale.z);

        if (props.isMobile) {
            groupRef.current.scale.x += 0.01;
            groupRef.current.scale.y += 0.0001;
            groupRef.current.scale.z += 0.0001;
        } else {
            groupRef.current.scale.x += 1;
            groupRef.current.scale.y += 0.5;
            groupRef.current.scale.z += 1;
        }
    }
    function increaseMaterialOpacity() {
        if (wormholeMaterial.opacity < opacityLimit) {
            props.isMobile ? (wormholeMaterial.opacity += 0.0005) : (wormholeMaterial.opacity += 0.001);
        }
    }
    useFrame((state, delta) => {
        increaseMaterialOpacity();
        increaseSpinSpeed();
        // increaseScale();/
    });

    return (
        <group
            ref={groupRef}
            {...props}
            dispose={null}
            scale={props.isMobile ? mobileScale : desktopScale}
            position={props.position}
        >
            <mesh geometry={nodes.Circle.geometry} material={wormholeMaterial} rotation={[Math.PI / 2, 0, 0]} />
        </group>
    );
}

useGLTF.preload('/wormhole.glb');
