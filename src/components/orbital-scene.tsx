'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

// Seeded spiral arms: one points draw call, no postprocessing or texture downloads.
function Galaxy({ active, compact }: { active: boolean; compact: boolean }) {
  const group = useRef<THREE.Group>(null);
  const uniforms = useMemo(() => ({ pointSize: { value: compact ? 14 : 20 }, time: { value: 0 } }), [compact]);
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
      // A sparse, deeper field shares the same draw call and particle budget.
      if (i % 9 === 0) {
        positions[i * 3] = (random(i + 6) - .5) * 9;
        positions[i * 3 + 1] = (random(i + 7) - .5) * 3;
        positions[i * 3 + 2] = (random(i + 8) - .5) * 8;
      }
      const color = inner.clone().lerp(outer, Math.min(radius / 3, 1)).multiplyScalar(.55 + random(i + 5) * .65);
      colors.set([color.r, color.g, color.b], i * 3);
    }
    return [positions, colors];
  }, [compact]);
  useFrame((_, delta) => { if (active && group.current) { const step = Math.min(delta, .05); group.current.rotation.y += step * .0216; uniforms.time.value += step; } });
  return <group rotation={[.55, 0, -.3]}><group ref={group}><points><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions, 3]}/><bufferAttribute attach="attributes-color" args={[colors, 3]}/></bufferGeometry><shaderMaterial transparent depthWrite={false} blending={THREE.AdditiveBlending} vertexColors uniforms={uniforms} vertexShader={`varying vec3 vColor; uniform float pointSize; uniform float time; void main(){ float seed=fract(sin(dot(position.xz,vec2(12.9898,78.233)))*43758.5453); float shimmer=seed>.96 ? .82+.18*sin(time*.8+seed*90.0) : 1.0; vColor=color*shimmer; vec4 mv=modelViewMatrix*vec4(position,1.0); gl_Position=projectionMatrix*mv; gl_PointSize=clamp(pointSize/-mv.z,1.0,5.0); }`} fragmentShader={`varying vec3 vColor; void main(){float d=length(gl_PointCoord-.5); if(d>.5) discard; gl_FragColor=vec4(vColor,pow(1.0-d*2.0,2.0)*.8);}`}/></points></group></group>;
}
function ContextRecovery({ onFailure }: { onFailure: () => void }) {
  const gl = useThree(state => state.gl);
  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener('webglcontextlost', onFailure, { once: true });
    return () => canvas.removeEventListener('webglcontextlost', onFailure);
  }, [gl, onFailure]);
  return null;
}
export default function OrbitalScene({ active, compact, onFailure }: { active: boolean; compact: boolean; onFailure: () => void }) {
  return <Canvas camera={{ position: [0, 5.5, 6.5], fov: 47 }} dpr={compact ? 1 : [1, 1.5]} frameloop={active ? 'always' : 'demand'} gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}><ContextRecovery onFailure={onFailure}/><Galaxy active={active} compact={compact}/></Canvas>;
}
