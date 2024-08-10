import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Player = ({ playerRef, resources }) => {
  const body = useRef();

  // animate
  useFrame((state, delta) => {
    if (playerRef.current && body.current) {
      /* Controls */
      const playerPosition = playerRef.current.translation();
      body.current.position.copy(playerPosition);
    }
  });

  return (
    <>
      <mesh
        ref={body}
        scale={1}
        geometry={resources.sphereGeometry}
        material={resources.sphereMaterial}
      />
    </>
  );
};

export default Player;
