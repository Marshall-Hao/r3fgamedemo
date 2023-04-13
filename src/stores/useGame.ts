import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

type TState = {
  blockCount: number;
  phase: "ready" | "playing" | "ended";
  startTime: number;
  endTime: number;
  start: () => Partial<TState>;
  restart: () => Partial<TState>;
  end: () => Partial<TState>;
};

export default create(
  subscribeWithSelector<TState>((set) => {
    return {
      blockCount: 3,
      phase: "ready",

      // * time
      startTime: 0,
      endTime: 0,

      // * method change the state
      start: () => {
        set((state) => {
          if (state.phase === "ready")
            return {
              phase: "playing",
              startTime: Date.now(),
            };

          return {};
        });
      },

      restart: () => {
        set((state) => {
          if (
            state.phase === "playing" ||
            state.phase === "ended"
          )
            return { phase: "ready" };

          return {};
        });
      },

      end: () => {
        set((state) => {
          if (state.phase === "playing")
            return { phase: "ended", endTime: Date.now() };

          return {};
        });
      },
    };
  })
);
