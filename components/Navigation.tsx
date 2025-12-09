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
    { name: 'Experience', icon: Briefcase, href: '#experience' },
    { name: 'Projects', icon: FolderGit2, href: '#projects' },
    { name: 'Achievements', icon: Trophy, href: '#achievements' },
    { name: 'Contact', icon: Mail, href: '#contact' },
]

export default function Navigation() {
    const [isHovered, setIsHovered] = useState(false)
    const COLLAPSED_WIDTH = 60
    const EXPANDED_WIDTH = 720

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center">
            <motion.div
                className="glass-effect relative flex items-center justify-center overflow-hidden rounded-full cursor-pointer"
                initial={{ width: 60, height: 60, borderRadius: 999 }}
                animate={{
                    width: isHovered ? EXPANDED_WIDTH : COLLAPSED_WIDTH,
                    height: 60,
                    paddingRight: isHovered ? 20 : 0,
                    paddingLeft: isHovered ? 20 : 0,
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
                            <Grip className="w-6 h-6 text-white/80" />
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
                            {navItems.map((item, index) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="group relative flex items-center gap-2 px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-300"
                                >
                                    <item.icon className="w-5 h-5 text-purple-300 group-hover:text-purple-200 transition-colors" />
                                    <span className="text-sm font-medium text-white/70 group-hover:text-white whitespace-nowrap">
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
