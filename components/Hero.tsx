'use client'

import { motion } from 'framer-motion'
import { Download, ArrowRight, Sparkles, Github, Linkedin, Mail } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.25, 0.8, 0.25, 1] } },
}

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-gradient-to-right from-[#050505] via-[#1a1029] to-[#b197f5] text-white"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-16 lg:py-24">
        <motion.div
          className="grid lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {/* Left content */}
          <div className="space-y-8">
            <motion.div variants={item} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm">
              <Sparkles size={16} className="text-purple-200" />
              <span className="tracking-wide">Creative Designer and Developer</span>
            </motion.div>

            <motion.h1
              variants={item}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            >
              <span className="block">Hii</span>
              <span className="block text-gradient mt-1">I'm Divijaa Arjun</span>
            </motion.h1>

            <motion.div variants={item} className="space-y-1">
              <p className="text-base sm:text-lg text-gray-200 max-w-2xl leading-relaxed">
              Passionate UI/UX designer and developer who builds with purpose. 
              I am driven to create experiences that make an impact. 
              A keen explorer, lifelong learner, and open collaborator.
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
                href="/resume.pdf"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/20 bg-white/10 font-semibold hover:bg-white/15 transition-transform hover:-translate-y-0.5"
              >
                Download Resume
                <Download size={18} />
              </a>
            </motion.div>

            <motion.div variants={item} className="flex items-center gap-3 pt-2">
              {[
                { Icon: Linkedin, href: 'https://www.linkedin.com/in/divijaa-arjun' },
                { Icon: Mail, href: 'https://mail.google.com/mail/?view=cm&to=divijaa22am@gmail.com' },
                { Icon: Github, href: 'https://github.com/Divii2205' },
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

          {/* Right visual */}
          <motion.div variants={item} className="relative flex justify-center">
            
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

