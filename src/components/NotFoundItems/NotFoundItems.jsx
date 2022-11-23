import { CgSmileNone } from 'react-icons/cg';
import styles from './NotFoundItems.module.css';
const iconOps = {
  big: 50,
  medium: 34,
  small: 25,
};
export default function NotFoundItems({ title, size = 'big' }) {
  const classes = [styles.notFound, styles[size]];
  return (
    <div className={classes.join(' ')}>
      <CgSmileNone size={iconOps[size]} />
      <p>{title}</p>
    </div>
  );
}
