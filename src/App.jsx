import { useEffect, useLayoutEffect, useState } from 'react'
import Footer from './components/Footer'
import Header from './components/Header'
import Preloader from './components/Preloader'
import About from './components/sections/About'
import Archive from './components/sections/Archive'
import Career from './components/sections/Career'
import Contact from './components/sections/Contact'
import Engage from './components/sections/Engage'
import Faq from './components/sections/Faq'
import Hero from './components/sections/Hero'
import Process from './components/sections/Process'
import Projects from './components/sections/Projects'
import Quick from './components/sections/Quick'
import Roles from './components/sections/Roles'
import Services from './components/sections/Services'
import Why from './components/sections/Why'
import { ScrollTrigger } from './lib/gsap'
import { createLenis } from './lib/lenis'

const skipIntro = new URLSearchParams(window.location.search).has('nointro')

export default function App() {
  const [lenis, setLenis] = useState(null)
  const [revealed, setRevealed] = useState(skipIntro)
  const [loading, setLoading] = useState(!skipIntro)

  useLayoutEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const { lenis: l, destroy } = createLenis()
    // Lenis는 브라우저에서만 만들 수 있는 외부 객체라 effect에서 생성해 상태로 넘긴다
    // oxlint-disable-next-line react/set-state-in-effect
    setLenis(l)
    return destroy
  }, [])

  // 로딩 중에는 스크롤을 막는다
  useEffect(() => {
    if (!lenis) return
    if (loading) lenis.stop()
    else lenis.start()
  }, [lenis, loading])

  // 폰트가 늦게 들어와 높이가 바뀌면 스크롤 트리거 위치를 다시 계산
  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
  }, [])

  return (
    <>
      {loading && <Preloader onReveal={() => setRevealed(true)} onDone={() => setLoading(false)} />}
      <Header lenis={lenis} />
      <main>
        <Hero revealed={revealed} />
        <About />
        <Why />
        <Services />
        <Process />
        <Projects />
        <Career />
        <Roles />
        <Engage />
        <Faq />
        <Contact />
        <Archive />
        <Quick />
      </main>
      <Footer />
    </>
  )
}
