import { BsStarFill } from 'react-icons/bs';
import { MdArrowDropUp, MdArrowDropDown } from 'react-icons/md';

import styles from './InfoItem.module.css';

/*
  status: 'excellent' | 'good' | 'satisfactory' | 'poor' | 'bad'
  percentage: number;
  percentageAlt: number;
  up: boolean;
*/
function InfoItem({ status, label, count, percentage, percentageAlt, up }) {
  const formattedStatus = status[0].toUpperCase() + status.slice(1);
  const formattedCount = count.toString().replace('.', ',');

  return (
    <div className={styles.container}>
      <div className={styles[`status${formattedStatus}`]} />
      <div className={styles.labelBox}>
        <h4 className={styles.name}>
          {label} ({formattedCount})
        </h4>
        <div className={styles.stars}>
          {status === 'excellent' && (
            <>
              <BsStarFill className={styles.star} />
              <BsStarFill className={styles.star} />
              <BsStarFill className={styles.star} />
              <BsStarFill className={styles.star} />
              <BsStarFill className={styles.star} />
            </>
          )}
          {status === 'good' && (
            <>
              <BsStarFill className={styles.star} />
              <BsStarFill className={styles.star} />
              <BsStarFill className={styles.star} />
              <BsStarFill className={styles.star} />
            </>
          )}
          {status === 'satisfactory' && (
            <>
              <BsStarFill className={styles.star} />
              <BsStarFill className={styles.star} />
              <BsStarFill className={styles.star} />
            </>
          )}
          {status === 'poor' && (
            <>
              <BsStarFill className={styles.star} />
              <BsStarFill className={styles.star} />
            </>
          )}
          {status === 'bad' && (
            <>
              <BsStarFill className={styles.star} />
            </>
          )}
        </div>
      </div>
      <span className={styles.percentage}>{percentage}%</span>
      <div className={up ? styles.percentageAltUp : styles.percentageAltDown}>
        {up ? (
          <MdArrowDropUp className={styles.percentageAltIcon} />
        ) : (
          <MdArrowDropDown className={styles.percentageAltIcon} />
        )}
        <span className={styles.percentageAltLabel}>{percentageAlt}%</span>
      </div>
    </div>
  );
}

export default InfoItem;
