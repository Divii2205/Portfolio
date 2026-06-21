"use client";

import React, { useEffect, useRef, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import {
  forceSimulation,
  forceManyBody,
  forceCenter,
  forceCollide,
  forceRadial,
  Simulation,
} from "d3-force";

type Role = {
  text: string;
  size: string;
  weight: string;
  color: string;
};

type RoleNode = Role & {
  id: number;
  radius: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
};

const INK = "text-[#211c19]";
const MAROON = "text-[#7d3c3c]";
// The bubbles are positioned in a fixed square coordinate space; on narrow
// screens we scale the whole stage down to fit instead of letting it overflow.
const STAGE = 460;

export default function About() {
  const roles: Role[] = [
    { text: "Front-end Developer", size: "text-lg", weight: "font-bold", color: MAROON },
    { text: "UI/UX Designer", size: "text-xl", weight: "font-extrabold", color: MAROON },
    { text: "AI-ML Engineer", size: "text-base", weight: "font-medium", color: MAROON },
    { text: "Entrepreneur", size: "text-lg", weight: "font-bold", color: MAROON },
    { text: "Content Writer", size: "text-sm", weight: "font-medium", color: MAROON },
    { text: "Guitarist", size: "text-base", weight: "font-semibold", color: INK },
    { text: "Photographer", size: "text-sm", weight: "font-medium", color: MAROON },
    { text: "Artist", size: "text-xl", weight: "font-bold", color: INK },
    { text: "Music Lover", size: "text-lg", weight: "font-medium", color: INK },
    { text: "Podcast Listener", size: "text-sm", weight: "font-normal", color: INK },
    { text: "Book Enthusiast", size: "text-base", weight: "font-medium", color: INK },
    { text: "Dancer", size: "text-lg", weight: "font-semibold", color: INK },
    { text: "Pet Lover", size: "text-xl", weight: "font-bold", color: INK },
    { text: "Explorer", size: "text-2xl", weight: "font-extrabold", color: INK },
  ];

  const containerRef = useRef<HTMLDivElement | null>(null);
  const simulationRef = useRef<Simulation<RoleNode, undefined> | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState(0);
  const scaleRef = useRef(1);
  const offsetRef = useRef(0);

  // font size → base bubble radius
  const sizeToBaseRadius: Record<string, number> = {
    "text-2xl": 52,
    "text-xl": 46,
    "text-lg": 40,
    "text-base": 34,
    "text-sm": 30,
  };

  const [nodes, setNodes] = useState<RoleNode[]>(() =>
    roles.map((role, i) => {
      const base = sizeToBaseRadius[role.size] ?? 36;
      const charFactor = 1.2; // radius grows a bit with text length
      const padding = 10;
      const radius = base + role.text.length * charFactor + padding;

      // Deterministic initial spread (circle by index) so server and client
      // render identically — random seeding here caused a hydration mismatch.
      // The force simulation expands these into the ball shape after mount.
      const angle = (i / roles.length) * Math.PI * 2;
      const spread = 40;

      return {
        ...role,
        id: i,
        radius,
        x: 200 + Math.cos(angle) * spread,
        y: 200 + Math.sin(angle) * spread,
        vx: 0,
        vy: 0,
      };
    }),
  );

  // set up force simulation on mount
  useEffect(() => {
    const width = 420;
    const height = 420;

    const sim = forceSimulation<RoleNode>(nodes)
      .force("center", forceCenter(width / 2, height / 2))
      // gentle pull toward center → ball shape
      .force("radial", forceRadial(150, width / 2, height / 2).strength(0.25))
      // light repulsion; collision handles separation
      .force("charge", forceManyBody().strength(-5))
      // strong collision so circles don't overlap
      .force(
        "collision",
        forceCollide<RoleNode>()
          .radius((d) => d.radius + 6)
          .strength(0.6),
      )
      .alpha(0.9)
      .alphaDecay(0.008) // slower decay → keeps a bit of life
      .velocityDecay(0.05) // more glide/momentum
      .on("tick", () => {
        // keep every bubble fully inside the stage box so none drift off-screen
        const ns = sim.nodes();
        for (const n of ns) {
          n.x = Math.max(n.radius, Math.min(STAGE - n.radius, n.x));
          n.y = Math.max(n.radius, Math.min(STAGE - n.radius, n.y));
        }
        setNodes([...ns]);
      });

    simulationRef.current = sim;

    return () => {
      sim.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scale the fixed 460×460 bubble stage down to fit narrow screens.
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      const w = el.clientWidth;
      const raw = w / STAGE;
      // full size on desktop; on smaller screens shrink a touch for breathing room
      const s = raw >= 1 ? 1 : raw * 0.9;
      const off = (w - STAGE * s) / 2; // center the stage within the wrapper
      scaleRef.current = s;
      offsetRef.current = off;
      setScale(s);
      setOffset(off);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // mouse interaction: stronger, smoother poke effect
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !simulationRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const s = scaleRef.current || 1;
    const off = offsetRef.current || 0;
    // rect is the scaled wrapper; convert back into the stage's coordinate space
    const mx = (e.clientX - rect.left - off) / s;
    const my = (e.clientY - rect.top - off) / s;

    const sim = simulationRef.current;
    const maxDist = 260; // bigger influence radius
    const strength = 5; // stronger push

    const currentNodes = sim.nodes() as RoleNode[];

    currentNodes.forEach((node) => {
      const dx = node.x - mx;
      const dy = node.y - my;
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;

      if (dist < maxDist) {
        const force = (1 - dist / maxDist) * strength;
        node.vx += (dx / dist) * force;
        node.vy += (dy / dist) * force;
      }
    });

    // raise alpha target so movement continues smoothly while moving mouse
    sim.alphaTarget(0.4).restart();
  };

  const handleMouseLeave = () => {
    if (!simulationRef.current) return;
    // let things gently settle again
    simulationRef.current.alphaTarget(0).alpha(0.25).restart();
  };

  return (
    <section id="about" className="relative py-16 md:py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT: bubble cluster */}
          <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            className="relative mx-auto w-full max-w-[460px] aspect-square rounded-full"
          >
            {/* Fixed-size stage scaled to fit — keeps the exact desktop layout on phones */}
            <div
              className="absolute top-0 left-0"
              style={{
                width: STAGE,
                height: STAGE,
                left: offset,
                top: offset,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            >
              {nodes.map((node) => (
                <motion.div
                  key={node.id}
                  whileHover={{ scale: 1.08, zIndex: 10 }}
                  className={`
                    absolute flex items-center justify-center text-center
                    rounded-full border border-[rgba(44,40,36,0.18)] bg-[#efe9dd]
                    cursor-default hover:bg-[#e7ddcb] transition-colors
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

              {/* faint wash behind the cluster */}
              <div className="pointer-events-none absolute inset-0 bg-[#7d3c3c]/[0.04] rounded-full blur-[80px] -z-10" />
            </div>
          </motion.div>

          {/* RIGHT: text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6 text-lg text-[#4a443c] leading-relaxed relative"
          >
            <div className="space-y-3">
              <span className="eyebrow">
                <span className="tick" />
                About
              </span>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#2c2824]">
                A bit about <span className="text-[#7d3c3c]">me</span>
              </h2>
            </div>

            <p className="max-w-xl">
              Meet me, a developer and designer who enjoys building thoughtful
              digital experiences. I work across frontend and app development,
              while also exploring UI and product design to create solutions
              that are both functional and intuitive.
            </p>
            <p className="max-w-xl">
              I enjoy learning through building, experimenting with new ideas,
              and contributing to open source. I value collaboration, attention
              to detail, and continuously improving my work with every project I
              take on.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
