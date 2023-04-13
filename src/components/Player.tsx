import {
  RigidBody,
  RapierRigidBody,
  useRapier,
} from "@react-three/rapier";
import { useFrame } from "@react-three/fiber";
import {
  Bounds,
  useKeyboardControls,
} from "@react-three/drei";
import { useRef, useEffect } from "react";

export default function Player() {
  const body = useRef<RapierRigidBody>();
  const [subscribeKeys, getKeys] = useKeyboardControls();
  console.log(subscribeKeys);
  console.log(getKeys);
  const { rapier, world } = useRapier();
  // * get the phsics world cuzed by rapier
  const rapierWorld = world.raw();

  const jump = () => {
    // * center how much has moved
    const origin = body.current?.translation();
    origin!.y -= 0.31;
    const direction = { x: 0, y: -1, z: 0 };

    // * casting the ray
    const ray = new rapier.Ray(origin, direction);
    // * the whole plane will be as the panel to take the force
    const hit = rapierWorld.castRay(ray, 10, true);
    console.log(hit);
    // * time of impulse,impulse wont be always big, will have a floor raw to let it drop
    if (hit?.toi < 0.15) {
      body.current?.applyImpulse(
        { x: 0, y: 0.5, z: 0 },
        true
      );
    }
  };

  useEffect(() => {
    const unsubscribeJump = subscribeKeys(
      (state) => {
        // * subscribe to jump action
        return state.jump;
      },
      (value) => {
        if (value) jump();
      }
    );

    return () => {
      // * unsubscribe the event, since if component destroy ,will mount again, and regist the event again
      unsubscribeJump();
    };
  });

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

    body.current?.applyImpulse(impulse, true);
    body.current?.applyTorqueImpulse(torque, true);
  });

  return (
    <RigidBody
      position={[0, 1, 0]}
      colliders="ball"
      restitution={0.2}
      // * a bit friction
      friction={1}
      // * some damping ,make it more real
      linearDamping={0.5}
      angularDamping={0.5}
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
