import styles from './Card.module.css';
import { Input } from '../../../components';

function Card({ title, headerOption, options }) {
  return (
    <div className={styles.box}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {headerOption && (
          <Input.ToggleText
            id={headerOption.name}
            name={headerOption.name}
            checked={headerOption.checked}
            onChange={headerOption.onChange}
          />
        )}
      </div>
      {options.length > 0 && (
        <ul className={styles.list}>
          {options.map(({ key, name, label, checked, onChange }) => (
            <li key={key} className={styles.item}>
              <label htmlFor={key} className={styles.label}>
                {label}
              </label>
              <Input.ToggleText
                id={key}
                name={name}
                checked={checked}
                onChange={onChange}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Card;
