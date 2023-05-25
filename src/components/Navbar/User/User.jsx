import { FaUserCircle } from 'react-icons/fa';

import styles from './User.module.css';
import { useSelector } from 'react-redux';

export default function User() {
  const image = useSelector((state) => state.auth.user.image);

  return (
    <div>
      {image && (
        <img
          className={styles.user_avatar}
          src={image}
          alt={image || 'User Image'}
        />
      )}
      {!image && (
        <button className={styles.user}>
          <FaUserCircle />
        </button>
      )}
    </div>
  );
}
