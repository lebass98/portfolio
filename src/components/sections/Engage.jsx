import { useRef, useState } from 'react'
import { engage } from '../../data/site'
import { gsap, useGSAP } from '../../lib/gsap'
import { Btn, Cols, Diamond, Label, TwoTone } from '../ui'

export default function Engage() {
  const [plan, setPlan] = useState('project')
  const p = engage.plans[plan]
  const card = useRef(null)

  // 플랜을 바꾸면 값과 목록이 살짝 올라오며 바뀐다
  useGSAP(
    () => {
      gsap.fromTo('[data-pl]', { y: 12, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.6, ease: 'power3.out', stagger: 0.03 })
    },
    { dependencies: [plan], scope: card, revertOnUpdate: false },
  )

  return (
    <section className="relative z-[1] bg-paper2">
      <span className="hline absolute inset-x-0 top-0 z-[1]" />
      <div className="tone-dark relative rounded-[12px] bg-ink text-paper">
        <Cols />
        <div className="wrap relative grid4 gap-y-12 py-24">
          <header className="sticky top-[192px] flex h-fit flex-col gap-9 self-start max-[809px]:static">
            <div className="flex flex-col gap-9">
              <Label dark>{engage.label}</Label>
              <h2 className="t-h2 pr-2">
                <TwoTone parts={engage.title} muted="text-mint" accent="text-mint" strong="text-paper" />
              </h2>
            </div>
            <p className="t-body-lg max-w-[220px] text-mute">{engage.desc}</p>
          </header>

          <div ref={card} className="col-span-3 max-[809px]:col-span-1">
            <div className="grid grid-cols-3 max-[1199px]:grid-cols-1">
              <div className="col-span-2 flex flex-col gap-1.5 px-1.5 max-[1199px]:col-span-1">
                <div className="flex flex-col gap-6 rounded-[6px] bg-[#0a0a0a] p-6">
                  <div className="flex items-center gap-2">
                    <button type="button" onClick={() => setPlan('project')} className={`t-mono transition-colors ${plan === 'project' ? 'text-mute' : 'text-sub hover:text-mute'}`}>
                      {engage.plans.project.tab}
                    </button>
                    <button
                      type="button"
                      aria-label="플랜 전환"
                      onClick={() => setPlan((v) => (v === 'project' ? 'care' : 'project'))}
                      className="relative h-5 w-12 rounded-[6px] border border-white/[0.08] bg-ink"
                    >
                      <span
                        className="absolute top-1 h-3 w-6 rounded-[2px] bg-mint transition-[left] duration-500 ease-[var(--ease-expo)]"
                        style={{ left: plan === 'project' ? 4 : 18 }}
                      />
                    </button>
                    <button type="button" onClick={() => setPlan('care')} className={`t-mono transition-colors ${plan === 'care' ? 'text-mute' : 'text-sub hover:text-mute'}`}>
                      {engage.plans.care.tab}
                    </button>
                  </div>
                  <div data-pl className="relative flex items-end gap-2 pl-6">
                    <span className="t-mono absolute -top-1 left-0 text-[24px] leading-[28.8px] text-mute">₩</span>
                    <span className="text-[48px] leading-[43.2px] font-semibold tracking-[-0.02em] max-[809px]:text-[38px]">{p.value}</span>
                    <span className="t-mono pb-1 text-mute">{p.unit}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-24 rounded-[6px] bg-[#0a0a0a] p-6 max-[809px]:gap-12">
                  <ul className="flex flex-col gap-6">
                    {p.list.map((t) => (
                      <li key={t} data-pl className="relative pl-6 t-body text-mute">
                        <Diamond className="absolute left-0 top-[6px] text-mint" />
                        {t}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-end justify-between gap-6">
                    <p className="t-mono max-w-[252px] leading-[12px] text-mute">
                      {p.note.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </p>
                    <span className="t-mono shrink-0 text-mute">{p.meta}</span>
                  </div>
                </div>
              </div>
              <div className="px-1.5 max-[1199px]:mt-1.5">
                <div className="flex h-full min-h-[320px] flex-col justify-between rounded-[6px] bg-[#0a0a0a] p-6">
                  <h3 className="t-h3 pt-11 text-white max-[1199px]:pt-0">{engage.custom.title}</h3>
                  <p className="t-body max-w-[352px] text-mute">{engage.custom.body}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-y-10 max-[1199px]:grid-cols-1">
              <div className="col-span-2 flex flex-col justify-end whitespace-pre pt-12 max-[1199px]:col-span-1">
                {engage.summary.map((l, i) => (
                  <span key={i} className="t-mono block h-3 text-mute">
                    {l}
                  </span>
                ))}
              </div>
              <div className="flex flex-col justify-center gap-3 pt-24 max-[1199px]:pt-0">
                <p className="t-mono text-mute">{engage.ctaLabel}</p>
                <Btn variant="dark" href="#contact">
                  {engage.cta}
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
