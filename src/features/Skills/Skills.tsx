'use client'

import { useLanguage } from '@/contexts/languageCtx'
import { motion, type Variants } from 'framer-motion'
import type { IconType } from 'react-icons'
import {
  PiBrain, PiChartLineUp, PiCloud, PiCode, PiDatabase, PiFlowArrow, PiListChecks,
  PiMagnifyingGlass, PiSparkle, PiTerminalWindow, PiTranslate, PiUsersThree,
} from 'react-icons/pi'
import styles from './skills.module.scss'

// ─── Types ────────────────────────────────────────────
type Lang = 'EN' | 'JPN'

interface Skill {
  name: string
  level?: 'core' | 'proficient' | 'familiar' // controls visual weight
}

interface SkillCategory {
  id: string
  Icon: IconType
  featured?: boolean  // core-strength category: indigo-tinted card + label
  label: { EN: string; JPN: string }
  description: { EN: string; JPN: string }
  skills: Skill[]
}

// ─── Data ─────────────────────────────────────────────
// Ordered by relevance to current work: delivery (core strength) first, then AI, then build stack.
// Within a category, core skills lead.
const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'process',
    Icon: PiListChecks,
    featured: true,
    label:       { EN: 'Process & Delivery',    JPN: 'プロセス・デリバリー' },
    description: { EN: 'Shipping reliably, from requirements to release', JPN: '要件定義からリリースまで、確実に届ける' },
    skills: [
      { name: 'SDLC design & modernization',        level: 'core' },
      { name: 'Quality Assurance & test planning',  level: 'core' },
      { name: 'Requirements discovery',             level: 'core' },
      { name: 'Agile / Scrum',                      level: 'core' },
      { name: 'Sprint Planning',                    level: 'core' },
      { name: 'Product Roadmapping',                level: 'core' },
      { name: 'AI governance & risk review',        level: 'proficient' },
      { name: 'Stakeholder workshops & executive presentations', level: 'proficient' },
      { name: 'Technical documentation',            level: 'proficient' },
    ],
  },
  {
    id: 'ai-tools',
    Icon: PiSparkle,
    label:       { EN: 'AI Tools & Platforms',  JPN: 'AIツール・プラットフォーム' },
    description: { EN: 'Models, assistants, and agent platforms I build on', JPN: '開発に使うモデル・アシスタント・エージェント基盤' },
    skills: [
      { name: 'Claude / Claude API',         level: 'core' },
      { name: 'Amazon Quick',                level: 'core' },
      { name: 'Amazon Bedrock',              level: 'proficient' },
      { name: 'ChatGPT / GPT API',           level: 'proficient' },
      { name: 'MCP (Model Context Protocol)', level: 'proficient' },
      { name: 'Microsoft Copilot',           level: 'proficient' },
      { name: 'Copilot Studio',              level: 'proficient' },
      { name: 'AWS AgentCore',               level: 'familiar' },
      { name: 'Atlassian Rovo',              level: 'familiar' },
    ],
  },
  {
    id: 'ai-engineering',
    Icon: PiBrain,
    label:       { EN: 'AI Engineering',        JPN: 'AIエンジニアリング' },
    description: { EN: 'Designing agents that are useful, grounded, and governed', JPN: '実用的で根拠があり、統制されたエージェント設計' },
    skills: [
      { name: 'Agent architecture',                 level: 'core' },
      { name: 'Prompt & instruction design',        level: 'core' },
      { name: 'Human-in-the-loop design',           level: 'core' },
      { name: 'Retrieval-grounded (RAG) agents',    level: 'proficient' },
      { name: 'Agent tools & actions',              level: 'proficient' },
      { name: 'AI evaluation & accuracy controls',  level: 'proficient' },
      { name: 'AI cost & licensing analysis',       level: 'proficient' },
      { name: 'AI adoption strategy',               level: 'proficient' },
    ],
  },
  {
    id: 'software',
    Icon: PiTerminalWindow,
    label:       { EN: 'Software Development',  JPN: 'ソフトウェア開発' },
    description: { EN: 'Languages, backend frameworks, and tooling', JPN: '言語・バックエンド・開発ツール' },
    skills: [
      { name: 'Node.js',             level: 'core' },
      { name: 'Python',              level: 'proficient' },
      { name: 'C# / .NET',           level: 'proficient' },
      { name: 'Razor',               level: 'proficient' },
      { name: 'Ruby on Rails',       level: 'proficient' },
      { name: 'C++',                 level: 'proficient' },
      { name: 'API integration',     level: 'proficient' },
      { name: 'Playwright',          level: 'proficient' },
      { name: 'Git',                 level: 'proficient' },
      { name: 'CI/CD',               level: 'proficient' },
      { name: 'Docker',              level: 'familiar' },
    ],
  },
  {
    id: 'frontend',
    Icon: PiCode,
    label:       { EN: 'Frontend',              JPN: 'フロントエンド' },
    description: { EN: 'UI layer, from markup to interactive experiences', JPN: 'マークアップからインタラクティブな体験まで' },
    skills: [
      { name: 'HTML',         level: 'core' },
      { name: 'CSS',          level: 'core' },
      { name: 'Sass',         level: 'core' },
      { name: 'JavaScript',   level: 'core' },
      { name: 'TypeScript',   level: 'core' },
      { name: 'React.js',     level: 'core' },
      { name: 'Next.js',      level: 'core' },
      { name: 'Front-end prototyping', level: 'proficient' },
      { name: 'React Native', level: 'proficient' },
      { name: 'Expo',         level: 'proficient' },
      { name: 'MapBox',       level: 'proficient' },
      { name: 'p5.js',        level: 'familiar' },
      { name: 'Spline 3D',    level: 'familiar' },
    ],
  },
  {
    id: 'cloud',
    Icon: PiCloud,
    label:       { EN: 'Cloud',                 JPN: 'クラウド' },
    description: { EN: 'AWS services, plus the platforms I ship side projects on', JPN: 'AWSと個人開発で使うプラットフォーム' },
    skills: [
      { name: 'AWS Lambda',           level: 'core' },
      { name: 'Firebase',             level: 'core' },
      { name: 'API Gateway',          level: 'proficient' },
      { name: 'Amazon S3',            level: 'proficient' },
      { name: 'IAM',                  level: 'proficient' },
      { name: 'SSM Parameter Store',  level: 'proficient' },
      { name: 'CloudFormation',       level: 'proficient' },
      { name: 'Amazon Athena',        level: 'proficient' },
      { name: 'AWS Glue',             level: 'proficient' },
      { name: 'Amazon QuickSight',    level: 'proficient' },
      { name: 'VPC / Security Groups', level: 'familiar' },
      { name: 'Supabase',             level: 'familiar' },
      { name: 'Cloudflare',           level: 'familiar' },
      { name: 'Heroku',               level: 'familiar' },
    ],
  },
  {
    id: 'data',
    Icon: PiDatabase,
    label:       { EN: 'Data Engineering & Analytics', JPN: 'データエンジニアリング・分析' },
    description: { EN: 'Warehouses, pipelines, and the metrics on top', JPN: 'データ基盤・パイプライン・指標設計' },
    skills: [
      { name: 'SQL Server',                    level: 'core' },
      { name: 'Stored procedures',             level: 'proficient' },
      { name: 'SSMS',                          level: 'proficient' },
      { name: 'SSIS',                          level: 'proficient' },
      { name: 'ETL',                           level: 'proficient' },
      { name: 'Data Warehouse (star schema)',  level: 'proficient' },
      { name: 'Postgres',                      level: 'proficient' },
      { name: 'Customer segmentation',         level: 'proficient' },
      { name: 'Dashboards & business metrics', level: 'proficient' },
      { name: 'SAP',                           level: 'familiar' },
    ],
  },
  {
    id: 'automation',
    Icon: PiFlowArrow,
    label:       { EN: 'Automation & Integration', JPN: '自動化・システム連携' },
    description: { EN: 'Connecting systems so work moves without hand-offs', JPN: '手作業の受け渡しをなくすシステム連携' },
    skills: [
      { name: 'Power Automate',      level: 'core' },
      { name: 'n8n',                 level: 'proficient' },
      { name: 'SharePoint',          level: 'proficient' },
      { name: 'Microsoft Teams',     level: 'proficient' },
      { name: 'Jira',                level: 'proficient' },
      { name: 'Confluence',          level: 'proficient' },
      { name: 'REST APIs',           level: 'proficient' },
      { name: 'Webhooks',            level: 'proficient' },
      { name: 'Approval workflows',  level: 'proficient' },
      { name: 'Customer.io API',     level: 'proficient' },
      { name: 'Airtable',            level: 'proficient' },
    ],
  },
  {
    id: 'discoverability',
    Icon: PiMagnifyingGlass,
    label:       { EN: 'Web & Discoverability', JPN: 'Web・検索最適化' },
    description: { EN: 'Making content findable by search engines and AI', JPN: '検索エンジンとAIに見つけてもらうための設計' },
    skills: [
      { name: 'Technical SEO',                        level: 'proficient' },
      { name: 'GEO (Generative Engine Optimization)', level: 'proficient' },
      { name: 'Structured data / Schema markup',      level: 'proficient' },
      { name: 'Metadata & content architecture',      level: 'proficient' },
    ],
  },
  {
    id: 'business',
    Icon: PiChartLineUp,
    label:       { EN: 'Business & Finance',     JPN: 'ビジネス・ファイナンス' },
    description: { EN: 'Financial analysis and spreadsheet tooling', JPN: '財務分析・表計算ツール' },
    skills: [
      { name: 'Balance Sheet',        level: 'proficient' },
      { name: 'Excel Macro',          level: 'proficient' },
    ],
  },
  {
    id: 'soft',
    Icon: PiUsersThree,
    label:       { EN: 'Soft Skills',            JPN: 'ソフトスキル' },
    description: { EN: 'Interview-validated strengths from real-world leadership', JPN: '面接・実務で評価されたリーダーシップ能力' },
    skills: [
      { name: 'Logical Thinking', level: 'core' },
      { name: 'Problem Solving',  level: 'core' },
      { name: 'Leadership',       level: 'core' },
      { name: 'Team Management',  level: 'core' },
      { name: 'Cross-cultural Communication', level: 'proficient' },
      { name: 'Mentoring',        level: 'proficient' },
    ],
  },
  {
    id: 'languages',
    Icon: PiTranslate,
    label:       { EN: 'Languages',              JPN: '言語' },
    description: { EN: 'Human languages that bridge cultures and contexts', JPN: '文化と文脈をつなぐ言語力' },
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

// Legend for tag weights
const LEVEL_LEGEND: { level: NonNullable<Skill['level']>; label: { EN: string; JPN: string } }[] = [
  { level: 'core',       label: { EN: 'Core',       JPN: '得意' } },
  { level: 'proficient', label: { EN: 'Proficient', JPN: '実務経験あり' } },
  { level: 'familiar',   label: { EN: 'Familiar',   JPN: '使用経験あり' } },
]

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
      className={[
        styles.category,
        category.featured ? styles['category--featured'] : '',
      ].filter(Boolean).join(' ')}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: (index % 3) * 0.07 }} // stagger across columns only
    >
      {/* Card header */}
      <div className={styles.category__header}>
        <span className={styles.category__icon} aria-hidden="true">
          <category.Icon size={20} />
        </span>
        <div>
          <h3 className={styles.category__title}>
            {category.label[lang]}
            {category.featured && (
              <span className={styles.category__badge}>
                {lang === 'EN' ? 'Core strength' : 'コア領域'}
              </span>
            )}
          </h3>
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


      <div className={styles.skills__inner}>

        {/* Section title */}
        <motion.div
          className={styles.skills__title_block}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className={styles.skills__heading}>
            {language === 'EN' ? 'What I Work With' : '得意なこと'}
          </h2>
          <p className={styles.skills__subheading}>
            {language === 'EN'
              ? 'From SDLC and AI agents to cloud infrastructure and pixel-level CSS.'
              : 'SDLCやAIエージェントから、クラウドインフラ、CSSの細部まで幅広くカバーします。'}
          </p>
          {/* Explains the three tag weights used below */}
          <ul className={styles.skills__legend}>
            {LEVEL_LEGEND.map((item) => (
              <li key={item.level} className={styles.skills__legend_item}>
                <span className={`${styles.skill} ${styles[`skill--${item.level}`]}`}>
                  {item.label[language]}
                </span>
              </li>
            ))}
          </ul>
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