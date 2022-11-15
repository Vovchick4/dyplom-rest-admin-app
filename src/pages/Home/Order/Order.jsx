import { useTranslation } from 'react-i18next';

import styles from './Order.module.css';
import { Accordion } from '../../../components';
import { invoices } from '../../Account/invoices';

export default function Order() {
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <h2 className={styles.content_title}>{t('Food and supply order')}</h2>

      <div className={styles.content_acardion}>
        {invoices.map((item) => (
          <Accordion key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
