import { useEffect, useState } from 'react'
import { WM_FONT, useCapHeight } from '../lib/useCapHeight'
import { brand } from '../data/site'

// 두 톤 문구: m = 흐린 색, a = 강조색
export function TwoTone({ parts, muted = 'text-sub', accent = 'text-mint', strong }) {
  return parts.map((p, i) => (
    <span key={i} className={p.m ? muted : p.a ? accent : strong}>
      {p.t}
    </span>
  ))
}

export function Plus({ className = '' }) {
  return (
    <svg viewBox="0 0 8 12" className={`h-3 w-2 shrink-0 ${className}`} aria-hidden="true">
      <path d="M3 2h2v8H3zM0 5h8v2H0z" fill="currentColor" />
    </svg>
  )
}

// 섹션 라벨: + WHO I AM
export function Label({ children, dark, className = '' }) {
  return (
    <div className={`t-label flex h-3 items-center gap-1 ${dark ? 'text-paper' : 'text-sub'} ${className}`}>
      <Plus className={dark ? 'text-mint' : 'text-ink'} />
      <span>{children}</span>
    </div>
  )
}

export function Diamond({ className = '' }) {
  return <i aria-hidden="true" className={`block size-[6px] shrink-0 rotate-45 bg-current ${className}`} />
}

// 세로 점 3개 → 호버 시 화살표
export function DotsArrow({ className = '', on = false }) {
  return (
    <span aria-hidden="true" className={`dots ${on ? 'is-on' : ''} ${className}`}>
      <i />
      <i />
      <i />
    </span>
  )
}

const BTN = {
  dark: 'bg-white/[0.08] border-white/10 text-paper backdrop-blur-[20px] hover:text-mint [--tick:var(--color-mint)]',
  light: 'bg-ink/[0.08] border-ink/[0.08] text-ink backdrop-blur-[20px] [--tick:var(--color-ink)]',
  gray: 'bg-sub border-transparent text-paper [--tick:var(--color-mint)] hover:bg-ink',
}

// 모서리 눈금이 있는 넓은 버튼
export function Btn({ children, href, variant = 'light', className = '', type, ...rest }) {
  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      href={href}
      type={Tag === 'button' ? type || 'button' : undefined}
      className={`group ticks t-btn relative flex h-12 w-full items-center justify-between border pl-6 transition-colors duration-300 ${BTN[variant]} ${className}`}
      {...rest}
    >
      <span>{children}</span>
      <span className="grid size-12 place-items-center">
        <DotsArrow />
      </span>
    </Tag>
  )
}

// 따옴표 아이콘 (직접 그린 모양)
export function QuoteMark({ className = '' }) {
  return (
    <svg viewBox="0 0 26 18" className={`h-[18px] w-[26px] ${className}`} aria-hidden="true">
      <path
        fill="currentColor"
        d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v7.2c0 4.5-2.6 7.6-6.9 8.6l-.8-2.3c2-.7 3.1-2 3.4-3.9H2a2 2 0 0 1-2-2zM15 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v7.2c0 4.5-2.6 7.6-6.9 8.6l-.8-2.3c2-.7 3.1-2 3.4-3.9H17a2 2 0 0 1-2-2z"
      />
    </svg>
  )
}

const WM_STYLE = { fontFamily: 'var(--font-wide)', fontWeight: 900, fontSize: 100 }

// 폭에 맞춰 가로로 늘어나는 워드마크 (SVG textLength로 가로를 꽉 채움)
export function Wordmark({ text = brand.wordmark, className = '', style }) {
  const asc = useCapHeight(text)
  return (
    <svg viewBox={`0 ${-asc} 1000 ${asc}`} preserveAspectRatio="none" className={`block ${className}`} style={style} aria-hidden="true">
      <text x="0" y="0" textLength="1000" lengthAdjust="spacingAndGlyphs" fill="currentColor" style={WM_STYLE}>
        {text}
      </text>
    </svg>
  )
}

// 글꼴 원래 비율을 유지한 채 폭에 꼭 맞추는 큰 글자
const fitCache = new Map()
export function FitText({ text, fill = 'currentColor', className = '' }) {
  const [m, setM] = useState(fitCache.get(text) ?? null)
  useEffect(() => {
    if (fitCache.has(text)) return
    let alive = true
    document.fonts.load(WM_FONT, text).then(() => {
      const ctx = document.createElement('canvas').getContext('2d')
      ctx.font = WM_FONT
      const r = ctx.measureText(text)
      const v = { x: -r.actualBoundingBoxLeft, w: r.actualBoundingBoxLeft + r.actualBoundingBoxRight, asc: r.actualBoundingBoxAscent, desc: r.actualBoundingBoxDescent }
      if (v.w > 0) {
        fitCache.set(text, v)
        if (alive) setM(v)
      }
    })
    return () => {
      alive = false
    }
  }, [text])
  const v = m ?? { x: 0, w: text.length * 68, asc: 72, desc: 0 }
  return (
    <svg viewBox={`${v.x} ${-v.asc} ${v.w} ${v.asc + v.desc}`} className={`block h-auto w-full ${className}`} aria-hidden="true">
      <text x="0" y="0" fill={fill} style={WM_STYLE}>
        {text}
      </text>
    </svg>
  )
}

// 섹션마다 깔리는 4컬럼 점선
export function Cols({ className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 wrap ${className}`}>
      <div className="relative h-full">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`vline absolute inset-y-0 ${i > 0 && i < 4 ? 'max-[809px]:hidden' : ''}`}
            style={{ left: i === 4 ? 'calc(100% - 1px)' : `${i * 25}%` }}
          />
        ))}
      </div>
    </div>
  )
}

// 썸네일 + 다이아몬드 + 모노 문구 묶음 (40px 프레임 안 36px 이미지, 36px 간격)
export function ProofBadge({ thumbs, value, lines, dark }) {
  return (
    <div className="flex items-start gap-2">
      <div className="flex">
        {thumbs.map((p, i) => (
          <span
            key={p.id}
            className={`relative block size-10 shrink-0 rounded-[6px] p-[2px] ${i ? '-ml-1' : ''} ${dark ? 'bg-ink' : 'bg-[#e0e0e0]'}`}
          >
            <img src={p.image.startsWith('/') ? p.image : `/${p.image}`} alt="" className="block size-9 rounded-[4px] object-cover object-top" />
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex h-3 items-center">
          {[0, 1, 2, 3, 4].map((i) => (
            <i key={i} className={`mr-[4.5px] block size-2 scale-[0.72] rotate-45 ${dark ? 'bg-mint' : 'bg-ink'}`} />
          ))}
          <span className={`t-mono ml-[1px] text-[10px] leading-none ${dark ? 'text-mute' : 'text-sub'}`}>{value}</span>
        </div>
        <div className={`t-label ${dark ? 'text-paper' : 'text-ink'}`}>
          {lines.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

// 섹션 머리말
// split: 라벨 | 제목(2칸) | 설명   /   stack: (라벨 + 제목) 2칸 | 설명
export function SectionHead({ label, title, desc, dark, variant = 'split', descWidth = 272, className = '' }) {
  const head = (
    <h2 className="t-h2">
      <TwoTone parts={title} muted={dark ? 'text-mint' : 'text-sub'} accent="text-mint" strong={dark ? 'text-paper' : 'text-ink'} />
    </h2>
  )
  const p = <p className={`t-body-lg ${dark ? 'text-mute' : 'text-sub'}`}>{desc}</p>
  if (variant === 'stack') {
    return (
      <header className={`grid4 gap-y-8 ${className}`}>
        <div className="col-span-2 flex flex-col gap-9 max-[809px]:col-span-1 max-[809px]:gap-6">
          <Label dark={dark}>{label}</Label>
          {head}
        </div>
        <div className="flex items-end max-[809px]:max-w-[320px]">
          <div style={{ maxWidth: descWidth }}>{p}</div>
        </div>
      </header>
    )
  }
  return (
    <header className={`grid4 gap-y-6 ${className}`}>
      <Label dark={dark} className="pt-[3px]">
        {label}
      </Label>
      <div className="col-span-2 pr-12 max-[1199px]:pr-6 max-[809px]:col-span-1 max-[809px]:pr-0">
        <div className="max-w-[500px]">{head}</div>
      </div>
      <div className="flex items-end">
        <div className="max-[809px]:!max-w-[320px]" style={{ maxWidth: descWidth }}>{p}</div>
      </div>
    </header>
  )
}

// 2px 점으로 그린 화살표 (슬라이더 이전/다음)
export function PixelChevron({ dir = 'left', className = '' }) {
  const pts = [
    [8, 0],
    [4, 4],
    [0, 8],
    [4, 12],
    [8, 16],
  ]
  return (
    <span aria-hidden="true" className={`relative block h-[18px] w-[10px] ${className}`}>
      {pts.map(([x, y], i) => (
        <i key={i} className="absolute size-[2px] bg-current" style={{ left: dir === 'left' ? x : 8 - x, top: y }} />
      ))}
    </span>
  )
}

// 썸네일 프레임 (40px 회색 프레임 안 36px 이미지)
export function Avatar({ src, children, className = '' }) {
  return (
    <span className={`grid size-10 shrink-0 place-items-center rounded-[6px] bg-[#e0e0e0] p-[2px] ${className}`}>
      {src ? (
        <img src={src} alt="" className="size-9 rounded-[4px] object-cover object-top" loading="lazy" />
      ) : (
        <span className="grid size-9 place-items-center rounded-[4px] bg-ink font-wide text-[11px] font-black text-mint">{children}</span>
      )}
    </span>
  )
}
