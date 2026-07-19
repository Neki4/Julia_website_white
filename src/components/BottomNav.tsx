import Button from './Button'
import { CONTACT_URL } from '../data'

// Floating pill pinned to the bottom of the viewport.
export default function BottomNav() {
  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-5 bg-white rounded-full px-8 py-2 shadow-[0_1px_2px_0_rgba(5,26,36,0.1),0_4px_8px_0_rgba(5,26,36,0.09),0_10px_12px_0_rgba(5,26,36,0.05),0_0_0_0.5px_rgba(0,0,0,0.05)]">
      <span className="font-accent text-2xl font-semibold text-[#051A24]">Ю</span>
      <Button href={CONTACT_URL} external variant="primary" className="!px-5 !py-2 text-sm">
        Написати мені
      </Button>
    </nav>
  )
}
