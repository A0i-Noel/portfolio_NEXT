'use client';

import { useLanguage } from '@/contexts/languageCtx';
import { motion, useReducedMotion, type Variants } from 'framer-motion';
import styles from './hero.module.scss';

// ─── Copy ─────────────────────────────────────────────
const HERO_COPY = {
  eyebrow: {
    EN:  'Available for work',
    JPN: '依頼受付中',
  },
  name: {
    EN:  'Aoi Kuriki',
    JPN: '栗木 碧唯',
  },
  title: {
    EN:  'Builder. Engineer. Founder.',
    JPN: 'エンジニア・起業家・共同創業者',
  },
  description: {
    EN:  'Co-founder & COO/CTO of Subitt LLC. CS + Finance at BYU-Idaho. I build products that are purposeful, precise, and people-first.',
    JPN: 'Subitt LLC 共同創業者 / COO・CTO。ブリガムヤング大学アイダホ校にてComputer Science学士号・Finance副専攻取得。目的を持ち、精密に、人を中心としたプロダクトを作ります。',
  },
  cta: {
    primary:   { EN: 'View my work',  JPN: '実績を見る' },
    secondary: { EN: 'Get in touch',  JPN: 'お問い合わせ' },
  },
  scroll: {
    EN:  'scroll',
    JPN: 'スクロール',
  },
} as const;

// ─── Animation variants ───────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const fadeIn: Variants = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.9, ease: 'easeOut' },
  },
};

// ─── Component ────────────────────────────────────────
export default function Hero() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className={styles.hero} aria-label="Hero">

      {/* ── Ambient fog blobs ── */}
      <div className={styles.hero__fog} aria-hidden="true">
        <div className={styles['hero__fog--blob1']} />
        <div className={styles['hero__fog--blob2']} />
        <div className={styles['hero__fog--blob3']} />
      </div>

      {/* ── Dot grid ── */}
      <div className={styles.hero__grid} aria-hidden="true" />

      {/* ── Main content ── */}
      <div className={styles.hero__inner}>
        <motion.div
          className={styles.hero__content}
          variants={shouldReduceMotion ? {} : containerVariants}
          initial="hidden"
          animate="visible"
        >

          {/* Eyebrow status pill */}
          <motion.div variants={fadeUp} className={styles.hero__eyebrow}>
            <span className={styles.hero__status} />
            {HERO_COPY.eyebrow[language]}
          </motion.div>

          {/* Name */}
          <motion.h1 variants={fadeUp} className={styles.hero__name}>
            {HERO_COPY.name[language]}
          </motion.h1>

          {/* Role / title line */}
          <motion.p variants={fadeUp} className={styles.hero__title}>
            {HERO_COPY.title[language]}
          </motion.p>

          {/* Description */}
          <motion.p variants={fadeUp} className={styles.hero__description}>
            {HERO_COPY.description[language]}
          </motion.p>

          {/* CTAs */}
          <motion.div variants={fadeUp} className={styles.hero__ctas}>
            <button
              className={styles['hero__cta--primary']}
              onClick={() => handleScrollTo('projects')}
            >
              {HERO_COPY.cta.primary[language]}
            </button>
            <button
              className={styles['hero__cta--secondary']}
              onClick={() => handleScrollTo('contact')}
            >
              {HERO_COPY.cta.secondary[language]}
            </button>
          </motion.div>

          {/* Tech tags */}
          <motion.div variants={fadeIn} className={styles.hero__tags}>
            {['Next.js', 'TypeScript', 'React', 'Node.js', 'Python'].map((tag) => (
              <span key={tag} className={styles.hero__tag}>
                {tag}
              </span>
            ))}
          </motion.div>

        </motion.div>

        {/* ── Floating glass card ── */}
        <motion.div
          className={styles.hero__card}
          variants={shouldReduceMotion ? {} : fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.6 }}
        >
          <div className={styles.hero__card_row}>
            <span className={styles.hero__card_label}>Role</span>
            <span className={styles.hero__card_value}>COO / CTO</span>
          </div>
          <div className={styles.hero__card_divider} />
          <div className={styles.hero__card_row}>
            <span className={styles.hero__card_label}>Company</span>
            <span className={styles.hero__card_value}>Subitt LLC | Grid LLC</span>
          </div>
          <div className={styles.hero__card_divider} />
          <div className={styles.hero__card_row}>
            <span className={styles.hero__card_label}>Education</span>
            <span className={styles.hero__card_value}>BYU-Idaho</span>
          </div>
          <div className={styles.hero__card_divider} />
          <div className={styles.hero__card_row}>
            <span className={styles.hero__card_label}>Degree</span>
            <span className={styles.hero__card_value}>CS + Finance</span>
          </div>
          <div className={styles.hero__card_divider} />
          <div className={styles.hero__card_row}>
            <span className={styles.hero__card_label}>Based in</span>
            <span className={styles.hero__card_value}>Utah, USA</span>
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className={styles.hero__scroll}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        aria-hidden="true"
      >
        <motion.span
          className={styles.hero__scroll_line}
          animate={{ scaleY: [0, 1, 0], originY: 0 }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />
        <span className={styles.hero__scroll_label}>
          {HERO_COPY.scroll[language]}
        </span>
      </motion.div>

    </section>
  );
}