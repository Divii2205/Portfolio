'use client'

import { motion } from 'framer-motion'
import { Award, Trophy, Star, Medal } from 'lucide-react'
import { achievements } from '@/data/achievements'

const containerVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.8, 0.25, 1] },
  },
}

export default function Achievements() {
  const [featured, ...rest] = achievements

  const iconForType = (type: string) => {
    switch (type) {
      case 'award':
        return Trophy
      case 'recognition':
        return Medal
      default:
        return Star
    }
  }

  return (
    <section
      id="achievements"
      className="py-20 px-4 relative overflow-hidden bg-black"
    >
      {/* Soft radial background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(244,114,182,0.08),_transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs uppercase tracking-[0.2em] text-gray-300">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-400 shadow-[0_0_10px_rgba(251,113,133,0.8)]" />
            Highlights & Milestones
          </div>
          <h2 className="mt-4 text-3xl md:text-5xl font-bold tracking-tight text-white">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f0abfc] via-[#fda4af] to-[#f0abfc] background-animate">
              Achievements
            </span>
          </h2>
          <p className="mt-3 max-w-2xl text-sm md:text-base text-gray-400">
            A few moments I&apos;m grateful for—competitions, recognitions, and milestones that
            have shaped how I design, build, and collaborate.
          </p>
        </motion.div>

        {/* Layout: asymmetric feature card + grid of smaller cards */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-stretch">
          {/* Featured achievement */}
          {featured && (
            <motion.article
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/15 via-purple-500/10 to-sky-500/10 opacity-80 pointer-events-none" />
              <div className="relative z-10 p-7 md:p-9 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center rounded-2xl bg-black/40 border border-white/10 p-3 text-rose-200">
                    <Trophy size={22} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-200/90">
                      Featured
                    </p>
                    <h3 className="text-xl md:text-2xl font-semibold text-white">
                      {featured.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-gray-300">
                  {featured.place && (
                    <span className="inline-flex items-center rounded-full border border-rose-300/40 bg-rose-300/15 px-3 py-1 text-rose-100 font-semibold">
                      {featured.place}
                    </span>
                  )}
                  {featured.organization && (
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-3 py-1">
                      {featured.organization}
                    </span>
                  )}
                  <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.18em] text-gray-300/90">
                    {featured.year}
                  </span>
                </div>

                <p className="text-sm md:text-base leading-relaxed text-gray-100/90">
                  {featured.description}
                </p>

                {featured.highlight && (
                  <div className="relative mt-3 rounded-2xl border border-rose-200/30 bg-black/30 px-4 py-3 text-sm text-rose-50">
                    <span className="absolute left-0 top-0 h-full w-[3px] rounded-l-2xl bg-gradient-to-b from-rose-300 via-purple-300 to-blue-300" />
                    <p className="pl-3">{featured.highlight}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 pt-1">
                  {featured.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-gray-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          )}

          {/* Other achievements grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {rest.map((item, idx) => {
              const Icon = iconForType(item.type)
              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.25 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/[0.02] hover:bg-white/[0.06] backdrop-blur-xl transition-colors"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-rose-400/10 via-purple-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10 p-4 md:p-5 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-black/60 border border-white/10 text-rose-100">
                          <Icon size={18} />
                        </div>
                        <div className="space-y-0.5">
                          <h3 className="text-sm font-semibold text-white/95 line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-[11px] uppercase tracking-[0.18em] text-gray-400">
                            {item.organization ?? item.type}
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] rounded-full border border-white/10 bg-black/50 px-2 py-1 text-gray-300">
                        {item.year}
                      </span>
                    </div>

                    <p className="text-xs text-gray-300/90 line-clamp-3">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/5 px-2 py-0.5 text-[10px] text-gray-200 border border-white/5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

