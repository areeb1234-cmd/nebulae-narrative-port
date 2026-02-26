import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const Character3D = () => {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const mouseTarget = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const breathScale = useRef(0);

  const { viewport } = useThree();

  const bodyMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1a1a2e'),
    metalness: 0.8,
    roughness: 0.2,
    emissive: new THREE.Color('#7B2CBF'),
    emissiveIntensity: 0.05,
  }), []);

  const accentMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#7B2CBF'),
    metalness: 0.9,
    roughness: 0.1,
    emissive: new THREE.Color('#7B2CBF'),
    emissiveIntensity: 0.4,
  }), []);

  const eyeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#ffffff'),
    emissive: new THREE.Color('#7B2CBF'),
    emissiveIntensity: 0.8,
    metalness: 0.5,
    roughness: 0.1,
  }), []);

  const glassMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#7B2CBF'),
    metalness: 0.1,
    roughness: 0,
    transmission: 0.9,
    thickness: 0.5,
    ior: 1.5,
    transparent: true,
    opacity: 0.3,
  }), []);

  useFrame((state) => {
    if (!groupRef.current || !headRef.current) return;

    const pointer = state.pointer;
    mouseTarget.current.x = (pointer.x * viewport.width) / 10;
    mouseTarget.current.y = (pointer.y * viewport.height) / 10;

    // Lerp head rotation
    const lerpFactor = 0.05;
    currentRotation.current.x += (mouseTarget.current.y * 0.3 - currentRotation.current.x) * lerpFactor;
    currentRotation.current.y += (mouseTarget.current.x * 0.4 - currentRotation.current.y) * lerpFactor;

    headRef.current.rotation.x = currentRotation.current.x;
    headRef.current.rotation.y = currentRotation.current.y;

    // Eye tracking
    if (leftEyeRef.current && rightEyeRef.current) {
      const eyeLerp = 0.08;
      leftEyeRef.current.position.x = THREE.MathUtils.lerp(
        leftEyeRef.current.position.x, -0.25 + mouseTarget.current.x * 0.05, eyeLerp
      );
      leftEyeRef.current.position.y = THREE.MathUtils.lerp(
        leftEyeRef.current.position.y, 0.15 + mouseTarget.current.y * 0.03, eyeLerp
      );
      rightEyeRef.current.position.x = THREE.MathUtils.lerp(
        rightEyeRef.current.position.x, 0.25 + mouseTarget.current.x * 0.05, eyeLerp
      );
      rightEyeRef.current.position.y = THREE.MathUtils.lerp(
        rightEyeRef.current.position.y, 0.15 + mouseTarget.current.y * 0.03, eyeLerp
      );
    }

    // Breathing
    const time = state.clock.elapsedTime;
    breathScale.current = Math.sin(time * 1.5) * 0.02;
    groupRef.current.scale.setScalar(1 + breathScale.current);

    // Floating
    groupRef.current.position.y = Math.sin(time * 0.8) * 0.15 - 0.5;

    // Subtle idle sway
    groupRef.current.rotation.z = Math.sin(time * 0.5) * 0.02;
  });

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* Body - torso */}
      <mesh position={[0, -1.2, 0]} material={bodyMaterial}>
        <cylinderGeometry args={[0.6, 0.5, 1.4, 8]} />
      </mesh>

      {/* Shoulders */}
      <mesh position={[0, -0.4, 0]} material={bodyMaterial}>
        <boxGeometry args={[1.8, 0.3, 0.6]} />
      </mesh>

      {/* Neck */}
      <mesh position={[0, -0.1, 0]} material={accentMaterial}>
        <cylinderGeometry args={[0.15, 0.2, 0.3, 6]} />
      </mesh>

      {/* Head group */}
      <group ref={headRef} position={[0, 0.5, 0]}>
        {/* Main head - rounded box shape */}
        <mesh material={bodyMaterial}>
          <boxGeometry args={[1, 0.9, 0.85]} />
        </mesh>

        {/* Visor / face plate */}
        <mesh position={[0, 0, 0.43]} material={glassMaterial}>
          <boxGeometry args={[0.8, 0.5, 0.05]} />
        </mesh>

        {/* Eyes */}
        <mesh ref={leftEyeRef} position={[-0.25, 0.15, 0.45]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <primitive object={eyeMaterial} attach="material" />
        </mesh>
        <mesh ref={rightEyeRef} position={[0.25, 0.15, 0.45]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <primitive object={eyeMaterial} attach="material" />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 0.6, 0]} material={accentMaterial}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 6]} />
        </mesh>
        <mesh position={[0, 0.8, 0]} material={accentMaterial}>
          <sphereGeometry args={[0.06, 16, 16]} />
        </mesh>

        {/* Side panels */}
        <mesh position={[-0.55, 0, 0]} material={accentMaterial}>
          <boxGeometry args={[0.08, 0.4, 0.3]} />
        </mesh>
        <mesh position={[0.55, 0, 0]} material={accentMaterial}>
          <boxGeometry args={[0.08, 0.4, 0.3]} />
        </mesh>
      </group>

      {/* Arms */}
      <mesh position={[-1.1, -0.9, 0]} rotation={[0, 0, 0.15]} material={bodyMaterial}>
        <cylinderGeometry args={[0.12, 0.1, 0.9, 6]} />
      </mesh>
      <mesh position={[1.1, -0.9, 0]} rotation={[0, 0, -0.15]} material={bodyMaterial}>
        <cylinderGeometry args={[0.12, 0.1, 0.9, 6]} />
      </mesh>

      {/* Hands */}
      <mesh position={[-1.15, -1.4, 0]} material={accentMaterial}>
        <sphereGeometry args={[0.12, 16, 16]} />
      </mesh>
      <mesh position={[1.15, -1.4, 0]} material={accentMaterial}>
        <sphereGeometry args={[0.12, 16, 16]} />
      </mesh>

      {/* Chest accent */}
      <mesh position={[0, -0.8, 0.3]} material={accentMaterial}>
        <boxGeometry args={[0.3, 0.3, 0.05]} />
      </mesh>

      {/* Waist ring */}
      <mesh position={[0, -1.9, 0]} material={accentMaterial}>
        <torusGeometry args={[0.5, 0.05, 8, 16]} />
      </mesh>
    </group>
  );
};

export default Character3D;
