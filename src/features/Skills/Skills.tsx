'use client'

import { useLanguage } from '@/contexts/languageCtx'
import { motion, type Variants } from 'framer-motion'
import styles from './skills.module.scss'

// ─── Types ────────────────────────────────────────────
type Lang = 'EN' | 'JPN'

interface Skill {
  name: string
  level?: 'core' | 'proficient' | 'familiar' // controls visual weight
}

interface SkillCategory {
  id: string
  icon: string
  label: { EN: string; JPN: string }
  description: { EN: string; JPN: string }
  skills: Skill[]
  accent: 'primary' | 'teal' | 'amber' | 'rose' | 'violet'
}

// ─── Data ─────────────────────────────────────────────
// Skills ordered: client → server → infra within each category
const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    icon: '⬡',
    label:       { EN: 'Frontend',              JPN: 'フロントエンド' },
    description: { EN: 'UI layer — from markup to interactive experiences', JPN: 'マークアップからインタラクティブな体験まで' },
    accent: 'primary',
    skills: [
      { name: 'HTML',         level: 'core' },
      { name: 'CSS',          level: 'core' },
      { name: 'Sass',         level: 'core' },
      { name: 'JavaScript',   level: 'core' },
      { name: 'TypeScript',   level: 'core' },
      { name: 'React.js',     level: 'core' },
      { name: 'Next.js',      level: 'core' },
      { name: 'React Native', level: 'proficient' },
      { name: 'Expo',         level: 'proficient' },
      { name: 'MapBox',       level: 'proficient' },
      { name: 'p5.js',        level: 'familiar' },
      { name: 'Spline 3D',    level: 'familiar' },
    ],
  },
  {
    id: 'backend',
    icon: '◈',
    label:       { EN: 'Backend & Cloud',        JPN: 'バックエンド・クラウド' },
    description: { EN: 'Server logic, databases, and deployment infrastructure', JPN: 'サーバーロジック・データベース・インフラ' },
    accent: 'teal',
    skills: [
      { name: 'Node.js',       level: 'core' },
      { name: 'Firebase',      level: 'core' },
      { name: 'chatGPT API',   level: 'core' },
      { name: "claude API",    level: 'proficient' },
      { name: 'Python',        level: 'proficient' },
      { name: 'Ruby on Rails', level: 'proficient' },
      { name: 'C#',            level: 'proficient' },
      { name: 'C++',           level: 'proficient' },
      { name: 'Postgres',      level: 'proficient' },
      { name: 'n8n',           level: 'proficient' },
      { name: 'Supabase',      level: 'familiar' },
      { name: 'Cloudflare',    level: 'familiar' },
      { name: 'Heroku',        level: 'familiar' },
    ],
  },
  {
    id: 'business',
    icon: '◎',
    label:       { EN: 'Business & Finance',     JPN: 'ビジネス・ファイナンス' },
    description: { EN: 'Startup operations, financial analysis, and process management', JPN: 'スタートアップ運営・財務分析・プロセス管理' },
    accent: 'amber',
    skills: [
      { name: 'Agile / Scrum',        level: 'core' },
      { name: 'Balance Sheet',        level: 'proficient' },
      { name: 'Excel Macro',          level: 'proficient' },
      { name: 'Product Roadmapping',  level: 'core' },
      { name: 'Sprint Planning',      level: 'core' },
    ],
  },
  {
    id: 'soft',
    icon: '◇',
    label:       { EN: 'Soft Skills',            JPN: 'ソフトスキル' },
    description: { EN: 'Interview-validated strengths from real-world leadership', JPN: '面接・実務で評価されたリーダーシップ能力' },
    accent: 'violet',
    skills: [
      { name: 'Logical Thinking', level: 'core' },
      { name: 'Problem Solving',  level: 'core' },
      { name: 'Leadership',       level: 'core' },
      { name: 'Cross-cultural Communication', level: 'proficient' },
      { name: 'Team Management',  level: 'core' },
      { name: 'Mentoring',        level: 'proficient' },
    ],
  },
  {
    id: 'languages',
    icon: '◉',
    label:       { EN: 'Languages',              JPN: '言語' },
    description: { EN: 'Human languages — bridging cultures and contexts', JPN: '文化と文脈をつなぐ言語力' },
    accent: 'rose',
    skills: [
      { name: 'Japanese',  level: 'core' },
      { name: 'English',   level: 'core' },
    ],
  },
]

// Extra labels for language proficiency
const LANG_NOTES: Record<string, { EN: string; JPN: string }> = {
  Japanese: { EN: 'Native',  JPN: 'ネイティブ' },
  English:  { EN: 'Fluent',  JPN: '流暢' },
}

// ─── Animation variants ───────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const staggerGrid: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const skillPop: Variants = {
  hidden:  { opacity: 0, scale: 0.88 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.35, ease: [0.34, 1.56, 0.64, 1] as const },
  },
}

// ─── Category card ────────────────────────────────────
function CategoryCard({
  category,
  lang,
  index,
}: {
  category: SkillCategory
  lang: Lang
  index: number
}) {
  return (
    <motion.div
      className={`${styles.category} ${styles[`category--${category.accent}`]}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.07 }}
    >
      {/* Card header */}
      <div className={styles.category__header}>
        <span className={styles.category__icon} aria-hidden="true">
          {category.icon}
        </span>
        <div>
          <h3 className={styles.category__title}>{category.label[lang]}</h3>
          <p className={styles.category__desc}>{category.description[lang]}</p>
        </div>
      </div>

      {/* Skill tags */}
      <motion.div
        className={styles.category__skills}
        variants={staggerGrid}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {category.skills.map((skill) => (
          <motion.span
            key={skill.name}
            className={`${styles.skill} ${styles[`skill--${skill.level}`]}`}
            variants={skillPop}
          >
            {skill.name}
            {/* Language proficiency note */}
            {LANG_NOTES[skill.name] && (
              <span className={styles.skill__note}>
                {LANG_NOTES[skill.name][lang]}
              </span>
            )}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────
export default function Skills() {
  const { language } = useLanguage()

  return (
    <section id="skills" className={styles.skills}>

      {/* Background fog */}
      <div className={styles.skills__fog1} aria-hidden="true" />
      <div className={styles.skills__fog2} aria-hidden="true" />

      <div className={styles.skills__inner}>

        {/* Section title */}
        <motion.div
          className={styles.skills__title_block}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className={styles.skills__eyebrow}>
            {language === 'EN' ? 'Skills' : 'スキル'}
          </span>
          <h2 className={styles.skills__heading}>
            {language === 'EN' ? 'What I Work With' : '得意なこと'}
          </h2>
          <p className={styles.skills__subheading}>
            {language === 'EN'
              ? 'From pixel-level CSS to cloud infrastructure — and everything in between.'
              : 'CSSの細部からクラウドインフラまで、幅広い領域をカバーします。'}
          </p>
        </motion.div>

        {/* Category grid */}
        <div className={styles.skills__grid}>
          {SKILL_CATEGORIES.map((category, i) => (
            <CategoryCard
              key={category.id}
              category={category}
              lang={language}
              index={i}
            />
          ))}
        </div>

      </div>
    </section>
  )
}