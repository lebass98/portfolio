import { useRef } from 'react'
import { services } from '../../data/site'
import { gsap, useGSAP } from '../../lib/gsap'
import { Btn, Cols, Diamond, Label, QuoteMark, TwoTone } from '../ui'

export default function Services() {
  const root = useRef(null)

  // 각 행: 번호·제목이 먼저, 이미지·설명이 조금 늦게 올라온다
  useGSAP(
    () => {
      gsap.utils.toArray('[data-row]').forEach((row) => {
        const st = { trigger: row, start: 'top 92%' }
        gsap.from(row.querySelectorAll('[data-a]'), { y: 48, autoAlpha: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: st })
        gsap.from(row.querySelectorAll('[data-b]'), { y: 48, autoAlpha: 0, duration: 1.1, delay: 0.18, ease: 'power3.out', scrollTrigger: st })
      })
    },
    { scope: root },
  )

  return (
    <section id="services" ref={root} className="relative z-[1] bg-paper2">
      <span className="hline absolute inset-x-0 top-0 z-[1]" />
      <div className="tone-dark relative rounded-[12px] bg-ink text-paper">
        <Cols />
        <div className="wrap relative grid4">
          <header className="sticky top-24 flex h-fit flex-col gap-9 self-start py-24 max-[809px]:static max-[809px]:pb-12">
            <div className="flex flex-col gap-9">
              <Label dark>{services.label}</Label>
              <h2 className="t-h2 pr-2">
                <TwoTone parts={services.title} muted="text-mint" accent="text-mint" strong="text-paper" />
              </h2>
            </div>
            <p className="t-body-lg max-w-[248px] text-mute">{services.desc}</p>
          </header>

          <div className="col-span-3 py-24 max-[809px]:col-span-1 max-[809px]:pt-0">
            {services.items.map((it, i) => (
              <div key={it.title} data-row className="grid grid-cols-3 max-[1199px]:grid-cols-2">
                <div className="relative flex gap-2 pb-6 pl-3 pt-12 max-[1199px]:col-span-2 max-[1199px]:pb-0">
                  <span data-a className="absolute -left-[1px] top-12 translate-y-[6px]">
                    <Diamond className="text-mint" />
                  </span>
                  <span data-a className="t-mono text-[20px] leading-[18px] text-mute">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <img
                    data-b
                    src={it.image}
                    alt=""
                    loading="lazy"
                    className="absolute right-12 top-12 size-[120px] rounded-[6px] object-cover object-top max-[1199px]:static max-[1199px]:ml-auto max-[1199px]:size-24"
                  />
                </div>
                <div className={`relative col-span-2 grid grid-cols-2 pb-24 pt-12 max-[809px]:grid-cols-1 max-[809px]:gap-4 ${i === 0 ? '' : ''}`}>
                  {i === 0 && <span className="hline absolute inset-x-0 top-0" />}
                  <span className="hline absolute inset-x-0 bottom-0" />
                  <div className="absolute inset-x-px inset-y-px bg-ink" />
                  <h3 data-a className="t-title relative max-w-[190px]">
                    {it.title}
                  </h3>
                  <p data-b className="t-lead relative max-w-[450px] text-mute">
                    {it.body}
                  </p>
                </div>
              </div>
            ))}

            <div className="grid grid-cols-3 gap-y-10 max-[1199px]:grid-cols-1">
              <div className="col-span-2 flex flex-col justify-end gap-6 pt-12 max-[1199px]:col-span-1">
                <QuoteMark className="text-mute" />
                <p className="t-quote max-w-[440px]">
                  <TwoTone parts={services.quote} muted="text-mute" strong="text-paper" />
                </p>
              </div>
              <div className="flex flex-col justify-center gap-3 pt-24 max-[1199px]:pt-0">
                <p className="t-mono text-mute">{services.ctaLabel}</p>
                <Btn variant="dark" href="#contact">
                  {services.cta}
                </Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
