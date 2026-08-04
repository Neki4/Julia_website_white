import { Quote } from 'lucide-react'
import { useInViewAnimation } from '../hooks/useInViewAnimation'

// Short quote that leads straight into the pricing section.
export default function TestimonialSection() {
  const { ref, inView } = useInViewAnimation<HTMLElement>()
  const anim = inView ? 'animate-fade-in-up' : 'opacity-0'

  return (
    <section ref={ref} className="py-12 px-6 max-w-2xl mx-auto text-center">
      <div className={anim} style={{ animationDelay: '0.1s' }}>
        <Quote className="w-6 h-6 text-slate-900 mx-auto" />
      </div>

      <h2
        className={`mt-6 text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-[#0D212C] tracking-tight ${anim}`}
        style={{ animationDelay: '0.2s' }}
      >
        Мені ти зможеш довірити{' '}
        <span className="font-accent italic">найцінніше.</span>
      </h2>
    </section>
  )
}
