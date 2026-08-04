import { Check } from 'lucide-react'
import { useInViewAnimation } from '../hooks/useInViewAnimation'
import Button from './Button'
import { CONTACT_URL, packages } from '../data'
import type { ServicePackage } from '../data'

function PackageCard({ pack, delay }: { pack: ServicePackage; delay: string }) {
  const { ref, inView } = useInViewAnimation<HTMLDivElement>()
  // The featured package is highlighted with a warm beige card
  const featured = pack.featured

  return (
    <div
      ref={ref}
      className={`relative flex flex-col rounded-[40px] px-8 md:px-10 pt-10 pb-10 ${
        featured
          ? 'bg-[#EFE3D0] shadow-[0_4px_20px_rgba(93,72,42,0.16)]'
          : 'bg-white shadow-[0_4px_16px_rgba(0,0,0,0.08)]'
      } ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
      style={{ animationDelay: delay }}
    >
      {featured && (
        <span className="absolute z-20 -top-3 left-10 rounded-full bg-[#051A24] px-4 py-1 text-xs font-semibold uppercase tracking-wide text-[#F6FCFF] shadow-[0_0_0_0.5px_rgba(0,0,0,0.05),0_4px_16px_rgba(0,0,0,0.15)]">
          Найпопулярніший
        </span>
      )}

      {/* Very faint package photo behind the card content */}
      {pack.bgImage && (
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden rounded-[40px]"
          aria-hidden="true"
        >
          <img
            src={pack.bgImage}
            alt=""
            loading="lazy"
            className="w-full h-full object-cover object-top opacity-[0.60]"
          />
          <div
            className={`absolute inset-0 ${
              featured
                ? 'bg-gradient-to-b from-[#EFE3D0]/50 via-[#EFE3D0]/40 to-[#EFE3D0]/60'
                : 'bg-gradient-to-b from-white/45 via-white/35 to-white/55'
            }`}
          />
        </div>
      )}

      <div className="relative z-10 flex flex-col flex-1">
      <h3 className="text-[26px] font-semibold text-[#051A24]">{pack.name}</h3>
      {pack.desc && (
        <p className="mt-2 text-base leading-relaxed text-[#0D212C]">
          {pack.desc}
        </p>
      )}

      <p className="mt-6 text-[28px] font-semibold text-[#051A24]">
        {pack.price}
      </p>
      <p className="text-base text-[#0D212C]">{pack.priceNote}</p>

      <ul className="mt-6 flex flex-col gap-3">
        {pack.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <Check className="mt-1 h-4 w-4 shrink-0 text-[#051A24]" />
            <span className="text-base leading-relaxed text-[#0D212C]">
              {f}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8 flex flex-col gap-3">
        <Button
          href={CONTACT_URL}
          external
          variant={featured ? 'primary' : 'tertiary'}
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
