import { useEffect } from 'react';

import styles from './Waiter.module.css';

import { tableService } from '../../redux/services';
import { Layout, PageHeader } from '../../components';
import WaiterCall from './WaiterCall';
import BillRequest from './BillRequest';

// const opsCategory = {
//   call_waiter: 'waiter',
//   bill_request: 'bill_request',
// };
export default function Waiter() {
  const { data, refetch, isLoading } = tableService.useGetTablesQuery();

  useEffect(() => {
    window.onfocus = (e) => {
      refetch();
    };
  }, [refetch]);

  return (
    <Layout>
      <PageHeader title="Waiter" />

      <div className={styles.content}>
        <WaiterCall data={data} isLoading={isLoading} />
        <BillRequest data={data} isLoading={isLoading} />
      </div>
    </Layout>
  );
}
