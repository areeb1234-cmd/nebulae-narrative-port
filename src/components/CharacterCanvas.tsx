import { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';

const Character3D = lazy(() => import('./Character3D'));

const CharacterCanvas = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#7B2CBF" />
        <pointLight position={[-5, 3, 3]} intensity={0.5} color="#9D4EDD" />
        <spotLight
          position={[0, 5, 5]}
          angle={0.3}
          penumbra={1}
          intensity={1.5}
          color="#7B2CBF"
        />
        <directionalLight position={[0, 2, 3]} intensity={0.4} />
        <Suspense fallback={null}>
          <Character3D />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
      {/* Radial glow behind character */}
      <div className="absolute inset-0 radial-glow pointer-events-none" />
    </div>
  );
};

export default CharacterCanvas;
