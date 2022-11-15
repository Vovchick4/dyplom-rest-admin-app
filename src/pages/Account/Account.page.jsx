import { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useTranslation } from 'react-i18next';

import InvoiceCard from '../Account/InvoiceCard';

import styles from './Account.module.css';
import '../../styles/calendar.css';
import { Layout, PageHeader } from '../../components';
import { invoices } from './invoices';

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
  const [currInvoices, setCurrInvoices] = useState([]);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    setCurrInvoices(
      invoices.filter(
        (item) =>
          new Date(item.date) >= selectedDate[0] &&
          new Date(item.date) <= selectedDate[1]
      )
    );
  }, [selectedDate]);

  return (
    <Layout>
      <PageHeader title={t('Account')} />

      <div className={styles.grid_content}>
        <div className={styles.contentCard}>
          <p className={styles.contentTitle}>{t('INVOICES')}</p>

          <div className={styles.invoices_content}>
            {currInvoices.length > 0
              ? currInvoices.map((item) => (
                  <InvoiceCard key={item.id} {...item} />
                ))
              : t('There is no such record')}
          </div>
        </div>

        <div className={styles.calendarCard}>
          <div className={styles.calendarContainer}>
            <h2 className={styles.calendarTitle}>{t('Choose Date')}</h2>
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
