"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import { experiences } from "@/data/experiences";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // how far the dot travels vertically along the rail (tweak 750 → 800/900 if needed)
  const y = useTransform(scrollYProgress, [0, 1], [10, 810]);

  return (
    <>
      <section
        id="experience"
        className="py-20 px-4 relative overflow-hidden bg-black"
      >
        {/* Background Atmosphere */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(124,58,237,0.05),_transparent_70%)]" />

        <div className="max-w-6xl mx-auto relative z-10" ref={containerRef}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-[0.9] mb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f0abfc] via-[#fda4af] to-[#f0abfc] background-animate">
                Experience
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              My journey so far, marked by learning and exploration
            </p>
          </motion.div>

          {/* Timeline Container */}
          <div className="relative">
            {/* DESKTOP center rail (line + gradient + dot all aligned) */}
            <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 pointer-events-none">
              <div className="relative h-full w-[2px] mx-auto">
                {/* base line */}
                <div className="absolute inset-0 bg-white/5" />

                {/* gradient line */}
                <motion.div
                  style={{ scaleY: scrollYProgress }}
                  className="absolute inset-0 bg-gradient-to-t from-transparent via-rose-300 to-transparent origin-top shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                />

                {/* moving dot */}
                <motion.div
                  style={{ y, x: "-50%", left: "50%" }}
                  className="absolute top-0 w-4 h-4 z-10 rounded-full bg-gray-900 border-[3px] border-rose-300
                             shadow-[0_0_15px_rgba(168,85,247,1)]"
                />
              </div>
            </div>

            {/* MOBILE left rail */}
            <div className="md:hidden absolute inset-y-0 left-4 pointer-events-none">
              <div className="relative h-full w-[1px]">
                {/* base line */}
                <div className="absolute inset-0 bg-white/5" />

                {/* gradient line */}
                <motion.div
                  style={{ scaleY: scrollYProgress }}
                  className="absolute inset-0 bg-gradient-to-t from-transparent via-rose-300 to-transparent origin-top shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                />

                {/* moving dot (mobile) */}
                <motion.div
                  style={{ y }}
                  className="absolute top-0 left-1/2 -translate-x-1/2
                             w-5 h-5 rounded-full bg-gray-900 border-[4px] border-rose-300
                             shadow-[0_0_15px_rgba(168,85,247,1)]"
                />
              </div>
            </div>

            {/* Experience cards */}
            <div className="flex flex-col gap-[-40px] md:gap-[-40px]">


              {experiences.map((exp, index) => (
                <div
                  key={exp.id}
                  className={`
                  relative flex flex-col md:flex-row gap-8
                  ${index % 2 === 0 ? "md:flex-row-reverse" : ""}
                `}
                >

                  {/* Spacer for alternate side */}
                  <div className="flex-1 hidden md:block" />

                  {/* Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="flex-1 pl-12 md:pl-0"
                  >
                    <div
                      className={`
                        relative p-6 md:p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm
                        hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 group
                        ${index % 2 === 0 ? "md:mr-12" : "md:ml-12"}
                        ${index !== 0 ? "md:-mt-10" : ""}
                      `}
                    >
                      <div className="flex flex-col gap-2 mb-4">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                            {exp.role}
                          </h3>
                          <span className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/20">
                            <Calendar size={12} />
                            {exp.period}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                          <Briefcase size={14} className="text-purple-400" />
                          {exp.company}
                        </div>
                      </div>

                      <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        {exp.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="text-xs px-2 py-1 rounded-md bg-white/5 text-gray-300 border border-white/5 hover:border-purple-500/30 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .background-animate {
          background-size: 200%;
          animation: gradient-shift 5s ease infinite;
        }
      `}</style>
    </>
  );
}
