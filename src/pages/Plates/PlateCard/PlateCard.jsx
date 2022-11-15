import { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

import styles from './PlateCard.module.css';
import { Dropdown, Input } from '../../../components';

export default function PlateCard({
  id,
  image,
  name,
  description,
  price,
  loading,
  active,
  onEdit,
  onDelete,
  onToggleActive,
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

      <div className={styles.imgBox}>
        <img className={styles.img} src={image} alt={name} />
      </div>

      <div className={styles.textBox}>
        <div>
          <p className={styles.title}>{name}</p>
          <p className={styles.description}>{description}</p>
        </div>
        <div className={styles.footer}>
          <p className={styles.price}>${price}</p>
          <Input.Toggle
            disabled={loading}
            checked={active}
            onChange={(e) => onToggleActive(id, e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
}
