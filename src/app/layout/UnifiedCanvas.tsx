import React, { useRef, useState, useMemo, useCallback, Suspense, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, useCursor, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { PLANETS, PlanetId, Contribution } from '../data/mockData';
import { useAppContext } from '../context/AppContext';
import { useScene } from '../context/SceneContext';
import { craftImage } from '../utils/craftImage';
import { STAMP_ILLUSTRATIONS } from '../data/stampIllustrations';

// Camera sits 20 units in front of the planet centroid along Z
const GALAXY_TARGET = PLANETS.reduce(
  (acc, p) => acc.add(new THREE.Vector3(...p.position as [number,number,number])),
  new THREE.Vector3()
).divideScalar(PLANETS.length);
const GALAXY_CAMERA = GALAXY_TARGET.clone().add(new THREE.Vector3(0, 0, 20));

// ─── Shared GLB planet model (auto-centers on load) ──────────────────────────
// normalize=true scales the model so its largest bounding-box dimension equals 1,
// making the visual size consistent regardless of how the GLB was authored.
function GLBPlanetModel({ modelRef, scale, url, normalize = false }: { modelRef: React.MutableRefObject<THREE.Group | null>; scale: number; url: string; normalize?: boolean }) {
  const { scene } = useGLTF(url);
  const { clonedScene, offset, normFactor } = useMemo(() => {
    const cloned = scene.clone(true);
    const box = new THREE.Box3().setFromObject(cloned);
    const center = new THREE.Vector3();
    box.getCenter(center);
    let nf = 1;
    if (normalize) {
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim > 0) nf = 1 / maxDim;
    }
    cloned.traverse(obj => { obj.frustumCulled = false; });
    return { clonedScene: cloned, offset: center.negate(), normFactor: nf };
  }, [scene, normalize]);
  return (
    <group ref={modelRef} scale={scale * normFactor} frustumCulled={false}>
      <primitive object={clonedScene} position={[offset.x, offset.y, offset.z]} />
    </group>
  );
}
useGLTF.preload('/wood_planet.glb');
useGLTF.preload('/garden-planet.glb');
useGLTF.preload('/baking.glb');
useGLTF.preload('/quit.glb');
useGLTF.preload('/clay.glb');
useGLTF.preload('/painting.glb');
useGLTF.preload('/pottery.glb');

// ─── Nebula background sphere ────────────────────────────────────────────────
function NebulaBackground({ opacityTarget }: { opacityTarget: number }) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame((_, delta) => {
    if (matRef.current) {
      matRef.current.opacity = THREE.MathUtils.lerp(matRef.current.opacity, opacityTarget, delta * 2);
    }
  });

  const texture = useMemo(() => {
    const size = 2048;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    // Deep space base — near-black with a very faint violet cast matching #615fff
    ctx.fillStyle = '#03020e';
    ctx.fillRect(0, 0, size, size);

    // Smooth radial gradient stain — extra stops for softer, more gradual falloff.
    // Seam-safe rule: stains at cx=0.5*size are safe at any radius;
    // off-center stains need cx > r AND (size - cx) > r.
    const stain = (cx: number, cy: number, r: number, red: number, grn: number, b: number, a: number) => {
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0,    `rgba(${red},${grn},${b},${a})`);
      grad.addColorStop(0.25, `rgba(${red},${grn},${b},${+(a * 0.78).toFixed(3)})`);
      grad.addColorStop(0.50, `rgba(${red},${grn},${b},${+(a * 0.45).toFixed(3)})`);
      grad.addColorStop(0.70, `rgba(${red},${grn},${b},${+(a * 0.18).toFixed(3)})`);
      grad.addColorStop(0.87, `rgba(${red},${grn},${b},${+(a * 0.04).toFixed(3)})`);
      grad.addColorStop(1.0,  `rgba(${red},${grn},${b},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, size, size);
    };

    // Palette anchored to #615fff (97,95,255) — dark/deep versions of that hue family:
    // deep violet (25,8,85), dark plum (55,8,95), rose-violet (80,15,115), deep indigo (18,8,110)

    // === LARGE SWEEP LAYERS — all on cx=0.5, seam-safe at any radius ===
    stain(size*0.50, size*0.50, size*0.96,  25,  8,  85, 0.62);  // base — dark violet echoing #615fff
    stain(size*0.50, size*0.82, size*0.72,  55,  8,  95, 0.48);  // south — deep plum
    stain(size*0.50, size*0.18, size*0.70,  18,  8, 110, 0.36);  // north — deep indigo (darker, less blue)
    stain(size*0.50, size*0.50, size*0.65,  40,  5,  78, 0.30);  // mid — very dark violet depth

    // === MEDIUM COLOR POCKETS — all seam-safe ===
    stain(size*0.35, size*0.25, size*0.30,  80, 15, 115, 0.26);  // upper-left:  dark rose-violet
    stain(size*0.65, size*0.25, size*0.28,  18,  8, 112, 0.22);  // upper-right: deep indigo
    stain(size*0.30, size*0.68, size*0.28,  60, 10,  92, 0.26);  // lower-left:  dark plum-violet
    stain(size*0.70, size*0.70, size*0.28,  72, 12, 108, 0.22);  // lower-right: magenta-violet
    stain(size*0.38, size*0.50, size*0.22,  10, 38, 100, 0.16);  // mid-left:    very faint teal accent
    stain(size*0.62, size*0.52, size*0.22,  85, 18, 105, 0.18);  // mid-right:   warm violet

    // === GALACTIC CENTER — dark version of #615fff, never white ===
    stain(size*0.50, size*0.50, size*0.30,  75, 55, 175, 0.28);  // core halo — dark echo of main color
    stain(size*0.50, size*0.50, size*0.12,  90, 72, 195, 0.20);  // inner glow — slightly lighter violet
    stain(size*0.50, size*0.50, size*0.04, 105, 88, 210, 0.14);  // center — closest to #615fff, still dim

    // === BAKED STAR FIELD — 1×1 px fills guarantee no empty patches anywhere on the sphere ===
    let s = 0xdeadbeef;
    const rng = () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };

    // Dim background stars — single pixel, very faint
    for (let i = 0; i < 10000; i++) {
      const x = Math.floor(rng() * size);
      const y = Math.floor(rng() * size);
      const a = (0.06 + rng() * 0.22).toFixed(2);
      const v = Math.round(155 + rng() * 85);
      ctx.fillStyle = `rgba(${v},${v},255,${a})`;
      ctx.fillRect(x, y, 1, 1);
    }

    // Medium stars — 1px core + faint cross halo, still looks like a pinpoint
    for (let i = 0; i < 1200; i++) {
      const x = Math.floor(rng() * size);
      const y = Math.floor(rng() * size);
      const a = parseFloat((0.25 + rng() * 0.45).toFixed(2));
      const v = Math.round(205 + rng() * 50);
      ctx.fillStyle = `rgba(${v},${v},255,${a.toFixed(2)})`;
      ctx.fillRect(x, y, 1, 1);
      ctx.fillStyle = `rgba(${v},${v},255,${(a * 0.25).toFixed(2)})`;
      ctx.fillRect(x - 1, y, 1, 1);
      ctx.fillRect(x + 1, y, 1, 1);
      ctx.fillRect(x, y - 1, 1, 1);
      ctx.fillRect(x, y + 1, 1, 1);
    }

    const tex = new THREE.CanvasTexture(canvas);
    return tex;
  }, []);

  return (
    <mesh>
      <sphereGeometry args={[280, 64, 64]} />
      <meshBasicMaterial
        ref={matRef}
        map={texture}
        side={THREE.BackSide}
        depthWrite={false}
        transparent
        opacity={1}
      />
    </mesh>
  );
}

// ─── Custom star field with smooth opacity transitions ────────────────────
function StarField({ opacityTarget }: { opacityTarget: number }) {
  const mat1Ref = useRef<THREE.PointsMaterial>(null);
  const mat2Ref = useRef<THREE.PointsMaterial>(null);
  const mat3Ref = useRef<THREE.PointsMaterial>(null);
  const mat4Ref = useRef<THREE.PointsMaterial>(null);
  const timeRef = useRef(0);

  const starTexture = useMemo(() => {
    // Sharp point-star: hard bright core, very short diffraction halo
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    grad.addColorStop(0,    'rgba(255,255,255,1)');
    grad.addColorStop(0.06, 'rgba(255,255,255,1)');
    grad.addColorStop(0.18, 'rgba(240,245,255,0.65)');
    grad.addColorStop(0.38, 'rgba(220,230,255,0.15)');
    grad.addColorStop(0.65, 'rgba(210,220,255,0.03)');
    grad.addColorStop(1,    'rgba(200,215,255,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);
    return new THREE.CanvasTexture(canvas);
  }, []);

  const { deepGeo, smallGeo, largeGeo, giantGeo } = useMemo(() => {
    // Deterministic RNG for consistent stars across hot-reloads
    let seed = 0xabcdef01;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) & 0xffffffff;
      return (seed >>> 0) / 0xffffffff;
    };

    // Deep background layer at large radius — fills in the dark nebula patches
    const deepPos: number[] = [];
    const deepColors: number[] = [];
    for (let i = 0; i < 40000; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = 220 + rand() * 50;
      deepPos.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      );
      const b = 0.30 + rand() * 0.35;
      deepColors.push(b * 0.88, b * 0.93, b);
    }
    const dg = new THREE.BufferGeometry();
    dg.setAttribute('position', new THREE.Float32BufferAttribute(deepPos, 3));
    dg.setAttribute('color', new THREE.Float32BufferAttribute(deepColors, 3));

    const smallPos: number[] = [];
    const smallColors: number[] = [];
    for (let i = 0; i < 40000; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = 85 + rand() * 120;
      smallPos.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      );
      const type = rand();
      const b = 0.55 + rand() * 0.45;
      if (type < 0.08) {
        smallColors.push(b, b * 0.80, b * 0.50);       // warm orange/yellow
      } else if (type < 0.22) {
        smallColors.push(b * 0.82, b * 0.90, b);       // hot blue-white
      } else {
        smallColors.push(b * 0.90, b * 0.94, b);       // cool blue-white (most)
      }
    }
    const sg = new THREE.BufferGeometry();
    sg.setAttribute('position', new THREE.Float32BufferAttribute(smallPos, 3));
    sg.setAttribute('color', new THREE.Float32BufferAttribute(smallColors, 3));

    const largePos: number[] = [];
    const largeColors: number[] = [];
    for (let i = 0; i < 2000; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = 80 + rand() * 130;
      largePos.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      );
      const type = rand();
      if (type < 0.25) {
        largeColors.push(0.65, 0.82, 1.0);   // blue giant
      } else if (type < 0.42) {
        largeColors.push(1.0,  0.82, 0.55);  // orange giant
      } else if (type < 0.54) {
        largeColors.push(1.0,  0.95, 0.70);  // yellow-white
      } else {
        largeColors.push(1.0,  1.0,  1.0);   // pure white
      }
    }
    const lg = new THREE.BufferGeometry();
    lg.setAttribute('position', new THREE.Float32BufferAttribute(largePos, 3));
    lg.setAttribute('color', new THREE.Float32BufferAttribute(largeColors, 3));

    // A small number of very bright "close" stars — visibly larger than the rest
    const giantPos: number[] = [];
    const giantColors: number[] = [];
    for (let i = 0; i < 150; i++) {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = 75 + rand() * 130;
      giantPos.push(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi),
      );
      const type = rand();
      if (type < 0.30) {
        giantColors.push(0.60, 0.78, 1.0);   // blue supergiant
      } else if (type < 0.55) {
        giantColors.push(1.0,  0.75, 0.42);  // orange supergiant
      } else if (type < 0.72) {
        giantColors.push(1.0,  0.92, 0.60);  // yellow supergiant
      } else {
        giantColors.push(1.0,  1.0,  1.0);   // brilliant white
      }
    }
    const gg = new THREE.BufferGeometry();
    gg.setAttribute('position', new THREE.Float32BufferAttribute(giantPos, 3));
    gg.setAttribute('color', new THREE.Float32BufferAttribute(giantColors, 3));

    return { deepGeo: dg, smallGeo: sg, largeGeo: lg, giantGeo: gg };
  }, []);

  useFrame((_, delta) => {
    timeRef.current += delta;
    const speed = delta * 2;
    // Subtle sinusoidal twinkle on the bright stars
    const twinkle = opacityTarget * (0.72 + 0.28 * Math.sin(timeRef.current * 0.7));
    if (mat1Ref.current) mat1Ref.current.opacity = THREE.MathUtils.lerp(mat1Ref.current.opacity, opacityTarget * 0.55, speed);
    if (mat2Ref.current) mat2Ref.current.opacity = THREE.MathUtils.lerp(mat2Ref.current.opacity, opacityTarget, speed);
    if (mat3Ref.current) mat3Ref.current.opacity = THREE.MathUtils.lerp(mat3Ref.current.opacity, twinkle, speed * 0.4);
    if (mat4Ref.current) mat4Ref.current.opacity = THREE.MathUtils.lerp(mat4Ref.current.opacity, opacityTarget * (0.80 + 0.20 * Math.sin(timeRef.current * 0.3)), speed * 0.25);
  });

  return (
    <>
      <points geometry={deepGeo}>
        <pointsMaterial
          ref={mat1Ref}
          map={starTexture}
          size={1.5}
          sizeAttenuation={false}
          vertexColors
          transparent
          opacity={opacityTarget * 0.55}
          depthWrite={false}
          alphaTest={0.01}
        />
      </points>
      <points geometry={smallGeo}>
        <pointsMaterial
          ref={mat2Ref}
          map={starTexture}
          size={2.2}
          sizeAttenuation={false}
          vertexColors
          transparent
          opacity={opacityTarget}
          depthWrite={false}
          alphaTest={0.01}
        />
      </points>
      <points geometry={largeGeo}>
        <pointsMaterial
          ref={mat3Ref}
          map={starTexture}
          size={4.5}
          sizeAttenuation={false}
          vertexColors
          transparent
          opacity={opacityTarget}
          depthWrite={false}
          alphaTest={0.01}
        />
      </points>
      <points geometry={giantGeo}>
        <pointsMaterial
          ref={mat4Ref}
          map={starTexture}
          size={9.5}
          sizeAttenuation={false}
          vertexColors
          transparent
          opacity={opacityTarget}
          depthWrite={false}
          alphaTest={0.01}
        />
      </points>
    </>
  );
}

function FallbackSphere({ size, color }: { size: number; color: string }) {
  const obj = useMemo(() => {
    const geo = new THREE.SphereGeometry(size, 32, 32);
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.8 });
    return new THREE.Mesh(geo, mat);
  }, [size, color]);
  return <primitive object={obj} />;
}

// ─── Per-planet sphere + hover label ───────────────────────────────────────
function PlanetMesh({
  planet,
  onWarp,
  clickable,
  showMarkers,
  contributions,
  stampCount,
  opacityTarget,
}: {
  planet: typeof PLANETS[0];
  onWarp: (id: PlanetId, pos: THREE.Vector3) => void;
  clickable: boolean;
  showMarkers: boolean;
  contributions: Contribution[];
  stampCount: number;
  opacityTarget: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const rotatingGroupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshStandardMaterial>(null);
  const glbGroupRef = useRef<THREE.Group | null>(null);
  const glowMatRef = useRef<THREE.SpriteMaterial>(null);
  const opacityRef = useRef(opacityTarget);
  const [hovered, setHovered] = useState(false);
  const { setSelectedContribution, selectedContribution } = useScene();

  // Delayed unmount so exit animation can play
  const [shouldRenderMarkers, setShouldRenderMarkers] = useState(showMarkers);
  const [markersVisible, setMarkersVisible] = useState(showMarkers);
  const markerTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (markerTimerRef.current) clearTimeout(markerTimerRef.current);
    if (showMarkers) {
      setShouldRenderMarkers(true);
      requestAnimationFrame(() => setMarkersVisible(true));
    } else {
      setMarkersVisible(false);
      markerTimerRef.current = setTimeout(() => setShouldRenderMarkers(false), 500);
    }
    return () => { if (markerTimerRef.current) clearTimeout(markerTimerRef.current); };
  }, [showMarkers]);
  const selectedContributionRef = useRef(selectedContribution);
  selectedContributionRef.current = selectedContribution;
  const isGarden = planet.id === 'garden';
  const isBaking = planet.id === 'baking';
  const isWoodworking = planet.id === 'woodworking';
  const isKnitting = planet.id === 'knitting';
  const isPolymerClay = planet.id === 'polymer-clay';
  const isPainting = planet.id === 'painting';
  const isPottery = planet.id === 'pottery';
  const isGLBPlanet = isGarden || isBaking || isWoodworking || isKnitting || isPolymerClay || isPainting || isPottery;
  useCursor(hovered && clickable);

  const glowTexture = useMemo(() => {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const c = size / 2;
    const hex = planet.palette.color;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const grad = ctx.createRadialGradient(c, c, 0, c, c, c);
    grad.addColorStop(0.0,  `rgba(${r},${g},${b},0.35)`);
    grad.addColorStop(0.2,  `rgba(${r},${g},${b},0.25)`);
    grad.addColorStop(0.4,  `rgba(${r},${g},${b},0.08)`);
    grad.addColorStop(0.6,  `rgba(${r},${g},${b},0.02)`);
    grad.addColorStop(0.75, `rgba(${r},${g},${b},0.0)`);
    grad.addColorStop(1.0,  `rgba(${r},${g},${b},0.0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    return new THREE.CanvasTexture(canvas);
  }, [planet.palette.color]);

  useFrame((_, delta) => {
    // Rotate the whole planet+pins group so markers follow the planet
    if (rotatingGroupRef.current && !selectedContributionRef.current) rotatingGroupRef.current.rotation.y += delta * 0.08;

    if (isGLBPlanet) {
      // Fade in fast, fade out slow — planets reappear immediately when returning to galaxy
      const lerpSpeed = opacityTarget > opacityRef.current ? delta * 10 : delta * 3;
      opacityRef.current = THREE.MathUtils.lerp(opacityRef.current, opacityTarget, lerpSpeed);
      const fullyOpaque = opacityRef.current >= 0.99;
      if (glbGroupRef.current) {
        glbGroupRef.current.traverse((child) => {
          const mesh = child as THREE.Mesh;
          if (mesh.isMesh) {
            const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
            mats.forEach((m) => {
              const mat = m as THREE.MeshStandardMaterial;
              const needsTransparent = !fullyOpaque;
              if (mat.transparent !== needsTransparent) {
                mat.transparent = needsTransparent;
                mat.depthWrite = !needsTransparent;
                mat.needsUpdate = true;
              }
              mat.opacity = fullyOpaque ? 1 : opacityRef.current;
            });
          }
        });
      }
      if (groupRef.current) groupRef.current.visible = opacityRef.current > 0.01;
    } else {
      if (matRef.current) {
        const lerpSpeed = opacityTarget > opacityRef.current ? delta * 10 : delta * 3;
        opacityRef.current = THREE.MathUtils.lerp(opacityRef.current, opacityTarget, lerpSpeed);
        matRef.current.opacity = opacityRef.current;
        if (groupRef.current) groupRef.current.visible = opacityRef.current > 0.01;
      }
    }
    if (matRef.current) {
      matRef.current.emissiveIntensity = hovered && clickable
        ? THREE.MathUtils.lerp(matRef.current.emissiveIntensity, 0.3, delta * 6)
        : THREE.MathUtils.lerp(matRef.current.emissiveIntensity, 0.08, delta * 4);
    }
    if (glowMatRef.current) {
      const boost = hovered && clickable ? 0.9 : 0.55;
      const target = clickable ? opacityRef.current * boost : 0;
      glowMatRef.current.opacity = THREE.MathUtils.lerp(glowMatRef.current.opacity, target, delta * 3);
    }
  });

  const pos = useMemo(() => new THREE.Vector3(...planet.position), []);

  return (
    <group ref={groupRef}>
      {/* Rotating group: planet sphere/model + markers all rotate together */}
      <group ref={rotatingGroupRef} position={pos}>
        <mesh
          ref={meshRef}
          onClick={(e) => {
            if (!clickable) return;
            e.stopPropagation();
            onWarp(planet.id, pos);
          }}
          onPointerOver={(e) => {
            if (!clickable) return;
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
        >
          {isGLBPlanet ? (
            <>
              <sphereGeometry args={[planet.size, 8, 8]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </>
          ) : (
            <>
              <sphereGeometry args={[planet.size, 64, 64]} />
              <meshStandardMaterial
                ref={matRef}
                transparent
                color={planet.palette.color}
                roughness={planet.textureConfig.roughness}
                bumpScale={planet.textureConfig.bumpScale}
                emissive={planet.palette.color}
                emissiveIntensity={0.08}
                metalness={showMarkers ? 0.1 : 0}
              />
            </>
          )}
          {hovered && clickable && (
            <Html center position={[0, planet.size + 1.0, 0]} className="pointer-events-none" zIndexRange={[1, 0]}>
              <div style={{
                background: 'rgba(5, 8, 15, 0.90)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '18px',
                border: '1px solid rgba(255,255,255,0.09)',
                boxShadow: `0 0 0 1px ${planet.palette.color}35, 0 0 40px ${planet.palette.color}28, 0 16px 48px rgba(0,0,0,0.75)`,
                width: '210px',
                textAlign: 'center',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '3px',
                  background: `linear-gradient(90deg, transparent, ${planet.palette.color}, transparent)`,
                }} />
                <div style={{ padding: '14px 20px 16px' }}>
                  <div style={{
                    fontFamily: 'Instrument Serif, serif',
                    fontStyle: 'italic',
                    fontSize: '1.75rem',
                    color: 'white',
                    letterSpacing: '-0.01em',
                    lineHeight: 1.1,
                    marginBottom: '6px',
                  }}>{planet.name}</div>
                  <div style={{
                    fontSize: '0.688rem',
                    color: 'rgba(255,255,255,0.48)',
                    fontFamily: 'Instrument Sans, sans-serif',
                    lineHeight: 1.45,
                    marginBottom: '10px',
                    whiteSpace: 'normal',
                  }}>{planet.description}</div>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    background: `linear-gradient(135deg, ${planet.palette.color}22, ${planet.palette.color}10)`,
                    border: `1px solid ${planet.palette.color}50`,
                    borderRadius: '100px',
                    padding: '3px 12px',
                    fontSize: '0.688rem',
                    color: 'rgba(255,255,255,0.78)',
                    fontFamily: 'Instrument Sans, sans-serif',
                    fontWeight: 500,
                    whiteSpace: 'nowrap',
                  }}>
                    <span style={{ opacity: 0.75, fontSize: '0.6rem' }}>✦</span>
                    {stampCount} {stampCount === 1 ? 'stamp' : 'stamps'}
                  </div>
                </div>
              </div>
            </Html>
          )}
        </mesh>

        {isGarden && <Suspense fallback={null}><GLBPlanetModel modelRef={glbGroupRef} scale={planet.size * 2} url="/garden-planet.glb" normalize /></Suspense>}
        {isBaking && <Suspense fallback={null}><GLBPlanetModel modelRef={glbGroupRef} scale={planet.size * 2} url="/baking.glb" normalize /></Suspense>}
        {isWoodworking && <Suspense fallback={null}><GLBPlanetModel modelRef={glbGroupRef} scale={planet.size * 2} url="/wood_planet.glb" normalize /></Suspense>}
        {isKnitting && <Suspense fallback={<FallbackSphere size={planet.size} color="#b0b8e8" />}><GLBPlanetModel modelRef={glbGroupRef} scale={planet.size * 2} url="/quit.glb" normalize /></Suspense>}
        {isPolymerClay && <Suspense fallback={null}><GLBPlanetModel modelRef={glbGroupRef} scale={planet.size * 2} url="/clay.glb" normalize /></Suspense>}
        {isPainting && <Suspense fallback={null}><GLBPlanetModel modelRef={glbGroupRef} scale={planet.size * 2} url="/painting.glb" normalize /></Suspense>}
        {isPottery && <Suspense fallback={null}><GLBPlanetModel modelRef={glbGroupRef} scale={planet.size * 2} url="/pottery.glb" normalize /></Suspense>}

        {shouldRenderMarkers && (() => {
          const maxEngagement = contributions.reduce((m, c) => Math.max(m, c.likes + c.comments.length), 1);
          return contributions.map((c, i) => (
            <ContributionMarker
              key={c.id}
              contribution={c}
              planetSize={planet.size}
              planetRef={meshRef}
              maxEngagement={maxEngagement}
              onClick={() => setSelectedContribution(c)}
              visible={markersVisible}
              index={i}
              isOwn={c.makerId === 'me'}
            />
          ));
        })()}
      </group>

      {/* Glow sprite stays centered on planet but doesn't rotate */}
      <sprite position={pos} scale={[planet.size * 7, planet.size * 7, 1]}>
        <spriteMaterial
          ref={glowMatRef}
          map={glowTexture}
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          depthTest={false}
        />
      </sprite>
    </group>
  );
}

// ─── Contribution marker on planet surface ──────────────────────────────────
function ContributionMarker({
  contribution,
  planetSize,
  planetRef,
  maxEngagement,
  onClick,
  visible,
  index,
  isOwn,
}: {
  contribution: Contribution;
  planetSize: number;
  planetRef: React.RefObject<THREE.Mesh>;
  maxEngagement: number;
  onClick: () => void;
  visible: boolean;
  index: number;
  isOwn: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (!visible) {
      setEntered(false);
      return;
    }
    const t = setTimeout(() => setEntered(true), index * 55);
    return () => clearTimeout(t);
  }, [visible, index]);

  // Position is relative to the rotating group origin (planet center)
  const pos = useMemo(() => {
    const phi = Math.PI / 2 - contribution.lat;
    const theta = contribution.lon;
    const r = planetSize * 1.05;
    return new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta),
    );
  }, [contribution.lat, contribution.lon, planetSize]);

  const engagement = contribution.likes + contribution.comments.length;
  const normalized = maxEngagement > 0 ? Math.sqrt(engagement / maxEngagement) : 0;
  const pinSizePx = Math.round(44 + 40 * normalized);

  return (
    <group position={pos}>
      <mesh
        visible={false}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
      >
        <sphereGeometry args={[planetSize * 0.13, 16, 16]} />
        <meshBasicMaterial />
      </mesh>
      <Html
        center
        occlude={[planetRef] as React.RefObject<THREE.Object3D>[]}
        style={{
          opacity: entered ? 1 : 0,
          transform: `scale(${entered ? 1 : 0})`,
          transition: entered
            ? 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease-out'
            : 'transform 0.2s ease-in, opacity 0.2s ease-in',
        }}
        zIndexRange={[1, 0]}
      >
        <div style={{ position: 'relative', display: 'inline-block' }}>
          {isOwn && (
            <div style={{
              position: 'absolute',
              inset: -3,
              borderRadius: '50%',
              background: 'conic-gradient(from 0deg, #6366f1, #a78bfa, #818cf8, #6366f1)',
              zIndex: 0,
              animation: 'spin 4s linear infinite',
            }} />
          )}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              width: pinSizePx,
              height: pinSizePx,
              borderRadius: '50%',
              overflow: 'hidden',
              border: isOwn ? '2.5px solid #818cf8' : '2px solid rgba(255,255,255,0.4)',
              boxShadow: isOwn
                ? `0 0 0 2px rgba(99,102,241,0.5), 0 4px 16px rgba(99,102,241,0.5)`
                : '0 2px 8px rgba(0,0,0,0.4)',
              transform: `scale(${hovered ? 1.12 : 1})`,
              transition: 'transform 0.15s ease-out',
              cursor: 'pointer',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={(e) => { e.stopPropagation(); onClick(); }}
          >
            <img
              src={contribution.image || STAMP_ILLUSTRATIONS[contribution.id] || craftImage(contribution.id, contribution.planetId, contribution.title)}
              alt={contribution.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.currentTarget;
                img.onerror = null;
                img.src = STAMP_ILLUSTRATIONS[contribution.id] || craftImage(contribution.id, contribution.planetId, contribution.title);
              }}
            />
          </div>
          {isOwn && (
            <div style={{
              position: 'absolute',
              bottom: -1,
              right: -1,
              width: 16,
              height: 16,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #a78bfa)',
              border: '1.5px solid rgba(255,255,255,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2,
              fontSize: 9,
              color: 'white',
              fontWeight: 700,
            }}>
              ✦
            </div>
          )}
        </div>
      </Html>
    </group>
  );
}

// ─── Camera controller ───────────────────────────────────────────────────────
type CamMode = 'idle' | 'zoomIn' | 'zoomOut';

function CameraController({
  mode,
  zoomTarget,
  zoomTargetSize,
  onZoomInNavigate,
  onZoomInComplete,
  onZoomOutDone,
}: {
  mode: CamMode;
  zoomTarget: THREE.Vector3 | null;
  zoomTargetSize: number;
  onZoomInNavigate: () => void;  // fires at 85% — update URL
  onZoomInComplete: () => void;  // fires at 100% — release OrbitControls
  onZoomOutDone: () => void;
}) {
  const progressRef = useRef(0);
  const startPosRef = useRef<THREE.Vector3 | null>(null);
  const startLookRef = useRef<THREE.Vector3 | null>(null);
  const navigatedRef = useRef(false);
  const completedRef = useRef(false);
  const prevModeRef = useRef<CamMode>(mode);

  useFrame((state, delta) => {
    // Reset all state when mode changes
    if (prevModeRef.current !== mode) {
      prevModeRef.current = mode;
      progressRef.current = 0;
      startPosRef.current = null;
      startLookRef.current = null;
      navigatedRef.current = false;
      completedRef.current = false;
    }

    if (mode === 'zoomIn' && zoomTarget) {
      if (!startPosRef.current) {
        // Capture where the camera is and where it's looking right now
        startPosRef.current = state.camera.position.clone();
        const dir = new THREE.Vector3();
        state.camera.getWorldDirection(dir);
        // Project a point 20 units ahead as the "current look target"
        startLookRef.current = state.camera.position.clone().add(dir.multiplyScalar(20));
      }

      progressRef.current = Math.min(1, progressRef.current + delta * 0.38);
      const p = progressRef.current;
      // Ease-in-out cubic: smooth acceleration then smooth deceleration into landing
      const t = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;

      const dest = zoomTarget.clone().add(new THREE.Vector3(0, 0, zoomTargetSize * 5));
      state.camera.position.lerpVectors(startPosRef.current, dest, t);

      // Lerp the look target too — no snap
      const lookNow = new THREE.Vector3().lerpVectors(startLookRef.current!, zoomTarget, t);
      state.camera.lookAt(lookNow);

      if (progressRef.current >= 0.85 && !navigatedRef.current) {
        navigatedRef.current = true;
        onZoomInNavigate();
      }
      if (progressRef.current >= 1 && !completedRef.current) {
        completedRef.current = true;
        onZoomInComplete();
      }
    }

    if (mode === 'zoomOut') {
      if (!startPosRef.current) {
        startPosRef.current = state.camera.position.clone();
        const dir = new THREE.Vector3();
        state.camera.getWorldDirection(dir);
        startLookRef.current = state.camera.position.clone().add(dir.multiplyScalar(20));
      }

      progressRef.current = Math.min(1, progressRef.current + delta * 0.45);
      const t = 1 - Math.pow(1 - progressRef.current, 2.5);

      state.camera.position.lerpVectors(startPosRef.current, GALAXY_CAMERA, t);

      // Lerp look from planet toward galaxy center
      const lookNow = new THREE.Vector3().lerpVectors(startLookRef.current!, GALAXY_TARGET, t);
      state.camera.lookAt(lookNow);

      if (progressRef.current >= 1 && !completedRef.current) {
        completedRef.current = true;
        onZoomOutDone();
      }
    }
  });

  return null;
}

// ─── Scene (inside Canvas, has R3F context) ─────────────────────────────────
function Scene() {
  const navigate = useNavigate();
  const location = useLocation();
  const { contributions, planets } = useAppContext();
  const { isZoomingOut, endZoomOut, startWarp } = useScene();

  const match = location.pathname.match(/^\/planet\/(.+)/);
  const currentPlanetId = match?.[1] as PlanetId | undefined;
  const currentPlanet = currentPlanetId ? planets.find(p => p.id === currentPlanetId) : undefined;

  // warpTo: active from click → zoom fully complete (not just navigate)
  const [warpTo, setWarpTo] = useState<{ id: PlanetId; pos: THREE.Vector3; size: number } | null>(null);
  const warpToRef = useRef(warpTo);
  warpToRef.current = warpTo;

  const handlePlanetWarp = useCallback((id: PlanetId, pos: THREE.Vector3) => {
    if (warpTo || currentPlanet || isZoomingOut) return;
    const planet = planets.find(p => p.id === id)!;
    startWarp();
    setWarpTo({ id, pos, size: planet.size });
  }, [warpTo, currentPlanet, isZoomingOut, startWarp, planets]);

  // At 85%: update URL (UI switches, but camera keeps going)
  const handleZoomInNavigate = useCallback(() => {
    const id = warpToRef.current?.id;
    if (id) navigate(`/planet/${id}`);
  }, [navigate]);

  // At 100%: release warpTo so OrbitControls can take over
  const handleZoomInComplete = useCallback(() => {
    setWarpTo(null);
  }, []);

  const camMode: CamMode = warpTo ? 'zoomIn' : isZoomingOut ? 'zoomOut' : 'idle';

  const planetContributions = currentPlanet
    ? contributions.filter(c => c.planetId === currentPlanet.id)
    : [];

  const stampCountByPlanet = useMemo(() => {
    const counts: Record<string, number> = {};
    contributions.forEach(c => { counts[c.planetId] = (counts[c.planetId] ?? 0) + 1; });
    return counts;
  }, [contributions]);

  const orbitTarget = currentPlanet ? new THREE.Vector3(...currentPlanet.position) : GALAXY_TARGET;
  // Keep OrbitControls disabled until zoom-in fully completes, and during zoom-out
  const orbitEnabled = camMode === 'idle';
  const isGalaxy = !currentPlanet && !warpTo && !isZoomingOut;

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[10, 10, 10]} intensity={2.0} />
      <directionalLight position={[-10, -10, -10]} intensity={0.8} />

      <NebulaBackground opacityTarget={currentPlanetId ? 0 : 1} />
      <StarField opacityTarget={currentPlanetId ? 0 : 1} />

      {planets.map(planet => {
        const opacityTarget = (isGalaxy || isZoomingOut || warpTo || planet.id === currentPlanetId) ? 1 : 0;
        return (
          <PlanetMesh
            key={planet.id}
            planet={planet}
            onWarp={handlePlanetWarp}
            clickable={isGalaxy}
            showMarkers={planet.id === currentPlanetId}
            contributions={planetContributions}
            stampCount={stampCountByPlanet[planet.id] ?? 0}
            opacityTarget={opacityTarget}
          />
        );
      })}

      <OrbitControls
        enabled={orbitEnabled}
        target={orbitTarget}
        autoRotate={isGalaxy}
        autoRotateSpeed={0.25}
        enableDamping
        dampingFactor={0.05}
        minDistance={currentPlanet ? currentPlanet.size * 1.5 : 5}
        maxDistance={currentPlanet ? currentPlanet.size * 10 : 40}
        enablePan={isGalaxy}
        enableZoom
        enableRotate
      />

      <CameraController
        mode={camMode}
        zoomTarget={warpTo?.pos ?? null}
        zoomTargetSize={warpTo?.size ?? 2}
        onZoomInNavigate={handleZoomInNavigate}
        onZoomInComplete={handleZoomInComplete}
        onZoomOutDone={endZoomOut}
      />

    </>
  );
}

// ─── Persistent canvas (never remounts) ─────────────────────────────────────
export default function UnifiedCanvas() {
  // On direct load / refresh into a planet route, start the camera near that
  // planet instead of at the galaxy view — R3F only reads `camera` on mount.
  const location = useLocation();
  const { planets } = useAppContext();
  const match = location.pathname.match(/^\/planet\/(.+)/);
  const initialPlanet = match?.[1] ? planets.find(p => p.id === match[1]) : undefined;
  const initCamPos = initialPlanet
    ? new THREE.Vector3(...initialPlanet.position as [number, number, number]).add(
        new THREE.Vector3(0, 0, initialPlanet.size * 5)
      )
    : GALAXY_CAMERA;

  return (
    <div className="absolute inset-0">
      <Canvas camera={{ position: [initCamPos.x, initCamPos.y, initCamPos.z], fov: 45 }} gl={{ alpha: true }}>
        <Scene />
      </Canvas>
    </div>
  );
}
