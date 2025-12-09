'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type CursorProps = {
  mousePosition: { x: number; y: number }
}

export default function Cursor({ mousePosition }: CursorProps) {
  const [isHovering, setIsHovering] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)
  const outlineX = useMotionValue(-100)
  const outlineY = useMotionValue(-100)

  const dotXSmooth = useSpring(dotX, { stiffness: 900, damping: 40, mass: 0.3 })
  const dotYSmooth = useSpring(dotY, { stiffness: 900, damping: 40, mass: 0.3 })
  const outlineXSmooth = useSpring(outlineX, { stiffness: 260, damping: 24 })
  const outlineYSmooth = useSpring(outlineY, { stiffness: 260, damping: 24 })

  useEffect(() => {
    dotX.set(mousePosition.x - 6)
    dotY.set(mousePosition.y - 6)
    outlineX.set(mousePosition.x - 20)
    outlineY.set(mousePosition.y - 20)
  }, [mousePosition, dotX, dotY, outlineX, outlineY])

  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)

    const interactive = document.querySelectorAll('a, button, [role="button"], input, textarea')
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter)
      el.addEventListener('mouseleave', handleMouseLeave)
      el.addEventListener('mousedown', handleMouseDown)
      el.addEventListener('mouseup', handleMouseUp)
    })

    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
        el.removeEventListener('mousedown', handleMouseDown)
        el.removeEventListener('mouseup', handleMouseUp)
      })
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      {/* Morphing inner shape */}
      <motion.div
        className="pointer-events-none fixed z-[9999]"
        style={{ x: dotXSmooth, y: dotYSmooth }}
        animate={{
          width: isHovering ? 14 : 10,
          height: isHovering ? 14 : 10,
          borderRadius: isHovering ? 10 : 999,
          scale: isClicking ? 0.9 : 1,
          backgroundColor: isHovering ? 'rgba(245, 208, 254, 0.95)' : 'rgba(255,255,255,0.9)',
        }}
        transition={{ type: 'spring', stiffness: 700, damping: 35 }}
      />

      {/* Morphing outline */}
      <motion.div
        className="pointer-events-none fixed z-[9998]"
        style={{ x: outlineXSmooth, y: outlineYSmooth }}
        animate={{
          width: 36,
          height: 36,
          borderRadius: 999,
          opacity: isHovering ? 0 : 1,
          scale: isClicking ? 0.95 : 1,
          borderColor: isHovering ? 'transparent' : 'rgba(192, 132, 252, 0.5)',
          rotate: 0,
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      >
        <div className="w-full h-full rounded-full border border-current" />
      </motion.div>

      {/* Click ripple */}
      {isClicking && (
        <motion.div
          className="pointer-events-none fixed z-[9997]"
          style={{ x: dotXSmooth, y: dotYSmooth }}
          initial={{ opacity: 0.35, scale: 0 }}
          animate={{ opacity: 0, scale: 3.2 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          <div className="w-12 h-12 rounded-full border border-[#c084fc]" />
        </motion.div>
      )}
    </>
  )
}

