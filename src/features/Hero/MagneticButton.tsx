'use client'

// ═══════════════════════════════════════════════════════
// MAGNETIC BUTTON — drifts toward the cursor while hovered and springs
// back on leave. Mouse/trackpad only; a normal button on touch.
// ═══════════════════════════════════════════════════════
import type { ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className: string
  enabled: boolean
  onClick: () => void
}

const PULL = 0.28 // fraction of the cursor offset the button follows
const SPRING = { stiffness: 220, damping: 15, mass: 0.4 }

export default function MagneticButton({ children, className, enabled, onClick }: MagneticButtonProps) {
  const x = useSpring(useMotionValue(0), SPRING)
  const y = useSpring(useMotionValue(0), SPRING)

  const handleMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!enabled) return
    const rect = e.currentTarget.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * PULL)
    y.set((e.clientY - (rect.top + rect.height / 2)) * PULL)
  }

  const handleLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      className={className}
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      onClick={onClick}
    >
      {children}
    </motion.button>
  )
}
