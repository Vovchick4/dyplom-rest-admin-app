import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Kitchen.module.css';
import { Layout, PageHeader, Loader } from '../../components';
import KitchenCard from './KitchenCard';
import { ordersOperations, ordersSelectors } from '../../redux/orders';

export default function KitchenPage() {
  const ordersLoading = useSelector(ordersSelectors.getLoading);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  // const onSiteOrders = useSelector(ordersSelectors.getOnSiteOrders);
  const takeawayOrders = useSelector(ordersSelectors.getTakeawayOrders);

  function editOrder(orderId, data) {
    dispatch(ordersOperations.edit(orderId, data));
  }

  function deleteOrder(orderId) {
    dispatch(ordersOperations.remove(orderId));
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
          {takeawayOrders.length > 0 ? (
            <div>
              <p className={styles.title}>{t('TAKE AWAY')}</p>
              <div className={styles.card}>
                {takeawayOrders.map((order) => (
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
