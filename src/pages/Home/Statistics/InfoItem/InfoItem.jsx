import { Fragment, useMemo } from 'react';
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

  const reviews = useMemo(
    () => ({
      excellent: (
        <Fragment>
          {[1, 2, 3, 4, 5].map((u) => (
            <BsStarFill key={u} className={styles.star} />
          ))}
        </Fragment>
      ),
      good: (
        <Fragment>
          {[1, 2, 3, 4].map((u) => (
            <BsStarFill key={u} className={styles.star} />
          ))}
        </Fragment>
      ),
      satisfactory: (
        <Fragment>
          {[1, 2, 3].map((u) => (
            <BsStarFill key={u} className={styles.star} />
          ))}
        </Fragment>
      ),
      poor: (
        <Fragment>
          {[1, 2].map((u) => (
            <BsStarFill key={u} className={styles.star} />
          ))}
        </Fragment>
      ),
      bad: (
        <Fragment>
          <BsStarFill className={styles.star} />
        </Fragment>
      ),
    }),
    []
  );

  return (
    <div className={styles.container}>
      <div className={styles[`status${formattedStatus}`]} />
      <div className={styles.labelBox}>
        <h4 className={styles.name}>
          {label} ({formattedCount})
        </h4>
        <div className={styles.stars}>{reviews[status]}</div>
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
