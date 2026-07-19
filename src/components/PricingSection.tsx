import { Check } from 'lucide-react'
import { useInViewAnimation } from '../hooks/useInViewAnimation'
import Button from './Button'
import { CONTACT_URL, packages } from '../data'
import type { ServicePackage } from '../data'

function PackageCard({ pack, delay }: { pack: ServicePackage; delay: string }) {
  const { ref, inView } = useInViewAnimation<HTMLDivElement>()
  const dark = pack.featured

  return (
    <div
      ref={ref}
      className={`relative flex flex-col rounded-[40px] px-8 md:px-10 pt-10 pb-10 ${
        dark
          ? 'bg-[#051A24] shadow-[inset_0_2px_12px_rgba(255,255,255,0.08)]'
          : 'bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)]'
      } ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: delay }}
    >
      {pack.featured && (
        <span className="absolute -top-3 left-10 rounded-full bg-[#051A24] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#F6FCFF] shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_4px_16px_rgba(0,0,0,0.15)]">
          Найпопулярніший
        </span>
      )}

      <h3
        className={`text-[22px] font-medium ${dark ? 'text-[#F6FCFF]' : 'text-[#0D212C]'}`}
      >
        {pack.name}
      </h3>
      {pack.desc && (
        <p className={`mt-2 text-sm leading-relaxed ${dark ? 'text-[#E0EBF0]' : 'text-[#273C46]'}`}>
          {pack.desc}
        </p>
      )}

      <p className={`mt-6 text-2xl font-medium ${dark ? 'text-[#F6FCFF]' : 'text-[#0D212C]'}`}>
        {pack.price}
      </p>
      <p className={`text-sm ${dark ? 'text-[#E0EBF0]' : 'text-[#273C46]'}`}>
        {pack.priceNote}
      </p>

      <ul className="mt-6 flex flex-col gap-3">
        {pack.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <Check
              className={`mt-0.5 h-4 w-4 shrink-0 ${dark ? 'text-[#E0EBF0]' : 'text-[#0D212C]'}`}
            />
            <span
              className={`text-sm leading-relaxed ${dark ? 'text-[#E0EBF0]' : 'text-[#273C46]'}`}
            >
              {f}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8 flex flex-col gap-3">
        <Button
          href={CONTACT_URL}
          external
          variant={dark ? 'primary' : 'tertiary'}
          className="w-full"
        >
          Написати мені
        </Button>
        <Button
          href={`#gallery-${pack.galleryId}`}
          variant="secondary"
          className="w-full"
        >
          Дивитись фото
        </Button>
      </div>
    </div>
  )
}

// All service packages from the main site, in this landing's visual language.
export default function PricingSection() {
  const { ref, inView } = useInViewAnimation<HTMLElement>()
  const anim = inView ? 'animate-fade-in-up' : 'opacity-0'

  return (
    <section id="pricing" ref={ref} className="w-full py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] text-[#0D212C] tracking-tight ${anim}`}
          style={{ animationDelay: '0.1s' }}
        >
          Тарифи на <span className="font-accent italic">зйомки</span>
        </h2>
        <p
          className={`mt-4 text-[#273C46] ${anim}`}
          style={{ animationDelay: '0.2s' }}
        >
          Оберіть формат — усе інше я беру на себе.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pack, i) => (
            <PackageCard
              key={pack.name}
              pack={pack}
              delay={`${0.1 + (i % 3) * 0.1}s`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
