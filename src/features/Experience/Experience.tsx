'use client'

import { useLanguage } from '@/contexts/languageCtx'
import { motion, type Variants } from 'framer-motion'
import Image from 'next/image'
import styles from './experience.module.scss'

// ─── Types ────────────────────────────────────────────
type Lang = 'EN' | 'JPN'

interface ExperienceItem {
  id: string
  role:     { EN: string; JPN: string }
  company:  { EN: string; JPN: string }
  period:   { EN: string; JPN: string }
  type:     { EN: string; JPN: string }
  bullets:  { EN: string[]; JPN: string[] }
  tags:     string[]
  images?:  { src: string; alt: string }[]
  award?:   { EN: string; JPN: string }
  highlight?: boolean  // draws extra attention (founder roles)
  upcoming?: boolean   // "coming soon" treatment
}

// ─── Data ─────────────────────────────────────────────
const EXPERIENCES: ExperienceItem[] = [
    {
    id: 'SiteSniper',
    role:    { EN: 'Builder',                   JPN: '開発者' },
    company: { EN: 'SiteSniper',                JPN: 'SiteSniper' },
    period:  { EN: '2026',                      JPN: '2026年' },
    type:    { EN: 'Hackathon Project',         JPN: 'ハッカソンプロジェクト' },
    highlight: true,
    award: {
      EN:  '🏆 The Operator Award — Podium AI Hackathon 2026',
      JPN: '🏆 オペレーター賞 — Podium AIハッカソン 2026',
    },
    images: [
      { src: '/images/Operator.png', alt: 'SiteSniper — automated LP refactoring pipeline' },
    ],
    bullets: {
      EN: [
        'Built a fully automated website refactoring sales pipeline — zero human touchpoints from discovery to outreach.',
        'The system scrapes target websites, assesses design and copy quality, analyzes the data with AI, builds a brand-new landing page, deploys it live, then sends a cold email to the business owner — all autonomously via n8n.',
        'Leveraged Claude API for intelligent quality assessment and content generation, with n8n orchestrating the end-to-end workflow across scraping, building, deployment, and email delivery.',
      ],
      JPN: [
        'ウェブサイトのリファクタリング営業を完全自動化したパイプラインを構築。発見からアウトリーチまで人の介入ゼロ。',
        'ターゲットサイトをスクレイピングし、デザイン・コピーの品質を評価、AIで分析、新しいLPを生成・デプロイし、事業者へコールドメールを自動送信。n8nで全フローをオーケストレーション。',
        'Claude APIで品質評価とコンテンツ生成を担い、n8nがスクレイピング・ビルド・デプロイ・メール送信のエンドツーエンドワークフローを統括。',
      ],
    },
    tags: ['Hackathon', 'Claude API', 'n8n', 'Next.js', 'Automation'],
  },
  {
    id: 'orbit',
    role:    { EN: 'Solo Development',                JPN: '個人開発' },
    company: { EN: 'Orbit',                        JPN: 'Orbit' },
    period:  { EN: 'Feb 2026 - Present',                  JPN: '2026年2月 - 現在' },
    type:    { EN: 'Personal Project · AI learning',     JPN: '個人のプロジェクト・AI学習' },
    upcoming: false,
    bullets: {
      EN: [
        'Orbit is a cognitive engine that transforms founder intuition into structured, evidence-backed decisions before a single line of code is written.',
        'It maps assumptions, forces systematic validation, and blocks execution until the evidence exists — replacing the illusion of progress with real learning velocity.',
        "Orbit helps founders move faster by helping them move in the right direction."
      ],
      JPN: [
        'Orbitは、コードを一行も書く前に、ファウンダーの直感を構造化された証拠に基づく意思決定へと変換する認知エンジンです。',
        '仮説を可視化し、体系的な検証を強制し、証拠が存在するまで実行をブロックすることで、進捗の幻想を真の学習速度へと置き換えます。',
        'Orbitはファウンダーを正しい方向へ動かし、速く動かすためのツールです。'
      ],
    },
    tags: ['Validation', 'Founder Tools', 'Claude Sonnet, Haiku'],
  },
    {
    id: 'grid',
    role:    { EN: 'Co-Founder & CTO',         JPN: '共同創業者・CTO' },
    company: { EN: 'Grid',                   JPN: 'Grid' },
    period:  { EN: 'May 2025 – Present',     JPN: '2025年5月 – 現在' },
    type:    { EN: 'Startup · Full-time',    JPN: 'スタートアップ・フルタイム' },
    highlight: true,
    bullets: {
      EN: [
        'Founded a 3D print business and developed an AI chatbot to conceptualize exactly what customers want — then build and ship it directly to them.',
        'Identified demand from other business owners wanting the chatbot, so rebuilt it as a dynamic, objective-driven, shareable AI chatbot platform.',
        'Built a network of 3D modelers across the US to collaborate on personalized items — partnering with other 3D print services nationwide to utilize their free machine time and reduce shipping costs for customers.',
      ],
      JPN: [
        '3Dプリントビジネスを創業し、顧客の要望を具現化するAIチャットボットを開発。注文から製造・発送まで一貫して対応。',
        '他の事業者からチャットボットの需要を確認し、目的設定・共有可能なダイナミックAIチャットボットプラットフォームとして再構築。',
        '全米の3Dモデラーとネットワークを構築し、パーソナライズされた商品を共同制作。他の3Dプリントサービスと提携し、遊休機械時間を活用しながら顧客の送料コストを削減する仕組みを構築。',
      ],
    },
    tags: ['Next.js',  'AI/LLM', 'Firebase', '3D Printing', 'Product', 'Stripe',],
  },
  {
    id: 'subitt',
    role:    { EN: 'Co-founder · COO / CTO',     JPN: '共同創業者・COO / CTO' },
    company: { EN: 'Subitt LLC',                  JPN: 'Subitt LLC' },
    period:  { EN: 'Oct 2022 – Apr 2025',         JPN: '2022年10月 – 2025年4月' },
    type:    { EN: 'Startup · Full-time',          JPN: 'スタートアップ・フルタイム' },
    highlight: true,
    award: {
      EN:  '🏆 International Entrepreneurship Challenge (IEC) Winner 2024',
      JPN: '🏆 国際アントレプレナーシップチャレンジ (IEC) 優勝 2024',
    },
    images: [
      { src: '/images/Team.jpg',   alt: 'Subitt team' },
      { src: '/images/winDay.JPG', alt: 'Subitt win day' },
    ],
    bullets: {
      EN: [
        'Co-founded a subscription management platform helping small businesses build repeatable revenue and customer loyalty through simple, scalable tools.',
        'Managed 100+ interns and developers across 10 countries, leading all engineering workflows using Agile methodology.',
        'Owned the full technical stack as CTO — architecture, sprint planning, code reviews, and product roadmap — while operating as COO to align business and engineering goals.',
      ],
      JPN: [
        '中小企業が定期収益と顧客ロイヤルティを構築できるサブスクリプション管理プラットフォームを共同創業。シンプルかつスケーラブルなツールを提供。',
        '10カ国100名以上のインターン・エンジニアをマネジメント。Agileメソッドを用いて全エンジニアリングワークフローを統括。',
        'CTOとして全技術スタックを担当（アーキテクチャ・スプリント計画・コードレビュー・プロダクトロードマップ）し、COOとしてビジネスと開発の整合を図った。',
      ],
    },
    tags: ['React', 'Node.js', 'Agile', 'Leadership', 'TypeScript', 'MapBox'],
  },
  {
    id: 'ta-cs',
    role:    { EN: 'Teaching Assistant — CS Data Structures', JPN: 'ティーチングアシスタント — CSデータ構造' },
    company: { EN: 'BYU-Idaho',                               JPN: 'ブリガムヤング大学アイダホ校' },
    period:  { EN: 'Sep 2022 – March 2023',                     JPN: '2022年9月 – 2023年3月' },
    type:    { EN: 'Part-time · Academic',                    JPN: 'パートタイム・学術' },
    bullets: {
      EN: [
        'Supported students in understanding core data structures including arrays, linked lists, trees, and graphs.',
        'Held office hours, graded assignments, and provided targeted feedback to improve student comprehension and performance.',
      ],
      JPN: [
        '配列・連結リスト・ツリー・グラフなどの主要データ構造の理解をサポート。',
        'オフィスアワーの実施・課題採点・フィードバック提供を通じ、学生の理解力と成績向上に貢献。',
      ],
    },
    tags: ['Python', 'Data Structures', 'Mentoring'],
  },
  {
    id: 'ta-en',
    role:    { EN: 'Teaching Assistant — English',  JPN: 'ティーチングアシスタント — 英語' },
    company: { EN: 'BYU-Idaho',                      JPN: 'ブリガムヤング大学アイダホ校' },
    period:  { EN: 'Sep 2021 – Sep 2022',            JPN: '2021年9月 – 2022年9月' },
    type:    { EN: 'Part-time · Academic',           JPN: 'パートタイム・学術' },
    bullets: {
      EN: [
        'Assisted international and domestic students with English writing, grammar, and academic composition.',
        'Provided one-on-one tutoring sessions and detailed written feedback on essays and assignments.',
      ],
      JPN: [
        '国内外の学生に英語ライティング・文法・学術作文を指導。',
        '個別チュータリングセッションと詳細なフィードバックを通じて学生の英語力向上を支援。',
      ],
    },
    tags: ['Communication', 'Tutoring', 'English'],
  },
]

// ─── Animation variants ───────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const lineGrow: Variants = {
  hidden:  { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.2, ease: 'easeOut' },
  },
}

// ─── Card component ───────────────────────────────────
function ExperienceCard({ item, lang }: { item: ExperienceItem; lang: Lang }) {
  return (
    <motion.div
      className={[
        styles.card,
        item.highlight ? styles['card--highlight'] : '',
        item.upcoming  ? styles['card--upcoming']  : '',
      ].filter(Boolean).join(' ')}
      variants={fadeUp}
    >
      {/* Header row */}
      <div className={styles.card__header}>
        <div className={styles.card__meta}>
          <span className={styles.card__company}>{item.company[lang]}</span>
          <span className={styles.card__type}>{item.type[lang]}</span>
        </div>
        <span className={styles.card__period}>{item.period[lang]}</span>
      </div>

      <h3 className={styles.card__role}>{item.role[lang]}</h3>

      {/* Award badge — shown when item has an award */}
      {item.award && (
        <div className={styles.card__award}>
          {item.award[lang]}
        </div>
      )}

      {/* Images */}
      {item.images && (
        <div className={styles.card__images}>
          {item.images.map((img) => (
            <div key={img.src} className={styles.card__image_frame}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 767px) 45vw, 200px"
                className={styles.card__image_img}
              />
            </div>
          ))}
        </div>
      )}

      {/* Bullets */}
      <ul className={styles.card__bullets}>
        {item.bullets[lang].map((b, i) => (
          <li key={i} className={[
            styles.card__bullet,
            item.upcoming ? styles['card__bullet--quote'] : '',
          ].filter(Boolean).join(' ')}>
            {b}
          </li>
        ))}
      </ul>

      {/* Tags */}
      <div className={styles.card__tags}>
        {item.tags.map((tag) => (
          <span key={tag} className={styles.card__tag}>{tag}</span>
        ))}
      </div>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────
export default function Experience() {
  const { language } = useLanguage()

  return (
    <section id="experience" className={styles.experience}>

      {/* Background fog blobs */}
      <div className={styles.experience__fog1} aria-hidden="true" />
      <div className={styles.experience__fog2} aria-hidden="true" />

      <div className={styles.experience__inner}>

        {/* Section title */}
        <motion.div
          className={styles.experience__title_block}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <span className={styles.experience__eyebrow}>
            {language === 'EN' ? 'Experience' : '経歴'}
          </span>
          <h2 className={styles.experience__heading}>
            {language === 'EN' ? 'Where I\'ve Been' : 'これまでの歩み'}
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className={styles.timeline}>

          {/* Growing vertical line */}
          <motion.div
            className={styles.timeline__line}
            variants={lineGrow}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ originY: 0 }}
          />

          {/* Cards */}
          <motion.div
            className={styles.timeline__items}
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {EXPERIENCES.map((item) => (
              <div key={item.id} className={styles.timeline__item}>
                {/* Dot on the line */}
                <div className={[
                  styles.timeline__dot,
                  item.highlight ? styles['timeline__dot--highlight'] : '',
                  item.upcoming  ? styles['timeline__dot--upcoming']  : '',
                ].filter(Boolean).join(' ')} />
                <ExperienceCard item={item} lang={language} />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}