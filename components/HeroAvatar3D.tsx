'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Environment, Float } from '@react-three/drei'
import { Suspense, useRef } from 'react'
import type { Group } from 'three'

type AvatarProps = {
  modelPath?: string
}

function AvatarModel({ modelPath = '/models/avatar.glb' }: AvatarProps) {
  const group = useRef<Group>(null)
  const { scene } = useGLTF(modelPath, true)

  return (
    <group ref={group} dispose={null}>
      {/* Slight initial rotation so it looks more dynamic */}
      <primitive object={scene} rotation={[0, Math.PI / 8, 0]} />
    </group>
  )
}

// Fallback simple orb if model is missing
function FallbackOrb() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1.5}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.1, 64, 64]} />
        <meshStandardMaterial
          color="#f97316"
          emissive="#ec4899"
          emissiveIntensity={0.9}
          metalness={0.4}
          roughness={0.2}
        />
      </mesh>
    </Float>
  )
}

export default function HeroAvatar3D() {
  return (
    <div className="relative w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px] rounded-[32px] border border-white/10 bg-gradient-to-br from-[#020617] via-[#020617] to-[#0b1120] shadow-[0_24px_80px_rgba(15,23,42,0.95)] overflow-hidden">
      {/* Glow backdrop */}
      <div className="pointer-events-none absolute -inset-8 bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.28),transparent_65%)] opacity-80" />

      <Canvas
        camera={{ position: [0, 1.3, 3.2], fov: 35 }}
        shadows
        dpr={[1, 1.8]}
      >
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[4, 8, 6]}
          intensity={1.1}
          castShadow
        />
        <spotLight
          position={[-6, 6, 2]}
          angle={0.5}
          penumbra={0.4}
          intensity={0.6}
          color="#a855f7"
        />

        <Suspense fallback={<FallbackOrb />}>
          {/* Replace AvatarModel with your own GLB at /public/models/avatar.glb */}
          <AvatarModel />
          <Environment preset="city" />
        </Suspense>

        {/* Subtle orbit controls, mouse/touch to move around */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(2 * Math.PI) / 3}
          rotateSpeed={0.8}
        />
      </Canvas>

      {/* Foreground label overlay */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-between p-4">
        <div className="flex justify-end">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 px-3 py-1 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)]" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-gray-100">
              Live Avatar
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium text-gray-300/90">
            Divijaa Arjun
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
            Designer • Developer • Creator
          </span>
        </div>
      </div>
    </div>
  )
}

