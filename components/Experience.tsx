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

  // Dot position along the rail, tied to the container height (no hardcoded pixels)
  const dotTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-16 md:py-24 px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10" ref={containerRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mb-16 space-y-3"
        >
          <span className="eyebrow">
            <span className="tick" />
            Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#2c2824]">
            Experience
          </h2>
          <p className="text-[#6b6358] max-w-2xl">
            My journey so far, marked by learning and exploration.
          </p>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          {/* DESKTOP center rail (line + progress + dot all aligned) */}
          <div className="hidden md:block absolute inset-y-0 left-1/2 -translate-x-1/2 pointer-events-none">
            <div className="relative h-full w-px mx-auto">
              {/* base line */}
              <div className="absolute inset-0 bg-[rgba(44,40,36,0.16)]" />

              {/* progress line */}
              <motion.div
                style={{ scaleY: scrollYProgress }}
                className="absolute inset-0 bg-[#7d3c3c] origin-top"
              />

              {/* moving dot */}
              <motion.div
                style={{ top: dotTop, x: "-50%", left: "50%" }}
                className="absolute w-3.5 h-3.5 z-10 rounded-full bg-[#7d3c3c] border-2 border-[#efe9dd]"
              />
            </div>
          </div>

          {/* MOBILE left rail */}
          <div className="md:hidden absolute inset-y-0 left-4 pointer-events-none">
            <div className="relative h-full w-px">
              {/* base line */}
              <div className="absolute inset-0 bg-[rgba(44,40,36,0.16)]" />

              {/* progress line */}
              <motion.div
                style={{ scaleY: scrollYProgress }}
                className="absolute inset-0 bg-[#7d3c3c] origin-top"
              />

              {/* moving dot (mobile) */}
              <motion.div
                style={{ top: dotTop }}
                className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#7d3c3c] border-2 border-[#efe9dd]"
              />
            </div>
          </div>

          {/* Experience cards */}
          <div className="flex flex-col">
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
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="flex-1 pl-12 md:pl-0"
                >
                  <div
                    className={`
                      relative p-6 md:p-8 rounded-lg border border-[rgba(44,40,36,0.14)] bg-[#e7ddcb]/40
                      hover:border-[rgba(44,40,36,0.3)] transition-colors duration-300 group
                      ${index % 2 === 0 ? "md:mr-12" : "md:ml-12"}
                      ${index !== 0 ? "mt-6" : ""}
                    `}
                  >
                    <span className="font-mono text-xs text-[#6b6358] tracking-[0.18em]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <div className="flex flex-col gap-2 mb-4 mt-2">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="font-display text-xl font-bold text-[#2c2824] group-hover:text-[#7d3c3c] transition-colors">
                          {exp.role}
                        </h3>
                        <span className="flex items-center gap-1.5 font-mono text-[0.7rem] uppercase tracking-wider px-2.5 py-1 rounded border border-[rgba(44,40,36,0.16)] text-[#6b6358]">
                          <Calendar size={11} />
                          {exp.period}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[#6b6358] text-sm font-medium">
                        <Briefcase size={14} className="text-[#7d3c3c]" />
                        {exp.company}
                      </div>
                    </div>

                    <p className="text-[#4a443c] text-[0.95rem] leading-relaxed mb-5">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5">
                      {exp.skills.map((skill, i) => (
                        <span
                          key={i}
                          className="font-mono text-[0.7rem] px-2 py-0.5 rounded border border-[rgba(44,40,36,0.16)] text-[#4a443c]"
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
  );
}
