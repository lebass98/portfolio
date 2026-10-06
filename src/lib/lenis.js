import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'

// Lenis를 GSAP 티커에 묶어 ScrollTrigger와 같은 프레임에서 갱신
export function createLenis() {
  const lenis = new Lenis({ duration: 1.15, anchors: { offset: 0 }, autoRaf: false })
  lenis.on('scroll', ScrollTrigger.update)
  const tick = (time) => lenis.raf(time * 1000)
  gsap.ticker.add(tick)
  gsap.ticker.lagSmoothing(0)
  return {
    lenis,
    destroy() {
      gsap.ticker.remove(tick)
      lenis.destroy()
    },
  }
}
