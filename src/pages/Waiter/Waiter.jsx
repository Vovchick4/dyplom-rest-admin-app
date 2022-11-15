import styles from './Waiter.module.css';

import { Layout, PageHeader } from '../../components';
import WaiterCall from './WaiterCall';
import BillRequest from './BillRequest';

export default function Waiter() {
  return (
    <Layout>
      <PageHeader title="Waiter" />

      <div className={styles.content}>
        <WaiterCall />
        <BillRequest />
      </div>
    </Layout>
  );
}
