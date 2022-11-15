import { Loader } from '../';

import styles from './LanguageTabs.module.css';

const languages = ['en', 'fr'];
export default function LanguageTabs({ value, onChange, loading }) {
  return (
    <div className={styles.list}>
      {loading && (
        <div className={styles.loaderBox}>
          <Loader />
          <span className={styles.loaderText}>Translating...</span>
        </div>
      )}
      {!loading &&
        languages.map((language) => (
          <button
            key={language}
            type="button"
            className={value === language ? styles.tabBtnActive : styles.tabBtn}
            onClick={() => onChange(language)}
            disabled={loading}
          >
            {language}
          </button>
        ))}
    </div>
  );
}
