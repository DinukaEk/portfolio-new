import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Slow outer icosahedron wireframe — the background lattice from the reference
function WireLattice() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  const geo = useMemo(() => new THREE.IcosahedronGeometry(2.4, 1), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.06 + mouse.y * 0.12;
    meshRef.current.rotation.y = t * 0.09 + mouse.x * 0.12;
  });

  return (
    <mesh ref={meshRef} geometry={geo}>
      <meshBasicMaterial color="#c84b2f" wireframe transparent opacity={0.22} />
    </mesh>
  );
}

// Faster inner smaller wireframe for depth
function InnerLattice() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  const geo = useMemo(() => new THREE.IcosahedronGeometry(1.5, 1), []);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = -t * 0.10 - mouse.y * 0.08;
    meshRef.current.rotation.y =  t * 0.14 + mouse.x * 0.08;
  });

  return (
    <mesh ref={meshRef} geometry={geo}>
      <meshBasicMaterial color="#c84b2f" wireframe transparent opacity={0.10} />
    </mesh>
  );
}

// Orbiting particle cloud
function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 100;

  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 2.6 + Math.random() * 1.4;
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return g;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y += 0.0006;
    pointsRef.current.rotation.x += 0.0002;
  });

  return (
    <points ref={pointsRef} geometry={geo}>
      <pointsMaterial size={0.022} color="#c84b2f" transparent opacity={0.65} sizeAttenuation />
    </points>
  );
}

export default function HeroMesh() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0, right: 0,
        /* Match width/position of the CirclePhoto */
        width: '55%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,          /* behind circle (z:3) but above particle field (z:0) */
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[4, 4, 4]} intensity={0.8} color="#c84b2f" />

        <WireLattice />
        <InnerLattice />
        <Particles />
      </Canvas>
    </div>
  );
}
