import Lights from "../Lights.jsx";
import Labyrinth from "./Labyrinth.jsx";
import Player from "./Player.jsx";
import { Physics } from "@react-three/rapier";
import { forwardRef, useEffect } from "react";
import { Float, Text } from "@react-three/drei";
import * as THREE from "three";

const textMaterial = new THREE.MeshBasicMaterial({
  toneMapped: false,
});

export default forwardRef(function Experience({ children, ...props }, ref) {
  useEffect(() => {
    return () => {
      textMaterial.dispose();
    };
  }, []);

  return (
    <>
      <Lights />

      <Float floatIntensity={0.1} rotationIntensity={0.1}>
        <Text
          font="./bebas-neue-v9-latin-regular.woff"
          scale={0.3}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="left"
          position={[-5.64, 0.52, 6.98]}
          material={textMaterial}
        >
          Labyrinth Game
        </Text>

        <Text
          font="./bebas-neue-v9-latin-regular.woff"
          scale={0.35}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="left"
          position={[-1.8, 0.52, -7.95]}
          material={textMaterial}
        >
          Finish Line!!!
        </Text>
      </Float>

      <Physics>
        <Labyrinth model={props.model} resources={props.labyrinth} />
        <Player ref={ref} resources={props.player} />
      </Physics>

      {children}
    </>
  );
});
