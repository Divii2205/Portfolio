"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/projects";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.8, 0.25, 1] },
  },
};

export default function Projects() {
  function ImageSlideshow({
    images,
    alt,
    interval = 1000,
    initialIndex = 0,
    onIndexChange,
  }: {
    images: string[];
    alt: string;
    interval?: number;
    initialIndex?: number;
    onIndexChange?: (i: number) => void;
  }) {
    const [idx, setIdx] = useState(initialIndex);
    const imagesRef = useRef<string[]>(images);

    // keep a live ref to the images so the interval doesn't need images in deps
    useEffect(() => {
      imagesRef.current = images;
      // clamp index when image list changes
      setIdx((prev) => {
        const len = images?.length || 1;
        const next = prev % Math.max(len, 1);
        onIndexChange?.(next);
        return next;
      });
    }, [images, onIndexChange]);

    useEffect(() => {
      if (!imagesRef.current || imagesRef.current.length <= 1) return;
      const id = setInterval(() => {
        setIdx((prev) => {
          const len = imagesRef.current?.length || 1;
          const next = (prev + 1) % len;
          onIndexChange?.(next);
          return next;
        });
      }, interval);
      return () => clearInterval(id);
    }, [interval]);

    const src = imagesRef.current[idx]?.replace(/\\/g, "/");
    const [broken, setBroken] = useState(false);

    useEffect(() => {
      setBroken(false);
    }, [src]);

    // report index when manually changed (safety)
    useEffect(() => {
      onIndexChange?.(idx);
    }, [idx, onIndexChange]);

    return (
      <div className="overflow-hidden rounded-md border border-[rgba(44,40,36,0.16)] bg-[#e7ddcb]">
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
            <div className="absolute inset-0 flex items-center justify-center bg-[#e7ddcb] text-[#6b6358]">
              Image unavailable
            </div>
          )}
        </div>
      </div>
    );
  }

  function SingleImage({ src, alt }: { src: string; alt: string }) {
    const normalized = src?.replace(/\\/g, "/");
    const [broken, setBroken] = useState(false);

    useEffect(() => {
      setBroken(false);
    }, [normalized]);

    return (
      <div className="overflow-hidden rounded-md border border-[rgba(44,40,36,0.16)] bg-[#e7ddcb]">
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
            <div className="absolute inset-0 flex items-center justify-center bg-[#e7ddcb] text-[#6b6358]">
              Image unavailable
            </div>
          )}
        </div>
      </div>
    );
  }

  const makeHref = (url?: string) => {
    if (!url) return undefined;
    return /^(https?:\/\/)/i.test(url) ? url : `https://${url}`;
  };
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  // active project index for carousel indicators
  const [activeIndex, setActiveIndex] = useState(0);

  const slideshowIndexes = useRef<Record<string, number>>({});

  const updateActiveIndex = () => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = Array.from(el.querySelectorAll<HTMLElement>("[data-card]"));
    if (cards.length === 0) return;

    let closest = 0;
    let minDiff = Number.POSITIVE_INFINITY;
    cards.forEach((c, i) => {
      const diff = Math.abs(c.offsetLeft - el.scrollLeft);
      if (diff < minDiff) {
        minDiff = diff;
        closest = i;
      }
    });
    setActiveIndex(closest);
  };

  const scrollToIndex = (i: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-card]");
    if (cards[i]) {
      el.scrollTo({ left: cards[i].offsetLeft, behavior: "smooth" });
    }
  };

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;

    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    updateActiveIndex();
  };

  useEffect(() => {
    updateScrollState();
    // ensure indicator stays accurate on resize
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, []);

  return (
    <section id="projects" className="py-16 md:py-24 px-6 relative">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          className="mb-12 space-y-3"
        >
          <span className="eyebrow">
            <span className="tick" />
            Selected work
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#2c2824]">
            Projects
          </h2>
          <p className="text-[#6b6358] max-w-2xl">
            A few selected works showcasing creativity and code.
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={scrollRef}
            onScroll={() => {
              updateScrollState();
              updateActiveIndex();
            }}
            className="flex gap-5 items-stretch min-h-0 overflow-x-auto overflow-y-hidden scroll-smooth hide-scrollbar mb-6"
          >
            {projects.map((project) => {
              const cardHref = makeHref(project.repo || project.link);
              return (
                <motion.article
                  key={project.title}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.3 }}
                  data-card
                  className="min-w-[260px] md:min-w-[320px] lg:min-w-[360px] flex flex-col
                    h-[460px] md:h-[520px] lg:h-[540px] relative rounded-lg border border-[rgba(44,40,36,0.14)] bg-[#e7ddcb]/40
                    hover:border-[rgba(44,40,36,0.3)] hover:-translate-y-1
                    transition-all duration-300 cursor-pointer overflow-hidden"
                  onClick={() => {
                    if (cardHref) {
                      window.open(cardHref, "_blank", "noopener,noreferrer");
                    }
                  }}
                  role={cardHref ? "link" : undefined}
                  tabIndex={cardHref ? 0 : -1}
                  aria-label={
                    cardHref ? `Open GitHub for ${project.title}` : undefined
                  }
                  onKeyDown={(e) => {
                    if (!cardHref) return;
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      window.open(cardHref, "_blank", "noopener,noreferrer");
                    }
                  }}
                >
                  <div className="relative p-5 flex flex-col h-full">
                    <div className="space-y-4">
                      {project.image && project.image.length > 1 ? (
                        <ImageSlideshow
                          images={project.image}
                          alt={project.title}
                          initialIndex={
                            slideshowIndexes.current[project.title] ?? 0
                          }
                          onIndexChange={(i) =>
                            (slideshowIndexes.current[project.title] = i)
                          }
                        />
                      ) : project.image && project.image.length === 1 ? (
                        <SingleImage
                          src={project.image[0]}
                          alt={project.title}
                        />
                      ) : null}

                      <div className="space-y-1.5">
                        {project.category && (
                          <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-[#7d3c3c]">
                            {project.category}
                          </span>
                        )}
                        <h3 className="font-display text-xl font-bold text-[#2c2824]">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-sm text-[#4a443c] leading-relaxed max-h-28 overflow-hidden">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-auto pt-3">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech.map((tag) => (
                          <span
                            key={tag}
                            className="font-mono text-[0.7rem] px-2 py-0.5 rounded border border-[rgba(44,40,36,0.16)] text-[#4a443c]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-wider">
                        {makeHref(project.link) && (
                          <a
                            href={makeHref(project.link)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[#7d3c3c] hover:text-[#7d3c3c] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7d3c3c]/40 rounded"
                            aria-label={`View ${project.title}`}
                          >
                            View <ArrowUpRight size={15} />
                          </a>
                        )}

                        {makeHref(project.repo) && (
                          <a
                            href={makeHref(project.repo)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-[#2c2824] hover:text-[#7d3c3c] transition-colors focus:outline-none focus:ring-2 focus:ring-[#7d3c3c]/40 rounded"
                            aria-label={`Code ${project.title}`}
                          >
                            Code <Github size={15} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {/* Indicators — one per project */}
          <div className="flex justify-center gap-2.5 mt-4">
            {projects.map((_, i) => (
              <button
                key={i}
                className={`h-[3px] rounded-full transition-all ${
                  activeIndex === i
                    ? "w-8 bg-[#7d3c3c]"
                    : "w-4 bg-[rgba(44,40,36,0.22)] hover:bg-[rgba(44,40,36,0.4)]"
                }`}
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
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
  );
}
