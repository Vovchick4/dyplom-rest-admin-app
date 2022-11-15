import styles from './Testimonial.module.css';

import { FaQuoteRight } from 'react-icons/fa';
import { FaRegUserCircle } from 'react-icons/fa';

export default function Testimonial() {
  return (
    <div className={styles.card}>
      <div className={styles.quote_image}>
        <FaQuoteRight />
      </div>
      <p className={styles.text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi maiores
        officia animi qui, deleniti adipisci aspernatur et dolorum fugit autem
        nostrum quos voluptatum temporibus laborum necessitatibus maxime
        molestiae aut nihil!
      </p>
      <div className={styles.content}>
        <div className={styles.user}>
          <FaRegUserCircle className={styles.user_icon} />
          <p className={styles.user_name}>Paolo Blagini</p>
        </div>
        <p className={styles.date}>13/08/2002</p>
      </div>
    </div>
  );
}
