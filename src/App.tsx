import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Physics, Debug } from "@react-three/rapier";
import { KeyboardControls } from "@react-three/drei";
import Lights from "./components/Lights";
import {
  Level,
  BlockSpinner,
  BlockLimbo,
  BlockAxe,
} from "./components/Level";
import Player from "./components/Player";

function App() {
  return (
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
        <Physics>
          <Debug></Debug>
          <Lights></Lights>
          <Level></Level>
          <Player></Player>
        </Physics>
      </Canvas>
    </KeyboardControls>
  );
}

export default App;
