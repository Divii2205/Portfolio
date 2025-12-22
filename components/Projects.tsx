'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react'
import { projects } from '@/data/projects'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1] },
  },
}

export default function Projects() {
  function ImageSlideshow({
    images,
    alt,
    interval = 1500,
  }: {
    images: string[]
    alt: string
    interval?: number
  }) {
    const [idx, setIdx] = useState(0)

    useEffect(() => {
      if (!images || images.length <= 1) return
      const id = setInterval(() => {
        setIdx(prev => (prev + 1) % images.length)
      }, interval)
      return () => clearInterval(id)
    }, [images, interval])

    const src = images[idx]?.replace(/\\/g, '/')
    const [broken, setBroken] = useState(false)

    useEffect(() => {
      setBroken(false)
    }, [idx, images])

    return (
      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20">
        <div className="relative aspect-[4/3]">
          {src && !broken ? (
            <Image
              src={src}
              alt={alt}
              fill
              onError={() => setBroken(true)}
              className="object-cover"
              sizes="(max-width: 768px) 260px, 360px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-gray-400">
              Image unavailable
            </div>
          )}
        </div>
      </div>
    )
  }

  function SingleImage({ src, alt }: { src: string; alt: string }) {
    const normalized = src?.replace(/\\/g, '/')
    const [broken, setBroken] = useState(false)

    useEffect(() => {
      setBroken(false)
    }, [normalized])

    return (
      <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20">
        <div className="relative aspect-[4/3]">
          {normalized && !broken ? (
            <Image
              src={normalized}
              alt={alt}
              fill
              onError={() => setBroken(true)}
              className="object-cover"
              sizes="(max-width: 768px) 260px, 360px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-gray-400">
              Image unavailable
            </div>
          )}
        </div>
      </div>
    )
  }

  const makeHref = (url?: string) => {
    if (!url) return undefined
    return /^(https?:\/\/)/i.test(url) ? url : `https://${url}`
  }
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  const updateScrollState = () => {
    const el = scrollRef.current
    if (!el) return

    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }

  useEffect(() => {
    updateScrollState()
    window.addEventListener('resize', updateScrollState)
    return () => window.removeEventListener('resize', updateScrollState)
  }, [])

  const scrollByAmount = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return

    const card = el.querySelector<HTMLElement>('[data-card]')
    if (!card) return

    const scrollAmount = card.offsetWidth + 24
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  return (
    <section
      id="projects"
      className="py-20 px-4 relative overflow-hidden bg-black"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(124,58,237,0.05),_transparent_70%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter leading-[0.9] mb-3">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f0abfc] via-[#fda4af] to-[#f0abfc] background-animate">
              Projects
            </span>
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto">
            A few selected works showcasing creativity and code
          </p>
        </motion.div>

        {/* Controls */}
        <div className="flex items-center justify-end gap-3 mb-6">
          <button
            onClick={() => scrollByAmount('left')}
            disabled={!canScrollLeft}
            className={`p-3 rounded-full border border-white/10 backdrop-blur-md transition
              ${
                canScrollLeft
                  ? 'hover:bg-white/10 text-white'
                  : 'opacity-40 cursor-not-allowed text-white/50'
              }`}
          >
            <ArrowLeft size={18} />
          </button>

          <button
            onClick={() => scrollByAmount('right')}
            disabled={!canScrollRight}
            className={`p-3 rounded-full border border-white/10 backdrop-blur-md transition
              ${
                canScrollRight
                  ? 'hover:bg-white/10 text-white'
                  : 'opacity-40 cursor-not-allowed text-white/50'
              }`}
          >
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          onScroll={updateScrollState}
          className="flex gap-6 items-stretch min-h-0 overflow-x-auto overflow-y-hidden scroll-smooth hide-scrollbar"
        >
          {projects.map((project, idx) => (
            <motion.article
              key={project.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              data-card
                className="min-w-[260px] md:min-w-[320px] lg:min-w-[360px] flex flex-col
                  h-[460px] md:h-[520px] lg:h-[560px] relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm
                  hover:bg-white/10 transition cursor-pointer"
            >
                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20`} />

                <div className="relative p-5 flex flex-col h-full">
                  <div className="space-y-4">
                    {project.image && project.image.length > 1 ? (
                      <ImageSlideshow images={project.image} alt={project.title} />
                    ) : project.image && project.image.length === 1 ? (
                      <SingleImage src={project.image[0]} alt={project.title} />
                    ) : null}

                    <h3 className="text-xl font-semibold text-white">
                      {project.title}
                    </h3>

                    <p className="text-sm text-gray-300 leading-relaxed max-h-28 overflow-hidden">
                      {project.description}
                    </p>
                  </div>

                  <div className="mt-auto pt-3">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {project.tech.map(tag => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-full bg-white/10 text-gray-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      {makeHref(project.link) && (
                        <a
                          href={makeHref(project.link)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[#f5d0fe]"
                        >
                          View <ArrowUpRight size={16} />
                        </a>
                      )}

                      {makeHref(project.repo) && (
                        <a
                          href={makeHref(project.repo)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-[#f5d0fe]"
                        >
                          Code <Github size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style jsx>{`
        .background-animate {
          background-size: 200%;
          animation: gradient-shift 5s ease infinite;
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        /* hide horizontal scrollbar while allowing scroll */
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </section>
  )
}
