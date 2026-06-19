'use client'

import React from 'react'
import { motion } from 'framer-motion'
import {
    Code2,
    Database,
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
        <section id="tech" className="py-20 px-4 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.3 }}
                    className="text-center mb-14 space-y-3"
                >
                    <span className="eyebrow justify-center">
                        <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#c084fc]" />
                        Toolkit
                        <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#c084fc]" />
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f0abfc] via-[#fda4af] to-[#f0abfc]">
                            Tech Stack
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        The tools and technologies I reach for
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stackCategories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.3 }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-effect p-6 rounded-2xl hover:border-purple-500/30 hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/15 to-pink-500/10 text-purple-300 border border-white/5 group-hover:text-purple-200 group-hover:border-purple-500/30 transition-colors">
                                    <category.icon size={22} />
                                </div>
                                <h3 className="text-lg font-semibold text-white/90 leading-tight">{category.title}</h3>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {category.skills.map((skill, sIdx) => (
                                    <span
                                        key={sIdx}
                                        className="px-3 py-1.5 text-sm rounded-lg bg-white/5 text-gray-300 border border-white/5 hover:bg-white/10 hover:text-white hover:border-purple-500/30 transition-colors"
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
