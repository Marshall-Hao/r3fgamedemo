import "./App.css";

import { Physics, Debug } from "@react-three/rapier";

import Lights from "./components/Lights";
import { Level } from "./components/Level";
import Player from "./components/Player";
import useGame from "./stores/useGame";

function App() {
  // * will cause re-render
  const blockcount = useGame((state) => state.blockCount);
  const blockseed = useGame((state) => state.blockSeed);

  console.log(blockcount);
  return (
    <>
      <Physics>
        <Debug></Debug>
        <Lights></Lights>
        <Level count={blockcount} seed={blockseed}></Level>
        <Player></Player>
      </Physics>
    </>
  );
}

export default App;
