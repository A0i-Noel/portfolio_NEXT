'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import styles from './header.module.scss'
import LanguageSwitch from '../../elements/LanguageSwitch'

// ─── Nav items ───────────────────────────────────────
// id maps to section id on the page (e.g. <section id="hero">)
const NAV_ITEMS = [
  { id: 'hero',       label: { en: 'Home',       ja: 'ホーム' } },
  { id: 'about',      label: { en: 'About',      ja: '自己紹介' } },
  { id: 'experience', label: { en: 'Experience', ja: '経歴' } },
  { id: 'skills',     label: { en: 'Skills',     ja: 'スキル' } },
  { id: 'projects',   label: { en: 'Projects',   ja: 'プロジェクト' } },
  { id: 'contact',    label: { en: 'Contact',    ja: '連絡先' } },
] as const

type NavId = (typeof NAV_ITEMS)[number]['id']

// Mobile nav animation variants
const mobileNavVariants: Variants = {
  closed: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: 'easeOut' },
  },
}

// Custom variant — function form requires explicit typing on the return
const mobileLinkVariants: Variants = {
  closed: { opacity: 0, x: -12 },
  open: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.05, duration: 0.2, ease: 'easeOut' as const },
  }),
}

// ─── Component ───────────────────────────────────────
interface HeaderProps {
  lang?: 'en' | 'ja'
}

export default function Header({ lang = 'en' }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<NavId>('hero')
  const [mobileOpen, setMobileOpen] = useState(false)

  // Scroll detection — add class when page scrolls past threshold
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Intersection Observer — track which section is in view
  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.id)
    const observers: IntersectionObserver[] = []

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id as NavId)
        },
        {
          rootMargin: '-40% 0px -50% 0px', // trigger when section is roughly centered
          threshold: 0,
        }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((obs) => obs.disconnect())
  }, [])

  // Close mobile nav on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNavClick = useCallback(
    (id: string) => {
      setMobileOpen(false)
      const el = document.getElementById(id)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    []
  )

  return (
    <>
      <header
        className={[
          styles.header,
          isScrolled ? styles['header--scrolled'] : '',
        ].join(' ')}
      >
        <div className={styles.header__inner}>
          {/* Logo */}
          <button
            className={styles.header__logo}
            onClick={() => handleNavClick('hero')}
            aria-label="Go to top"
          >
            AK<span>.</span>
          </button>

          {/* Desktop nav */}
          <nav className={styles.header__nav} aria-label="Main navigation">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                className={[
                  styles.header__nav_link,
                  activeSection === item.id ? styles['header__nav_link--active'] : '',
                ].join(' ')}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label[lang]}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className={styles.header__actions}>
            <LanguageSwitch />

            {/* Mobile hamburger */}
            <button
              className={[
                styles.header__menu_btn,
                mobileOpen ? styles['header__menu_btn--open'] : '',
              ].join(' ')}
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            className={styles.header__mobile_nav}
            variants={mobileNavVariants}
            initial="closed"
            animate="open"
            exit="closed"
            aria-label="Mobile navigation"
          >
            {NAV_ITEMS.map((item, i) => (
              <motion.button
                key={item.id}
                className={[
                  styles.header__mobile_link,
                  activeSection === item.id ? styles['header__mobile_link--active'] : '',
                ].join(' ')}
                variants={mobileLinkVariants}
                custom={i}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label[lang]}
              </motion.button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}