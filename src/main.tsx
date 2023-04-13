import ReactDOM from "react-dom/client";
import App from "./App";
import Interface from "./components/interface";
import { KeyboardControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

// * good for performance, no state change here, canvas always wont be re-rendered
ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
).render(
  <KeyboardControls
    map={[
      // * postion on the keyboard, not the letter position
      { name: "forward", keys: ["ArrowUp", "KeyW"] },
      { name: "backward", keys: ["ArrowDown", "KeyS"] },
      { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
      { name: "rightward", keys: ["ArrowRight", "KeyD"] },
      { name: "jump", keys: ["Space"] },
    ]}
  >
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 2000,
        position: [0, 6.5, 16],
      }}
      shadows
    >
      <App />
    </Canvas>
    <Interface></Interface>
  </KeyboardControls>
);
