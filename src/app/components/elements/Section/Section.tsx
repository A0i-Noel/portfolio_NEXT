// ═══════════════════════════════════════════════════════
// SECTION — Shared section wrapper
// Provides consistent vertical rhythm and container width
// ═══════════════════════════════════════════════════════
import { forwardRef } from 'react'
import styles from './section.module.scss'

interface SectionProps {
  id?: string
  className?: string
  children: React.ReactNode
  /** 'default' uses standard padding, 'flush' removes vertical padding */
  variant?: 'default' | 'flush'
  /** Adds a subtle tinted glass background to alternate sections */
  tinted?: boolean
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ id, className = '', children, variant = 'default', tinted = false }, ref) => {
    const classNames = [
      styles.section,
      variant === 'flush' ? styles['section--flush'] : '',
      tinted ? styles['section--tinted'] : '',
      className,
    ]
      .filter(Boolean)
      .join(' ')

    return (
      <section id={id} ref={ref} className={classNames}>
        <div className={styles.section__container}>
          {children}
        </div>
      </section>
    )
  }
)

Section.displayName = 'Section'

export default Section