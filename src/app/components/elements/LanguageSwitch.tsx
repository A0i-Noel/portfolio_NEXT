'use client'

import { useLanguage } from '@/contexts/languageCtx'
import styles from './LanguageSwitch.module.scss'

const LanguageSwitch = () => {
  const { language, toggleLanguage } = useLanguage()
  const isJPN = language === 'JPN'

  const handleChange = () => {
    toggleLanguage(isJPN ? 'EN' : 'JPN')
  }

  return (
    <label
      className={styles.switch}
      aria-label="Toggle language"
      data-checked={isJPN}
    >
      {/* Hidden checkbox */}
      <input
        type="checkbox"
        className={styles.switch__input}
        checked={isJPN}
        onChange={handleChange}
      />

      {/* EN label — always visually left */}
      <span className={`${styles.switch__label} ${!isJPN ? styles['switch__label--active'] : ''}`}>
        EN
      </span>

      {/* Track + thumb */}
      <span className={styles.switch__track} aria-hidden="true">
        <span className={styles.switch__thumb} />
      </span>

      {/* JP label — always visually right */}
      <span className={`${styles.switch__label} ${isJPN ? styles['switch__label--active'] : ''}`}>
        JP
      </span>
    </label>
  )
}

export default LanguageSwitch