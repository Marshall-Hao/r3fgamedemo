import { useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Float,
  Text,
} from "@react-three/drei";
import {
  RigidBody,
  CuboidCollider,
  RapierRigidBody,
} from "@react-three/rapier";
import {
  ReactComponentElement,
  ReactElement,
  ReactNode,
  ReactPropTypes,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Mesh,
  BoxGeometry,
  MeshStandardMaterial,
  ColorManagement,
  Vector3,
  Quaternion,
  Euler,
  MeshBasicMaterial,
} from "three";

type TBlockStartProps = {
  position: [number, number, number];
};

ColorManagement.legacyMode = false;

// * for good performance, same geometry obj can use other place
const boxGeometry = new BoxGeometry(1, 1, 1);
const floor1Material = new MeshStandardMaterial({
  color: "#111111",
  metalness: 0,
  roughness: 0,
});
const floor2Material = new MeshStandardMaterial({
  color: "#222222",
  metalness: 0,
  roughness: 0,
});
const obstacleMaterial = new MeshStandardMaterial({
  color: "#ff0000",
  metalness: 0,
  roughness: 1,
});
const wallMaterial = new MeshStandardMaterial({
  color: "#887777",
  metalness: 0,
  roughness: 0,
});

// * modify how the three,js handling color

export function BlockStart({
  position = [0, 0, 0] as unknown as Vector3,
}): ReactElement<TBlockStartProps> {
  return (
    <group position={position}>
      <Float floatIntensity={0.25} rotationIntensity={0.25}>
        <Text
          font="/public/bebas-neue-v9-latin-regular.woff"
          scale={0.3}
          maxWidth={0.25}
          lineHeight={0.75}
          textAlign="right"
          position={[0.75, 0.65, 0]}
          rotation-y={-0.25}
        >
          Marble Race
          <meshBasicMaterial
            // * disable the SRGB encoding
            toneMapped={false}
          ></meshBasicMaterial>
        </Text>
      </Float>
      {/* //* floor */}
      <mesh
        position={[0, -0.1, 0]}
        receiveShadow
        geometry={boxGeometry}
        scale={[4, 0.2, 4]}
        material={floor1Material}
      ></mesh>
    </group>
  );
}

export function BlockSpinner({
  position = [0, 0, 0] as unknown as Vector3,
}): ReactElement<TBlockStartProps> {
  const obstacle = useRef<RapierRigidBody>();
  // * will only and run on first render,if the state is a return fn,sometimes revert directionhh
  const [speed] = useState(
    () =>
      (Math.random() + 0.2) * (Math.random() < 0.5 ? -1 : 1)
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    const rotation = new Quaternion();
    rotation.setFromEuler(new Euler(0, time * speed, 0));
    obstacle.current?.setNextKinematicRotation(rotation);
  });

  return (
    <group position={position}>
      {/* //* floor */}
      <mesh
        position={[0, -0.1, 0]}
        receiveShadow
        geometry={boxGeometry}
        scale={[4, 0.2, 4]}
        material={floor2Material}
      ></mesh>
      <RigidBody
        // * stop there 需要动能
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
        ref={obstacle}
      >
        <mesh
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
          castShadow
        ></mesh>
      </RigidBody>
    </group>
  );
}

export function BlockLimbo({
  position = [0, 0, 0] as unknown as Vector3,
}): ReactElement<TBlockStartProps> {
  const obstacle = useRef<RapierRigidBody>();
  // * will only and run on first render,if the state is a return fn,sometimes revert directionhh
  const [Timeoffset] = useState(
    () => (Math.random() + 0.2) * Math.PI * 2
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    const y = Math.sin(time + Timeoffset) + 1.15;
    // * will make it as absolute position not relative position
    obstacle.current?.setNextKinematicTranslation({
      x: position[0],
      y: position[1] + y,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      {/* //* floor */}
      <mesh
        position={[0, -0.1, 0]}
        receiveShadow
        geometry={boxGeometry}
        scale={[4, 0.2, 4]}
        material={floor2Material}
      ></mesh>
      <RigidBody
        // * stop there 需要动能
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
        ref={obstacle}
      >
        <mesh
          castShadow
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[3.5, 0.3, 0.3]}
        ></mesh>
      </RigidBody>
    </group>
  );
}

export function BlockAxe({
  position = [0, 0, 0] as unknown as Vector3,
}): ReactElement<TBlockStartProps> {
  const obstacle = useRef<RapierRigidBody>();
  // * will only and run on first render,if the state is a return fn,sometimes revert directionhh
  const [Timeoffset] = useState(
    () => (Math.random() + 0.2) * Math.PI * 2
  );

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    const x = Math.sin(time + Timeoffset) + 0.25;
    // * will make it as absolute position not relative position
    obstacle.current?.setNextKinematicTranslation({
      x: position[0] + x,
      y: position[1] + 0.75,
      z: position[2],
    });
  });

  return (
    <group position={position}>
      {/* //* floor */}
      <mesh
        position={[0, -0.1, 0]}
        receiveShadow
        geometry={boxGeometry}
        scale={[4, 0.2, 4]}
        material={floor2Material}
      ></mesh>
      <RigidBody
        // * stop there 需要动能
        type="kinematicPosition"
        position={[0, 0.3, 0]}
        restitution={0.2}
        friction={0}
        ref={obstacle}
      >
        <mesh
          castShadow
          geometry={boxGeometry}
          material={obstacleMaterial}
          scale={[1.5, 1.5, 0.3]}
        ></mesh>
      </RigidBody>
    </group>
  );
}

export function BlockEnd({
  position = [0, 0, 0] as unknown as Vector3,
}): ReactElement<TBlockStartProps> {
  const hamburger = useGLTF("/public/hamburger.glb");

  hamburger.scene.children.forEach((mesh) => {
    mesh.castShadow = true;
  });

  return (
    <group position={position}>
      <Text
        font="/public/bebas-neue-v9-latin-regular.woff"
        scale={0.3}
        position={[0, 2.25, 2]}
      >
        FINISH
        <meshBasicMaterial toneMapped={false} />
      </Text>
      {/* //* floor */}
      <mesh
        position={[0, -0.1, 0]}
        receiveShadow
        geometry={boxGeometry}
        scale={[4, 0.2, 4]}
        material={floor1Material}
      ></mesh>
      <RigidBody
        type="fixed"
        colliders="hull"
        position={[0, 0.25, 0]}
        restitution={0.3}
      >
        <primitive
          object={hamburger.scene}
          scale={0.2}
        ></primitive>
      </RigidBody>
    </group>
  );
}

type TBounds = {
  length: number;
};

function Bounds({ length = 1 }: TBounds): ReactNode {
  return (
    <>
      <RigidBody
        // * not for freen drop down
        type="fixed"
        restitution={0.2}
        friction={0}
      >
        <mesh
          position={[2.15, 0.75, -(length * 2) + 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[0.3, 1.5, 4 * length]}
          // * shadow stops
          castShadow
        ></mesh>

        <mesh
          position={[-2.15, 0.75, -(length * 2) + 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[0.3, 1.5, 4 * length]}
          // * sun is another way, no shadow to cast for it self
          receiveShadow
        ></mesh>

        <mesh
          position={[0, 0.75, -(length * 4) + 2]}
          geometry={boxGeometry}
          material={wallMaterial}
          scale={[4, 1.5, 0.3]}
          // * sun is another way, no shadow to cast for it self
          receiveShadow
        ></mesh>
        <CuboidCollider
          args={[2, 0.1, 2 * length]}
          position={[0, -0.1, -(length * 2) + 2]}
          restitution={0.2}
          // * becuase ball keep rotating if no friction
          friction={1}
        ></CuboidCollider>
      </RigidBody>
    </>
  );
}

type TLevel = {
  count: number;
  types: [
    typeof BlockSpinner,
    typeof BlockAxe,
    typeof BlockLimbo
  ];
  seed: number;
};

export function Level({
  count = 5,
  types = [BlockSpinner, BlockAxe, BlockLimbo],
  seed = 0,
}: TLevel): ReactNode {
  const blocks = useMemo(() => {
    const blocks = [];
    for (let i = 0; i < count; i++) {
      const type =
        types[Math.floor(Math.random() * types.length)]; // * 0 ~ 2
      blocks.push(type);
    }

    return blocks;
  }, [count, types, seed]);

  return (
    <>
      <BlockStart position={[0, 0, 0]}></BlockStart>
      {blocks.map((Block, index) => (
        // * Block is the reactnode component
        <Block
          key={index}
          // * index 一开始是0 会占据 要加一
          position={[0, 0, -(index + 1) * 4]}
        ></Block>
      ))}
      <BlockEnd
        position={[0, 0, -(count + 1) * 4]}
      ></BlockEnd>
      <Bounds length={count + 2}></Bounds>
    </>
  );
}
