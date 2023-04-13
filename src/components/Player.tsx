import {
  RigidBody,
  RapierRigidBody,
} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import {
  Bounds,
  useKeyboardControls,
} from "@react-three/drei";
import { useRef } from "react";

export default function Player() {
  const body = useRef<RapierRigidBody>();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  console.log(subscribeKeys);
  console.log(getKeys);
  useFrame((state, delta) => {
    const { forward, backward, leftward, rightward, jump } =
      getKeys();

    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.6 * delta;
    const torqueStrength = 0.2 * delta;

    if (forward) {
      impulse.z -= impulseStrength;
      torque.x -= torqueStrength;
    }

    if (rightward) {
      impulse.x += impulseStrength;
      torque.z -= torqueStrength;
    }

    if (backward) {
      impulse.z += impulseStrength;
      torque.x += torqueStrength;
    }

    if (leftward) {
      impulse.x -= impulseStrength;
      torque.z += torqueStrength;
    }

    body.current?.applyImpulse(impulse, false);
    body.current?.applyTorqueImpulse(torque, false);
  });

  return (
    <RigidBody
      position={[0, 1, 0]}
      colliders="ball"
      restitution={0.2}
      // * a bit friction
      friction={1}
      ref={body}
    >
      <mesh>
        <icosahedronGeometry
          args={[0.3, 1]}
        ></icosahedronGeometry>
        <meshStandardMaterial
          flatShading
          color="mediumpurple"
        ></meshStandardMaterial>
      </mesh>
    </RigidBody>
  );
}
