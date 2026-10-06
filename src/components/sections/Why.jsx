import { useEffect, useRef, useState } from 'react'
import { hero, why } from '../../data/site'
import { gsap, useGSAP } from '../../lib/gsap'
import { Cols, Diamond, FitText, ProofBadge, SectionHead, TwoTone } from '../ui'

// 리스트 아이콘 (18px, 직접 그린 선 아이콘)
const ICONS = [
  <svg key="a" viewBox="0 0 18 18" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="9" cy="9" r="7.25" />
    <path d="M1.75 9h14.5M9 1.75c2.2 2 3.3 4.4 3.3 7.25S11.2 14.25 9 16.25C6.8 14.25 5.7 11.85 5.7 9S6.8 3.75 9 1.75Z" />
  </svg>,
  <svg key="b" viewBox="0 0 18 18" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
    <path d="M10.25 1.75 3.5 10.25h5.25l-1 6 6.75-8.5H9.25l1-6Z" />
  </svg>,
  <svg key="c" viewBox="0 0 18 18" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1.75 16.25h14.5M2.5 12.5l4-4 3 3 6-6.5M12 5h4v4" />
  </svg>,
]

const BAR_RATIO = [0.05, 0.05, 0.1, 0.15, 0.2, 0.25, 0.4, 0.6, 0.8, 1]

// 타일 카드 초기 색 배치 (4열 × 5행)
const TILE_START = [
  'mint20', null, '#e0e0e0', null,
  null, '#e0e0e0', '#fafafa', '#999999',
  '#e0e0e0', '#f5f5f5', 'mint', null,
  null, '#050505', '#fafafa', '#e0e0e0',
  '#e0e0e0', 'mint20', '#e0e0e0', 'mint20',
]
const tileColor = (c) => (c === 'mint' ? '#00ffc8' : c === 'mint20' ? 'rgba(0,255,200,0.2)' : c)

function Tiles() {
  const [tiles, setTiles] = useState(TILE_START)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // 일정 간격으로 두 칸의 색을 바꿔 살아있는 격자처럼 보이게 한다
    const id = setInterval(() => {
      setTiles((prev) => {
        const next = [...prev]
        const filled = next.map((c, i) => (c ? i : -1)).filter((i) => i >= 0)
        const a = filled[Math.floor(Math.random() * filled.length)]
        const b = Math.floor(Math.random() * next.length)
        ;[next[a], next[b]] = [next[b], next[a]]
        return next
      })
    }, 1400)
    return () => clearInterval(id)
  }, [])
  return (
    <div className="absolute inset-0 grid grid-cols-4 grid-rows-5">
      {tiles.map((c, i) => (
        <div
          key={i}
          className="relative p-1.5"
          style={{
            borderRight: i % 4 === 3 ? 'none' : '1px dashed rgba(33,33,33,0.08)',
            borderBottom: i >= 16 ? 'none' : '1px dashed rgba(33,33,33,0.08)',
          }}
        >
          <div
            className="h-full w-full rounded-[6px] transition-colors duration-700"
            style={{ backgroundColor: c ? tileColor(c) : 'transparent' }}
          />
        </div>
      ))}
    </div>
  )
}

export default function Why() {
  const root = useRef(null)

  useGSAP(
    () => {
      // 문단: 스크롤에 따라 단어가 연회색에서 검정으로 채워진다
      const words = gsap.utils.toArray('[data-word]')
      gsap.to(words, {
        color: '#050505',
        ease: 'none',
        stagger: 0.12,
        scrollTrigger: { trigger: '[data-fill]', start: 'top 82%', end: 'bottom 48%', scrub: 0.4 },
      })

      // 벤토 카드: 아래에서 떠오르며 등장
      const cards = gsap.utils.toArray('[data-bento]')
      cards.forEach((card, i) => {
        gsap.from(card, {
          y: 48,
          duration: 1.4,
          ease: 'expo.out',
          delay: (i % 3) * 0.06,
          scrollTrigger: { trigger: card, start: 'top 96%' },
        })
      })

      // 숫자 카운터
      const num = root.current.querySelector('[data-count]')
      const target = { v: 0 }
      gsap.to(target, {
        v: Number(num.dataset.count),
        duration: 2,
        ease: 'power2.out',
        scrollTrigger: { trigger: num, start: 'top 92%' },
        onUpdate: () => (num.textContent = Math.round(target.v)),
      })

      // 입체 타일: 기울어진 상태에서 스크롤하며 평평해진다
      gsap.fromTo(
        '[data-tile]',
        { rotateX: 38, rotateY: -28, rotateZ: 10, y: 40, scale: 1.12 },
        {
          rotateX: 0,
          rotateY: 0,
          rotateZ: 0,
          y: 0,
          scale: 1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-tile-card]', start: 'top bottom', end: 'center 55%', scrub: 0.6 },
        },
      )

      // 막대그래프: 아래에서 자라난다
      gsap.from('[data-bar]', {
        scaleY: 0,
        transformOrigin: '50% 100%',
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.05,
        scrollTrigger: { trigger: '[data-bars]', start: 'top 90%' },
      })

      // 민트 카드의 큰 글자
      gsap.from('[data-big]', {
        yPercent: 45,
        duration: 1.3,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '[data-mint]', start: 'top 85%' },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative z-[1] bg-paper">
      <div className="absolute inset-0 rounded-t-[12px] bg-paper2" />
      <Cols />
      <span className="hline absolute inset-x-0 top-0" />
      <div className="wrap relative py-24">
        <SectionHead label={why.label} title={why.title} desc={why.desc} descWidth={240} />

        <div className="grid4 mt-12 gap-y-8">
          <div className="flex h-[88px] items-end max-[809px]:h-auto">
            <ProofBadge thumbs={hero.thumbs} value={hero.badge.value} lines={hero.badge.lines} />
          </div>
          <div data-fill className="relative col-span-2 py-12 max-[809px]:col-span-1">
            <span className="hline absolute inset-x-0 top-0" />
            <span className="hline absolute inset-x-0 bottom-0" />
            <div className="absolute inset-x-px inset-y-px bg-paper2" />
            <p className="t-fill relative text-[#e0e0e0]">
              {why.fill.split(' ').map((w, i) => (
                <span key={i} data-word>
                  {w}{' '}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div
          className="mt-12 grid grid-cols-4 gap-y-3 max-[1199px]:grid-cols-2 max-[809px]:grid-cols-1"
          style={{ '--u': 'clamp(230px, 29.2vh, 360px)', gridTemplateRows: 'calc(var(--u) * 2 + 12px) var(--u)' }}
        >
          {/* 큰 카드 */}
          <div className="col-span-2 row-span-2 px-1.5 max-[809px]:col-span-1">
            <div data-bento className="tone-dark grain relative flex h-full flex-col justify-between overflow-hidden rounded-[6px] bg-ink p-6 text-paper">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background: [
                    'linear-gradient(152deg, transparent 18%, rgba(255,255,255,0.055) 30%, transparent 42%)',
                    'linear-gradient(152deg, transparent 50%, rgba(255,255,255,0.04) 61%, transparent 72%)',
                    'linear-gradient(152deg, transparent 76%, rgba(255,255,255,0.05) 86%, transparent 96%)',
                    'radial-gradient(110% 70% at 90% 105%, rgba(255,255,255,0.05), transparent 60%)',
                  ].join(','),
                }}
              />
              <div className="relative flex flex-col gap-6">
                <Diamond className="text-mint" />
                <h3 className="t-h3 max-w-[375px]">
                  <TwoTone parts={why.big.title} accent="text-mint" strong="text-paper" />
                </h3>
                <p className="t-body-lg max-w-[386px] text-mute">{why.big.desc}</p>
              </div>
              <div className="relative flex items-end justify-between gap-6">
                <ul className="flex flex-col gap-6">
                  {why.big.list.map((t, i) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="text-mint">{ICONS[i]}</span>
                      <span className="t-title-sm">{t}</span>
                    </li>
                  ))}
                </ul>
                <span className="text-[84px] leading-none font-bold max-[809px]:text-[64px]">
                  <span data-count={why.big.value}>{why.big.value}</span>%
                </span>
              </div>
            </div>
          </div>

          {/* 민트 카드 */}
          <div className="px-1.5">
            <div data-bento data-mint className="relative h-full overflow-hidden rounded-[6px] bg-mint p-6">
              <div className="relative z-[1] flex flex-col gap-6">
                <Diamond className="text-ink" />
                <h3 className="t-title">{why.mint.title}</h3>
                <p className="t-body-lg max-w-[386px] text-sub">{why.mint.desc}</p>
              </div>
              <div className="absolute inset-x-6 bottom-0 translate-y-[26%]">
                <div data-big>
                  <FitText text={why.mint.words[1]} fill="#ffffff" />
                </div>
                <div data-big className="absolute inset-x-0 -top-[46%]">
                  <FitText text={why.mint.words[0]} fill="#050505" />
                </div>
              </div>
            </div>
          </div>

          {/* 입체 타일 카드 */}
          <div className="px-1.5">
            <div data-bento data-tile-card className="relative h-full overflow-hidden rounded-[6px] bg-white">
              <div className="absolute left-1/2 top-[41%] size-[156px] -translate-x-1/2 -translate-y-1/2 p-1.5 [perspective:900px]">
                <span className="vline absolute -top-[1200px] left-0 h-[2400px] [--grid-c:rgba(5,5,5,0.08)]" />
                <span className="vline absolute -top-[1200px] right-0 h-[2400px] [--grid-c:rgba(5,5,5,0.08)]" />
                <span className="hline absolute -left-[1200px] top-0 w-[2400px] [--grid-c:rgba(5,5,5,0.08)]" />
                <span className="hline absolute -left-[1200px] bottom-0 w-[2400px] [--grid-c:rgba(5,5,5,0.08)]" />
                <div className="size-full rounded-[6px] bg-paper2" />
                <div
                  data-tile
                  className="absolute inset-1.5 overflow-hidden rounded-[6px] bg-white shadow-[0_10px_20px_rgba(0,0,0,0.05)] [transform-style:preserve-3d]"
                >
                </div>
              </div>
              <div className="absolute inset-x-6 bottom-6 flex flex-col items-center gap-6 text-center">
                <h3 className="t-title-sm">{why.tile.title}</h3>
                <p className="t-body max-w-[220px] whitespace-pre-line text-sub">{why.tile.desc}</p>
              </div>
            </div>
          </div>

          {/* 막대그래프 카드 */}
          <div className="px-1.5">
            <div data-bento className="relative flex h-full flex-col justify-end overflow-hidden rounded-[6px] bg-white p-6">
              <h3 className="t-title-sm absolute left-6 top-6">{why.bars.title}</h3>
              <div data-bars className="flex h-[calc(100%-24px)] items-end gap-3">
                {BAR_RATIO.map((r, i) => (
                  <span key={i} data-bar className="block flex-1 rounded-[2px] bg-ink" style={{ height: `${r * 100}%`, opacity: (i + 1) / 10 }} />
                ))}
              </div>
            </div>
          </div>

          {/* 타일 격자 카드 */}
          <div className="px-1.5">
            <div data-bento className="relative h-full overflow-hidden rounded-[6px] bg-white">
              <Tiles />
              <h3 className="t-title-sm absolute left-6 top-6">{why.tiles.title}</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
