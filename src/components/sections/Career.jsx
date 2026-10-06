import { useEffect, useRef, useState } from 'react'
import { portfolio } from '../../data/portfolio'
import { career } from '../../data/site'
import { gsap, useGSAP } from '../../lib/gsap'
import { Avatar, Cols, PixelChevron, QuoteMark, SectionHead } from '../ui'

const yearOf = (s) => (s.includes('Present') ? 'Now' : s.trim().slice(0, 4))

// 경력 하나를 수치 4칸으로 정리
const metrics = (e) => {
  const [from, to] = e.period.split('~').map((v) => v.trim())
  const start = Number(from.slice(0, 4))
  const end = to.includes('Present') ? new Date().getFullYear() : Number(to.slice(0, 4))
  return [
    { v: from.slice(0, 4), l: 'Joined' },
    { v: yearOf(to), l: 'Until' },
    { v: `${Math.max(1, end - start)} yrs`, l: 'Duration' },
    { v: e.skills[0], l: 'Focus' },
  ]
}

function Slider() {
  const list = portfolio.experience
  const [i, setI] = useState(0)
  const box = useRef(null)
  const first = useRef(true)

  // 전환할 때 내용이 살짝 올라오며 바뀐다
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    gsap.fromTo(box.current.querySelectorAll('[data-sl]'), { y: 16, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.7, ease: 'power3.out', stagger: 0.04 })
  }, [i])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setInterval(() => setI((v) => (v + 1) % list.length), 7000)
    return () => clearInterval(id)
  }, [i, list.length])

  const e = list[i]
  return (
    <div ref={box} className="grid4 mt-12 min-h-[280px] gap-y-8">
      <div className="flex flex-col justify-between gap-8 py-12 max-[809px]:py-0">
        <QuoteMark className="text-sub" />
        <div data-sl className="flex items-center gap-2">
          <Avatar>{String(i + 1).padStart(2, '0')}</Avatar>
          <div className="flex flex-col gap-1">
            <span className="text-[14px] leading-[16.8px] font-bold tracking-[-0.02em]">{e.company}</span>
            <span className="t-mono text-sub">{e.period}</span>
          </div>
        </div>
      </div>
      <div className="col-span-2 flex flex-col justify-center max-[809px]:col-span-1">
        <div className="relative h-[144px] max-[809px]:h-auto max-[809px]:pb-8">
          <span className="hline absolute inset-x-0 top-0" />
          <div className="absolute inset-x-px top-px bottom-0 bg-paper2" />
          <div className="relative pt-12 max-[809px]:pt-8">
            <p data-sl className="t-body-lg max-w-[640px] text-sub">
              <span className="text-ink">{e.position}</span> — {e.details}
            </p>
          </div>
        </div>
        <div className="relative grid h-[136px] grid-cols-4 max-[809px]:h-auto max-[809px]:grid-cols-2">
          <span className="hline absolute inset-x-0 top-0" />
          <span className="hline absolute inset-x-0 bottom-0" />
          {metrics(e).map((m, k) => (
            <div
              key={m.l}
              data-sl
              className="flex min-w-0 flex-col justify-center gap-3 py-12 pr-3 max-[809px]:py-6"
              style={{ borderRight: k === 0 || k === 2 ? '1px dashed var(--grid-c)' : 'none' }}
            >
              <span className="truncate text-[20px] leading-[18px] font-bold">{m.v}</span>
              <span className="t-mono text-[10px] leading-[10px] text-sub">{m.l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-end justify-end pb-12 max-[809px]:justify-start max-[809px]:pb-0">
        <div className="flex gap-6">
          <button type="button" aria-label="이전 경력" onClick={() => setI((v) => (v - 1 + list.length) % list.length)} className="grid size-12 place-items-center transition-opacity hover:opacity-50">
            <PixelChevron dir="left" />
          </button>
          <button type="button" aria-label="다음 경력" onClick={() => setI((v) => (v + 1) % list.length)} className="grid size-12 place-items-center transition-opacity hover:opacity-50">
            <PixelChevron dir="right" />
          </button>
        </div>
      </div>
    </div>
  )
}

function Ticker() {
  const track = useRef(null)
  const items = portfolio.projects
  useGSAP(
    () => {
      const w = track.current.scrollWidth / 2
      const tw = gsap.to(track.current, { x: -w, duration: w / 26, ease: 'none', repeat: -1 })
      const el = track.current
      const slow = () => gsap.to(tw, { timeScale: 0.15, duration: 0.6 })
      const fast = () => gsap.to(tw, { timeScale: 1, duration: 0.6 })
      el.addEventListener('mouseenter', slow)
      el.addEventListener('mouseleave', fast)
      return () => {
        el.removeEventListener('mouseenter', slow)
        el.removeEventListener('mouseleave', fast)
      }
    },
    { scope: track },
  )
  const card = (p, key) => (
    <li
      key={key}
      className="flex h-[500px] w-[calc((100vw-var(--gutter)*2)/4)] shrink-0 flex-col justify-between pb-24 pr-12 pt-12 max-[809px]:w-[80vw] max-[809px]:h-[380px]"
      style={{ borderRight: '1px dashed var(--grid-c)' }}
    >
      <div className="flex flex-col gap-6 pl-px">
        <QuoteMark className="text-sub" />
        <p className="text-[18px] leading-[18px] font-medium tracking-[-0.02em] text-sub">
          {p.description}. 디자인 {p.contribution.design}%, 퍼블리싱 {p.contribution.publishing}%로 참여한 프로젝트입니다.
        </p>
      </div>
      <div className="flex items-center gap-2 pl-px">
        <Avatar src={`/${p.image}`} />
        <div className="flex min-w-0 flex-col gap-1">
          <span className="truncate text-[14px] leading-[16.8px] font-bold tracking-[-0.02em]">{p.title}</span>
          <span className="t-mono truncate text-sub">{p.tags.join(' · ')}</span>
        </div>
      </div>
    </li>
  )
  return (
    <div className="relative overflow-hidden" style={{ borderTop: '1px dashed var(--grid-c)', borderLeft: '1px dashed var(--grid-c)', borderRight: '1px dashed var(--grid-c)' }}>
      <ul ref={track} className="flex w-max">
        {items.map((p) => card(p, `a${p.id}`))}
        {items.map((p) => card(p, `b${p.id}`))}
      </ul>
    </div>
  )
}

export default function Career() {
  return (
    <section id="career" className="relative z-[1] bg-paper">
      <div className="absolute inset-0 rounded-t-[12px] bg-paper2" />
      <Cols />
      <span className="hline absolute inset-x-0 top-0" />
      <div className="wrap relative pt-24">
        <SectionHead label={career.label} title={career.title} desc={career.desc} descWidth={230} />
        <Slider />
        <div className="mt-12 flex flex-col gap-3">
          <p className="t-mono text-sub">{career.marqueeLabel}</p>
          <Ticker />
        </div>
      </div>
    </section>
  )
}
