import {
  KeyboardControls,
  MapControls,
  OrthographicCamera,
  PointerLockControls,
  useGLTF,
  View,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

import Experience from "./Experience/main/Experience";
import MainPanel from "./Experience/main/MainPanel";

import SideExperience from "./Experience/side/Experience";
import SidePanel from "./Experience/side/SidePanel";

/* common resources */
// geometry
const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
const sphereGeometry = new THREE.SphereGeometry(0.3, 10, 10);

// materials
const wallMaterial = new THREE.MeshStandardMaterial({ color: "green" });
const sphereMaterial = new THREE.MeshBasicMaterial({
  color: "red",
});

export function App() {
  // common items for both views
  const playerRef = useRef();
  const model = useGLTF("/labyrinth.glb");

  useEffect(() => {
    return () => {
      // dispose resources
      boxGeometry.dispose();
      sphereGeometry.dispose();
      wallMaterial.dispose();
      sphereMaterial.dispose();
    };
  }, []);

  return (
    <KeyboardControls
      map={[
        { name: "forward", keys: ["ArrowUp", "KeyW"] },
        { name: "backward", keys: ["ArrowDown", "KeyS"] },
        { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
        { name: "rightward", keys: ["ArrowRight", "KeyD"] },
      ]}
    >
      <Canvas
        className="canvas"
        shadows
        camera={{
          fov: 75,
          near: 0.1,
          far: 200,
          position: [2.5, 4, 6],
        }}
      >
        <View.Port />
      </Canvas>

      <MainPanel>
        <Experience
          ref={playerRef}
          model={model}
          labyrinth={{ boxGeometry, wallMaterial }}
          player={{ sphereGeometry, sphereMaterial }}
        />
        {/* <OrbitControls makeDefault /> */}
        <PointerLockControls makeDefault />
      </MainPanel>

      <SidePanel>
        <OrthographicCamera makeDefault position={[0, 10, 0]} zoom={11} />
        <SideExperience
          playerRef={playerRef}
          model={model}
          labyrinth={{ boxGeometry, wallMaterial }}
          player={{ sphereGeometry, sphereMaterial }}
        />
        <MapControls screenSpacePanning enableRotate={false} />
      </SidePanel>
    </KeyboardControls>
  );
}

useGLTF.preload("/labyrinth.glb");
