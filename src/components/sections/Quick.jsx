import { useState } from 'react'
import { brand, quick } from '../../data/site'
import { Cols, DotsArrow, SectionHead } from '../ui'

export default function Quick() {
  const [email, setEmail] = useState('')
  const valid = /\S+@\S+\.\S+/.test(email)

  const submit = (e) => {
    e.preventDefault()
    if (!valid) return
    const body = `회신받을 이메일: ${email}\n\n프로젝트에 대해 이야기 나누고 싶습니다.`
    window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent('[연락 요청] 포트폴리오에서 남깁니다')}&body=${encodeURIComponent(body)}`
  }

  return (
    <section className="relative z-[1] bg-paper">
      <div className="absolute inset-0 rounded-t-[12px] bg-paper2" />
      <Cols />
      <span className="hline absolute inset-x-0 top-0" />
      <div className="wrap relative pb-24 pt-24">
        <SectionHead label={quick.label} title={quick.title} desc={quick.desc} descWidth={270} />

        <form onSubmit={submit} className="grid4 mt-24 gap-y-6" noValidate>
          <p className="t-mono flex items-end text-sub max-[809px]:order-3">{quick.note}</p>
          <label className="relative col-span-2 block max-[809px]:col-span-1">
            <span className="sr-only">이메일</span>
            <span className="hline absolute inset-x-0 top-0" />
            <span className="hline absolute inset-x-0 bottom-0" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              autoComplete="email"
              className="relative h-12 w-full bg-paper2 px-6 text-[16px] text-ink outline-none placeholder:text-mute focus:bg-paper"
            />
          </label>
          <button
            type="submit"
            aria-disabled={!valid}
            className={`group ticks t-btn relative flex h-12 w-full items-center justify-between border border-ink/[0.08] bg-ink pl-6 text-paper transition-opacity [--tick:var(--color-mint)] ${valid ? 'opacity-100' : 'cursor-not-allowed opacity-50'}`}
          >
            {quick.cta}
            <span className="grid size-12 place-items-center">
              <DotsArrow />
            </span>
          </button>
        </form>
      </div>
    </section>
  )
}
