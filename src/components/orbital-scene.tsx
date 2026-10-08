'use client';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

function OrbitalSystem({ active, compact }: { active: boolean; compact: boolean }) {
  const group = useRef<THREE.Group>(null);
  const satellites = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const scroll = useRef(0);
  useEffect(() => { const read = () => { scroll.current = Math.min(window.scrollY / window.innerHeight, 1); }; window.addEventListener('scroll', read, { passive: true }); return () => window.removeEventListener('scroll', read); }, []);
  useFrame((state, delta) => {
    if (!active || !group.current || !satellites.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * .18 + scroll.current * .4, .035);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.y * .1, .035);
    satellites.current.rotation.z += Math.min(delta, .05) * .055;
    group.current.position.y = Math.sin(state.clock.elapsedTime * .35) * .055;
  });
  const stars = useMemo(() => {
    const data = new Float32Array((compact ? 45 : 110) * 3);
    for (let i = 0; i < data.length; i++) data[i] = Math.sin(i * 127.1 + 311.7) * (i % 3 === 2 ? 3 : 5);
    return data;
  }, [compact]);
  return <>
    <ambientLight intensity={.45}/><directionalLight position={[-3, 4, 5]} intensity={3.4} color="#f5d4b7"/><pointLight position={[3, -2, 3]} intensity={30} color="#ac624b"/><pointLight position={[-4, 1, -2]} intensity={25} color="#8a9dab"/>
    <points><bufferGeometry><bufferAttribute attach="attributes-position" args={[stars, 3]}/></bufferGeometry><pointsMaterial size={.011} color="#b5aaa0" transparent opacity={.55} sizeAttenuation/></points>
    <group ref={group} rotation={[0, 0, -.3]}>
      <mesh><sphereGeometry args={[.64, compact ? 32 : 64, 32]}/><meshStandardMaterial color="#332722" metalness={.93} roughness={.29}/></mesh>
      <mesh rotation={[.4, .2, .1]}><icosahedronGeometry args={[.72, 1]}/><meshBasicMaterial color="#dba887" wireframe transparent opacity={.23}/></mesh>
      <group rotation={[1.08, .2, -.18]}>
        {[1.08, 1.25, 1.9, 2.55, 2.62, 2.94].map((radius, i) => <mesh key={radius} rotation={[i === 2 ? .3 : 0, i === 3 ? -.18 : 0, 0]}><torusGeometry args={[radius, i === 1 ? .022 : .006, 8, compact ? 100 : 220]}/><meshStandardMaterial color={i === 1 ? '#e3b08c' : '#a98971'} metalness={.7} roughness={.4} transparent opacity={i === 4 ? .3 : .85}/></mesh>)}
        <mesh rotation={[0, 0, -.6]}><torusGeometry args={[2.28, .035, 8, 120, Math.PI * 1.32]}/><meshStandardMaterial color="#c39474" metalness={.85} roughness={.3}/></mesh>
        <mesh rotation={[0, 0, 2.4]}><torusGeometry args={[1.55, .012, 8, 100, Math.PI * 1.55]}/><meshBasicMaterial color="#e2b28e"/></mesh>
        <group ref={satellites}>{[0, 1, 2, 3].map(i => { const angle = i * Math.PI / 2 + .5; const r = [1.25, 1.9, 2.55, 2.94][i]; return <group key={i} position={[Math.cos(angle) * r, Math.sin(angle) * r, 0]}><mesh><sphereGeometry args={[i === 0 ? .13 : .085, 24, 16]}/><meshStandardMaterial color={['#e9b08a', '#bad0ac', '#c9b8de', '#9cbcca'][i]} emissive={['#e9b08a', '#bad0ac', '#c9b8de', '#9cbcca'][i]} emissiveIntensity={.25} metalness={.6} roughness={.25}/></mesh><mesh><ringGeometry args={[.18, .19, 36]}/><meshBasicMaterial color="#cbb7a5" side={THREE.DoubleSide} transparent opacity={.6}/></mesh></group>; })}</group>
        {Array.from({length: compact ? 36 : 72}, (_, i) => {const a = i * Math.PI * 2 / (compact ? 36 : 72); return <mesh key={i} position={[Math.cos(a) * 3.13, Math.sin(a) * 3.13, 0]} rotation={[0, 0, a]}><boxGeometry args={[i % 6 === 0 ? .09 : .03, .009, .008]}/><meshBasicMaterial color="#6b6058"/></mesh>;})}
      </group>
      <group rotation={[.2, 1.1, -.8]}><mesh><torusGeometry args={[2.1, .008, 8, 160]}/><meshStandardMaterial color="#d2b6a0" metalness={.8} roughness={.4}/></mesh></group>
    </group>
  </>;
}
export default function OrbitalScene({ active, compact, onFailure }: { active: boolean; compact: boolean; onFailure: () => void }) {
  return <Canvas camera={{ position: [0, .2, 7.9], fov: 43 }} dpr={compact ? 1 : [1, 1.5]} frameloop={active ? 'always' : 'demand'} gl={{ antialias: !compact, alpha: true, powerPreference: 'low-power' }} onCreated={({ gl }) => { gl.domElement.addEventListener('webglcontextlost', onFailure, { once: true }); }}><OrbitalSystem active={active} compact={compact}/></Canvas>;
}
