'use client'

// ═══════════════════════════════════════════════════════
// KINETIC NAME — letters spring up as the cursor passes over them,
// so sweeping across the name makes a wave. Triple click / tap
// fires onSecret (the hero easter egg).
// ═══════════════════════════════════════════════════════
import { useRef } from 'react'
import { motion, type Variants } from 'framer-motion'
import styles from './hero.module.scss'

interface KineticNameProps {
  text: string
  reduceMotion: boolean
  onSecret: () => void
}

const TRIPLE_CLICK_WINDOW = 650 // ms between clicks to count as a streak

const letterIn: Variants = {
  hidden: { opacity: 0, y: '0.45em', filter: 'blur(8px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delay: 0.25 + i * 0.045, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
}

export default function KineticName({ text, reduceMotion, onSecret }: KineticNameProps) {
  const clickTimes = useRef<number[]>([])

  const handleClick = () => {
    const now = performance.now()
    clickTimes.current = [...clickTimes.current, now].filter((t) => now - t < TRIPLE_CLICK_WINDOW * 2)
    if (clickTimes.current.length >= 3) {
      clickTimes.current = []
      onSecret()
    }
  }

  const letters = Array.from(text)

  return (
    <h1 className={styles.hero__name} aria-label={text} onClick={handleClick}>
      {letters.map((char, i) =>
        char === ' ' ? (
          <span key={i} className={styles.hero__name_space} aria-hidden="true"> </span>
        ) : (
          <motion.span
            key={i}
            className={styles.hero__name_letter}
            aria-hidden="true"
            custom={i}
            variants={letterIn}
            initial="hidden"
            animate="visible"
            whileHover={reduceMotion ? undefined : { y: '-0.14em', color: '#6366F1' }}
            whileTap={reduceMotion ? undefined : { scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 420, damping: 14 }}
          >
            {char}
          </motion.span>
        )
      )}
    </h1>
  )
}
