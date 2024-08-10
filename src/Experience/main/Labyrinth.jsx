import * as THREE from "three";
import { useTexture } from "@react-three/drei";

import { RigidBody } from "@react-three/rapier";
import { useEffect } from "react";

THREE.ColorManagement.legacyMode = false;

const labyrinthMaterial = new THREE.MeshStandardMaterial({ color: "green" });
const groundMaterial = new THREE.MeshStandardMaterial({ color: "slategrey" });

export const Bounds = ({ boxGeometry, wallMaterial }) => {
  return (
    <>
      {/* front and back */}
      <mesh
        position={[4.05 * 2, 0.265 * 2, 0]}
        rotation={[0, Math.PI * 0.5, 0]}
        scale={[6 * 2.3, 0.5 * 2.65, 0.2 * 0.81]}
        geometry={boxGeometry}
        material={wallMaterial}
      />

      <mesh
        position={[-4.05 * 2, 0.265 * 2, 0]}
        rotation={[0, Math.PI * 0.5, 0]}
        scale={[6 * 2.3, 0.5 * 2.65, 0.2 * 0.81]}
        geometry={boxGeometry}
        material={wallMaterial}
      />

      {/* two small right */}
      <mesh
        position={[3.53 * 2, 0.265 * 2, 3.02 * 2.3]}
        scale={[0.95 * 2.31, 0.5 * 2.65, 0.1 * 0.81]}
        geometry={boxGeometry}
        material={wallMaterial}
      />
      <mesh
        position={[-3.53 * 2, 0.265 * 2, 3.02 * 2.3]}
        scale={[0.95 * 2.31, 0.5 * 2.65, 0.1 * 0.81]}
        geometry={boxGeometry}
        material={wallMaterial}
      />

      {/* two small left */}
      <mesh
        position={[3.53 * 2, 0.265 * 2, -3.02 * 2.26]}
        scale={[0.95 * 2.31, 0.5 * 2.65, 0.1 * 0.81]}
        geometry={boxGeometry}
        material={wallMaterial}
      />
      <mesh
        position={[-3.53 * 2, 0.265 * 2, -3.02 * 2.24]}
        scale={[0.95 * 2.31, 0.5 * 2.65, 0.1 * 0.81]}
        geometry={boxGeometry}
        material={wallMaterial}
      />
    </>
  );
};

export const EndBlock = ({ boxGeometry, endMaterial }) => {
  return (
    <mesh
      position={[7.7, 0, 0.07]}
      scale={[0.79, 0.2, 13.85]}
      geometry={boxGeometry}
      material={endMaterial}
    />
  );
};

export const Floor = ({ boxGeometry, floorMaterial }) => {
  return (
    <mesh
      position={[0, -0.1, 0]}
      scale={[5 * 4, 0.2, 4.5 * 4]}
      geometry={boxGeometry}
      material={floorMaterial}
    />
  );
};

export default function Labyrinth({ model, resources }) {
  const { nodes } = model;

  // textures
  const grassTexture = useTexture("./grass.webp");
  grassTexture.repeat.x = 4;
  grassTexture.repeat.y = 12;
  grassTexture.wrapS = THREE.RepeatWrapping;
  grassTexture.wrapT = THREE.RepeatWrapping;
  labyrinthMaterial.map = grassTexture;

  const groundTexture = useTexture("./ground.webp");
  groundTexture.repeat.x = 15;
  groundTexture.repeat.y = 15;
  groundTexture.wrapS = THREE.RepeatWrapping;
  groundTexture.wrapT = THREE.RepeatWrapping;
  groundMaterial.map = groundTexture;

  useEffect(() => {
    return () => {
      // materials and textures dispose
      labyrinthMaterial.dispose();
      grassTexture.dispose();

      groundMaterial.dispose();
      groundTexture.dispose();
    };
  }, []);

  return (
    <group rotation={[0, 89.54, 0]}>
      <RigidBody
        type="fixed"
        colliders="trimesh"
        restitution={0.2}
        friction={1}
      >
        <mesh
          geometry={nodes.Cube203.geometry}
          position={[-5.84, 0.6, -0.82]}
          scale={[-0.133 * 4, -0.146 * 4, -0.021 * 4]}
          rotation={[0, 89.54, 0]}
          material={labyrinthMaterial}
        />
      </RigidBody>

      <RigidBody type="fixed" restitution={0.2} friction={0}>
        <Floor
          boxGeometry={resources.boxGeometry}
          floorMaterial={groundMaterial}
        />
      </RigidBody>
      <RigidBody type="fixed" colliders="cuboid" restitution={0.2} friction={1}>
        <Bounds
          boxGeometry={resources.boxGeometry}
          wallMaterial={resources.wallMaterial}
        />
      </RigidBody>
      <EndBlock
        boxGeometry={resources.boxGeometry}
        endMaterial={resources.wallMaterial}
      />
    </group>
  );
}
