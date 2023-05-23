import { useTranslation } from 'react-i18next';

import styles from './Order.module.css';
import { Accordion } from '../../../components';
import { invoices } from '../../Account/invoices';
import { useGetOrdersQuery } from '../../../redux/services/order.service';

export default function Order() {
  const { data, isLoading } = useGetOrdersQuery();
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <h2 className={styles.content_title}>
        {t('Food and supply order')} {isLoading && 'Load....'}{' '}
        {data?.data?.length === 0 && 'No orders yet available'}
      </h2>

      <div className={styles.content_acardion}>
        {data?.data &&
          data.data.map((item) => <Accordion key={item.id} {...item} />)}
      </div>
    </div>
  );
}
