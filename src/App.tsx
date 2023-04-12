import "./App.css";
import { Canvas } from "@react-three/fiber";
import Lights from "./components/Lights";
import Level from "./components/Level";

function App() {
  return (
    <Canvas
      camera={{
        fov: 45,
        near: 0.1,
        far: 2000,
        position: [-8, 6.5, 16],
      }}
    >
      <Lights></Lights>
      <Level></Level>
    </Canvas>
  );
}

export default App;
