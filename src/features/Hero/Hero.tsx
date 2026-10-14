'use client';

// ═══════════════════════════════════════════════════════
// HERO — landing view
// Interactive layer: DotField (cursor repel + click ripple),
// KineticName (letter wave), TiltCard, MagneticButton.
// Easter egg: triple-click/tap the name or enter the Konami code.
// ═══════════════════════════════════════════════════════
import { useCallback, useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/contexts/languageCtx';
import { AnimatePresence, MotionConfig, motion, useReducedMotion, type Variants } from 'framer-motion';
import { PiArrowDown } from 'react-icons/pi';
import DotField, { type DotFieldHandle } from './DotField';
import KineticName from './KineticName';
import MagneticButton from './MagneticButton';
import TiltCard from './TiltCard';
import { useFinePointer } from './useFinePointer';
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
    EN:  'Co-founder & CTO of Grid. Previously co-founded Subitt. I build products that are purposeful, precise, and people-first.',
    JPN: 'Grid 共同創業者・CTO。以前はSubittを共同創業。目的を持ち、精密に、人を中心としたプロダクトを作ります。',
  },
  cta: {
    primary:   { EN: 'View my work',  JPN: '実績を見る' },
    secondary: { EN: 'Get in touch',  JPN: 'お問い合わせ' },
  },
  // Easter egg: shown while the dot field spells its message
  secret: {
    EN:  'You found it. Thanks for poking around!',
    JPN: '見つけましたね。遊んでくれてありがとう！',
  },
  // Right-hand info card
  facts: [
    { label: { EN: 'Role',      JPN: '役職' }, value: { EN: 'Co-Founder & CTO', JPN: '共同創業者・CTO' } },
    { label: { EN: 'Company',   JPN: '会社' }, value: { EN: 'Grid',             JPN: 'Grid' } },
    { label: { EN: 'Education', JPN: '学歴' }, value: { EN: 'BYU-Idaho',        JPN: 'BYU-Idaho' } },
    { label: { EN: 'Degree',    JPN: '専攻' }, value: { EN: 'CS + Finance',     JPN: 'CS + Finance' } },
    { label: { EN: 'Based in',  JPN: '拠点' }, value: { EN: 'Utah, USA',        JPN: '米国ユタ州' } },
  ],
} as const;

const SECRET_DURATION = 3600; // ms the message stays on screen
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

// ─── Animation variants ───────────────────────────────
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 24, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
  },
};

// ─── Component ────────────────────────────────────────
export default function Hero() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion() ?? false;
  const isFinePointer = useFinePointer();
  const fieldRef = useRef<DotFieldHandle>(null);
  const [secretActive, setSecretActive] = useState(false);
  const secretActiveRef = useRef(false);

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  // ── Easter egg ──
  const triggerSecret = useCallback(() => {
    if (secretActiveRef.current) return;
    const field = fieldRef.current;
    if (!field) return;
    // Narrow screens get a shorter word so it stays legible on the dot grid
    const word = window.innerWidth < 768 ? 'HI' : 'HELLO';
    field.showMessage(word, SECRET_DURATION);
    field.ripple(window.innerWidth / 2, window.innerHeight / 2);
    secretActiveRef.current = true;
    setSecretActive(true);
    window.setTimeout(() => {
      secretActiveRef.current = false;
      setSecretActive(false);
    }, SECRET_DURATION);
  }, []);

  // A hint for curious devs who open the console
  useEffect(() => {
    console.log('%c👋 Hey, curious dev. Try triple-clicking my name.', 'color:#6366F1;font-weight:600');
  }, []);

  // Konami code (keyboard users)
  useEffect(() => {
    let progress = 0;
    const handleKey = (e: KeyboardEvent) => {
      const expected = KONAMI[progress];
      progress = e.key.toLowerCase() === expected.toLowerCase() ? progress + 1 : (e.key === KONAMI[0] ? 1 : 0);
      if (progress === KONAMI.length) {
        progress = 0;
        triggerSecret();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [triggerSecret]);

  // Click / tap anywhere on the hero background sends a ripple
  const handlePointerDown = (e: React.PointerEvent<HTMLElement>) => {
    fieldRef.current?.ripple(e.clientX, e.clientY);
  };

  // MotionConfig "user": entrance variants always run (so SSR and client agree),
  // but framer drops the transform part for reduced-motion users; opacity still fades.
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="hero"
        className={[styles.hero, secretActive ? styles['hero--secret'] : ''].filter(Boolean).join(' ')}
        aria-label="Hero"
        onPointerDown={handlePointerDown}
      >

        {/* ── Ambient fog blobs ── */}
        <div className={styles.hero__fog} aria-hidden="true">
          <div className={styles['hero__fog--blob1']} />
          <div className={styles['hero__fog--blob2']} />
          <div className={styles['hero__fog--blob3']} />
        </div>

        {/* ── Interactive dot field ── */}
        <DotField ref={fieldRef} reduceMotion={shouldReduceMotion} />

        {/* ── Main content ── */}
        <div className={styles.hero__inner}>
          <motion.div
            className={styles.hero__content}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >

            {/* Eyebrow status pill */}
            <motion.div variants={fadeUp} className={styles.hero__eyebrow}>
              <span className={styles.hero__status} />
              {HERO_COPY.eyebrow[language]}
            </motion.div>

            {/* Name: letters react to the cursor; triple click = easter egg */}
            <KineticName
              key={language}
              text={HERO_COPY.name[language]}
              reduceMotion={shouldReduceMotion}
              onSecret={triggerSecret}
            />

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
              <MagneticButton
                className={styles['hero__cta--primary']}
                enabled={isFinePointer && !shouldReduceMotion}
                onClick={() => handleScrollTo('projects')}
              >
                {HERO_COPY.cta.primary[language]}
                <span className={styles.hero__cta_icon} aria-hidden="true">
                  <PiArrowDown size={14} />
                </span>
              </MagneticButton>
              <button
                className={styles['hero__cta--secondary']}
                onClick={() => handleScrollTo('contact')}
              >
                {HERO_COPY.cta.secondary[language]}
              </button>
            </motion.div>

          </motion.div>

          {/* ── Info card: tilts toward the cursor ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
          >
            <TiltCard enabled={isFinePointer && !shouldReduceMotion}>
              {HERO_COPY.facts.map((fact, i) => (
                <div key={fact.label.EN}>
                  {i > 0 && <div className={styles.hero__card_divider} />}
                  <div className={styles.hero__card_row}>
                    <span className={styles.hero__card_label}>{fact.label[language]}</span>
                    <span className={styles.hero__card_value}>{fact.value[language]}</span>
                  </div>
                </div>
              ))}
            </TiltCard>
          </motion.div>
        </div>

        {/* ── Easter egg caption ── */}
        <div className={styles.hero__secret} aria-live="polite">
          <AnimatePresence>
            {secretActive && (
              <motion.p
                className={styles.hero__secret_text}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {HERO_COPY.secret[language]}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

      </section>
    </MotionConfig>
  );
}
