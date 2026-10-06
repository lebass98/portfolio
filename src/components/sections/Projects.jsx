import { useRef } from 'react'
import { YEAR, links, projects, projectUrl } from '../../data/site'
import { gsap, useGSAP } from '../../lib/gsap'
import { Btn, Cols, DotsArrow, Label, SectionHead, TwoTone, Wordmark } from '../ui'

const roleText = (p) => {
  const { design, publishing } = p.contribution
  if (design && publishing) return '디자인과 퍼블리싱을 맡아 구축했습니다'
  if (publishing) return '퍼블리싱을 맡아 구축했습니다'
  return '디자인을 맡아 진행했습니다'
}

// 프로젝트 화면을 노트북 디스플레이 안에 담는다.
function Shot({ p }) {
  return (
    <div className="project-stage">
      <div className="project-stage-desk" aria-hidden="true" />
      <div className="project-laptop">
        <div className="project-laptop-lid">
          <div className="project-laptop-screen">
            <img
              src={p.image}
              alt={p.title}
              loading="lazy"
              className="project-laptop-image"
            />
          </div>
          <span className="project-laptop-notch" aria-hidden="true">
            <i />
          </span>
        </div>
        <div className="project-laptop-base" aria-hidden="true">
          <span className="project-laptop-groove" />
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const root = useRef(null)

  useGSAP(
    () => {
      // 이미지 카드: 들어올 때 0.6에서 1로 선명해진다
      gsap.utils.toArray('[data-shot]').forEach((el) => {
        gsap.fromTo(el, { opacity: 0.6 }, { opacity: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'center 55%', scrub: true } })
      })
    },
    { scope: root },
  )

  return (
    <section id="projects" ref={root} className="relative z-[1] bg-paper">
      <Cols />
      <span className="hline absolute inset-x-0 top-0" />
      <div className="wrap relative py-24">
        <SectionHead label={projects.label} title={projects.title} desc={projects.desc} descWidth={250} />

        <div className="grid4 mt-24 items-start gap-y-16">
          <aside className="sticky top-[192px] flex flex-col gap-12 max-[1199px]:static max-[1199px]:col-span-4 max-[809px]:col-span-1">
            <div className="flex flex-col gap-6 pr-9">
              <p className="t-quote max-w-[390px]">
                <TwoTone parts={projects.quote} />
              </p>
              <div className="relative flex max-w-[300px] flex-col gap-1">
                <span className="t-mono text-sub">Lead</span>
                <Wordmark className="aspect-[8.77] w-[120px] text-ink" />
                <span className="t-mono absolute bottom-0 right-0 text-sub">2004—{YEAR}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 max-[1199px]:max-w-[456px]">
              {projects.stats.map((s, i) => (
                <div
                  key={s.label}
                  className="relative flex h-[156px] flex-col gap-6 py-12"
                  style={{
                    borderTop: '1px dashed var(--grid-c)',
                    borderRight: i % 2 === 0 ? '1px dashed var(--grid-c)' : 'none',
                    borderBottom: i >= 2 ? '1px dashed var(--grid-c)' : 'none',
                  }}
                >
                  <span className="t-mono text-sub">{s.label}</span>
                  <span className="text-[24px] leading-[24px] font-bold">{s.value}</span>
                </div>
              ))}
            </div>
          </aside>

          <div className="col-span-3 flex flex-col gap-3 max-[1199px]:col-span-4 max-[809px]:col-span-1">
            {projects.featured.map((p) => {
              const url = projectUrl(p)
              return (
                <article key={p.id} className="grid grid-cols-3 max-[809px]:grid-cols-1">
                  <div className="col-span-2 px-1.5 max-[809px]:col-span-1">
                    <a data-shot href={url ?? undefined} target="_blank" rel="noreferrer" className="group block aspect-[0.982]">
                      <Shot p={p} />
                    </a>
                  </div>
                  <div className="relative">
                    <div className="sticky top-[192px] flex flex-col gap-12 px-6 pb-12 max-[809px]:static max-[809px]:px-0 max-[809px]:pt-6">
                      <div className="flex flex-col gap-9">
                        <div className="flex flex-col gap-3">
                          <h3 className="t-title">{p.title}</h3>
                          <p className="t-title-sm text-sub">{p.category}</p>
                        </div>
                        <dl className="grid grid-cols-2 gap-x-4">
                          <div className="flex flex-col gap-3">
                            <dt className="t-mono text-sub">Role:</dt>
                            <dd className="t-body text-sub">
                              D {p.contribution.design}% · P {p.contribution.publishing}%
                            </dd>
                          </div>
                          <div className="flex flex-col gap-3">
                            <dt className="t-mono text-sub">Sector:</dt>
                            <dd className="t-body text-sub">{p.description}</dd>
                          </div>
                        </dl>
                        <p className="t-body text-sub">
                          {p.long ?? `${p.description} 분야의 웹사이트로, ${roleText(p)}.`}
                          <span className="mt-3 block t-mono text-mute">{p.tags.join(' · ')}</span>
                        </p>
                      </div>
                      {url && (
                        <a href={url} target="_blank" rel="noreferrer" className="group t-btn flex w-fit items-center gap-[35px]">
                          사이트 보기
                          <DotsArrow />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <div className="grid4 mt-24 gap-y-8">
          <Label>Other projects</Label>
          <div className="col-span-2 flex flex-col gap-3 max-[809px]:col-span-1">
            <p className="t-mono text-sub">More from the archive</p>
            <div className="grid grid-cols-4 max-[1199px]:grid-cols-2">
              {projects.others.map((p) => (
                <a
                  key={p.id}
                  href={projectUrl(p) ?? undefined}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex h-12 items-center gap-2 bg-paper pl-1.5 pr-3"
                >
                  <span className="hline absolute inset-x-0 top-0" />
                  <span className="hline absolute inset-x-0 bottom-0" />
                  <img src={`/${p.image}`} alt="" className="size-9 shrink-0 rounded-[6px] object-cover object-top" loading="lazy" />
                  <span className="t-title-sm truncate">{p.title}</span>
                  <DotsArrow className="ml-auto" />
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-end gap-3">
            <p className="t-mono text-sub">{projects.ctaLabel}</p>
            <Btn href={links.portfolio} target="_blank" rel="noreferrer">
              {projects.cta}
            </Btn>
          </div>
        </div>
      </div>
    </section>
  )
}
