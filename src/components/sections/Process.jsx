import { useRef } from 'react'
import { process } from '../../data/site'
import { gsap, useGSAP } from '../../lib/gsap'
import { Cols, Diamond, Label, SectionHead } from '../ui'

export default function Process() {
  const root = useRef(null)

  useGSAP(
    () => {
      gsap.utils.toArray('[data-step]').forEach((step) => {
        const st = { trigger: step, start: 'top 90%' }
        // 바코드는 서서히 나타나고, 검정 막대는 왼쪽부터 펼쳐진다
        gsap.from(step.querySelector('[data-code]'), { autoAlpha: 0, x: -12, duration: 1.2, ease: 'power2.out', scrollTrigger: st })
        gsap.from(step.querySelector('[data-bar]'), { scaleX: 0, transformOrigin: '0% 50%', duration: 1.3, ease: 'expo.out', scrollTrigger: st })
        gsap.from(step.querySelectorAll('[data-in]'), { y: 48, autoAlpha: 0, duration: 1, ease: 'power3.out', stagger: 0.06, scrollTrigger: st })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative z-[1] bg-paper">
      <div className="absolute inset-0 rounded-b-[12px] bg-paper2" />
      <Cols />
      <span className="hline absolute inset-x-0 top-0" />
      <div className="wrap relative pt-24">
        <SectionHead variant="stack" label={process.label} title={process.title} desc={process.desc} descWidth={280} />

        <div className="relative mt-12 flex flex-col gap-24 py-12 max-[809px]:gap-16">
          <span className="hline absolute inset-x-0 top-0" />
          <span className="hline absolute inset-x-0 bottom-0" />
          {process.steps.map((s, i) => (
            <div key={s.name} data-step className="flex flex-col gap-12 max-[809px]:gap-6">
              <div className="relative h-8 overflow-hidden">
                <div data-code className="barcode absolute inset-y-0 -left-[70px] right-0" />
                <div
                  data-bar
                  className="absolute inset-y-0 left-0 flex items-center gap-3 bg-ink pl-6 max-[809px]:!w-full"
                  style={{ width: `${(i + 1) * 25}%` }}
                >
                  <span className="t-mono text-[20px] leading-[18px] text-mute">{String(i + 1).padStart(2, '0')}</span>
                  <span className="t-title text-paper">{s.name}</span>
                </div>
              </div>
              <div className="grid4 relative gap-y-6">
                <span data-in className="absolute -left-[1px] top-[5px] max-[809px]:hidden">
                  <Diamond className="text-ink" />
                </span>
                <p data-in className="t-lead col-start-2 max-w-[456px] text-mute max-[809px]:col-start-1">
                  {s.body}
                </p>
                <div data-in className="col-start-4 flex flex-col justify-end gap-3 max-[1199px]:col-start-3 max-[809px]:col-start-1">
                  <span className="t-mono text-mute">Outcome:</span>
                  <span className="t-body max-w-[280px] text-sub">{s.outcome}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid4 gap-y-10 pb-24 pt-12 max-[809px]:pb-16">
          <Label>{process.valuesLabel}</Label>
          {process.values.map((v) => (
            <div key={v.title} className="flex min-h-[144px] flex-col gap-6 pr-6 max-[809px]:min-h-0">
              <h3 className="t-title-sm">{v.title}</h3>
              <p className="t-body max-w-[210px] text-sub">{v.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
