import { useEffect, useRef, useState } from 'react'
import { brand } from '../data/site'

import FRAG from '../shaders/hero-liquid.frag?raw'

const VERT = `#version 300 es
in vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`

function compile(gl, type, src) {
  const s = gl.createShader(type)
  gl.shaderSource(s, src)
  gl.compileShader(s)
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.warn(gl.getShaderInfoLog(s))
    gl.deleteShader(s)
    return null
  }
  return s
}

function Silk({ onFail }) {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'low-power' })
    if (!gl || gl.isContextLost()) return onFail()
    const vs = compile(gl, gl.VERTEX_SHADER, VERT)
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG)
    if (!vs || !fs) {
      if (vs) gl.deleteShader(vs)
      if (fs) gl.deleteShader(fs)
      return onFail()
    }
    const prog = gl.createProgram()
    gl.attachShader(prog, vs)
    gl.attachShader(prog, fs)
    gl.linkProgram(prog)
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      gl.deleteShader(vs)
      gl.deleteShader(fs)
      gl.deleteProgram(prog)
      return onFail()
    }
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(prog, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const uRes = gl.getUniformLocation(prog, 'uRes')
    const uTime = gl.getUniformLocation(prog, 'uTime')

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let raf = 0
    let elapsed = 0
    let previous = null
    const visible = () => !document.hidden && window.scrollY < canvas.clientHeight
    const render = () => {
      gl.uniform1f(uTime, elapsed)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }
    const tick = (now) => {
      if (previous !== null) elapsed += Math.min((now - previous) / 1000, 0.05)
      previous = now
      render()
      raf = requestAnimationFrame(tick)
    }
    const sync = () => {
      cancelAnimationFrame(raf)
      previous = null
      if (!visible()) return
      render()
      if (!motion.matches) raf = requestAnimationFrame(tick)
    }
    const resize = () => {
      // Keep the folds smooth without rendering at a costly Retina resolution.
      const scale = Math.min(1, 1600 / Math.max(canvas.clientWidth, 1))
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * scale))
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * scale))
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
      render()
    }
    const lost = (event) => {
      event.preventDefault()
      cancelAnimationFrame(raf)
      onFail()
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    canvas.addEventListener('webglcontextlost', lost)
    document.addEventListener('visibilitychange', sync)
    window.addEventListener('scroll', sync, { passive: true })
    motion.addEventListener('change', sync)
    sync()
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      canvas.removeEventListener('webglcontextlost', lost)
      document.removeEventListener('visibilitychange', sync)
      window.removeEventListener('scroll', sync)
      motion.removeEventListener('change', sync)
      gl.deleteBuffer(buf)
      gl.deleteProgram(prog)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [onFail])

  return <canvas ref={ref} className="absolute inset-0 h-full w-full" />
}

// WebGL을 쓸 수 없을 때 보여줄 정적 배경
const FALLBACK = {
  background: [
    'radial-gradient(120% 70% at 12% 8%, rgba(255,255,255,0.075), transparent 60%)',
    'linear-gradient(162deg, transparent 32%, rgba(255,255,255,0.05) 44%, transparent 58%)',
    'radial-gradient(70% 50% at 88% 90%, rgba(255,255,255,0.035), transparent 70%)',
    '#070707',
  ].join(','),
}

export default function HeroBg() {
  const [failed, setFailed] = useState(false)
  const [fail] = useState(() => () => setFailed(true))
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-ink" aria-hidden="true">
      {brand.heroVideo ? (
        <video className="absolute inset-0 h-full w-full object-cover" src={brand.heroVideo} autoPlay muted loop playsInline />
      ) : failed ? (
        <div className="absolute inset-0" style={FALLBACK} />
      ) : (
        <Silk onFail={fail} />
      )}
      <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'var(--noise)', backgroundSize: '180px' }} />
    </div>
  )
}
