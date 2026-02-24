'use client'

import { useLanguage } from '@/contexts/languageCtx'
import { motion, type Variants } from 'framer-motion'
import styles from './awards.module.scss'

// ─── Types ────────────────────────────────────────────
type Lang = 'EN' | 'JPN'

interface Award {
  id:       string
  icon:     string  // emoji trophy / medal
  title:    { EN: string; JPN: string }
  event:    { EN: string; JPN: string }
  year:     string
  tier:     'gold' | 'silver' | 'special'  // controls accent color
}

// ─── Data ─────────────────────────────────────────────
const AWARDS: Award[] = [
  {
    id:   'iec-winner',
    icon: '🏆',
    tier: 'gold',
    year: '2024',
    title: {
      EN:  'Winner',
      JPN: '優勝',
    },
    event: {
      EN:  'International Entrepreneurship Challenge (IEC)',
      JPN: '国際アントレプレナーシップチャレンジ (IEC)',
    },
  },
  {
    id:   'iec-tech',
    icon: '🥇',
    tier: 'gold',
    year: '2024',
    title: {
      EN:  '1st Place — Technology Category',
      JPN: '1位 — テクノロジー部門',
    },
    event: {
      EN:  'International Entrepreneurship Challenge (IEC)',
      JPN: '国際アントレプレナーシップチャレンジ (IEC)',
    },
  },
  {
    id:   'trolley-house',
    icon: '⭐',
    tier: 'special',
    year: '2024',
    title: {
      EN:  'Special Recognition Award',
      JPN: '特別表彰賞',
    },
    event: {
      EN:  'Trolley House',
      JPN: 'Trolley House',
    },
  },
  {
    id:   'bew-golden',
    icon: '🎫',
    tier: 'silver',
    year: '2024',
    title: {
      EN:  'Golden Ticket',
      JPN: 'ゴールデンチケット',
    },
    event: {
      EN:  '2024 Boise Entrepreneurship Week (BEW)',
      JPN: '2024年ボイジー・アントレプレナーシップウィーク (BEW)',
    },
  },
]

// ─── Animation variants ───────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const iconBounce: Variants = {
  hidden:  { scale: 0.5, opacity: 0 },
  visible: {
    scale: 1, opacity: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as const },
  },
}

// ─── Award card ───────────────────────────────────────
function AwardCard({ award, lang }: { award: Award; lang: Lang }) {
  return (
    <motion.div
      className={`${styles.card} ${styles[`card--${award.tier}`]}`}
      variants={fadeUp}
    >
      {/* Trophy icon */}
      <motion.div
        className={styles.card__icon}
        variants={iconBounce}
      >
        <span role="img" aria-label="award icon">{award.icon}</span>
      </motion.div>

      {/* Year badge */}
      <span className={styles.card__year}>{award.year}</span>

      {/* Title */}
      <h3 className={styles.card__title}>{award.title[lang]}</h3>

      {/* Event */}
      <p className={styles.card__event}>{award.event[lang]}</p>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────
export default function Awards() {
  const { language } = useLanguage()

  return (
    <section id="awards" className={styles.awards}>

      {/* Fog blobs */}
      <div className={styles.awards__fog1} aria-hidden="true" />
      <div className={styles.awards__fog2} aria-hidden="true" />

      <div className={styles.awards__inner}>

        {/* Section title */}
        <motion.div
          className={styles.awards__title_block}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className={styles.awards__eyebrow}>
            {language === 'EN' ? 'Awards' : '受賞歴'}
          </span>
          <h2 className={styles.awards__heading}>
            {language === 'EN' ? 'Recognition' : '受賞・表彰'}
          </h2>
          <p className={styles.awards__subheading}>
            {language === 'EN'
              ? 'Highlights from competitions and entrepreneurship programs.'
              : 'コンテストやアントレプレナーシッププログラムでの受賞実績。'}
          </p>
        </motion.div>

        {/* Award grid */}
        <motion.div
          className={styles.awards__grid}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {AWARDS.map((award) => (
            <AwardCard key={award.id} award={award} lang={language} />
          ))}
        </motion.div>

      </div>
    </section>
  )
}