import { useRef } from 'react'
import { hero } from '../../data/site'
import { gsap, useGSAP } from '../../lib/gsap'
import HeroBg from '../HeroBg'
import { Btn, Cols, ProofBadge, TwoTone, Wordmark } from '../ui'

export default function Hero({ revealed }) {
  const root = useRef(null)
  const intro = useRef(null)
  const inner = useRef(null)

  // 로딩 화면이 걷힐 때 내용이 아래에서 따라 올라온다
  useGSAP(
    () => {
      if (!revealed) {
        gsap.set(intro.current, { y: '42vh', opacity: 0.35 })
        return
      }
      gsap.to(intro.current, { y: 0, duration: 1.05, ease: 'power3.inOut' })
      gsap.to(intro.current, { opacity: 1, duration: 0.9, ease: 'power1.inOut', delay: 0.35 })
    },
    { dependencies: [revealed], scope: root },
  )

  // 히어로는 고정되고, 내용만 스크롤 양의 10%만큼 위로 이동
  useGSAP(
    () => {
      gsap.to(inner.current, {
        y: () => -window.innerHeight * 0.1,
        ease: 'none',
        scrollTrigger: { start: 0, end: () => window.innerHeight, scrub: true, invalidateOnRefresh: true },
      })
    },
    { scope: root },
  )

  return (
    <section id="top" ref={root} className="tone-dark sticky top-0 z-[1] h-svh min-h-[680px] overflow-hidden bg-ink text-paper max-[809px]:min-h-[620px]">
      <HeroBg />
      <Cols />
      <div className="wrap pointer-events-none absolute inset-x-0 bottom-0 z-[1]" aria-hidden="true">
        <Wordmark className="aspect-[8.77] w-full text-paper" />
      </div>
      <div ref={intro} className="relative z-[2]">
        <div ref={inner} className="wrap pt-[192px] max-[1199px]:pt-40 max-[809px]:pt-[120px]">
          <div className="grid4 gap-y-12">
            <div className="col-span-3 flex flex-col gap-9 pr-12 max-[1199px]:col-span-4 max-[1199px]:pr-0 max-[809px]:col-span-1 max-[809px]:gap-6">
              <h1 className="t-h1 max-w-[900px]">
                <TwoTone parts={hero.title} accent="text-mint" strong="text-[#f2f2f2]" />
              </h1>
              <p className="t-lead max-w-[800px] text-mute">{hero.sub}</p>
            </div>
            <div className="flex h-[240px] flex-col justify-between max-[1199px]:col-span-2 max-[1199px]:h-auto max-[1199px]:gap-10 max-[809px]:col-span-1">
              <ProofBadge thumbs={hero.thumbs} value={hero.badge.value} lines={hero.badge.lines} dark />
              <div>
                <p className="t-mono mb-3 text-mute">{hero.ctaLabel}</p>
                <Btn variant="dark" href="#contact">
                  {hero.cta}
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
