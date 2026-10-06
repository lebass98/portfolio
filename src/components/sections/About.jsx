import { useRef } from 'react'
import { about } from '../../data/site'
import { gsap, useGSAP } from '../../lib/gsap'
import { Btn, Cols, Diamond, QuoteMark, SectionHead, TwoTone, Wordmark } from '../ui'

function Ticker({ items }) {
  const track = useRef(null)
  useGSAP(
    () => {
      const w = track.current.scrollWidth / 2
      gsap.to(track.current, { x: -w, duration: w / 18, ease: 'none', repeat: -1 })
    },
    { scope: track },
  )
  const row = (key) =>
    items.map((name) => (
      <li key={`${key}-${name}`} className="flex w-[150px] shrink-0 items-center justify-center gap-2 text-[13px] font-bold tracking-[-0.02em] text-[#3c3c3c]">
        <Diamond className="size-[5px] text-mute" />
        {name}
      </li>
    ))
  return (
    <div className="relative overflow-hidden">
      <span className="hline absolute inset-x-0 top-0" />
      <span className="hline absolute inset-x-0 bottom-0" />
      <ul ref={track} className="flex h-12 w-max items-center">
        {row('a')}
        {row('b')}
      </ul>
    </div>
  )
}

function StatIcon({ level }) {
  return (
    <span className="flex h-2 w-[26px] items-center justify-center gap-[3px] rounded-full bg-ink">
      {[0, 1, 2, 3].map((i) => (
        <i key={i} className={`size-[3px] rounded-full ${i <= level ? 'bg-mint' : 'bg-white/35'}`} />
      ))}
    </span>
  )
}

export default function About() {
  const root = useRef(null)
  const mark = useRef(null)

  useGSAP(
    () => {
      // 워드마크: 히어로 아래쪽에 걸쳐 있다가 스크롤하면 제자리로 내려앉는다
      gsap.fromTo(
        mark.current,
        { y: -120 },
        { y: 0, ease: 'none', scrollTrigger: { start: 0, end: () => window.innerHeight * 0.5, scrub: 0.5, invalidateOnRefresh: true } },
      )
      // 통계 카드: 오른쪽으로 갈수록 더 아래에서 올라온다
      const cards = gsap.utils.toArray('[data-stat]')
      gsap.from(cards, {
        y: (i) => 48 + i * 24,
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: { trigger: cards[0], start: 'top 98%' },
      })
      // 숫자: 화면에 들어오면 0부터 목표값까지 올라간다
      root.current.querySelectorAll('[data-count]').forEach((el) => {
        const end = Number(el.dataset.count)
        const o = { v: 0 }
        el.textContent = '0'
        gsap.to(o, {
          v: end,
          duration: 2,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 95%', once: true },
          onUpdate: () => (el.textContent = Math.round(o.v)),
        })
      })
    },
    { scope: root },
  )

  return (
    <section id="about" ref={root} className="relative z-[1] overflow-clip rounded-t-[12px] bg-paper pb-24">
      <Cols />
      <div className="wrap">
        <div ref={mark} className="text-ink">
          <Wordmark className="aspect-[8.77] w-full" />
        </div>
      </div>

      <div className="wrap relative mt-24 max-[809px]:mt-14">
        <SectionHead label={about.label} title={about.title} desc={about.desc} />

        <div className="grid4 mt-24 gap-y-12 max-[809px]:mt-16">
          <div className="relative flex flex-col gap-5 pr-9">
            <QuoteMark className="absolute -top-[42px] left-0 text-sub" />
            <p className="t-quote">
              <TwoTone parts={about.quote} />
            </p>
            <div className="flex items-center gap-2">
              <span className="grid size-10 place-items-center rounded-[4px] bg-ink font-wide text-[13px] font-black text-mint">JK</span>
              <div className="flex flex-col gap-[6px] pl-1">
                <span className="text-[14px] leading-[1.2] font-bold tracking-[-0.02em]">{about.person.name}</span>
                <span className="t-mono text-sub">{about.person.role}</span>
              </div>
            </div>
          </div>
          <div className="col-span-2 flex flex-col justify-end max-[809px]:col-span-1">
            <Ticker items={about.clients} />
          </div>
          <div className="flex flex-col justify-end gap-3">
            <p className="t-mono text-sub">{about.ctaLabel}</p>
            <Btn href="#career">{about.cta}</Btn>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-4 max-[1199px]:grid-cols-2 max-[809px]:mt-16 max-[809px]:grid-cols-1">
          {about.stats.map((s, i) => (
            <div key={s.label} data-stat className="m-1.5 flex h-60 flex-col justify-between rounded-[6px] bg-white p-6">
              <div className="flex flex-col gap-[13px]">
                <StatIcon level={i} />
                <span className="t-mono text-sub">{s.label}</span>
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-[56px] leading-[0.9] font-bold tracking-[-0.03em]">
                  <span data-count={s.value}>{s.value}</span>
                  {s.suffix}
                </span>
                <span className="t-body whitespace-pre-line text-sub">{s.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
