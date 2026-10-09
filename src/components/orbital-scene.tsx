'use client';
import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

// Seeded spiral arms: one points draw call, no postprocessing or texture downloads.
function Galaxy({ active, compact }: { active: boolean; compact: boolean }) {
  const group = useRef<THREE.Group>(null);
  const [positions, colors] = useMemo(() => {
    const count = compact ? 2600 : 6500, positions = new Float32Array(count * 3), colors = new Float32Array(count * 3);
    const inner = new THREE.Color('#dcc6aa'), outer = new THREE.Color('#497fe8');
    const random = (n: number) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
    for (let i = 0; i < count; i++) {
      const radius = .25 + Math.pow(random(i + 1), .7) * 3.9;
      const angle = (i % 4) * Math.PI / 2 + radius * 1.5;
      const spread = .06 + radius * .12;
      positions[i * 3] = Math.cos(angle) * radius + (random(i + 2) - .5) * spread * 2;
      positions[i * 3 + 1] = (random(i + 3) - .5) * spread * .7;
      positions[i * 3 + 2] = Math.sin(angle) * radius + (random(i + 4) - .5) * spread * 2;
      const color = inner.clone().lerp(outer, Math.min(radius / 3, 1)).multiplyScalar(.55 + random(i + 5) * .65);
      colors.set([color.r, color.g, color.b], i * 3);
    }
    return [positions, colors];
  }, [compact]);
  useFrame((_, delta) => { if (active && group.current) group.current.rotation.y += Math.min(delta, .05) * .018; });
  return <group rotation={[.55, 0, -.3]}><group ref={group}><points><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]}/><bufferAttribute attach="attributes-color" args={[colors, 3]}/></bufferGeometry><shaderMaterial transparent depthWrite={false} blending={THREE.AdditiveBlending} vertexColors uniforms={{ pointSize: { value: compact ? 14 : 20 } }} vertexShader={`varying vec3 vColor; uniform float pointSize; void main(){ vColor=color; vec4 mv=modelViewMatrix*vec4(position,1.0); gl_Position=projectionMatrix*mv; gl_PointSize=clamp(pointSize/-mv.z,1.0,5.0); }`} fragmentShader={`varying vec3 vColor; void main(){float d=length(gl_PointCoord-.5); if(d>.5) discard; gl_FragColor=vec4(vColor,pow(1.0-d*2.0,2.0)*.8);}`}/></points></group></group>;
}
export default function OrbitalScene({ active, compact, onFailure }: { active: boolean; compact: boolean; onFailure: () => void }) {
  return <Canvas camera={{ position: [0, 5.5, 6.5], fov: 47 }} dpr={compact ? 1 : [1, 1.5]} frameloop={active ? 'always' : 'demand'} gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }} onCreated={({ gl }) => { gl.domElement.addEventListener('webglcontextlost', onFailure, { once: true }); }}><Galaxy active={active} compact={compact}/></Canvas>;
}
