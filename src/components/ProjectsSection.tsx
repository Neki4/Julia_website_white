import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useInViewAnimation } from '../hooks/useInViewAnimation'
import { galleries, galleryImages } from '../data'

// Light-theme SVG placeholder shown until a real photo is dropped
// into public/packages/<packId>/<n>.jpg
function makePlaceholder(label: string) {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000">' +
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">' +
    '<stop offset="0" stop-color="#F4F1EA"/><stop offset="1" stop-color="#E7E2D8"/>' +
    '</linearGradient></defs>' +
    '<rect width="1600" height="1000" fill="url(#g)"/>' +
    '<circle cx="1250" cy="240" r="140" fill="none" stroke="#0D212C" stroke-opacity="0.12" stroke-width="2"/>' +
    '<text x="800" y="530" text-anchor="middle" font-family="Georgia, serif" font-size="72" fill="#9AA3A7">' +
    label +
    '</text></svg>'
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg)
}

function PackageCarousel({
  packId,
  packName,
}: {
  packId: string
  packName: string
}) {
  const images = galleryImages(packId)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const t = window.setInterval(
      () => setIndex((i) => (i + 1) % images.length),
      3500,
    )
    return () => window.clearInterval(t)
  }, [paused, images.length])

  const pad = (n: number) => String(n).padStart(2, '0')

  return (
    <div
      className="relative overflow-hidden rounded-2xl shadow-lg aspect-[4/5] md:aspect-[16/9] bg-[#F4F1EA] group"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {images.map((src, i) => (
          <div key={src} className="relative w-full h-full shrink-0 overflow-hidden">
            {/* Blurred copy fills the frame behind the uncropped photo */}
            <img
              src={src}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-50"
              onError={(e) => {
                const img = e.currentTarget
                if (img.dataset.ph) return
                img.dataset.ph = '1'
                img.src = makePlaceholder('')
              }}
            />
            {/* The photo itself — always shown in full, never cropped */}
            <img
              src={src}
              alt={`Пакет «${packName}» — фото ${i + 1}`}
              loading="lazy"
              className="relative w-full h-full object-contain"
              onError={(e) => {
                const img = e.currentTarget
                if (img.dataset.ph) return
                img.dataset.ph = '1'
                img.src = makePlaceholder(`Фото ${i + 1}`)
              }}
            />
          </div>
        ))}
      </div>

      {/* slide counter */}
      <span className="absolute top-4 right-5 rounded-full bg-white/80 backdrop-blur px-3 py-1 text-xs tracking-widest text-[#0D212C]">
        {pad(index + 1)} — {pad(images.length)}
      </span>

      {/* arrows */}
      <button
        aria-label="Попереднє фото"
        onClick={() => setIndex((i) => (i - 1 + images.length) % images.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-5 h-5 text-[#0D212C]" />
      </button>
      <button
        aria-label="Наступне фото"
        onClick={() => setIndex((i) => (i + 1) % images.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-5 h-5 text-[#0D212C]" />
      </button>

      {/* dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Фото ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === index ? 'bg-[#0D212C]' : 'bg-[#0D212C]/25'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function PackageBlock({ packId, name }: { packId: string; name: string }) {
  const { ref, inView } = useInViewAnimation<HTMLDivElement>()
  return (
    <div
      ref={ref}
      id={`gallery-${packId}`}
      className={`scroll-mt-10 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
    >
      <div className="ml-20 md:ml-28 mb-6">
        <h3 className="font-accent text-2xl md:text-3xl font-semibold text-[#051A24]">
          {name}
        </h3>
      </div>
      <PackageCarousel packId={packId} packName={name} />
    </div>
  )
}

// One full-width photo carousel per gallery (weddings are merged into
// a single block). Anchor targets for the "Дивитись фото" buttons.
export default function ProjectsSection() {
  return (
    <section id="projects" className="max-w-[1200px] mx-auto px-6 py-12">
      <div className="flex flex-col gap-16 md:gap-20">
        {galleries.map((g) => (
          <PackageBlock key={g.id} packId={g.id} name={g.name} />
        ))}
      </div>
    </section>
  )
}
