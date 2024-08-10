import Lights from "../Lights.jsx";
import Labyrinth from "./Labyrinth.jsx";
import Player from "./Player.jsx";

export default function SideExperience({ children, ...props }) {
  return (
    <>
      <Lights />

      <Labyrinth model={props.model} resources={props.labyrinth} />
      <Player playerRef={props.playerRef} resources={props.player} />

      {children}
    </>
  );
}
