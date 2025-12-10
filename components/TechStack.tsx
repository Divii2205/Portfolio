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
        title: 'Languages',
        icon: Code2,
        skills: ['Python', 'Java', 'JavaScript']
    },
    {
        title: 'Frameworks',
        icon: Cpu,
        skills: ['Spring Boot', 'React', 'Node.js', 'Express.js']
    },
    {
        title: 'Databases',
        icon: Database,
        skills: ['MySQL', 'MongoDB']
    },
    {
        title: 'Tools & Design',
        icon: Wrench,
        skills: ['Git', 'Figma', 'Scratch']
    }
]

export default function TechStack() {
    return (
        <section className="py-24 px-4 relative overflow-hidden">
            <div className="max-w-6xl mx-auto relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {stackCategories.map((category, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass-effect p-6 rounded-2xl border border-white/5 hover:border-purple-500/30 transition-colors group"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-3 rounded-lg bg-white/5 text-purple-400 group-hover:text-purple-300 transition-colors">
                                    <category.icon size={24} />
                                </div>
                                <h3 className="text-xl font-semibold text-white/90">{category.title}</h3>
                            </div>

                            <div className="flex justify-center flex-wrap gap-2">
                                {category.skills.map((skill, sIdx) => (
                                    <span
                                        key={sIdx}
                                        className="px-3 py-1.5 text-sm rounded-md bg-white/5 text-gray-300 border border-white/5 hover:border-purple-500/30 transition-colors"
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
