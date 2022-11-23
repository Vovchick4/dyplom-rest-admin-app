import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import styles from './Waiter.module.css';

import { Layout, PageHeader } from '../../components';
import WaiterCall from './WaiterCall';
import BillRequest from './BillRequest';
import { getErrorMessage } from '../../utils/getErrorMessage';

const opsCategory = {
  call_waiter: 'waiter',
  bill_request: 'bill_request',
};
export default function Waiter() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios({
      url: 'tables',
      method: 'GET',
    })
      .then((res) => setTables(res.data.data))
      .catch((err) => toast.error(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout>
      <PageHeader title="Waiter" />

      <div className={styles.content}>
        <WaiterCall
          opsCategory={opsCategory.call_waiter}
          data={tables}
          loading={loading}
        />
        <BillRequest
          opsCategory={opsCategory.bill_request}
          data={tables}
          loading={loading}
        />
      </div>
    </Layout>
  );
}
