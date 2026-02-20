// ═══════════════════════════════════════════════════════
// SECTION TITLE — Reusable heading block
// eyebrow / h2 title / optional subtitle
// ═══════════════════════════════════════════════════════
'use client'

import { motion, type Variants } from 'framer-motion'
import styles from './sectionTitle.module.scss'

interface SectionTitleProps {
  eyebrow?: string      // Small all-caps label above the title
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  className?: string
}

const variants : Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionTitleProps) {
  return (
    <div
      className={[
        styles.sectionTitle,
        styles[`sectionTitle--${align}`],
        className,
      ].join(' ')}
    >
      {eyebrow && (
        <motion.span
          className={styles.sectionTitle__eyebrow}
          variants={variants}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        className={styles.sectionTitle__heading}
        variants={variants}
        custom={0.1}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {title}
      </motion.h2>

      {subtitle && (
        <motion.p
          className={styles.sectionTitle__subtitle}
          variants={variants}
          custom={0.2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  )
}