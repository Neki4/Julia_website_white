import { ArrowUpRight } from 'lucide-react'
import Button from './Button'
import { CONTACT_URL, INSTAGRAM_URL } from '../data'

export default function Footer() {
  return (
    <footer className="w-full py-12 px-6 max-w-[1200px] mx-auto">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10">
        <Button href={CONTACT_URL} external variant="primary">
          Написати мені
        </Button>

        <div className="flex items-start gap-10">
          <ArrowUpRight className="w-5 h-5 text-[#051A24] mt-1" />
          <div className="flex flex-col gap-2">
            <a href="#pricing" className="text-base text-[#051A24] hover:opacity-70 transition-opacity">
              Послуги
            </a>
            <a href="#projects" className="text-base text-[#051A24] hover:opacity-70 transition-opacity">
              Роботи
            </a>
            <a href="#reviews" className="text-base text-[#051A24] hover:opacity-70 transition-opacity">
              Відгуки
            </a>
          </div>
          <div className="flex flex-col gap-2">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener"
              className="text-base text-[#051A24] hover:opacity-70 transition-opacity"
            >
              Instagram
            </a>
            <a
              href={CONTACT_URL}
              target="_blank"
              rel="noopener"
              className="text-base text-[#051A24] hover:opacity-70 transition-opacity"
            >
              Telegram
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
