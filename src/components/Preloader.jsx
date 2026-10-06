import { useRef } from 'react'
import { brand } from '../data/site'
import { gsap, useGSAP } from '../lib/gsap'
import { useCapHeight } from '../lib/useCapHeight'
import { Cols } from './ui'

// 첫 진입 화면: 워드마크 글자가 차례로 진해지고, 어두운 히어로가 아래에서 덮어 올라온다
export default function Preloader({ onReveal, onDone }) {
  const root = useRef(null)
  const asc = useCapHeight(brand.wordmark)

  useGSAP(
    () => {
      const letters = root.current.querySelectorAll('[data-l]')
      const mark = root.current.querySelector('[data-mark]')
      const tl = gsap.timeline({ delay: 0.3 })
      tl.to(letters, { attr: { 'fill-opacity': 1 }, duration: 0.65, ease: 'power1.in', stagger: 0.13 })
        .to(mark, { y: () => -window.innerHeight * 0.42, duration: 1.1, ease: 'power2.inOut' }, '-=0.05')
        .add(() => onReveal?.(), '<0.1')
        .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.95, ease: 'power3.inOut' }, '<0.05')
        .add(() => onDone?.())
    },
    { scope: root },
  )

  return (
    <div
      ref={root}
      className="grain fixed inset-0 z-[100] flex items-center justify-center bg-[#f0f0f0]"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      aria-hidden="true"
    >
      <Cols />
      <svg data-mark viewBox={`0 ${-asc} 1000 ${asc}`} preserveAspectRatio="none" className="relative w-[min(47vw,680px)] aspect-[8.8] max-[809px]:w-[72vw]">
        <text
          x="0"
          y="0"
          textLength="1000"
          lengthAdjust="spacingAndGlyphs"
          fill="#050505"
          style={{ fontFamily: 'var(--font-wide)', fontWeight: 900, fontSize: 100 }}
        >
          {[...brand.wordmark].map((ch, i) => (
            <tspan key={i} data-l fillOpacity="0">
              {ch}
            </tspan>
          ))}
        </text>
      </svg>
    </div>
  )
}
