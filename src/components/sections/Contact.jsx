import { useState } from 'react'
import { YEAR, brand, contact, hero } from '../../data/site'
import { Cols, DotsArrow, ProofBadge, SectionHead, TwoTone, Wordmark } from '../ui'

const EMPTY = { name: '', email: '', phone: '', company: '', site: '', budget: '', message: '', services: [] }

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-3">
      <span className="t-mono text-sub">{label}</span>
      {children}
    </label>
  )
}

const inputCls =
  'h-12 w-full bg-paper px-6 text-[16px] text-ink outline-none placeholder:text-mute [border-bottom:1px_dashed_rgba(5,5,5,0.08)] focus:bg-[#f2f2f2] transition-colors'

export default function Contact() {
  const [f, setF] = useState(EMPTY)
  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }))
  const toggle = (s) => setF((v) => ({ ...v, services: v.services.includes(s) ? v.services.filter((x) => x !== s) : [...v.services, s] }))
  const valid = f.name.trim() && /\S+@\S+\.\S+/.test(f.email) && f.message.trim()

  // 서버 없이 메일 앱으로 문의 내용을 넘긴다
  const submit = (e) => {
    e.preventDefault()
    if (!valid) return
    const lines = [
      ['이름', f.name],
      ['이메일', f.email],
      ['연락처', f.phone],
      ['회사', f.company],
      ['웹사이트', f.site],
      ['관심 서비스', f.services.join(', ')],
      ['예산', f.budget],
    ]
      .filter(([, v]) => v)
      .map(([k, v]) => `${k}: ${v}`)
    const body = [...lines, '', f.message].join('\n')
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(`[프로젝트 문의] ${f.name}`)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section id="contact" className="relative z-[1] bg-paper">
      <div className="wrap pointer-events-none absolute inset-x-0 top-0 text-[#efefef]" aria-hidden="true">
        <Wordmark className="aspect-[8.77] w-full" />
      </div>
      <Cols />
      <span className="hline absolute inset-x-0 top-0" />
      <div className="wrap relative py-24">
        <SectionHead label={contact.label} title={contact.title} desc={contact.desc} descWidth={230} />

        <div className="grid4 mt-24 items-start gap-y-12">
          <aside className="sticky top-[192px] flex flex-col gap-24 pb-1 pr-9 max-[1199px]:static max-[1199px]:col-span-4 max-[809px]:col-span-1 max-[809px]:gap-10">
            <div className="flex flex-col gap-6">
              <p className="t-quote max-w-[390px]">
                <TwoTone parts={contact.quote} />
              </p>
              <div className="relative flex max-w-[300px] flex-col gap-1">
                <span className="t-mono text-sub">Lead</span>
                <Wordmark className="aspect-[8.77] w-[120px] text-ink" />
                <span className="t-mono absolute bottom-0 right-0 text-sub">{YEAR}</span>
              </div>
            </div>
            <ProofBadge thumbs={hero.thumbs} value={hero.badge.value} lines={hero.badge.lines} />
          </aside>

          <form onSubmit={submit} className="col-span-3 flex flex-col gap-6 max-[1199px]:col-span-4 max-[809px]:col-span-1" noValidate>
            <div className="px-1.5">
              <div className="flex flex-col gap-6 rounded-[6px] bg-white p-6">
                <Field label="이름">
                  <input className={inputCls} value={f.name} onChange={set('name')} placeholder="홍길동" autoComplete="name" required />
                </Field>
                <div className="grid grid-cols-2 max-[809px]:grid-cols-1 max-[809px]:gap-6">
                  <Field label="이메일">
                    <input className={`${inputCls} [border-right:1px_dashed_rgba(5,5,5,0.08)]`} type="email" value={f.email} onChange={set('email')} placeholder="you@company.com" autoComplete="email" required />
                  </Field>
                  <Field label="연락처">
                    <input className={inputCls} type="tel" value={f.phone} onChange={set('phone')} placeholder="010-0000-0000" autoComplete="tel" />
                  </Field>
                </div>
                <Field label="회사 (선택)">
                  <input className={inputCls} value={f.company} onChange={set('company')} placeholder="회사 또는 기관명" autoComplete="organization" />
                </Field>
                <Field label="웹사이트 (선택)">
                  <input className={inputCls} type="url" value={f.site} onChange={set('site')} placeholder="https://www.yourwebsite.com" autoComplete="url" />
                </Field>
                <fieldset className="flex flex-col gap-6">
                  <legend className="t-mono mb-6 text-sub">관심 있는 작업:</legend>
                  <div className="grid grid-cols-2 gap-y-6 max-[809px]:grid-cols-1">
                    {contact.services.map((s) => (
                      <label key={s} className="flex cursor-pointer items-center gap-2">
                        <input type="checkbox" checked={f.services.includes(s)} onChange={() => toggle(s)} className="peer sr-only" />
                        <span className="grid size-[17px] place-items-center border border-ink/[0.08] bg-paper transition-colors peer-checked:border-ink peer-checked:bg-ink peer-checked:[&>svg]:opacity-100 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-mint">
                          <svg viewBox="0 0 10 8" className="h-2 w-2.5 text-mint opacity-0 transition-opacity">
                            <path d="M1 4l2.5 2.5L9 1" fill="none" stroke="currentColor" strokeWidth="1.6" />
                          </svg>
                        </span>
                        <span className="t-body text-sub">{s}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <Field label="예상 예산">
                  <span className="relative block">
                    <select className={`${inputCls} cursor-pointer appearance-none ${f.budget ? '' : 'text-mute'}`} value={f.budget} onChange={set('budget')}>
                      <option value="">선택해주세요…</option>
                      {contact.budgets.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute inset-y-0 right-0 grid w-[50px] place-items-center bg-mute text-paper">
                      <svg viewBox="0 0 10 6" className="h-1.5 w-2.5">
                        <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                      </svg>
                    </span>
                  </span>
                </Field>
                <Field label="프로젝트 내용">
                  <textarea
                    className={`${inputCls} h-60 resize-y px-6 pb-6 pt-3.5 leading-[19.2px]`}
                    value={f.message}
                    onChange={set('message')}
                    placeholder="프로젝트의 목표와 일정, 필요한 범위를 간단히 적어주세요."
                    required
                  />
                </Field>
              </div>
            </div>
            <div className="grid grid-cols-3 items-end gap-y-6 max-[809px]:grid-cols-1">
              <p className="t-body max-w-[280px] text-sub">
                보내기를 누르면 메일 앱에서 위 내용이 담긴 메일이 열립니다. 입력하신 정보는 <span className="text-ink underline">회신 목적</span>으로만 사용됩니다.
              </p>
              <button
                type="submit"
                aria-disabled={!valid}
                className={`group ticks t-btn relative col-start-3 flex h-12 w-full items-center justify-between border border-ink/[0.08] bg-ink pl-6 text-paper transition-opacity [--tick:var(--color-mint)] max-[809px]:col-start-1 ${valid ? 'opacity-100' : 'cursor-not-allowed opacity-50'}`}
              >
                {contact.submit}
                <span className="grid size-12 place-items-center">
                  <DotsArrow />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
