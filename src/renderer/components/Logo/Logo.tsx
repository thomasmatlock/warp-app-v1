import styles from './Logo.module.scss';
import logoIcon1 from './assets/logo_blackhole.svg';
import logoText from './assets/logo_text.svg';

export default function Logo() {
  const spanClasses = [styles.icon, styles.icon_black_hole].join(' ');
  return (
    <div className="logoContainer">
      <a className={styles.logo}>
        <img
          className={styles.logo__img}
          src={logoIcon1}
          alt="logo spinning black hole"
        />
        <img className={styles.logo__text} src={logoText} alt="logo_text" />
        <span className={spanClasses} />
      </a>
    </div>
  );
}
