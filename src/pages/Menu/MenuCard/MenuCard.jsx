import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from './MenuCard.module.css';
import { Dropdown } from '../../../components';
import threeDotsIcon from '../../../images/icons/three-dots.svg';

export default function MenuCard({
  id,
  name,
  image,
  onEdit,
  active,
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
      <img className={styles.card_img} src={image} alt={name} />
      <p className={styles.card_text}>{name}</p>
      <div className={styles.dropdown}>
        <button
          type="button"
          className={styles.dropdownToggler}
          onClick={toggleDropdown}
        >
          {/* <BsThreeDotsVertical className={styles.dropdownIcon} /> */}
          <img src={threeDotsIcon} alt="Edit" className={styles.dropdownIcon} />
        </button>
        <Dropdown
          open={dropdownOpen}
          onClose={closeDropdown}
          options={[
            {
              key: 'edit',
              label: t('Edit'),
              onClick: () => onEdit(id),
            },
            {
              key: 'toggleActive',
              label: !!active ? t('Deactivate') : t('Activate'),
              onClick: () => onToggleActive(id, !active),
            },
            {
              key: 'delete',
              label: t('Delete'),
              onClick: () => onDelete(id),
            },
          ]}
        />
      </div>
    </div>
  );
}
