'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/languageCtx'
import { motion, type Variants } from 'framer-motion'
import { FaGithubSquare, FaInstagramSquare, FaLinkedin } from 'react-icons/fa'
import toast from 'react-hot-toast'
import emailjs from '@emailjs/browser'
import styles from './contact.module.scss'

// ─── Types ────────────────────────────────────────────
interface MailBody {
  company: string
  name:    string
  email:   string
  body:    string
}

// ─── Copy ─────────────────────────────────────────────
const COPY = {
  eyebrow:     { EN: 'Contact',          JPN: 'お問い合わせ' },
  heading:     { EN: "Let's Work Together", JPN: 'ご連絡ください' },
  subheading:  {
    EN:  "Have a project in mind, want to collaborate, or just want to say hello? I'd love to hear from you.",
    JPN: 'プロジェクトのご相談・コラボレーション・お気軽なご連絡、何でもお待ちしています。',
  },
  emailLabel:  { EN: 'Or reach me directly at', JPN: '直接メールでのご連絡はこちら' },
  fields: {
    company:     { EN: 'Company (Optional)',  JPN: '会社名（任意）' },
    companyPh:   { EN: 'Your company name',   JPN: '会社名' },
    name:        { EN: 'Your Name',           JPN: 'お名前' },
    namePh:      { EN: 'Full name',           JPN: 'お名前' },
    email:       { EN: 'Email Address',       JPN: 'メールアドレス' },
    emailPh:     { EN: 'you@example.com',     JPN: 'example@mail.com' },
    message:     { EN: 'Message',             JPN: 'メッセージ' },
    messagePh:   { EN: "What's on your mind?", JPN: 'お気軽にどうぞ' },
  },
  submit:      { EN: 'Send Message',    JPN: '送信する' },
  submitting:  { EN: 'Sending…',        JPN: '送信中…' },
  successMsg:  { EN: 'Message sent! I\'ll get back to you soon.', JPN: 'ありがとうございます！折り返しご連絡します。' },
  errorMsg:    { EN: 'Failed to send. Please try again.',         JPN: '送信に失敗しました。もう一度お試しください。' },
  validation: {
    required:  { EN: 'Please fill in all required fields.',       JPN: '必須項目をすべて入力してください。' },
    email:     { EN: 'Please enter a valid email address.',       JPN: '有効なメールアドレスを入力してください。' },
    config:    { EN: 'EmailJS configuration is missing.',        JPN: 'メール設定が見つかりません。' },
  },
} as const

// ─── Social links ─────────────────────────────────────
const SOCIALS = [
  {
    id:    'linkedin',
    label: 'LinkedIn',
    href:  'https://www.linkedin.com/in/aoi-kuriki-6aa160233/',
    Icon:  FaLinkedin,
  },
  {
    id:    'github',
    label: 'GitHub',
    href:  'https://github.com/A0i-Noel',
    Icon:  FaGithubSquare,
  },
  {
    id:    'instagram',
    label: 'Instagram',
    href:  'https://www.instagram.com/noel_glue/',
    Icon:  FaInstagramSquare,
  },
] as const

// ─── Animation variants ───────────────────────────────
const fadeUp: Variants = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

// ─── Component ────────────────────────────────────────
export default function Contact() {
  const { language } = useLanguage()

  const [mailBody, setMailBody] = useState<MailBody>({
    company: '',
    name:    '',
    email:   '',
    body:    '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState<keyof MailBody | null>(null)

  const SERVICE_ID  = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID
  const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
  const PUBLIC_KEY  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY

  const handleChange = (field: keyof MailBody, value: string) => {
    setMailBody(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const { name, email, body } = mailBody

    if (!name || !email || !body) {
      toast.error(COPY.validation.required[language])
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error(COPY.validation.email[language])
      return
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      toast.error(COPY.validation.config[language])
      return
    }

    setIsSubmitting(true)

    try {
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  name,
          from_email: email,
          company:    mailBody.company || 'N/A',
          message:    body,
          to_name:    'Aoi Kuriki',
        },
        PUBLIC_KEY
      )

      if (result.status === 200) {
        toast.success(COPY.successMsg[language])
        setMailBody({ company: '', name: '', email: '', body: '' })
      }
    } catch (error) {
      console.error('EmailJS Error:', error)
      toast.error(COPY.errorMsg[language])
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className={styles.contact}>

      {/* Fog */}
      <div className={styles.contact__fog1} aria-hidden="true" />
      <div className={styles.contact__fog2} aria-hidden="true" />

      <div className={styles.contact__inner}>

        {/* ── Left: info column ── */}
        <motion.div
          className={styles.contact__info}
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.span variants={fadeUp} className={styles.contact__eyebrow}>
            {COPY.eyebrow[language]}
          </motion.span>

          <motion.h2 variants={fadeUp} className={styles.contact__heading}>
            {COPY.heading[language]}
          </motion.h2>

          <motion.p variants={fadeUp} className={styles.contact__subheading}>
            {COPY.subheading[language]}
          </motion.p>

          {/* Direct email */}
          <motion.div variants={fadeUp} className={styles.contact__direct}>
            <span className={styles.contact__direct_label}>
              {COPY.emailLabel[language]}
            </span>
            <a
              href="mailto:aoi727noel@gmail.com"
              className={styles.contact__direct_email}
            >
              aoi727noel@gmail.com
            </a>
          </motion.div>

          {/* Social links */}
          <motion.div variants={fadeUp} className={styles.contact__socials}>
            {SOCIALS.map(({ id, label, href, Icon }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contact__social}
                aria-label={label}
              >
                <Icon size={20} />
                <span>{label}</span>
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: form column ── */}
        <motion.div
          className={styles.contact__form_wrap}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          transition={{ delay: 0.15 }}
        >
          <form
            className={styles.form}
            onSubmit={handleSubmit}
            noValidate
          >
            {/* Company + Name — side by side on desktop */}
            <div className={styles.form__row}>
              <div className={`${styles.form__field} ${focusedField === 'company' ? styles['form__field--focused'] : ''}`}>
                <label className={styles.form__label}>
                  {COPY.fields.company[language]}
                </label>
                <input
                  type="text"
                  className={styles.form__input}
                  value={mailBody.company}
                  placeholder={COPY.fields.companyPh[language]}
                  disabled={isSubmitting}
                  onChange={e => handleChange('company', e.target.value)}
                  onFocus={() => setFocusedField('company')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>

              <div className={`${styles.form__field} ${focusedField === 'name' ? styles['form__field--focused'] : ''}`}>
                <label className={styles.form__label}>
                  {COPY.fields.name[language]}
                  <span className={styles.form__required}>*</span>
                </label>
                <input
                  type="text"
                  className={styles.form__input}
                  value={mailBody.name}
                  placeholder={COPY.fields.namePh[language]}
                  required
                  disabled={isSubmitting}
                  onChange={e => handleChange('name', e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                />
              </div>
            </div>

            {/* Email */}
            <div className={`${styles.form__field} ${focusedField === 'email' ? styles['form__field--focused'] : ''}`}>
              <label className={styles.form__label}>
                {COPY.fields.email[language]}
                <span className={styles.form__required}>*</span>
              </label>
              <input
                type="email"
                className={styles.form__input}
                value={mailBody.email}
                placeholder={COPY.fields.emailPh[language]}
                required
                disabled={isSubmitting}
                onChange={e => handleChange('email', e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Message */}
            <div className={`${styles.form__field} ${focusedField === 'body' ? styles['form__field--focused'] : ''}`}>
              <label className={styles.form__label}>
                {COPY.fields.message[language]}
                <span className={styles.form__required}>*</span>
              </label>
              <textarea
                className={styles.form__textarea}
                value={mailBody.body}
                placeholder={COPY.fields.messagePh[language]}
                rows={5}
                required
                disabled={isSubmitting}
                onChange={e => handleChange('body', e.target.value)}
                onFocus={() => setFocusedField('body')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={`${styles.form__submit} ${isSubmitting ? styles['form__submit--loading'] : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting
                ? COPY.submitting[language]
                : COPY.submit[language]
              }
              {!isSubmitting && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path
                    d="M2 8h12M9 3l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  )
}