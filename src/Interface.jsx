import { useKeyboardControls } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import useGame from "./stores/useGame";
import { addEffect } from "@react-three/fiber";

const Interface = () => {
  const time = useRef();

  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  const forward = useKeyboardControls((state) => state.forward);
  const backward = useKeyboardControls((state) => state.backward);
  const leftward = useKeyboardControls((state) => state.leftward);
  const rightward = useKeyboardControls((state) => state.rightward);

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();

      let elapsedTime = 0;

      if (state.phase === "paused") elapsedTime = state.elapsedTime;

      if (state.phase === "playing") elapsedTime = Date.now() - state.startTime;
      if (state.phase === "ended")
        elapsedTime = state.endTime - state.startTime;

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (time.current) time.current.textContent = elapsedTime;
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  return (
    <div className="interface">
      {/* Time */}
      <div ref={time} className="time">
        0.00
      </div>

      {/* start */}
      {(phase === "ready" || phase === "paused") && (
        <div className="restart" id="start">
          Start
        </div>
      )}

      {/* Restart */}
      {phase == "ended" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}

      {/* Controls */}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : ""}`}></div>
        </div>
        <div className="raw">
          <div className={`key ${leftward ? "active" : ""}`}></div>
          <div className={`key ${backward ? "active" : ""}`}></div>
          <div className={`key ${rightward ? "active" : ""}`}></div>
        </div>
      </div>

      <p className="credit">
        This model is from
        <a href="https://sketchfab.com/3d-models/labyrinth-abc354614e9e40acb5715e3a960c1885">
          "Labyrinth"{" "}
        </a>
        by <a href="https://sketchfab.com/rodrivgm">rodrivgm</a>
      </p>
    </div>
  );
};

export default Interface;
