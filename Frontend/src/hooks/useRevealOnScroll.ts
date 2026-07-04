import { useEffect } from 'react'

const REVEAL_SELECTOR =
  '.reveal:not(.revealed), .reveal-left:not(.revealed), .reveal-right:not(.revealed), .reveal-scale:not(.revealed)'

export function useRevealOnScroll(...deps: unknown[]) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed')
          }
        })
      },
      { threshold: 0.1 }
    )

    const observe = () => {
      document.querySelectorAll(REVEAL_SELECTOR).forEach((el) => observer.observe(el))
    }

    observe()
    const frame = requestAnimationFrame(observe)

    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, deps)
}
