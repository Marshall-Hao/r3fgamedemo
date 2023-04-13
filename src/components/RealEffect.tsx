import {
  EffectComposer,
  DepthOfField,
  SSR,
  Bloom,
} from "@react-three/postprocessing";
import { useControls } from "leva";

export default function RealEffect() {
  return (
    <>
      <EffectComposer disableNormalPass>
        <Bloom
          // * glow around the brightness
          mipmapBlur
          intensity={0.6}
          luminanceThreshold={0}
        ></Bloom>
        <DepthOfField
          // * 斗鸡眼效果
          focusDistance={0.03}
          focalLength={0.07}
          bokehScale={8}
        ></DepthOfField>
      </EffectComposer>
    </>
  );
}
