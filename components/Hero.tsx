"use client";

import { motion } from "framer-motion";
import {
  Download,
  ArrowRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
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
      className="flex flex-col justify-center min-h-screen overflow-hidden"
    >
      <div className="relative z-1 max-w-6xl mx-auto w-full px-6 py-12 lg:py-16">
        <motion.div
          className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-16 items-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Left content */}
          <div className="space-y-8">
            <motion.div variants={item} className="eyebrow">
              <span className="tick" />
              UI/UX · Frontend Developer
            </motion.div>

            <motion.h1
              variants={item}
              className="font-display font-extrabold leading-[0.95] tracking-tight"
            >
              <span className="block text-[1.5rem] sm:text-[1.75rem] font-mono font-normal tracking-normal text-[#6b6358] mb-3">
                Hii, I&apos;m
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-[4.5rem] whitespace-nowrap text-[#2c2824]">
                Divijaa <span className="text-[#7d3c3c]">Arjun</span>
              </span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg sm:text-xl text-[#4a443c] max-w-xl leading-relaxed"
            >
              Designer and developer focused on building purposeful digital
              experiences. I work across UI/UX, frontend, and app development to
              turn ideas into intuitive and functional products.
            </motion.p>

            <motion.div variants={item} className="flex flex-wrap gap-4 pt-1">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#7d3c3c] text-[#f3eee4] font-mono text-sm uppercase tracking-wider hover:bg-[#65302f] transition-colors"
              >
                My Projects
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-0.5"
                />
              </a>
              <a
                href="https://drive.google.com/file/d/1xaXA91DJRvQV5pcfCVJ-QFSYnRvhodHy/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-[rgba(44,40,36,0.3)] text-[#2c2824] font-mono text-sm uppercase tracking-wider hover:bg-[#2c2824] hover:text-[#f3eee4] transition-colors"
              >
                Resume
                <Download size={16} />
              </a>
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-3 pt-2">
              {[
                {
                  Icon: Linkedin,
                  href: "https://www.linkedin.com/in/divijaa-arjun",
                  label: "LinkedIn",
                },
                {
                  Icon: Mail,
                  href: "https://mail.google.com/mail/?view=cm&to=divijaa22am@gmail.com",
                  label: "Email",
                },
                {
                  Icon: Github,
                  href: "https://github.com/Divii2205",
                  label: "GitHub",
                },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-11 h-11 rounded-full border border-[rgba(44,40,36,0.2)] flex items-center justify-center text-[#2c2824] hover:bg-[#7d3c3c] hover:text-[#f3eee4] hover:border-[#7d3c3c] transition-colors"
                >
                  <Icon size={17} />
                </a>
              ))}
            </motion.div>
          </div>

          {/* Right visual – avatar cut out of its background, floating on the paper */}
          <motion.div variants={item} className="relative w-full">
            <div className="group relative mx-auto w-full" style={{ maxWidth: "420px" }}>
              <div className="animate-float">
                {/* Polaroid frame: thin white border on top/sides, thicker at the bottom */}
                <div className="-rotate-2 group-hover:rotate-0 transition-transform duration-500 rounded-[3px] bg-[#fdfbf6] px-3 pt-3 pb-0 border border-[rgba(44,40,36,0.06)] shadow-[0_18px_34px_rgba(44,40,36,0.2)]">
                  {/* the "photo" — the video fills it edge to edge */}
                  <div className="overflow-hidden rounded-[1px] bg-[#e7ddcb] border border-[rgba(44,40,36,0.08)]">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      aria-label="Animated avatar of Divijaa waving"
                      className="w-full h-auto block transition-transform duration-700 group-hover:scale-[1.04]"
                    >
                      <source src="/videos/Web.mp4" type="video/mp4" />
                    </video>
                  </div>
                  {/* thick bottom strip with a handwritten-style caption */}
                  <div className="pt-4 pb-3 text-center">
                    <span className="font-mono text-[0.72rem] tracking-[0.18em] text-[#6b6358]">
                      Manifest Positivity ✨
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
