'use client'

import { useLanguage } from '@/contexts/languageCtx'
import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'
import styles from './about.module.scss'

// ─── Copy ─────────────────────────────────────────────
const ABOUT_COPY = {
  eyebrow: {
    EN:  'About Me',
    JPN: '自己紹介',
  },
  heading: {
    EN:  'From Tokyo to Silicon Slopes',
    JPN: '東京からシリコンスロープスへ',
  },
  paragraphs: {
    EN: [
      "I grew up in Tokyo, Japan — a city that taught me to find beauty in precision and meaning in the details. In 2020, I made the leap to the United States to study at BYU-Idaho, chasing a degree in Computer Science with a Finance certificate tucked alongside it.",
      "College wasn't just about coursework. It was where I discovered that the most interesting problems sit at the intersection of technology and people. That conviction led me to co-found Subitt in 2023 — a startup born from a genuine frustration and built with a small team that cared deeply about what we were making.",
      "In 2025, that same drive pushed me to start Grid. Each venture has taught me something the classroom couldn't: that building something real, with real stakes, is the fastest way to grow.",
      "Today I sit at the overlap of engineering and leadership — writing code, making product decisions, and learning every single day. I build things that are purposeful, precise, and people-first.",
    ],
    JPN: [
      "東京で育ち、細部に美しさを見出し、丁寧さに意味を感じる感覚を身につけました。2020年に渡米し、ブリガムヤング大学アイダホ校でコンピューターサイエンスの学士号とファイナンスの副専攻を取得しました。",
      "大学では授業だけでなく、テクノロジーと人が交わる場所に最も面白い問題があることを発見しました。その信念が2023年のSubitt共同創業につながりました。本物の課題から生まれ、情熱あるチームで作り上げたスタートアップです。",
      "2025年には同じ情熱を持ってGridを創業しました。どの挑戦も教室では学べないことを教えてくれました。リアルなものを、リアルなリスクを背負って作ることが、最も速い成長の道だということを。",
      "今、私はエンジニアリングとリーダーシップの交差点に立っています。コードを書き、プロダクトの意思決定を行い、毎日学び続けています。目的を持ち、精密に、人を中心としたものを作り続けます。",
    ],
  },
  stats: [
    { value: '2',  label: { EN: 'Startups Founded', JPN: '創業スタートアップ' } },
    { value: '5+', label: { EN: 'Years Building',   JPN: '年のキャリア' } },
    { value: '🇯🇵→🇺🇸', label: { EN: 'Tokyo → Utah',  JPN: '東京 → ユタ' } },
  ],
} as const

// ─── Animation variants ───────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const fadeLeft: Variants = {
  hidden:  { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

// ─── Component ────────────────────────────────────────
export default function About() {
  const { language } = useLanguage()

  return (
    <section id="about" className={styles.about}>

      {/* Subtle fog blob for visual continuity from Hero */}
      <div className={styles.about__fog} aria-hidden="true" />

      <div className={styles.about__inner}>

        {/* ── Left: Photo column ── */}
        <motion.div
          className={styles.about__photo_col}
          variants={fadeLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Main portrait */}
          <div className={styles.about__photo_frame}>
            <Image
              src="/images/me.jpg"
              alt="Aoi Kuriki"
              fill
              sizes="(max-width: 767px) 80vw, (max-width: 1024px) 40vw, 420px"
              className={styles.about__photo_img}
              priority={false}
            />
            {/* Glass sheen overlay */}
            <div className={styles.about__photo_sheen} aria-hidden="true" />
          </div>

          {/* Floating stats card */}
          <motion.div
            className={styles.about__stats}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            {ABOUT_COPY.stats.map((stat) => (
              <div key={stat.value} className={styles.about__stat}>
                <span className={styles.about__stat_value}>{stat.value}</span>
                <span className={styles.about__stat_label}>{stat.label[language]}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: Text column ── */}
        <motion.div
          className={styles.about__text_col}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {/* Eyebrow */}
          <motion.span variants={fadeUp} className={styles.about__eyebrow}>
            {ABOUT_COPY.eyebrow[language]}
          </motion.span>

          {/* Heading */}
          <motion.h2 variants={fadeUp} className={styles.about__heading}>
            {ABOUT_COPY.heading[language]}
          </motion.h2>

          {/* Paragraphs */}
          <div className={styles.about__body}>
            {ABOUT_COPY.paragraphs[language].map((para, i) => (
              <motion.p key={i} variants={fadeUp} className={styles.about__para}>
                {para}
              </motion.p>
            ))}
          </div>

          {/* Journey milestones */}
          <motion.div variants={fadeUp} className={styles.about__timeline}>
            {[
              { year: '2020', event: { EN: 'Moved to the USA · BYU-Idaho',        JPN: '渡米・BYU-Idaho入学' } },
              { year: '2023', event: { EN: 'Co-founded Subitt', JPN: 'Subitt共同創業' } },
              { year: '202４', event: { EN: 'CS + Finance degree', JPN: 'CS学士・Finance副専攻取得' } },
              { year: '2025', event: { EN: 'Founded Grid',                          JPN: 'Grid創業' } },
            ].map((item, i) => (
              <div key={i} className={styles.about__milestone}>
                <span className={styles.about__milestone_year}>{item.year}</span>
                <span className={styles.about__milestone_dot} aria-hidden="true" />
                <span className={styles.about__milestone_event}>{item.event[language]}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}