'use client'

import React, { useEffect } from 'react'

export default function ScrollManager() {
  useEffect(() => {
    let scrollTimeout: number

    const handleScroll = () => {
      document.documentElement.classList.add('scrolling')

      window.clearTimeout(scrollTimeout)

      scrollTimeout = window.setTimeout(() => {
        document.documentElement.classList.remove('scrolling')
      }, 200) // Hide after 200ms of no scrolling
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.clearTimeout(scrollTimeout)
    }
  }, [])

  return null
}
