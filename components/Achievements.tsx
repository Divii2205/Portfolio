'use client'

import { motion } from 'framer-motion'
import { Trophy, Star, Medal } from 'lucide-react'
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
    <section id="achievements" className="py-16 md:py-24 px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="mb-12 space-y-3"
        >
          <span className="eyebrow">
            <span className="tick" />
            Highlights & Milestones
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#2c2824]">
            Achievements
          </h2>
          <p className="text-[#6b6358] max-w-2xl">
            A few moments I&apos;m grateful for—competitions, recognitions, and milestones that
            have shaped how I design, build, and collaborate.
          </p>
        </motion.div>

        {/* Layout: feature card + grid of smaller cards */}
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-stretch">
          {/* Featured achievement */}
          {featured && (
            <motion.article
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col overflow-hidden rounded-xl border border-[rgba(44,40,36,0.16)] bg-[#e7ddcb]/50"
            >
              <div className="relative z-10 p-7 md:p-9 space-y-5">
                <div className="flex items-center gap-3">
                  <div className="inline-flex items-center justify-center rounded-lg border border-[rgba(44,40,36,0.2)] p-3 text-[#7d3c3c]">
                    <Trophy size={22} />
                  </div>
                  <div className="space-y-1">
                    <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-[#7d3c3c]">
                      Featured
                    </p>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-[#2c2824]">
                      {featured.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 font-mono text-[0.7rem] uppercase tracking-wider">
                  {featured.place && (
                    <span className="inline-flex items-center rounded border border-[#7d3c3c] bg-[#7d3c3c] px-2.5 py-1 text-[#f3eee4]">
                      {featured.place}
                    </span>
                  )}
                  {featured.organization && (
                    <span className="inline-flex items-center rounded border border-[rgba(44,40,36,0.2)] px-2.5 py-1 text-[#4a443c]">
                      {featured.organization}
                    </span>
                  )}
                  <span className="inline-flex rounded border border-[rgba(44,40,36,0.16)] px-2.5 py-1 text-[#6b6358]">
                    {featured.year}
                  </span>
                </div>

                <p className="text-[0.95rem] md:text-base leading-relaxed text-[#4a443c]">
                  {featured.description}
                </p>

                {featured.highlight && (
                  <div className="relative mt-2 rounded-lg border border-[rgba(44,40,36,0.14)] bg-[#efe9dd] px-4 py-3 text-sm text-[#4a443c]">
                    <span className="absolute left-0 top-0 h-full w-[3px] rounded-l-lg bg-[#7d3c3c]" />
                    <p className="pl-3 italic">{featured.highlight}</p>
                  </div>
                )}

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {featured.tags.map(tag => (
                    <span
                      key={tag}
                      className="rounded border border-[rgba(44,40,36,0.16)] px-2 py-0.5 font-mono text-[0.7rem] text-[#4a443c]"
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
                  className="group relative overflow-hidden rounded-lg border border-[rgba(44,40,36,0.14)] bg-[#e7ddcb]/30 hover:border-[rgba(44,40,36,0.3)] transition-colors"
                >
                  <div className="relative z-10 p-4 md:p-5 space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[rgba(44,40,36,0.18)] text-[#7d3c3c]">
                          <Icon size={17} />
                        </div>
                        <div className="space-y-0.5">
                          <h3 className="font-display text-sm font-bold text-[#2c2824] line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-[#6b6358]">
                            {item.organization ?? item.type}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-[0.65rem] rounded border border-[rgba(44,40,36,0.16)] px-2 py-1 text-[#6b6358]">
                        {item.year}
                      </span>
                    </div>

                    <p className="text-xs text-[#4a443c] leading-relaxed line-clamp-3">
                      {item.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tags.slice(0, 3).map(tag => (
                        <span
                          key={tag}
                          className="rounded border border-[rgba(44,40,36,0.14)] px-2 py-0.5 font-mono text-[0.65rem] text-[#4a443c]"
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
