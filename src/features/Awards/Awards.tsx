'use client'

import { useLanguage } from '@/contexts/languageCtx'
import { motion, type Variants } from 'framer-motion'
import type { IconType } from 'react-icons'
import { PiMedal, PiRobot, PiStar, PiTicket, PiTrophy } from 'react-icons/pi'
import styles from './awards.module.scss'

// ─── Types ────────────────────────────────────────────
type Lang = 'EN' | 'JPN'

interface Award {
  id:        string
  Icon:      IconType
  title:     { EN: string; JPN: string }
  event:     { EN: string; JPN: string }
  year:      string
  featured?: boolean  // top wins get a large tile; the rest render as compact rows
}

// ─── Data ─────────────────────────────────────────────
const AWARDS: Award[] = [
  {
    id:       'podium-operator',
    Icon:     PiRobot,
    featured: true,
    year:     '2026',
    title: {
      EN:  'The Operator Award',
      JPN: 'オペレーター賞',
    },
    event: {
      EN:  'Podium AI Hackathon 2026',
      JPN: 'Podium AIハッカソン 2026',
    },
  },
  {
    id:       'iec-winner',
    Icon:     PiTrophy,
    featured: true,
    year:     '2024',
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
    Icon: PiMedal,
    year: '2024',
    title: {
      EN:  '1st Place, Technology Category',
      JPN: '1位・テクノロジー部門',
    },
    event: {
      EN:  'International Entrepreneurship Challenge (IEC)',
      JPN: '国際アントレプレナーシップチャレンジ (IEC)',
    },
  },
  {
    id:   'trolley-house',
    Icon: PiStar,
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
    Icon: PiTicket,
    year: '2024',
    title: {
      EN:  'Golden Ticket',
      JPN: 'ゴールデンチケット',
    },
    event: {
      EN:  'Boise Entrepreneurship Week (BEW) 2024',
      JPN: 'ボイジー・アントレプレナーシップウィーク (BEW) 2024',
    },
  },
]

// ─── Animation variants ───────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

// ─── Featured tile ────────────────────────────────────
function FeaturedAward({ award, lang }: { award: Award; lang: Lang }) {
  const { Icon } = award
  return (
    <motion.article className={styles.featured} variants={fadeUp}>
      <div className={styles.featured__top}>
        <span className={styles.featured__icon} aria-hidden="true">
          <Icon size={26} />
        </span>
        <span className={styles.featured__year}>{award.year}</span>
      </div>
      <h3 className={styles.featured__title}>{award.title[lang]}</h3>
      <p className={styles.featured__event}>{award.event[lang]}</p>
    </motion.article>
  )
}

// ─── Compact row ──────────────────────────────────────
function AwardRow({ award, lang }: { award: Award; lang: Lang }) {
  const { Icon } = award
  return (
    <motion.li className={styles.row} variants={fadeUp}>
      <span className={styles.row__icon} aria-hidden="true">
        <Icon size={20} />
      </span>
      <div className={styles.row__text}>
        <h3 className={styles.row__title}>{award.title[lang]}</h3>
        <p className={styles.row__event}>{award.event[lang]}</p>
      </div>
      <span className={styles.row__year}>{award.year}</span>
    </motion.li>
  )
}

// ─── Main component ───────────────────────────────────
export default function Awards() {
  const { language } = useLanguage()
  const featured = AWARDS.filter((a) => a.featured)
  const rest     = AWARDS.filter((a) => !a.featured)

  return (
    <section id="awards" className={styles.awards}>
      <div className={styles.awards__inner}>

        {/* Section title */}
        <motion.div
          className={styles.awards__title_block}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className={styles.awards__heading}>
            {language === 'EN' ? 'Recognition' : '受賞・表彰'}
          </h2>
          <p className={styles.awards__subheading}>
            {language === 'EN'
              ? 'Highlights from competitions and entrepreneurship programs.'
              : 'コンテストやアントレプレナーシッププログラムでの受賞実績。'}
          </p>
        </motion.div>

        <motion.div
          className={styles.awards__layout}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Top wins */}
          <div className={styles.awards__featured}>
            {featured.map((award) => (
              <FeaturedAward key={award.id} award={award} lang={language} />
            ))}
          </div>

          {/* Everything else */}
          <motion.ul className={styles.awards__list} variants={stagger}>
            {rest.map((award) => (
              <AwardRow key={award.id} award={award} lang={language} />
            ))}
          </motion.ul>
        </motion.div>

      </div>
    </section>
  )
}
