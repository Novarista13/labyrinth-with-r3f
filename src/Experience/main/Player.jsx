import { useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { forwardRef, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import useGame from "../../stores/useGame";

const Player = ({ resources }, ref) => {
  const [subscribeKeys, getKeys] = useKeyboardControls();

  // useGame
  const start = useGame((state) => state.start);
  const pause = useGame((state) => state.pause);
  const end = useGame((state) => state.end);
  const restart = useGame((state) => state.restart);

  const reset = () => {
    ref.current.setTranslation({ x: -6.17, y: 0.15, z: 7.35 });
    ref.current.setLinvel({ x: 0, y: 0, z: 0 });
    ref.current.setAngvel({ x: 0, y: 0, z: 0 });
  };

  useEffect(() => {
    const unsubscribeReset = useGame.subscribe(
      (state) => state.phase,
      (value) => {
        if (value === "ready") {
          reset();
        }
      }
    );

    const unsubscribeAny = subscribeKeys(() => {
      start();
    });

    return () => {
      unsubscribeReset();
      unsubscribeAny();
    };
  }, []);

  // controls
  const controls = useThree((state) => state.controls);
  if (controls) {
    // camera
    controls.pointerSpeed = 0.8;
    controls.getObject().rotation.set(0, 0, 0);
  }

  useEffect(() => {
    if (!controls) return;

    controls.addEventListener("lock", () => start());
    controls.addEventListener("unlock", () => pause());

    return () => {
      controls.removeEventListener("lock");
      controls.removeEventListener("unlock");
    };
  }, [controls]);

  // animate
  useFrame((state, delta) => {
    if (!ref.current) return;

    // pointer lock
    const cameraDirection = new THREE.Vector3();
    if (controls && controls.isLocked) {
      controls.getDirection(cameraDirection);
    }

    /* Controls */
    const { forward, backward, leftward, rightward } = getKeys();
    const impulse = { x: 0, y: 0, z: 0 };
    const impulseStrength = 0.01 * delta;
    if (forward) {
      impulse.x += cameraDirection.x * impulseStrength;
      impulse.z += cameraDirection.z * impulseStrength;
    }
    if (backward) {
      impulse.x -= cameraDirection.x * impulseStrength;
      impulse.z -= cameraDirection.z * impulseStrength;
    }
    if (rightward) {
      const right = new THREE.Vector3();
      right
        .crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0))
        .normalize();
      impulse.x += right.x * impulseStrength;
      impulse.z += right.z * impulseStrength;
    }
    if (leftward) {
      const left = new THREE.Vector3();
      left
        .crossVectors(new THREE.Vector3(0, 1, 0), cameraDirection)
        .normalize();
      impulse.x += left.x * impulseStrength;
      impulse.z += left.z * impulseStrength;
    }
    ref.current.applyImpulse(impulse);

    /* Camera */
    const bodyPosition = ref.current.translation();
    if (state.camera.isPerspectiveCamera) {
      const cameraPosition = new THREE.Vector3();
      cameraPosition.copy(bodyPosition);
      cameraPosition.z += 0.2;
      cameraPosition.y += 0.6;
      state.camera.position.copy(cameraPosition);
    }

    /* Phases */
    if (bodyPosition.z < -7) {
      end();
    }

    if (bodyPosition.y < -4) {
      restart();
    }
  });

  return (
    <>
      <RigidBody
        ref={ref}
        canSleep={false}
        colliders="ball"
        position={[-6.17, 0.15, 7.5]}
        restitution={0}
        friction={1}
        linearDamping={2}
        angularDamping={2}
      >
        <mesh
          scale={0.35}
          geometry={resources.sphereGeometry}
          material={resources.sphereMaterial}
        />
      </RigidBody>
    </>
  );
};

export default forwardRef(Player);
