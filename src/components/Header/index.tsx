import commonStyles from '../../styles/common.module.scss';
import styles from './header.module.scss';

export default function Header(): JSX.Element {
  return (
    <header className={styles.header}>
      <div className={commonStyles.container}>
        <a href="/">
          <img src="/images/Logo.svg" alt="logo" className={styles.logo} />
        </a>
      </div>
    </header>
  );
}
