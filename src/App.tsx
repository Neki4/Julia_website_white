import { useMemo } from 'react'
import { useInViewAnimation } from './hooks/useInViewAnimation'
import Button from './components/Button'
import TestimonialSection from './components/TestimonialSection'
import PricingSection from './components/PricingSection'
import TestimonialCarousel from './components/TestimonialCarousel'
import ProjectsSection from './components/ProjectsSection'
import PartnerSection from './components/PartnerSection'
import Footer from './components/Footer'
import CopyrightBar from './components/CopyrightBar'
import BottomNav from './components/BottomNav'
import { CONTACT_URL, marqueeFallbacks, marqueeImages } from './data'

function Hero() {
  const { ref, inView } = useInViewAnimation<HTMLElement>()
  const anim = inView ? 'animate-fade-in-up' : 'opacity-0'

  return (
    <section ref={ref} className="mx-auto max-w-[440px] px-6 pt-12 md:pt-16">
      <h1
        className={`font-accent text-[32px] md:text-[40px] lg:text-[44px] font-semibold text-[#051A24] tracking-tight mb-4 ${anim}`}
        style={{ animationDelay: '0.1s' }}
      >
        Юлія Компанець
      </h1>

      <p
        className={`font-mono text-xs md:text-sm text-[#051A24] mb-2 ${anim}`}
        style={{ animationDelay: '0.2s' }}
      >
        Фотографка · Київ
      </p>

      <h2
        className={`text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-[#0D212C] tracking-tight md:whitespace-nowrap ${anim}`}
        style={{ animationDelay: '0.3s' }}
      >
        Знімаю <span className="font-accent italic">живі емоції</span>,
        <br />а не <span className="font-accent italic">постановку.</span>
      </h2>

      <div
        className={`flex flex-col gap-6 text-sm md:text-base text-[#051A24] leading-relaxed mt-5 md:mt-6 ${anim}`}
        style={{ animationDelay: '0.4s' }}
      >
        <p>
          Я працюю сама і беру обмежену кількість зйомок на місяць: так кожен
          проєкт отримує максимум уваги — від ідеї та підбору образів до
          авторської обробки.
        </p>
        <p>
          <strong className="font-medium">
            Я зловлю найважливіші та найемоційніші моменти вашого весілля.
          </strong>{' '}
          Мені щоразу неймовірно радісно бачити сяючі усмішки пари та їхніх
          гостей під час церемонії!
        </p>
        <p>
          Природні кольори та справжні емоції — найцінніше для мене у
          фотографіях. Повірте, процес зйомки буде таким же чудовим, як і
          фінальний результат.{' '}
          <strong className="font-medium">
            Буду рада стати частиною вашого весілля.
          </strong>
        </p>
      </div>

      <div
        className={`flex flex-col sm:flex-row gap-3 md:gap-4 mt-5 md:mt-6 ${anim}`}
        style={{ animationDelay: '0.5s' }}
      >
        <Button href={CONTACT_URL} external variant="primary">
          Написати мені
        </Button>
        <Button href="#projects" variant="secondary">
          Дивитися роботи
        </Button>
      </div>
    </section>
  )
}

function Marquee() {
  // Shuffle once per page load so the strip starts in a random order
  const shuffled = useMemo(() => {
    const arr = [...marqueeImages]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [])
  const doubled = [...shuffled, ...shuffled]
  // ~3.75s per photo keeps the scroll speed constant for any photo count
  const duration = `${marqueeImages.length * 3.75}s`
  return (
    <div className="w-full overflow-hidden mt-16 md:mt-20 mb-16">
      <div
        className="flex w-max animate-marquee"
        style={{ '--marquee-duration': duration } as React.CSSProperties}
      >
        {doubled.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="Фото зі зйомок Юлії Компанець"
            className="h-[280px] md:h-[500px] object-cover mx-3 rounded-2xl shadow-lg"
            loading={i < 4 ? 'eager' : 'lazy'}
            onError={(e) => {
              // Local photo not uploaded yet — fall back to the placeholder
              const img = e.currentTarget
              if (img.dataset.fb) return
              img.dataset.fb = '1'
              img.src = marqueeFallbacks[i % marqueeFallbacks.length]
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="bg-white min-h-screen pb-28">
      <Hero />
      <Marquee />
      <TestimonialSection />
      <PricingSection />
      <TestimonialCarousel />
      <ProjectsSection />
      <PartnerSection />
      <Footer />
      <CopyrightBar />
      <BottomNav />
    </div>
  )
}
