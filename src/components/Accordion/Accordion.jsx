import { useState } from 'react';
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri';

import styles from './Accordion.module.css';

const items = [
  {
    id: '1',
    title: 'Item 1',
    count: 9,
    price: 12.99,
  },
  {
    id: '2',
    title: 'Item 2',
    count: 12,
    price: 12.99,
  },
];

export default function Acardion({ id, price, plates, created_at }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={styles.item}
      style={{
        height: open ? `${plates && plates.length * 74.8 + 50}px` : undefined,
      }}
    >
      <div
        className={
          id % 2 === 1
            ? open
              ? styles.container_open
              : styles.container
            : open
            ? styles.container_open_grey_mod
            : styles.container_grey_mod
        }
      >
        <div className={styles.order_options}>
          <button className={styles.arrow} onClick={() => setOpen(!open)}>
            {open ? (
              <div className={styles.arrowUp}>
                <RiArrowUpSLine />
              </div>
            ) : (
              <RiArrowDownSLine />
            )}
          </button>
          {/* <p className={styles.date}>
            {String(new Date(created_at).toLocaleDateString())}
          </p> */}
          <p className={styles.order}>Order #{id}</p>
        </div>
        <p className={styles.price}>€{price}</p>
      </div>

      <div
        className={
          open ? styles.description_content_open : styles.description_content
        }
      >
        {plates &&
          plates.map((item) => (
            <div key={item.id} className={styles.border}>
              <p>{item.name}</p>
              <p>x{item.amount}</p>
              <p>€{item.price}</p>
              <p>€{item.amount * item.price}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
