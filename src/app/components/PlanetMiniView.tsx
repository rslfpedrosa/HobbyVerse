import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { PlanetId } from '../data/mockData';

export const PLANET_GLB_MAP: Record<PlanetId, string> = {
  'garden': '/grass_ball.glb',
  'baking': '/baking.glb',
  'woodworking': '/wood_planet.glb',
  'knitting': '/kit-planet.glb',
  'polymer-clay': '/clay.glb',
  'painting': '/painting.glb',
  'pottery': '/pottery.glb',
};

function SpinningGLBModel({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  const { clonedScene, offset, normFactor } = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const size = new THREE.Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);
    const nf = maxDim > 0 ? 1 / maxDim : 1;
    cloned.traverse(obj => { obj.frustumCulled = false; });
    return { clonedScene: cloned, offset: center.negate(), normFactor: nf };
  }, [scene]);

  useFrame((_, delta) => {
    if (groupRef.current) groupRef.current.rotation.y += delta * 0.6;
  });

  return (
    <group ref={groupRef} scale={normFactor}>
      <primitive object={clonedScene} position={[offset.x, offset.y, offset.z]} />
    </group>
  );
}

export function PlanetMiniView({ planetId }: { planetId: PlanetId }) {
  const url = PLANET_GLB_MAP[planetId];
  if (!url) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 2.2], fov: 35 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'default' }}
      style={{ background: 'transparent', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[3, 3, 3]} intensity={1.5} />
      <directionalLight position={[-3, -2, -3]} intensity={0.4} />
      <Suspense fallback={null}>
        <SpinningGLBModel url={url} />
      </Suspense>
    </Canvas>
  );
}
