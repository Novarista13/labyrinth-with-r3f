import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
  subscribeWithSelector((set) => {
    return {
      /* Time */
      startTime: 0,
      endTime: 0,
      elapsedTime: 0,

      /* Phases */
      phase: "ready",

      start: () => {
        set((state) => {
          if (state.phase === "ready" || state.phase === "paused") {
            const startTime =
              state.phase === "paused"
                ? Date.now() - state.elapsedTime
                : Date.now();
            return {
              phase: "playing",
              startTime,
              elapsedTime: 0,
            };
          }
          return {};
        });
      },

      pause: () => {
        set((state) => {
          if (state.phase === "playing") {
            const elapsedTime = Date.now() - state.startTime;
            return { phase: "paused", elapsedTime };
          }
          return {};
        });
      },

      restart: () => {
        set((state) => {
          if (
            state.phase === "playing" ||
            state.phase === "ended" ||
            state.phase === "paused"
          ) {
            return {
              phase: "ready",
              startTime: 0,
              endTime: 0,
              elapsedTime: 0,
            };
          }
          return {};
        });
      },

      end: () => {
        set((state) => {
          if (state.phase === "playing") {
            return { phase: "ended", endTime: Date.now() };
          }
          return {};
        });
      },
    };
  })
);
