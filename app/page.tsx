'use client'

import { useEffect, useState } from 'react'
import Hero from '@/components/Hero'
import About from '@/components/About'
import TechStack from '@/components/TechStack'
import Contact from '@/components/Contact'
import ScrollManager from '@/components/ScrollManager'
import Cursor from '@/components/Cursor'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <main className="min-h-screen">
      <Cursor mousePosition={mousePosition} />
      <Navigation />
      <ScrollManager />
      <Hero />
      <About />
      <TechStack />
      <Contact />
      <Footer />
    </main>
  )
}

