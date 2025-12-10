'use client'

import React, { useEffect, useRef, useState, MouseEvent } from 'react'
import { motion } from 'framer-motion'
import {
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceCollide,
  forceRadial,
  Simulation
} from 'd3-force'

type Role = {
  text: string
  size: string
  weight: string
  color: string
}

type RoleNode = Role & {
  id: number
  radius: number
  x: number
  y: number
  vx: number
  vy: number
}

export default function About() {
  const roles: Role[] = [
    { text: 'Front-end Developer', size: 'text-lg', weight: 'font-bold', color: 'text-rose-300' },
    { text: 'UI/UX Designer', size: 'text-xl', weight: 'font-extrabold', color: 'text-rose-300' },
    { text: 'AI-ML Engineer', size: 'text-base', weight: 'font-medium', color: 'text-rose-300' },
    { text: 'Entrepreneur', size: 'text-lg', weight: 'font-bold', color: 'text-rose-300' },
    { text: 'Content Writer', size: 'text-sm', weight: 'font-medium', color: 'text-rose-300' },
    { text: 'Guitarist', size: 'text-base', weight: 'font-semibold', color: 'text-rose-300' },
    { text: 'Photographer', size: 'text-sm', weight: 'font-medium', color: 'text-rose-300' },

    { text: 'Artist', size: 'text-xl', weight: 'font-bold', color: 'text-purple-400' },
    { text: 'Music Lover', size: 'text-lg', weight: 'font-medium', color: 'text-purple-400' },
    { text: 'Podcast Listener', size: 'text-sm', weight: 'font-normal', color: 'text-purple-400' },
    { text: 'Book Enthusiast', size: 'text-base', weight: 'font-medium', color: 'text-purple-400' },
    { text: 'Dancer', size: 'text-lg', weight: 'font-semibold', color: 'text-purple-400' },
    { text: 'Pet Lover', size: 'text-xl', weight: 'font-bold', color: 'text-purple-400' },
    { text: 'Explorer', size: 'text-2xl', weight: 'font-extrabold', color: 'text-purple-400' },
  ]

  const containerRef = useRef<HTMLDivElement | null>(null)
  const simulationRef = useRef<Simulation<RoleNode, undefined> | null>(null)

  // font size → base bubble radius
  const sizeToBaseRadius: Record<string, number> = {
    'text-2xl': 52,
    'text-xl': 46,
    'text-lg': 40,
    'text-base': 34,
    'text-sm': 30,
  }

  const [nodes, setNodes] = useState<RoleNode[]>(() =>
    roles.map((role, i) => {
      const base = sizeToBaseRadius[role.size] ?? 36
      const charFactor = 1.2 // radius grows a bit with text length
      const padding = 10
      const radius = base + role.text.length * charFactor + padding

      return {
        ...role,
        id: i,
        radius,
        x: 200 + Math.random() * 40 - 20,
        y: 200 + Math.random() * 40 - 20,
        vx: 0,
        vy: 0,
      }
    })
  )

  // set up force simulation on mount
  useEffect(() => {
    const width = 420
    const height = 420

    const sim = forceSimulation<RoleNode>(nodes)
      .force('center', forceCenter(width / 2, height / 2))
      // gentle pull toward center → ball shape
      .force('radial', forceRadial(150, width / 2, height / 2).strength(0.25))
      // light repulsion; collision handles separation
      .force('charge', forceManyBody().strength(-5))
      // strong collision so circles don't overlap
      .force(
        'collision',
        forceCollide<RoleNode>()
          .radius(d => d.radius + 6)
          .strength(0.6)
      )
      .alpha(0.9)
      .alphaDecay(0.008)   // slower decay → keeps a bit of life
      .velocityDecay(0.05) // more glide/momentum
      .on('tick', () => {
        setNodes([...sim.nodes()])
      })

    simulationRef.current = sim

    return () => {
      sim.stop()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // mouse interaction: stronger, smoother poke effect
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !simulationRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top

    const sim = simulationRef.current
    const maxDist = 260        // bigger influence radius
    const strength = 5         // stronger push

    const currentNodes = sim.nodes() as RoleNode[]

    currentNodes.forEach(node => {
      const dx = node.x - mx
      const dy = node.y - my
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.001

      if (dist < maxDist) {
        const force = (1 - dist / maxDist) * strength
        node.vx += (dx / dist) * force
        node.vy += (dy / dist) * force
      }
    })

    // raise alpha target so movement continues smoothly while moving mouse
    sim.alphaTarget(0.4).restart()
  }

  const handleMouseLeave = () => {
    if (!simulationRef.current) return
    // let things gently settle again
    simulationRef.current.alphaTarget(0).alpha(0.25).restart()
  }

  return (
    <section
      id="about"
      className="relative py-10 px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: bubble cluster */}
          <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative mx-auto w-full max-w-[460px] h-[460px] rounded-full"
          >
            {nodes.map(node => (
              <motion.div
                key={node.id}
                whileHover={{ scale: 1.08, zIndex: 10 }}
                className={`
                  absolute flex items-center justify-center text-center
                  rounded-full glass-effect border border-white/10
                  shadow-lg backdrop-blur-sm cursor-default
                  hover:bg-white/10 transition-transform transition-colors
                  px-3 py-3 ${node.weight} ${node.color}
                `}
                style={{
                  width: node.radius * 2,
                  height: node.radius * 2,
                  left: node.x - node.radius,
                  top: node.y - node.radius,
                }}
              >
                <span className={`${node.size} leading-snug px-2 block`}>
                  {node.text}
                </span>
              </motion.div>
            ))}

            {/* soft glow background */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-blue-500/10 rounded-full blur-[80px] -z-10" />
          </motion.div>

          {/* RIGHT: text */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8 text-lg text-gray-300 leading-relaxed relative"
          >
            <div className="absolute -left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-purple-500/50 to-transparent hidden lg:block" />

            <p className="glass-effect p-8 rounded-3xl border border-white/5 relative overflow-hidden group hover:border-purple-500/30 transition-colors">
              Meet me, <br />
              a curious <span className="text-gradient font-semibold">CREATOR</span>,
              open-source <span className="text-gradient font-semibold">CONTRIBUTOR</span>, and
              passionate <span className="text-gradient font-semibold">EXPLORER</span> who loves
              adding creativity to everything I do. I believe in giving my best in whatever I take
              on and staying true to my journey of growth.
              <br />
              <br />
              I enjoy learning, trying new things, and working with people who share the same
              passion for making a difference. I hope to do something meaningful for society and
              create a<span className="text-gradient font-semibold"> POSITIVE IMPACT</span> through
              my work and ideas.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
