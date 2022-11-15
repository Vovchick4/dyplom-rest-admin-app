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

export default function Acardion({ id }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={styles.item}
      style={{
        height: open ? `${items.length * 74.8 + 50}px` : undefined,
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
          <p className={styles.date}>14/05/2021</p>
          <p className={styles.order}>Order #00269</p>
        </div>
        <p className={styles.price}>€284.99</p>
      </div>

      <div
        className={
          open ? styles.description_content_open : styles.description_content
        }
      >
        {items.map((item) => (
          <div key={item.id} className={styles.border}>
            <p>{item.title}</p>
            <p>x{item.count}</p>
            <p>€{item.price}</p>
            <p>€{item.count * item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
