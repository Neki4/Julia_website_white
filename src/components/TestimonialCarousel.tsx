import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Star, X } from 'lucide-react'
import { useInViewAnimation } from '../hooks/useInViewAnimation'
import { reviewImages } from '../data'

const CARD_W = 340
const GAP = 24

// Auto-scrolling carousel of review screenshots (3s interval, pauses on
// hover). The list is tripled; we snap back to the middle copy without
// transition at the edges for an infinite feel. Click opens a zoom overlay.
export default function TestimonialCarousel() {
  const { ref, inView } = useInViewAnimation<HTMLElement>()
  const [index, setIndex] = useState(reviewImages.length)
  const [animated, setAnimated] = useState(true)
  const [paused, setPaused] = useState(false)
  const [cardW, setCardW] = useState(CARD_W)
  const [zoomed, setZoomed] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)

  const tripled = [...reviewImages, ...reviewImages, ...reviewImages]

  useEffect(() => {
    const onResize = () =>
      setCardW(window.innerWidth < 768 ? window.innerWidth - 48 : CARD_W)
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    if (paused || zoomed) return
    timer.current = window.setInterval(() => setIndex((i) => i + 1), 3000)
    return () => window.clearInterval(timer.current)
  }, [paused, zoomed])

  // Snap back into the middle copy once the transition has finished
  useEffect(() => {
    if (index >= reviewImages.length * 2 || index < reviewImages.length) {
      const t = window.setTimeout(() => {
        setAnimated(false)
        setIndex(
          index >= reviewImages.length * 2
            ? index - reviewImages.length
            : index + reviewImages.length,
        )
        window.setTimeout(() => setAnimated(true), 50)
      }, 850)
      return () => window.clearTimeout(t)
    }
  }, [index])

  // Close the zoom overlay with Escape
  useEffect(() => {
    if (!zoomed) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomed(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [zoomed])

  const anim = inView ? 'animate-fade-in-up' : 'opacity-0'

  return (
    <section id="reviews" ref={ref} className="w-full py-20 overflow-hidden">
      <div className="px-6 md:max-w-4xl md:ml-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <h2
          className={`text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-[#0D212C] tracking-tight ${anim}`}
          style={{ animationDelay: '0.1s' }}
        >
          Що кажуть <span className="font-accent italic">клієнти</span>
        </h2>
        <div
          className={`flex items-center gap-2 ${anim}`}
          style={{ animationDelay: '0.2s' }}
        >
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-black text-black" />
          ))}
          <span className="ml-2 text-sm text-[#051A24]">Google 5/5</span>
        </div>
      </div>

      <div
        className={`mt-10 ${anim}`}
        style={{ animationDelay: '0.3s' }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex px-6"
          style={{
            gap: `${GAP}px`,
            transform: `translateX(-${index * (cardW + GAP)}px)`,
            transition: animated
              ? 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
              : 'none',
          }}
        >
          {tripled.map((src, i) => (
            <button
              key={i}
              onClick={() => setZoomed(src)}
              className="shrink-0 bg-white rounded-[32px] shadow-[0_4px_16px_rgba(0,0,0,0.08)] p-3 cursor-zoom-in"
              style={{ width: `${cardW}px` }}
              aria-label={`Збільшити відгук ${(i % reviewImages.length) + 1}`}
            >
              <img
                src={src}
                alt={`Скріншот відгуку клієнта ${(i % reviewImages.length) + 1}`}
                loading="lazy"
                className="w-full h-[440px] object-cover object-top rounded-3xl"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 px-6 flex gap-3 md:max-w-4xl md:ml-auto">
        <button
          aria-label="Попередній відгук"
          onClick={() => setIndex((i) => i - 1)}
          className="w-12 h-12 rounded-full border border-[#0D212C]/20 flex items-center justify-center hover:bg-[#0D212C]/5 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-[#0D212C]" />
        </button>
        <button
          aria-label="Наступний відгук"
          onClick={() => setIndex((i) => i + 1)}
          className="w-12 h-12 rounded-full border border-[#0D212C]/20 flex items-center justify-center hover:bg-[#0D212C]/5 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-[#0D212C]" />
        </button>
      </div>

      {/* Zoom overlay */}
      {zoomed && (
        <div
          className="fixed inset-0 z-[60] bg-[#051A24]/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setZoomed(null)}
          role="dialog"
          aria-label="Перегляд відгуку"
        >
          <button
            aria-label="Закрити"
            className="absolute top-5 right-6 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            onClick={() => setZoomed(null)}
          >
            <X className="w-5 h-5" />
          </button>
          <img
            src={zoomed}
            alt="Скріншот відгуку клієнта"
            className="max-h-[90vh] max-w-[92vw] rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </section>
  )
}
