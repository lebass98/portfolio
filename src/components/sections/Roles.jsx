import { useRef } from 'react'
import { brand, links, roles } from '../../data/site'
import { gsap, useGSAP } from '../../lib/gsap'
import { Btn, Cols, SectionHead, TwoTone, Wordmark } from '../ui'

// 18px 선 아이콘 (메일, 코드)
const MailIcon = () => (
  <svg viewBox="0 0 18 18" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="2" y="3.5" width="14" height="11" rx="1.5" />
    <path d="m2.5 5 6.5 5 6.5-5" />
  </svg>
)
const CodeIcon = () => (
  <svg viewBox="0 0 18 18" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 5-4 4 4 4M12 5l4 4-4 4M10.5 3l-3 12" />
  </svg>
)

export default function Roles() {
  const root = useRef(null)

  useGSAP(
    () => {
      gsap.from('[data-wm]', {
        yPercent: 60,
        autoAlpha: 0,
        duration: 1.4,
        ease: 'expo.out',
        scrollTrigger: { trigger: '[data-wm]', start: 'top bottom' },
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative z-[1] overflow-hidden bg-paper2">
      <div data-wm className="wrap pointer-events-none absolute inset-x-0 bottom-0 text-[#fbfbfb]" aria-hidden="true">
        <Wordmark className="aspect-[8.77] w-full" />
      </div>
      <Cols />
      <span className="hline absolute inset-x-0 top-0" />
      <div className="wrap relative py-24">
        <SectionHead variant="stack" label={roles.label} title={roles.title} desc={roles.desc} descWidth={260} />

        <div className="relative mt-24 grid grid-cols-4 max-[1199px]:grid-cols-2 max-[809px]:grid-cols-1">
          <span className="hline absolute inset-x-0 bottom-0" />
          {roles.cards.map((c) => (
            <div key={c.name} className="group flex flex-col">
              <div className="px-1.5">
                <div className="aspect-[0.73] overflow-hidden rounded-[6px] bg-[#e0e0e0]">
                  <img src={c.image} alt="" loading="lazy" className="mono-img h-full w-full object-cover object-top group-hover:scale-[1.03]" />
                </div>
              </div>
              <div className="flex items-end justify-between px-6 pb-12 pt-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[14px] leading-[16.8px] font-bold tracking-[-0.02em]">{c.name}</span>
                  <span className="t-mono text-sub">{c.skills}</span>
                </div>
                <div className="flex gap-1.5 text-sub">
                  <a href={`mailto:${brand.email}`} aria-label="이메일 보내기" className="grid size-8 place-items-center transition-colors hover:text-ink">
                    <MailIcon />
                  </a>
                  <a href={links.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid size-8 place-items-center transition-colors hover:text-ink">
                    <CodeIcon />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid4 relative mt-12 gap-y-8">
          <p className="t-quote col-span-2 max-w-[450px] max-[809px]:col-span-1">
            <TwoTone parts={roles.sentence} />
          </p>
          <div className="col-start-4 flex flex-col justify-end gap-3 max-[1199px]:col-start-3 max-[809px]:col-start-1">
            <p className="t-mono text-sub">{roles.ctaLabel}</p>
            <Btn href="#contact">{roles.cta}</Btn>
          </div>
        </div>
      </div>
    </section>
  )
}
