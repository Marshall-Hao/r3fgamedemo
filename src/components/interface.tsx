import { useKeyboardControls } from "@react-three/drei";
import useGame from "../stores/useGame";
// * for useFrame outside of the canvas
import { addEffect } from "@react-three/fiber";
import { useRef, useEffect } from "react";

export default function Interface() {
  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  const forward = useKeyboardControls(
    (state) => state.forward
  );
  const backward = useKeyboardControls(
    (state) => state.backward
  );
  const leftward = useKeyboardControls(
    (state) => state.leftward
  );
  const rightward = useKeyboardControls(
    (state) => state.rightward
  );
  const jump = useKeyboardControls((state) => state.jump);

  const time = useRef<HTMLDivElement>();

  useEffect(() => {
    const unsubscribeEffect = addEffect(() => {
      // * get current state
      const state = useGame.getState();
      let elapsedTime = 0;
      if (state.phase === "playing")
        elapsedTime = Date.now() - state.startTime;
      else if (state.phase === "ended")
        elapsedTime = state.endTime - state.startTime;

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      time.current.textContent = elapsedTime;
    });

    return () => {
      // * clean up,otherwise will cause another useFrame run under the hood
      unsubscribeEffect();
    };
  }, []);

  return (
    <div className="interface">
      {/* /*time */}
      <div className="time" ref={time}>
        0.00
      </div>
      {/* Restart */}
      {phase === "ended" && (
        <div className="restart" onClick={restart}>
          Restart
        </div>
      )}

      {/* Controls */}
      <div className="controls">
        <div className="raw">
          <div className={`key ${forward ? "active" : ""}`}>
            W
          </div>
        </div>
        <div className="raw">
          <div
            className={`key ${leftward ? "active" : ""}`}
          >
            A
          </div>
          <div
            className={`key ${backward ? "active" : ""}`}
          >
            S
          </div>
          <div
            className={`key ${rightward ? "active" : ""}`}
          >
            D
          </div>
        </div>
        <div className="raw">
          <div
            className={`key large ${jump ? "active" : ""}`}
          >
            SPACE
          </div>
        </div>
      </div>
    </div>
  );
}
