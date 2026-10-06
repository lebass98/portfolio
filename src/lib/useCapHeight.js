import { useEffect, useState } from 'react'

// 워드마크 글꼴 (Pretendard GOV 가장 굵은 굵기)
export const WM_FONT = '900 100px "Pretendard GOV Variable"'

// 글자의 실제 잉크 높이(대문자 높이)를 재서 SVG viewBox를 딱 맞춘다
const capCache = new Map()
export function useCapHeight(text) {
  const [asc, setAsc] = useState(capCache.get(text) ?? 72)
  useEffect(() => {
    if (capCache.has(text)) return
    let alive = true
    document.fonts.load(WM_FONT, text).then(() => {
      const ctx = document.createElement('canvas').getContext('2d')
      ctx.font = WM_FONT
      const a = Math.round(ctx.measureText(text).actualBoundingBoxAscent * 10) / 10
      if (a > 20) {
        capCache.set(text, a)
        if (alive) setAsc(a)
      }
    })
    return () => {
      alive = false
    }
  }, [text])
  return asc
}
