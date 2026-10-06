import { YEAR, brand, footer, nav } from '../data/site'
import { DotsArrow, TwoTone, Wordmark } from './ui'

// 메뉴(밝은 톤)와 푸터(어두운 톤)가 함께 쓰는 정보 블록
// 세로 간격은 모두 96px 단위
export default function SiteInfo({ dark, onNavigate }) {
  const strong = dark ? 'text-paper' : 'text-ink'
  const muted = dark ? 'text-mute' : 'text-sub'
  // 밝은 메뉴에서는 링크가 회색, 어두운 푸터에서는 흰색
  const link = dark ? 'text-paper hover:text-mint' : 'text-sub hover:text-ink'
  return (
    <div className="grid4 gap-y-16">
      <div className="col-span-2 flex flex-col max-[809px]:col-span-1">
        <p className="t-quote min-h-[72px] max-w-[440px]">
          <TwoTone parts={footer.statement} muted={muted} strong={strong} />
        </p>
        <div className={`t-mono mt-24 ${muted} max-[809px]:mt-10`}>
          {footer.info.map((l) => (
            <span key={l} className="block">
              {l}
            </span>
          ))}
        </div>
        <a
          href={`mailto:${brand.email}`}
          className={`t-h3 mt-24 w-fit transition-colors duration-300 ${link} max-[809px]:mt-10 max-[809px]:text-[28px]`}
        >
          {brand.email}
        </a>
        <a
          href={`tel:${brand.phone}`}
          className={`mt-6 w-fit text-[24px] leading-[0.8] font-semibold tracking-[-0.02em] transition-colors duration-300 ${link}`}
        >
          {brand.phone}
        </a>
      </div>

      <div className="col-span-2 grid grid-cols-2 max-[809px]:col-span-1">
        <nav className="col-span-2 flex flex-col gap-6">
          {nav.map((n) => (
            <a key={n.href} href={n.href} onClick={onNavigate} className={`group grid grid-cols-2 items-center transition-colors duration-300 ${link}`}>
              <span className="text-[24px] leading-[0.8] font-semibold tracking-[-0.02em]">{n.label}</span>
              <DotsArrow className="-ml-[10px] -my-1" />
            </a>
          ))}
        </nav>
        <div className="mt-24 flex flex-col max-[809px]:mt-12">
          <span className={`t-mono ${muted}`}>Links</span>
          <div className="mt-[11px] flex flex-col gap-3">
            {footer.social.map((s, i) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className={`t-body w-fit transition-colors duration-300 ${dark && i === 0 ? 'text-mint' : link}`}
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-24 flex flex-col max-[809px]:mt-12">
          <span className={`t-mono ${muted}`}>Info</span>
          <div className="mt-[11px] flex flex-col gap-3">
            {footer.more.map((s) => (
              <span key={s.label} className={`t-body ${dark ? 'text-paper' : 'text-sub'}`}>
                {s.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function Copyright({ dark }) {
  return (
    <div className={`grid4 t-mono w-full items-center ${dark ? 'text-mute' : 'text-sub'}`}>
      <div className="col-span-2 flex items-center gap-2 max-[809px]:col-span-1">
        <span>© {YEAR}</span>
        <span className="grid size-6 place-items-center rounded-[4px] bg-ink font-wide text-[8px] font-black text-mint">JK</span>
        <span>{brand.name}</span>
      </div>
      <div className="col-span-2 flex items-center gap-2 max-[809px]:col-span-1 max-[809px]:mt-3">
        <span>Built with</span>
        <span className={`text-[15px] font-semibold tracking-[-0.02em] ${dark ? 'text-paper' : 'text-sub'}`} style={{ fontFamily: 'var(--font-sans)' }}>
          React · GSAP
        </span>
      </div>
    </div>
  )
}

export function WatermarkMark({ className = '' }) {
  return (
    <div className={`wrap pointer-events-none ${className}`} aria-hidden="true">
      <Wordmark className="aspect-[8.77] w-full" />
    </div>
  )
}
