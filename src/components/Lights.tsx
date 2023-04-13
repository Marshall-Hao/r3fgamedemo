import { useRef } from "react";
import { LightNode, useFrame } from "@react-three/fiber";
import { Light, DirectionalLightHelper } from "three";
import { useHelper } from "@react-three/drei";

export default function Lights() {
  const light = useRef<Light>();

  useFrame((state) => {
    // * Currently, the light is focusing on the camera, meaning that a significant part of the shadow map is used behind the camera, which is a waste.
    // * We can fix that by moving the light and target forward a little with - 4:
    // * 光向前照一点
    // * light follow the camera
    light.current!.position.z =
      state.camera.position.z + 1 - 4;
    // * adjust the light emission target
    light.current!.target.position.z =
      state.camera.position.z - 4;
    // * put the light target in the scene
    light.current.target.updateMatrixWorld();
  });

  // useHelper(light, DirectionalLightHelper);

  return (
    <>
      <directionalLight
        ref={light}
        castShadow
        position={[4, 4, 1]}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={1}
        shadow-camera-far={10}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
      />
      <ambientLight intensity={0.5} />
    </>
  );
}
