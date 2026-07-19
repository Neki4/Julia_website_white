import { useEffect, useRef, useState } from 'react'
import { Quote } from 'lucide-react'
import { useInViewAnimation } from '../hooks/useInViewAnimation'
import { parallaxImage } from '../data'

// Quote block with a parallax portrait below.
// Parallax: IntersectionObserver enables a scroll listener that shifts
// the image by up to 200px based on viewport position (rAF-throttled).
export default function TestimonialSection() {
  const { ref, inView } = useInViewAnimation<HTMLElement>()
  const imgWrapRef = useRef<HTMLDivElement | null>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const el = imgWrapRef.current
    if (!el) return
    let active = false
    let raf = 0

    const update = () => {
      raf = 0
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      // progress 0..1 while the element crosses the viewport
      const progress = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1)
      setOffset((progress - 0.5) * 2 * 200) // max ±200px
    }

    const onScroll = () => {
      if (!active || raf) return
      raf = requestAnimationFrame(update)
    }

    const io = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting
      if (active) update()
    })
    io.observe(el)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      io.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const anim = (_delay?: string) => (inView ? 'animate-fade-in-up' : 'opacity-0')

  return (
    <section ref={ref} className="py-12 px-6 max-w-2xl mx-auto text-center">
      <div className={anim('0.1s')} style={{ animationDelay: '0.1s' }}>
        <Quote className="w-6 h-6 text-slate-900 mx-auto" />
      </div>

      <h2
        className={`mt-6 text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-[#0D212C] tracking-tight ${anim('0.2s')}`}
        style={{ animationDelay: '0.2s' }}
      >
        Я знімаю так, щоб ви{' '}
        <span className="font-accent italic">забули про камеру</span>
      </h2>

      <p
        className={`mt-6 italic text-sm text-[#273C46] ${anim('0.3s')}`}
        style={{ animationDelay: '0.3s' }}
      >
        Юлія Компанець
      </p>

      <div
        className={`mt-10 flex items-center justify-center gap-8 text-slate-900 font-medium text-2xl ${anim('0.4s')}`}
        style={{ animationDelay: '0.4s' }}
      >
        <span className="font-accent">Весілля</span>
        <span className="font-accent">Хрещення</span>
        <span className="font-accent">Сімейні</span>
      </div>

      <div
        ref={imgWrapRef}
        className={`mt-12 flex justify-center ${anim('0.5s')}`}
        style={{ animationDelay: '0.5s' }}
      >
        <img
          src={parallaxImage}
          alt="Юлія Компанець за роботою"
          className="w-full max-w-xs rounded-2xl shadow-lg will-change-transform"
          style={{ transform: `translateY(${offset * 0.25}px)` }}
          loading="lazy"
        />
      </div>
    </section>
  )
}
