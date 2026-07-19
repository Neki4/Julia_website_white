import { useEffect, useRef, useState } from 'react'

// Triggers once when the element enters the viewport (threshold 0.1).
// Usage: const { ref, inView } = useInViewAnimation<HTMLDivElement>()
// then className={inView ? 'animate-fade-in-up' : 'opacity-0'}
export function useInViewAnimation<T extends HTMLElement>(threshold = 0.1) {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}
