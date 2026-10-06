import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '../lib/gsap'
import SiteInfo, { Copyright, WatermarkMark } from './SiteInfo'
import { Cols, Wordmark } from './ui'

export default function Header({ lenis }) {
  const bar = useRef(null)
  const menu = useRef(null)
  const [open, setOpen] = useState(false)
  const openRef = useRef(false)

  // 아래로 스크롤하면 숨기고, 위로 올리면 다시 보여준다
  useGSAP(() => {
    const show = gsap.quickTo(bar.current, 'yPercent', { duration: 0.6, ease: 'power3.out' })
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        if (openRef.current) return show(0)
        const y = self.scroll()
        show(self.direction === 1 && y > 120 ? -100 : 0)
      },
    })
  })

  useEffect(() => {
    openRef.current = open
    if (open) {
      lenis?.stop()
      gsap.to(bar.current, { yPercent: 0, duration: 0.4 })
    } else lenis?.start()
    const el = menu.current
    gsap.to(el, { autoAlpha: open ? 1 : 0, duration: 0.45, ease: 'power2.out' })
    gsap.fromTo(el.querySelectorAll('[data-m]'), { y: open ? 10 : 0 }, { y: 0, duration: 0.7, ease: 'expo.out' })
  }, [open, lenis])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <div
        ref={menu}
        className="grain invisible fixed inset-0 z-[55] overflow-y-auto bg-[#f0f0f0] opacity-0"
        role="dialog"
        aria-modal="true"
        aria-label="사이트 메뉴"
        aria-hidden={!open}
      >
        <Cols />
        <WatermarkMark className="absolute inset-x-0 -bottom-[0.47vw] text-[#e2e2e2]" />
        <div className="relative flex min-h-full flex-col justify-between">
          <div data-m className="wrap pt-24 max-[809px]:pt-[88px]">
            <SiteInfo onNavigate={() => setOpen(false)} />
          </div>
          <div data-m className="wrap flex h-[120px] items-start max-[809px]:mt-16">
            <Copyright />
          </div>
        </div>
      </div>

      <header ref={bar} className="fixed inset-x-0 top-0 z-[60] text-white mix-blend-difference">
        <div className="wrap flex h-24 items-center justify-between max-[809px]:h-[72px]">
          <a href="#top" aria-label="처음으로" onClick={() => setOpen(false)}>
            <Wordmark className="aspect-[8.8] w-[120px] max-[809px]:w-[104px]" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={open}
            className="relative h-6 w-12"
          >
            <span
              className={`absolute left-0 h-[2px] w-12 bg-current transition-all duration-500 ease-[var(--ease-expo)] ${open ? 'top-[11px] rotate-[22deg]' : 'top-1'}`}
            />
            <span
              className={`absolute left-0 h-[2px] w-12 bg-current transition-all duration-500 ease-[var(--ease-expo)] ${open ? 'top-[11px] -rotate-[22deg]' : 'top-[18px]'}`}
            />
          </button>
        </div>
      </header>
    </>
  )
}
