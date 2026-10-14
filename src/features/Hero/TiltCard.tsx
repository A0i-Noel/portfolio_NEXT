'use client'

// ═══════════════════════════════════════════════════════
// TILT CARD — glass info card that leans toward the cursor with a
// moving light sheen. Mouse/trackpad only; static on touch.
// Pointer values flow through motion values (no React re-renders).
// ═══════════════════════════════════════════════════════
import type { ReactNode } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import styles from './hero.module.scss'

interface TiltCardProps {
  children: ReactNode
  enabled: boolean
}

const MAX_TILT = 9 // degrees
const SPRING = { stiffness: 160, damping: 18, mass: 0.6 }

export default function TiltCard({ children, enabled }: TiltCardProps) {
  // Pointer position inside the card, normalised to 0..1
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(py, [0, 1], [MAX_TILT, -MAX_TILT]), SPRING)
  const rotateY = useSpring(useTransform(px, [0, 1], [-MAX_TILT, MAX_TILT]), SPRING)

  const sheenX = useTransform(px, (v) => `${v * 100}%`)
  const sheenY = useTransform(py, (v) => `${v * 100}%`)
  const sheen = useMotionTemplate`radial-gradient(circle at ${sheenX} ${sheenY}, rgba(255,255,255,0.55), transparent 55%)`

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!enabled) return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width)
    py.set((e.clientY - rect.top) / rect.height)
  }

  const handleLeave = () => {
    px.set(0.5)
    py.set(0.5)
  }

  return (
    <div className={styles.hero__card_stage}>
      <motion.div
        className={styles.hero__card_shell}
        style={enabled ? { rotateX, rotateY } : undefined}
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
      >
        <div className={styles.hero__card}>
          {enabled && (
            <motion.div className={styles.hero__card_sheen} style={{ background: sheen }} aria-hidden="true" />
          )}
          {children}
        </div>
      </motion.div>
    </div>
  )
}
