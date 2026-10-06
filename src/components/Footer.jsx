import SiteInfo, { Copyright } from './SiteInfo'
import { Cols, Wordmark } from './ui'

// 어두운 패널, 화면 높이만큼, 위쪽에 옅은 워드마크
export default function Footer() {
  return (
    <footer className="relative z-[1] bg-paper2">
      <div className="tone-dark relative flex min-h-svh flex-col justify-between overflow-hidden rounded-t-[12px] bg-ink text-paper">
        <div className="wrap pointer-events-none absolute inset-x-0 top-0 text-[#121212]" aria-hidden="true">
          <Wordmark className="aspect-[8.77] w-full" />
        </div>
        <Cols />
        <div className="wrap relative pt-24">
          <SiteInfo dark />
        </div>
        <div className="wrap relative mt-24 flex h-[120px] items-start">
          <Copyright dark />
        </div>
      </div>
    </footer>
  )
}
