import { useState } from 'react'
import { faq } from '../../data/site'
import { Btn, Cols, SectionHead } from '../ui'

// 2px 점 5개: 닫힘 = +, 열림 = 가로줄
const CLOSED = [
  [23, 0],
  [15, 8],
  [23, 8],
  [31, 8],
  [23, 16],
]
const OPEN = [
  [27, 8],
  [15, 8],
  [23, 8],
  [31, 8],
  [19, 8],
]

function DotToggle({ open }) {
  return (
    <span aria-hidden="true" className="relative block h-[18px] w-12 shrink-0">
      {(open ? OPEN : CLOSED).map(([x, y], i) => (
        <i key={i} className="absolute size-[2px] bg-ink transition-all duration-500 ease-[var(--ease-expo)]" style={{ left: x, top: y }} />
      ))}
    </span>
  )
}

export default function Faq() {
  const [open, setOpen] = useState('0-0')
  // 그룹을 넘어 이어지는 질문 번호의 시작값
  const starts = faq.groups.map((_, gi) => faq.groups.slice(0, gi).reduce((a, g) => a + g.items.length, 0))

  return (
    <section className="relative z-[1] bg-paper">
      <div className="absolute inset-0 rounded-b-[12px] bg-paper2" />
      <Cols />
      <span className="hline absolute inset-x-0 top-0" />
      <div className="wrap relative py-24">
        <SectionHead label={faq.label} title={faq.title} desc={faq.desc} descWidth={280} />

        <div className="mt-12">
          {faq.groups.map((g, gi) => (
            <div key={g.name} className="grid4 gap-y-2">
              <div className="relative max-[809px]:pt-8">
                <h3 className="t-title sticky top-[192px] py-12 pr-12 text-sub max-[809px]:static max-[809px]:py-4">{g.name}</h3>
              </div>
              <div className="col-span-3 max-[809px]:col-span-1">
                {g.items.map((it, ii) => {
                  const key = `${gi}-${ii}`
                  const isOpen = open === key
                  const n = starts[gi] + ii + 1
                  return (
                    <div key={key} className="relative">
                      {gi === 0 && ii === 0 && <span className="hline absolute inset-x-0 top-0" />}
                      <span className="hline absolute inset-x-0 bottom-0" />
                      <div className="absolute inset-x-px inset-y-px bg-paper2" />
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpen(isOpen ? null : key)}
                        className="relative flex w-full items-start gap-6 pb-6 pt-12 text-left"
                      >
                        <span className="t-mono w-6 shrink-0 whitespace-nowrap text-[20px] leading-[18px] text-mute">{String(n).padStart(2, '0')}</span>
                        <span className="t-title flex-1">{it.q}</span>
                        <DotToggle open={isOpen} />
                      </button>
                      <div className="acc relative" data-open={isOpen}>
                        <div className="min-h-0">
                          <p className="t-body pb-6 pl-12 pr-6 text-sub">{it.a}</p>
                        </div>
                      </div>
                      <div className="h-6" />
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="grid4 mt-24 gap-y-8">
          <p className="t-mono flex max-w-[276px] flex-col justify-end leading-[12px] text-sub">
            {faq.ctaNote.map((l) => (
              <span key={l} className="block">
                {l}
              </span>
            ))}
          </p>
          <div className="col-start-4 flex flex-col justify-end gap-3 max-[1199px]:col-start-3 max-[809px]:col-start-1">
            <p className="t-mono text-sub">{faq.ctaLabel}</p>
            <Btn href="#contact">{faq.cta}</Btn>
          </div>
        </div>
      </div>
    </section>
  )
}
