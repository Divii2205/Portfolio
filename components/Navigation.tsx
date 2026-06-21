'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Home,
    User,
    Briefcase,
    FolderGit2,
    Trophy,
    Mail,
    Grip
} from 'lucide-react'

const navItems = [
    { name: 'Home', icon: Home, href: '#home' },
    { name: 'About', icon: User, href: '#about' },
    { name: 'Projects', icon: FolderGit2, href: '#projects' },
    { name: 'Experience', icon: Briefcase, href: '#experience' },
    { name: 'Achievements', icon: Trophy, href: '#achievements' },
    { name: 'Contact', icon: Mail, href: '#contact' },
]

export default function Navigation() {
    const [isHovered, setIsHovered] = useState(false)
    const COLLAPSED_WIDTH = 60
    const EXPANDED_WIDTH = 820

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center">
            <motion.div
                className="relative flex items-center justify-center overflow-hidden rounded-full cursor-pointer border border-[rgba(44,40,36,0.2)] bg-[#efe9dd]/90 backdrop-blur-md"
                initial={{ width: 60, height: 60, borderRadius: 999 }}
                animate={{
                    width: isHovered ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
                    height: 60,
                    paddingRight: isHovered ? 16 : 0,
                    paddingLeft: isHovered ? 16 : 0,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                {/* Menu Icon (9 dots) */}
                <AnimatePresence mode='wait'>
                    {!isHovered && (
                        <motion.div
                            key="menu-icon"
                            className="absolute inset-0 flex items-center justify-center"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Grip className="w-5 h-5 text-[#2c2824]" />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Nav Items */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            className="flex items-center gap-1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.3, delay: 0.1 }}
                        >
                            {navItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="group relative flex items-center gap-2 px-3 py-2 rounded-full hover:bg-[#7d3c3c] transition-colors duration-300"
                                >
                                    <item.icon className="w-4 h-4 text-[#7d3c3c] group-hover:text-[#f3eee4] transition-colors" />
                                    <span className="font-mono text-[0.7rem] uppercase tracking-wider text-[#2c2824] group-hover:text-[#f3eee4] whitespace-nowrap transition-colors">
                                        {item.name}
                                    </span>
                                </a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}
