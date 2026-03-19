"use client";

import { motion } from "framer-motion";
import {
  Download,
  ArrowRight,
  Sparkles,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import HeroAvatar3D from "@/components/HeroAvatar3D";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.8, 0.25, 1] },
  },
};

export default function Hero() {
  return (
    <section
      id="home"
      className="flex flex-col justify-center min-h-screen overflow-hidden text-white"
    >
      <div className="relative z-1 max-w-6xl mx-auto px-6 py-12 lg:py-16">
        <motion.div
          className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Left content */}
          <div className="space-y-8">
            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="block">Hii</span>
              <span className="block text-gradient mt-1">
                I'm Divijaa Arjun
              </span>
            </motion.h1>

            {/* <motion.div
              variants={item}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm"
            >
              <Sparkles size={16} className="text-purple-200" />
              <span className="tracking-wide">
                Creative Designer and Developer
              </span>
            </motion.div> */}

            <motion.div variants={item} className="space-y-1">
              <p className="text-base sm:text-lg text-gray-200 max-w-2xl leading-relaxed">
                Designer and developer focused on building purposeful digital
                experiences. I work across UI/UX, frontend, and app development
                to turn ideas into intuitive and functional products.
              </p>
            </motion.div>

            <motion.div variants={item} className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#f5d0fe] to-[#c084fc] text-[#2b0d3b] font-semibold shadow-lg hover:shadow-purple-500/10 transition-transform hover:-translate-y-0.5"
              >
                My Projects
                <ArrowRight size={18} />
              </a>
              <a
                href="https://drive.google.com/file/d/1xaXA91DJRvQV5pcfCVJ-QFSYnRvhodHy/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 bg-white/10 font-semibold hover:bg-white/15 transition-transform hover:-translate-y-0.5"
              >
                Download Resume
                <Download size={18} />
              </a>
            </motion.div>

            <motion.div
              variants={item}
              className="flex items-center gap-3 pt-2"
            >
              {[
                {
                  Icon: Linkedin,
                  href: "https://www.linkedin.com/in/divijaa-arjun",
                },
                {
                  Icon: Mail,
                  href: "https://mail.google.com/mail/?view=cm&to=divijaa22am@gmail.com",
                },
                { Icon: Github, href: "https://github.com/Divii2205" },
              ].map(({ Icon, href }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 transition-transform hover:-translate-y-1"
                >
                  <Icon size={18} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right visual – Video */}
          <div className="relative w-full h-full flex justify-center pt-0 group">
            {/* TWEAKABLE PARAMETERS - Modify these to change the frame look */}
            <div
              className="relative rounded-3xl overflow-hidden transition-transform duration-500 group-hover:scale-105"
              style={{
                width: "100%",
                maxWidth: "500px",
                aspectRatio: "1 / 1",
                maxHeight: "325px",
              }}
            >
              {/* OUTER GLOW LAYER 2 - Secondary glow for depth */}
              <div className="absolute -inset-0 bg-gradient-to-r from-purple-600/30 via-pink-100/30 to-purple-600/30 rounded-3xl blur-2xl -z-20" />

              {/* INNER GRADIENT BORDER */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/40 via-pink-200/40 to-purple-500/40 rounded-3xl p-[2px] -z-10">
                {/* VIDEO CONTAINER */}
                <div
                  className="relative w-full h-full rounded-3xl overflow-hidden bg-black/60 shadow-2xl group-hover:shadow-purple-900/50 transition-shadow duration-500"
                  style={{
                    boxShadow:
                      "0 25px 50px -12px rgba(168, 85, 247, 0.15), 0 0 40px rgba(236, 72, 153, 0.1)",
                  }}
                >
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-contain"
                    style={{
                      objectFit: "contain",
                      backgroundColor: "#000000",
                    }}
                  >
                    <source
                      src="/videos/Video Project 1.mp4"
                      type="video/mp4"
                    />
                    <img
                      src="/videos/Video Project 1.gif"
                      alt="Hero video"
                      className="w-full h-full object-contain"
                    />
                  </video>

                  {/* GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            <style jsx>{`
              @keyframes float-glow {
                0%,
                100% {
                  opacity: 0.5;
                  filter: blur(8px);
                }
                50% {
                  opacity: 0.8;
                  filter: blur(12px);
                }
              }
              :global(.animate-glow-pulse) {
                animation: float-glow 3s ease-in-out infinite;
              }
            `}</style>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
