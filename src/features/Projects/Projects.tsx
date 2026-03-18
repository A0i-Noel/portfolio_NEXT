'use client'

import { useLanguage } from '@/contexts/languageCtx'
import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'
import styles from './projects.module.scss'

// ─── Types ────────────────────────────────────────────
type Lang = 'EN' | 'JPN'

type ProjectStatus =
  | 'live'        // has a working URL
  | 'unavailable' // built but not accessible (Subitt App)
  | 'in-progress' // actively being worked on
  | 'route-pending' // will have a subdomain route, not ready yet

interface Project {
  id: string
  title: string
  subtitle: { EN: string; JPN: string }
  description: { EN: string; JPN: string }
  thumbnail: string   // path in /public/images/
  tags: string[]
  status: ProjectStatus
  url?: string        // external live URL
  route?: string      // internal /projects/[slug] — omit if not ready
}

// ─── Data ─────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    id: 'subitt-web',
    title: 'Subitt',
    subtitle: { EN: 'Web Platform',          JPN: 'Webプラットフォーム' },
    description: {
      EN:  'Subscription management platform helping small businesses build repeatable revenue and customer loyalty through simple, customizable tools.',
      JPN: '中小企業が定期収益と顧客ロイヤルティを構築できる、シンプルでカスタマイズ可能なサブスクリプション管理プラットフォーム。',
    },
    thumbnail: '/images/subitt.jpg',
    tags: ['React', 'Next.js', 'Sass'],
    status: 'unavailable',
    url : "https://subitt.io/"
  },
  {
    id: 'subitt-app',
    title: 'Subitt',
    subtitle: { EN: 'Mobile App',            JPN: 'モバイルアプリ' },
    description: {
      EN:  'Native mobile companion to the Subitt platform — subscription management and customer engagement on the go.',
      JPN: 'Subittプラットフォームのネイティブモバイルアプリ。外出先でサブスクリプション管理と顧客エンゲージメントを実現。',
    },
    thumbnail: '/images/subitt.jpg',
    tags: ['React Native', 'Expo', 'MapBox'],
    status: 'unavailable',
  },
  {
    id: 'ibis',
    title: 'Ibis',
    subtitle: { EN: 'Landing Page',          JPN: 'ランディングページ' },
    description: {
      EN:  'A visually immersive landing page for an early-stage venture — built with 3D web elements and generative visuals. The business didn\'t take off, but the site still lives.',
      JPN: '3DウェブとジェネラティブビジュアルによるIbisのランディングページ。ビジネスは終了したが、サイトは現在も稼働中。',
    },
    thumbnail: '/images/Ibis.png',
    tags: ['Next.js', 'Spline 3D', 'p5.js'],
    status: 'live',
    url : "https://ibisdevices.com/"
  },
  {
    id: 'grid',
    title: 'Grid',
    subtitle: { EN: 'AI + 3D Print Platform', JPN: 'AI × 3Dプリントサービス' },
    description: {
      EN:  'AI chatbot that conceptualizes what customers want, connects with a nationwide network of 3D printers to manufacture it, and ships directly — minimizing cost and turnaround.',
      JPN: '顧客の要望を具現化するAIチャットボットで注文を受け付け、全米の3Dプリンターネットワークで製造・直送するプラットフォーム。コストとリードタイムを最小化。',
    },
    thumbnail: '/images/grid.png',
    tags: ['Next.js', 'Firebase', 'ChatGPT API'],
    status: 'live',
    url : "https://www.makewithgrid.com/"
  },
  {
  id: 'orbit',
  title: 'Orbit',
  subtitle: { EN: 'Founder cognition engine', JPN: '創業者向け認知エンジン' },
  description: {
    EN:  'Forces evidence-backed decisions before resources are committed — exposing blind spots, stress-testing assumptions, and accelerating how fast founders learn from reality. Orbit kills illusion, not ambition.',
    JPN: 'リソースを投入する前に、根拠ある意思決定を強制するツール。思い込みを検証し、ブラインドスポットを可視化することで、創業者が現実から学ぶ速度を上げる。錯覚を排除し、野心は守る。',
  },
  thumbnail: '/images/orbit.png',
  tags: ['Next.js', 'Supabase', 'Postgres', 'Claude API'],
  status: 'live',
  url: 'https://orbit-app-nu.vercel.app/',
},
]

// ─── Playground ───────────────────────────────────────
const PLAYGROUND: Project[] = [
  {
    id: 'art-gallery',
    title: 'Art Gallery',
    subtitle: { EN: 'Public Domain Art Gallery', JPN: 'パブリックアートギャラリー' },
    description: {
      EN: 'Displays public domain artwork organized by era — built as a playground to test Antigravity, a new framework I was curious about.',
      JPN: '時代別にパブリックドメインのアートを表示するアプリ。Antigravityというフレームワークを試すために作った実験作品。',
    },
    thumbnail: '/images/artGallery.png',
    tags: ['Next.js', 'Antigravity'],
    status: 'live',
    url: 'https://art-gallary-antigravity-test1.vercel.app/',
  },
]

// ─── Status config ────────────────────────────────────
const STATUS_CONFIG: Record<ProjectStatus, {
  label: { EN: string; JPN: string }
  dot: string   // CSS modifier class for dot color
}> = {
  'live': {
    label: { EN: 'Live',         JPN: '公開中' },
    dot: 'dot--green',
  },
  'unavailable': {
    label: { EN: 'Unavailable',  JPN: '利用不可' },
    dot: 'dot--grey',
  },
  'in-progress': {
    label: { EN: 'In Progress',  JPN: '開発中' },
    dot: 'dot--amber',
  },
  'route-pending': {
    label: { EN: 'Coming Soon',  JPN: '近日公開' },
    dot: 'dot--primary',
  },
}

// ─── Animation variants ───────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// ─── Project card ─────────────────────────────────────
function ProjectCard({ project, lang }: { project: Project; lang: Lang }) {
  const status = STATUS_CONFIG[project.status]
  const isUnavailable = project.status === 'unavailable'
  const hasLink = !!project.url || !!project.route
  const href = project.url ?? (project.route ? `/projects/${project.route}` : undefined)

  return (
    <motion.article
      className={[
        styles.card,
        isUnavailable ? styles['card--unavailable'] : '',
      ].filter(Boolean).join(' ')}
      variants={fadeUp}
    >
      {/* ── Thumbnail ── */}
      <div className={styles.card__thumb}>
        <Image
          src={project.thumbnail}
          alt={`${project.title} thumbnail`}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={styles.card__thumb_img}
        />

        {/* Overlay on unavailable */}
        {isUnavailable && (
          <div className={styles.card__thumb_overlay} aria-hidden="true">
            <span className={styles.card__thumb_msg}>
              {lang === 'EN' ? 'Not available for download' : 'ダウンロード不可'}
            </span>
          </div>
        )}

        {/* Status pill */}
        <div className={styles.card__status}>
          <span className={`${styles.dot} ${styles[status.dot]}`} />
          {status.label[lang]}
        </div>
      </div>

      {/* ── Body ── */}
      <div className={styles.card__body}>
        <div className={styles.card__title_row}>
          <div>
            <h3 className={styles.card__title}>{project.title}</h3>
            <span className={styles.card__subtitle}>{project.subtitle[lang]}</span>
          </div>

          {/* Link icon — only when there's an actual destination */}
          {hasLink && href && (
            <a
              href={href}
              target={project.url ? '_blank' : undefined}
              rel={project.url ? 'noopener noreferrer' : undefined}
              className={styles.card__link}
              aria-label={`View ${project.title}`}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3 13L13 3M13 3H7M13 3V9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          )}
        </div>

        <p className={styles.card__desc}>{project.description[lang]}</p>

        {/* Tags */}
        <div className={styles.card__tags}>
          {project.tags.map((tag) => (
            <span key={tag} className={styles.card__tag}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

// ─── Main component ───────────────────────────────────
export default function Projects() {
  const { language } = useLanguage()

  return (
    <section id="projects" className={styles.projects}>

      <div className={styles.projects__fog1} aria-hidden="true" />
      <div className={styles.projects__fog2} aria-hidden="true" />

      <div className={styles.projects__inner}>

        {/* Title */}
        <motion.div
          className={styles.projects__title_block}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className={styles.projects__eyebrow}>
            {language === 'EN' ? 'Projects' : 'プロジェクト'}
          </span>
          <h2 className={styles.projects__heading}>
            {language === 'EN' ? 'Things I\'ve Built' : '制作物'}
          </h2>
          <p className={styles.projects__subheading}>
            {language === 'EN'
              ? 'A mix of startups, experiments, and products — each one a real thing shipped into the world.'
              : 'スタートアップ、実験、プロダクト — すべて実際に世に出したものです。'}
          </p>
        </motion.div>

        {/* Card grid */}
        <motion.div
          className={styles.projects__grid}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              lang={language}
            />
          ))}
        </motion.div>

        {/* Playground divider */}
        <div className={styles.projects__playground_label}>
          <hr />
          <span>{language === 'EN' ? 'Playground' : '遊び場'}</span>
          <hr />
        </div>

        {/* Playground grid */}
        <motion.div
          className={styles.projects__playground_grid}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {PLAYGROUND.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              lang={language}
            />
          ))}
        </motion.div>

      </div>
    </section>
  )
}