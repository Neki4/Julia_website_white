import { useRef } from 'react'
import { useInViewAnimation } from '../hooks/useInViewAnimation'
import Button from './Button'
import { CONTACT_URL, marqueeFallbacks, marqueeImages, parallaxImage } from '../data'

// Big CTA container. Moving the mouse over it spawns photo thumbnails
// at the cursor with a random rotation; each fades out over ~1s.
export default function PartnerSection() {
  const { ref, inView } = useInViewAnimation<HTMLElement>()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const lastSpawn = useRef(0)
  const imgIndex = useRef(0)

  const onMouseMove = (e: React.MouseEvent) => {
    const now = performance.now()
    if (now - lastSpawn.current < 80) return // spawn every 80ms minimum
    lastSpawn.current = now
    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const img = document.createElement('img')
    const i = imgIndex.current % marqueeImages.length
    img.src = marqueeImages[i]
    // Local photo not uploaded yet — fall back to the placeholder
    img.onerror = () => {
      img.onerror = null
      img.src = marqueeFallbacks[i % marqueeFallbacks.length]
    }
    imgIndex.current += 1
    img.className =
      'animate-trail-out pointer-events-none absolute w-32 h-24 object-cover rounded-xl shadow-lg'
    img.style.left = `${e.clientX - rect.left}px`
    img.style.top = `${e.clientY - rect.top}px`
    img.style.setProperty('--rot', `${(Math.random() * 20 - 10).toFixed(1)}deg`)
    container.appendChild(img)
    window.setTimeout(() => img.remove(), 1000)
  }

  return (
    <section ref={ref} className="w-full py-12 px-6">
      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        className={`relative overflow-hidden max-w-7xl mx-auto py-48 rounded-[40px] bg-white shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_4px_30px_rgba(0,0,0,0.06)] flex flex-col items-center justify-center text-center ${
          inView ? 'animate-fade-in-up' : 'opacity-0'
        }`}
      >
        <h2 className="relative z-10 font-accent text-[48px] md:text-[64px] lg:text-[80px] text-[#0D212C] mb-12 px-6">
          Забронюйте зйомку
        </h2>
        <div className="relative z-10">
          <Button href={CONTACT_URL} external variant="primary">
            <img
              src={parallaxImage}
              alt=""
              className="w-10 h-10 rounded-full object-cover -ml-3"
            />
            Написати Юлії
          </Button>
        </div>
      </div>
    </section>
  )
}
