import { useState } from 'react';
import Calendar from 'react-calendar';
import { useTranslation } from 'react-i18next';

import InvoiceCard from '../Account/InvoiceCard';

import styles from './Account.module.css';
import '../../styles/calendar.css';
import { Layout, Loader, PageHeader } from '../../components';
import { useGetInvoicesOrderQuery } from '../../redux/services/order.service';

export default function AccountPage() {
  const [selectedDate, setSelectedDate] = useState([
    new Date(
      new Date(new Date().setDate(new Date().getDate() - 1)).setHours(
        0,
        0,
        0,
        0
      )
    ),
    new Date(new Date().setHours(23, 59, 59, 999)),
  ]);
  const { data: currInvoices, isFetching } = useGetInvoicesOrderQuery({
    first_date: selectedDate[0].toISOString(),
    second_date: selectedDate[1].toISOString(),
  });

  const { t, i18n } = useTranslation();

  function downloadTxtFile(data, plates) {
    const fillData = Object.keys(data).flatMap(
      (element) => element + ' - ' + data[element] + '\n'
    );
    const fillPlates = plates.map(
      ({ id, name, description, price, quantity, restaurant_id }) =>
        'Plates:\nid - ' +
        id +
        '\nname - ' +
        name +
        '\ndescription - ' +
        description +
        '\nprice - ' +
        price +
        '\nquantity - ' +
        quantity +
        '\nrestaurant_id - ' +
        restaurant_id
    );
    const blob = new Blob(fillData.concat(fillPlates), { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'invoice-info.txt';
    link.href = url;
    link.click();
  }

  return (
    <Layout>
      <PageHeader title={t('Account')} />

      <div className={styles.grid_content}>
        <div className={styles.contentCard}>
          <p className={styles.contentTitle}>{t('INVOICES')}</p>

          <div className={styles.invoices_content}>
            {!isFetching && currInvoices && currInvoices.length > 0
              ? currInvoices.map((item) => (
                  <InvoiceCard
                    key={item.id}
                    downloadTxtFile={downloadTxtFile}
                    {...item}
                  />
                ))
              : t('There is no such record')}
          </div>
        </div>

        <div className={styles.calendarCard}>
          <div className={styles.calendarContainer}>
            <h2 className={styles.calendarTitle}>
              {t('Choose Date')} {isFetching && <Loader size={3} />}
            </h2>
            <Calendar
              value={selectedDate}
              onChange={setSelectedDate}
              prev2Label={null}
              next2Label={null}
              maxDetail="month"
              minDetail="month"
              selectRange
              locale={i18n.language}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}
