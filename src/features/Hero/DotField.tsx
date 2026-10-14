'use client'

// ═══════════════════════════════════════════════════════
// DOT FIELD — interactive canvas behind the hero
// · Dots are pushed away from the cursor and glow near it
// · Click / tap sends a ripple through the grid
// · showMessage() lights dots up as a dot-matrix sign (easter egg)
// All per-frame values live in typed arrays + refs, never React state.
// ═══════════════════════════════════════════════════════
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import styles from './hero.module.scss'

export interface DotFieldHandle {
  ripple: (clientX: number, clientY: number) => void
  showMessage: (text: string, durationMs: number) => void
}

interface DotFieldProps {
  reduceMotion: boolean
}

interface Ripple {
  x: number
  y: number
  start: number
}

interface SimState {
  cols: number
  rows: number
  spacing: number
  offsetX: number
  offsetY: number
  homeX: Float32Array
  homeY: Float32Array
  x: Float32Array
  y: Float32Array
  vx: Float32Array
  vy: Float32Array
  lit: Float32Array        // 0..1 current message brightness
  litTarget: Uint8Array    // 1 = part of the message
  messageActive: boolean
  pointerX: number
  pointerY: number
  pointerActive: boolean
  ripples: Ripple[]
  width: number
  height: number
  needsStaticDraw: boolean
}

// Brand indigo (#6366F1) — canvas can't read SCSS tokens
const DOT_RGB = '99, 102, 241'

const SPACING_DESKTOP = 28
const SPACING_MOBILE  = 22
const MOBILE_MAX      = 767

const REPEL_RADIUS    = 130   // px around the cursor that dots react to
const REPEL_STRENGTH  = 2.2
const SPRING          = 0.08  // pull back to home position
const DAMPING         = 0.82
const RIPPLE_SPEED    = 0.9   // px per ms
const RIPPLE_WIDTH    = 46
const RIPPLE_LIFETIME = 1400  // ms

const DotField = forwardRef<DotFieldHandle, DotFieldProps>(({ reduceMotion }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Mutable simulation state shared between the loop and the imperative API
  const sim = useRef<SimState>({
    cols: 0,
    rows: 0,
    spacing: SPACING_DESKTOP,
    offsetX: 0,
    offsetY: 0,
    homeX: new Float32Array(0),
    homeY: new Float32Array(0),
    x: new Float32Array(0),
    y: new Float32Array(0),
    vx: new Float32Array(0),
    vy: new Float32Array(0),
    lit: new Float32Array(0),
    litTarget: new Uint8Array(0),
    messageActive: false,
    pointerX: -9999,
    pointerY: -9999,
    pointerActive: false,
    ripples: [],
    width: 0,
    height: 0,
    needsStaticDraw: true,
  })

  // ── Imperative API used by Hero (ripple on click, easter egg) ──
  useImperativeHandle(ref, () => ({
    ripple(clientX, clientY) {
      const canvas = canvasRef.current
      if (!canvas || reduceMotion) return
      const rect = canvas.getBoundingClientRect()
      sim.current.ripples.push({ x: clientX - rect.left, y: clientY - rect.top, start: performance.now() })
    },
    showMessage(text, durationMs) {
      const s = sim.current
      if (!s.cols || !s.rows) return
      // Centre the message on the part of the hero that is actually on screen
      // (on phones the hero is taller than the viewport)
      const canvas = canvasRef.current
      const rect = canvas?.getBoundingClientRect()
      const visibleTop = rect ? Math.max(0, -rect.top) : 0
      const visibleBottom = rect ? Math.min(rect.height, window.innerHeight - rect.top) : s.height
      const centerRow = ((visibleTop + visibleBottom) / 2 - s.offsetY) / s.spacing
      s.litTarget = rasterizeText(text, s.cols, s.rows, centerRow)
      s.messageActive = true
      s.needsStaticDraw = true
      window.setTimeout(() => {
        s.litTarget = new Uint8Array(s.cols * s.rows)
        s.messageActive = false
        s.needsStaticDraw = true
      }, durationMs)
    },
  }), [reduceMotion])

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas?.parentElement
    if (!canvas || !host) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const s = sim.current
    let frameId = 0
    let isVisible = true

    // ── Build / rebuild the grid to fit the hero ──
    const buildGrid = () => {
      const rect = host.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      s.width = rect.width
      s.height = rect.height
      canvas.width = Math.round(rect.width * dpr)
      canvas.height = Math.round(rect.height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      s.spacing = window.innerWidth <= MOBILE_MAX ? SPACING_MOBILE : SPACING_DESKTOP
      s.cols = Math.floor(rect.width / s.spacing)
      s.rows = Math.floor(rect.height / s.spacing)
      s.offsetX = (rect.width - (s.cols - 1) * s.spacing) / 2
      s.offsetY = (rect.height - (s.rows - 1) * s.spacing) / 2

      const count = s.cols * s.rows
      s.homeX = new Float32Array(count)
      s.homeY = new Float32Array(count)
      s.x = new Float32Array(count)
      s.y = new Float32Array(count)
      s.vx = new Float32Array(count)
      s.vy = new Float32Array(count)
      s.lit = new Float32Array(count)
      s.litTarget = new Uint8Array(count)
      s.messageActive = false

      for (let r = 0; r < s.rows; r++) {
        for (let c = 0; c < s.cols; c++) {
          const i = r * s.cols + c
          s.homeX[i] = s.x[i] = s.offsetX + c * s.spacing
          s.homeY[i] = s.y[i] = s.offsetY + r * s.spacing
        }
      }
      s.needsStaticDraw = true
    }

    // ── One simulation + draw step ──
    const step = (now: number) => {
      const { width, height } = s
      ctx.clearRect(0, 0, width, height)

      // Soft spotlight following the cursor
      if (s.pointerActive && !reduceMotion) {
        const glow = ctx.createRadialGradient(s.pointerX, s.pointerY, 0, s.pointerX, s.pointerY, 280)
        glow.addColorStop(0, `rgba(${DOT_RGB}, 0.10)`)
        glow.addColorStop(1, `rgba(${DOT_RGB}, 0)`)
        ctx.fillStyle = glow
        ctx.fillRect(0, 0, width, height)
      }

      // Drop finished ripples
      s.ripples = s.ripples.filter((rp) => now - rp.start < RIPPLE_LIFETIME)

      const count = s.cols * s.rows
      for (let i = 0; i < count; i++) {
        let fx = 0
        let fy = 0
        let glowAmt = 0

        if (!reduceMotion) {
          // Cursor repel
          if (s.pointerActive) {
            const dx = s.x[i] - s.pointerX
            const dy = s.y[i] - s.pointerY
            const dist = Math.hypot(dx, dy)
            if (dist < REPEL_RADIUS && dist > 0.01) {
              const falloff = 1 - dist / REPEL_RADIUS
              const force = falloff * falloff * REPEL_STRENGTH
              fx += (dx / dist) * force
              fy += (dy / dist) * force
              glowAmt = Math.max(glowAmt, falloff)
            }
          }

          // Ripple rings push dots outward as they pass
          for (const rp of s.ripples) {
            const age = now - rp.start
            const ringR = age * RIPPLE_SPEED
            const dx = s.homeX[i] - rp.x
            const dy = s.homeY[i] - rp.y
            const dist = Math.hypot(dx, dy)
            const band = Math.abs(dist - ringR)
            if (band < RIPPLE_WIDTH && dist > 0.01) {
              const life = 1 - age / RIPPLE_LIFETIME
              const amt = (1 - band / RIPPLE_WIDTH) * life
              fx += (dx / dist) * amt * 3.2
              fy += (dy / dist) * amt * 3.2
              glowAmt = Math.max(glowAmt, amt)
            }
          }

          // Spring back home with damping
          s.vx[i] = (s.vx[i] + (s.homeX[i] - s.x[i]) * SPRING + fx) * DAMPING
          s.vy[i] = (s.vy[i] + (s.homeY[i] - s.y[i]) * SPRING + fy) * DAMPING
          s.x[i] += s.vx[i]
          s.y[i] += s.vy[i]
        }

        // Message brightness eases toward its target
        const target = s.litTarget[i]
        s.lit[i] += (target - s.lit[i]) * (reduceMotion ? 1 : 0.12)

        // Idle shimmer keeps the field alive on touch devices (no hover there)
        const shimmer = reduceMotion ? 0 : 0.05 * Math.sin(now * 0.0012 + s.homeX[i] * 0.012 + s.homeY[i] * 0.017)

        const lit = s.lit[i]
        const dimForMessage = s.messageActive ? 0.35 : 1
        const alpha = Math.min(1, (0.16 + shimmer + glowAmt * 0.55) * dimForMessage + lit * 0.8)
        const radius = 1.1 + glowAmt * 1.4 + lit * 1.9

        ctx.beginPath()
        ctx.arc(s.x[i], s.y[i], radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${DOT_RGB}, ${alpha.toFixed(3)})`
        ctx.fill()
      }
    }

    const loop = (now: number) => {
      if (isVisible && document.visibilityState === 'visible') step(now)
      frameId = requestAnimationFrame(loop)
    }

    // Reduced motion: draw only when something changes (resize, message)
    const staticLoop = () => {
      if (s.needsStaticDraw) {
        step(performance.now())
        // keep easing the message for a few frames, then settle
        s.needsStaticDraw = false
      }
      frameId = requestAnimationFrame(staticLoop)
    }

    // ── Pointer tracking (listeners on the hero, canvas stays pointer-events: none) ──
    const handleMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      s.pointerX = e.clientX - rect.left
      s.pointerY = e.clientY - rect.top
      s.pointerActive = true
    }
    const handleLeave = () => {
      s.pointerActive = false
    }
    // Touch: a finger lifting should release the repel point
    const handleUp = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') s.pointerActive = false
    }

    buildGrid()
    frameId = requestAnimationFrame(reduceMotion ? staticLoop : loop)

    const resizeObserver = new ResizeObserver(buildGrid)
    resizeObserver.observe(host)

    // Pause work while the hero is scrolled out of view
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
    })
    visibilityObserver.observe(host)

    host.addEventListener('pointermove', handleMove, { passive: true })
    host.addEventListener('pointerleave', handleLeave)
    host.addEventListener('pointerup', handleUp)
    host.addEventListener('pointercancel', handleLeave)

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      host.removeEventListener('pointermove', handleMove)
      host.removeEventListener('pointerleave', handleLeave)
      host.removeEventListener('pointerup', handleUp)
      host.removeEventListener('pointercancel', handleLeave)
    }
  }, [reduceMotion])

  return <canvas ref={canvasRef} className={styles.hero__field} aria-hidden="true" />
})

DotField.displayName = 'DotField'

export default DotField

// ─── Helpers ──────────────────────────────────────────
// Draws text at grid resolution (1 canvas px = 1 dot) and returns which
// dots fall inside the glyphs. Text is centred and sized to the grid.
function rasterizeText(text: string, cols: number, rows: number, centerRow: number): Uint8Array {
  const result = new Uint8Array(cols * rows)
  const off = document.createElement('canvas')
  off.width = cols
  off.height = rows
  const ctx = off.getContext('2d')
  if (!ctx) return result

  const family = getComputedStyle(document.body).fontFamily
  // Cap height by rows and by a sensible max so tall phone heroes don't get giant glyphs
  let fontSize = Math.floor(Math.min(rows * 0.42, cols * 0.8, 22))
  ctx.font = `700 ${fontSize}px ${family}`
  // Shrink until the text fits ~86% of the grid width
  while (fontSize > 6 && ctx.measureText(text).width > cols * 0.86) {
    fontSize -= 1
    ctx.font = `700 ${fontSize}px ${family}`
  }

  ctx.fillStyle = '#000'
  ctx.strokeStyle = '#000'
  // Thicken strokes on larger glyphs: at 1px-per-dot they read as outlines.
  // Narrow grids (phones) stay unstroked or letters merge into blocks.
  const thicken = cols >= 30
  ctx.lineWidth = Math.max(1, fontSize * 0.1)
  ctx.lineJoin = 'round'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const y = Math.min(Math.max(centerRow, fontSize / 2), rows - fontSize / 2)
  ctx.fillText(text, cols / 2, y)
  if (thicken) ctx.strokeText(text, cols / 2, y)

  const pixels = ctx.getImageData(0, 0, cols, rows).data
  for (let i = 0; i < cols * rows; i++) {
    result[i] = pixels[i * 4 + 3] > 110 ? 1 : 0
  }
  return result
}
