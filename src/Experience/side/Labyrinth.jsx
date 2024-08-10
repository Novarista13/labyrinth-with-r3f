import { Bounds, EndBlock, Floor } from "../main/Labyrinth";

export default function Labyrinth({ model, resources }) {
  const { nodes } = model;

  return (
    <group rotation={[0, 89.54, 0]}>
      <mesh
        geometry={nodes.Cube203.geometry}
        position={[-5.84, 0.6, -0.82]}
        scale={[-0.133 * 4, -0.146 * 4, -0.021 * 4]}
        rotation={[0, 89.54, 0]}
        material={resources.wallMaterial}
      />
      <Floor boxGeometry={resources.boxGeometry} />
      <Bounds
        boxGeometry={resources.boxGeometry}
        wallMaterial={resources.wallMaterial}
      />
      <EndBlock
        boxGeometry={resources.boxGeometry}
        endMaterial={resources.wallMaterial}
      />
    </group>
  );
}
