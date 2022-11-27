import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import styles from './Waiter.module.css';

import { tableService } from '../../redux/services';
import { Layout, PageHeader } from '../../components';
import WaiterCall from './WaiterCall';
import BillRequest from './BillRequest';
import { getErrorMessage } from '../../utils/getErrorMessage';

<<<<<<< HEAD
// const opsCategory = {
//   call_waiter: 'waiter',
//   bill_request: 'bill_request',
// };
export default function Waiter() {
  const { data, isLoading } = tableService.useGetTablesQuery();
=======
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
>>>>>>> d498f2eb7c60be25d5d24ab0e90b20e5e8b2468b

  return (
    <Layout>
      <PageHeader title="Waiter" />

      <div className={styles.content}>
<<<<<<< HEAD
        <WaiterCall data={data} isLoading={isLoading} />
        <BillRequest data={data} isLoading={isLoading} />
=======
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
>>>>>>> d498f2eb7c60be25d5d24ab0e90b20e5e8b2468b
      </div>
    </Layout>
  );
}
