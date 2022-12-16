import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

import { Dropdown } from '../../../components';

import styles from './RestCard.module.css';

export default function RestCard({
  id,
  logo,
  name,
  address,
  phone,
  onEdit,
  onDelete,
  onSelect,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { t } = useTranslation();

  function closeDropdown() {
    setDropdownOpen(false);
  }

  function toggleDropdown() {
    setDropdownOpen((prev) => !prev);
  }

  return (
    <div className={styles.card}>
      <div className={styles.dropdownContainer}>
        <button
          type="button"
          className={styles.dropdownButton}
          onClick={toggleDropdown}
        >
          <BsThreeDotsVertical />
        </button>
        <Dropdown
          open={dropdownOpen}
          onClose={closeDropdown}
          options={[
            {
              key: 'edit',
              onClick: () => onEdit(id),
              label: t('Edit'),
            },
            {
              key: 'delete',
              onClick: () => onDelete(id),
              label: t('Delete'),
            },
          ]}
        />
      </div>

      <div
        className={styles.card_content}
        onClick={() =>
          onSelect({
            id,
            logo,
            name,
            address,
            phone,
          })
        }
      >
        <div className={styles.imgBox}>
          <img className={styles.img} src={logo} alt={name} />
        </div>

        <div className={styles.textBox}>
          <div>
            <p className={styles.title}>{name}</p>
            <p className={styles.description}>{address}</p>
            <p className={styles.description}>{phone}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
