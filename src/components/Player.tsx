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
import { Vector3 } from "three";
import { useRef, useEffect, useState } from "react";

export default function Player() {
  const [smoothedCameraPosition] = useState<Vector3>(
    () => new Vector3(10, 10, 10)
  );

  const [smoothedCameraTarget] = useState<Vector3>(
    () => new Vector3()
  );

  const body = useRef<RapierRigidBody>();
  const [subscribeKeys, getKeys] = useKeyboardControls();

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
    // * Controls
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

    // * Camera
    const bodyPosition = body.current?.translation();
    const cameraPosition = new Vector3();
    cameraPosition.copy(bodyPosition);
    // * 稍微在球的位置上加了一点，往后退了点
    cameraPosition.z += 2.25;
    cameraPosition.y += 0.65;

    const cameraTarget = new Vector3();
    cameraTarget.copy(bodyPosition);
    // * adjust camera look where
    // * 稍微在球的位置上加了一点
    cameraTarget.y += 0.25;

    // * smooth the camera postion ,make it feel it animating throught the ball position change, other wisit will be too direct to animate
    smoothedCameraPosition.lerp(cameraPosition, 5 * delta);
    smoothedCameraTarget.lerp(cameraTarget, 5 * delta);
    // * smooth the camera postion wills generally step by step animated to the desired cameraPosition or target, more realistic
    state.camera.position.copy(smoothedCameraPosition);
    state.camera.lookAt(smoothedCameraTarget);
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
