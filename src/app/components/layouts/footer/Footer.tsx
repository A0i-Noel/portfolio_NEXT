import styles from './footer.module.scss'

// Server component — static content only, no language switching needed
const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <span className={styles.footer__copy}>© {year} Aoi Kuriki</span>
        <a href="mailto:aoi727noel@gmail.com" className={styles.footer__link}>
          aoi727noel@gmail.com
        </a>
      </div>
    </footer>
  );
}

export default Footer;
