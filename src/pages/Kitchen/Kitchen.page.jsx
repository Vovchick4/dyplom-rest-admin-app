import { useTranslation } from 'react-i18next';

import styles from './Kitchen.module.css';
import { Layout, PageHeader, Loader } from '../../components';
import KitchenCard from './KitchenCard';
import {
  useGetOrdersQuery,
  useEditOrderMutation,
  useRemoveOrderMutation,
} from '../../redux/services/order.service';

export default function KitchenPage() {
  const { data, isLoading: ordersLoading } = useGetOrdersQuery();
  const [editOrderMutation] = useEditOrderMutation();
  const [removeOrderMutation] = useRemoveOrderMutation();

  const { t } = useTranslation();

  function editOrder(orderId, data) {
    editOrderMutation({ orderId, data });
  }

  function deleteOrder(orderId) {
    removeOrderMutation(orderId);
  }

  return (
    <Layout>
      <PageHeader title={t('Kitchen')} />

      {ordersLoading && (
        <div className={styles.loader}>
          <Loader centered />
        </div>
      )}

      {!ordersLoading && (
        <div className={styles.grid_content}>
          {/* <div>
            <p className={styles.title}>{t('ON SITE')}</p>
            {onSiteOrders.length > 0 && (
              <div className={styles.card}>
                {onSiteOrders.map((order, i) => (
                  <KitchenCard
                    key={order.id}
                    index={i + 1}
                    {...order}
                    onEdit={editOrder}
                    onDelete={deleteOrder}
                  />
                ))}
              </div>
            )}
          </div> */}
          {data.data.length > 0 ? (
            <div>
              <p className={styles.title}>{t('TAKE AWAY')}</p>
              <div className={styles.card}>
                {data.data.map((order) => (
                  <KitchenCard
                    key={order.id}
                    {...order}
                    onEdit={editOrder}
                    onDelete={deleteOrder}
                  />
                ))}
              </div>
            </div>
          ) : (
            <p className={styles.message}>No orders at the moment</p>
          )}
        </div>
      )}
    </Layout>
  );
}
