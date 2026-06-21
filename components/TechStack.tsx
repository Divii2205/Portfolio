'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    Code2,
    Wrench,
    Cpu
} from 'lucide-react'

const stackCategories = [
    {
        title: 'Languages & Frameworks',
        icon: Code2,
        skills: ['Java', 'C++', 'Python', 'SQL', 'JavaScript', 'React', 'React Native', 'TypeScript', 'Next.js', 'Tailwind CSS']
    },
    {
        title: 'Backend & APIs',
        icon: Cpu,
        skills: ['Node.js', 'Express.js', 'SpringBoot', 'REST APIs', 'JWT', 'FastAPI']
    },
    {
        title: 'Developer Tools & Databases',
        icon: Wrench,
        skills: ['Git', 'VS Code', 'IntelliJ', 'Figma', 'Scratch', 'Postman', 'Expo', 'MySQL', 'MongoDB']
    },
]

export default function TechStack() {
    return (
        <section id="tech" className="py-16 md:py-24 px-6 relative">
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="mb-12 space-y-3"
                >
                    <span className="eyebrow">
                        <span className="tick" />
                        Toolkit
                    </span>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#2c2824]">
                        Tech Stack
                    </h2>
                    <p className="text-[#6b6358] max-w-2xl">
                        The tools and technologies I reach for.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {stackCategories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ delay: idx * 0.1 }}
                            className="rounded-lg border border-[rgba(44,40,36,0.14)] bg-[#e7ddcb]/40 p-6 hover:border-[rgba(44,40,36,0.3)] transition-colors"
                        >
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2.5 rounded-md border border-[rgba(44,40,36,0.2)] text-[#7d3c3c]">
                                    <category.icon size={20} />
                                </div>
                                <h3 className="font-display text-lg font-bold text-[#2c2824] leading-tight">{category.title}</h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, sIdx) => (
                                    <span
                                        key={sIdx}
                                        className="px-2.5 py-1 font-mono text-xs text-[#4a443c] rounded border border-[rgba(44,40,36,0.16)] hover:border-[#7d3c3c] hover:text-[#7d3c3c] transition-colors"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
