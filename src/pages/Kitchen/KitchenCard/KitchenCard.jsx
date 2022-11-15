import { useState } from 'react';
import { BsX } from 'react-icons/bs';
import { CgSandClock } from 'react-icons/cg';
import { FiCheckCircle } from 'react-icons/fi';
import { FcCancel } from 'react-icons/fc';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';

import styles from './KitchenCard.module.css';
import { Button, Dropdown } from '../../../components';

const PaymentStatusIcons = {
  not_paid: <FcCancel className={styles.icon_not_paid} />,
  paid: <FiCheckCircle className={styles.icon_paid} />,
  pending: <CgSandClock className={styles.icon_pending} />,
};

export default function KitchenCard({
  id,
  index,
  table,
  payment_status,
  plates,
  created_at,
  onEdit,
  onDelete,
}) {
  const [dropdownOpen, setDropdownOpen] = useState();
  const { t } = useTranslation();

  function toggleDropdown() {
    setDropdownOpen((prev) => !prev);
  }

  function closeDropdown() {
    setDropdownOpen(false);
  }

  return (
    <div className={styles.container_active}>
      <p className={styles.count_active}>{index}</p>
      <div className={styles.inner_container}>
        <Button variant="remove_style" onClick={() => onDelete(id)}>
          <BsX fontSize="28px" />
        </Button>
        <div className={styles.inner_container_items}>
          <div className={styles.table}>
            <p className={styles.table_text}>
              <span>{t('Table')}</span>
              <span className={styles.table_text_count}>{table}</span>
            </p>
          </div>
          <ul className={styles.food}>
            {plates.map((plate) => (
              <li key={plate.id} className={styles.food_text}>
                <span className={styles.food_name}>{plate.name}</span>
                <div className={styles.food_line} />
                <span className={styles.food_count}>{plate.amount}</span>
              </li>
            ))}
          </ul>
          <div className={styles.time}>
            <p className={styles.time_clock}>
              <AiOutlineClockCircle />
              <span className={styles.time_clock_count}>
                {new Date(created_at * 1000)
                  .toLocaleTimeString('fr')
                  .slice(0, 5)}
              </span>
            </p>
            <div className={styles.time_check}>
              <button
                type="button"
                className={styles.time_check_btn}
                onClick={toggleDropdown}
              >
                {PaymentStatusIcons[payment_status]}
                <span className={styles[`time_check_text_${payment_status}`]}>
                  {t(
                    payment_status
                      .split('_')
                      .map((str) => str[0].toUpperCase() + str.slice(1))
                      .join(' ')
                  )}
                </span>
              </button>
              <Dropdown
                open={dropdownOpen}
                align="left"
                options={[
                  {
                    key: 'notPaid',
                    label: (
                      <>
                        {PaymentStatusIcons.not_paid}
                        <span className={styles.time_check_text_not_paid}>
                          {t('Not Paid')}
                        </span>
                      </>
                    ),
                    onClick: () => onEdit(id, { payment_status: 'not_paid' }),
                  },
                  {
                    key: 'pending',
                    label: (
                      <>
                        {PaymentStatusIcons.pending}
                        <span className={styles.time_check_text_pending}>
                          {t('Pending')}
                        </span>
                      </>
                    ),
                    onClick: () => onEdit(id, { payment_status: 'pending' }),
                  },
                  {
                    key: 'paid',
                    label: (
                      <>
                        {PaymentStatusIcons.paid}
                        <span className={styles.time_check_text_paid}>
                          {t('Paid')}
                        </span>
                      </>
                    ),
                    onClick: () => onEdit(id, { payment_status: 'paid' }),
                  },
                ]}
                onClose={closeDropdown}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
