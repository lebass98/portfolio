import { useRef } from 'react'
import { archive, links, projectUrl } from '../../data/site'
import { gsap, useGSAP } from '../../lib/gsap'
import { Btn, Cols, DotsArrow, SectionHead, TwoTone } from '../ui'

// 카드마다 이미지 비율을 다르게 해 엇갈린 높이를 만든다
const RATIOS = ['2 / 3', '1.68 / 1', '3 / 4', '3 / 2']

export default function Archive() {
  const root = useRef(null)

  useGSAP(
    () => {
      gsap.utils.toArray('[data-arc]').forEach((el) => {
        gsap.fromTo(el, { opacity: 0.6 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'center 60%', scrub: true } })
      })
    },
    { scope: root },
  )

  return (
    <section ref={root} className="relative z-[1] bg-paper">
      <Cols />
      <span className="hline absolute inset-x-0 top-0" />
      <div className="wrap relative py-24">
        <SectionHead label={archive.label} title={archive.title} desc={archive.desc} descWidth={270} />

        <div className="mt-12 grid grid-cols-4 items-start max-[1199px]:grid-cols-2 max-[809px]:grid-cols-1">
          {archive.items.map((p, i) => {
            const url = projectUrl(p)
            return (
              <a key={p.id} href={url ?? undefined} target="_blank" rel="noreferrer" className="group relative flex flex-col pb-12">
                <span className="hline absolute inset-x-0 bottom-0" />
                <div className="px-1.5">
                  <div data-arc className="overflow-hidden rounded-[6px] bg-[#e0e0e0]" style={{ aspectRatio: RATIOS[i % 4] }}>
                    <img src={`/${p.image}`} alt="" loading="lazy" className="mono-img h-full w-full object-cover object-top group-hover:scale-[1.04]" />
                  </div>
                </div>
                <div className="flex flex-col gap-6 px-6 pt-6">
                  <span className="t-mono text-sub">{p.tags.join(' · ')}</span>
                  <h3 className="t-title">{p.title}</h3>
                  <p className="t-body line-clamp-3 text-sub">
                    {p.description} 분야의 사이트로, 디자인 {p.contribution.design}%와 퍼블리싱 {p.contribution.publishing}%를 맡아 진행했습니다.
                  </p>
                  <span className="t-btn flex w-fit items-center gap-[35px]">
                    사이트 보기
                    <DotsArrow />
                  </span>
                </div>
              </a>
            )
          })}
        </div>

        <div className="grid4 mt-12 gap-y-8">
          <p className="t-quote col-span-2 max-w-[560px] max-[809px]:col-span-1">
            <TwoTone parts={archive.sentence} />
          </p>
          <div className="col-start-4 flex flex-col justify-end gap-3 max-[1199px]:col-start-3 max-[809px]:col-start-1">
            <p className="t-mono text-sub">{archive.ctaLabel}</p>
            <Btn href={links.portfolio} target="_blank" rel="noreferrer">
              {archive.cta}
            </Btn>
          </div>
        </div>
      </div>
    </section>
  )
}
