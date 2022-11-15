import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

import Card from './Card';
import { Input, Layout, PageHeader } from '../../components';
import styles from './Edit.module.css';
import { hotelSelectors, hotelOperations } from '../../redux/hotel';

function Edit() {
  const [categorySettings, setCategorySettings] = useState({
    kitchen: true,
    cashier: true,
    waiter: true,
  });

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const hotel = useSelector(hotelSelectors.getHotel);

  function updateSettings(e) {
    dispatch(
      hotelOperations.updateHotel(hotel.id, {
        name: hotel.name,
        address: hotel.address,
        settings: {
          ...hotel.settings,
          [e.target.name]: e.target.checked,
        },
      })
    );
  }

  function updateCategory(e) {
    const category = e.target.name;
    const checked = e.target.checked;

    const newSettings = {};

    switch (category) {
      case 'kitchen':
        newSettings.onSite = checked;
        newSettings.clickAndCollect = checked;
        break;
      case 'cashier':
        newSettings.cashPayment = checked;
        newSettings.onlinePayment = checked;
        newSettings.paypal = checked;
        newSettings.appleGooglePay = checked;
        break;
      case 'waiter':
        newSettings.billRequest = checked;
        newSettings.callWaiter = checked;
        break;

      default:
        break;
    }

    dispatch(
      hotelOperations.updateHotel(hotel.id, {
        name: hotel.name,
        address: hotel.address,
        settings: {
          ...hotel.settings,
          ...newSettings,
        },
      })
    );
  }

  function updateTheme(value) {
    dispatch(
      hotelOperations.updateHotel(hotel.id, {
        name: hotel.name,
        address: hotel.address,
        settings: {
          ...hotel.settings,
          theme: value,
        },
      })
    );
  }

  useEffect(() => {
    if (!hotel?.settings) return;

    setCategorySettings({
      kitchen: hotel.settings.onSite || hotel.settings.clickAndCollect,
      cashier:
        hotel.settings.cashPayment ||
        hotel.settings.onlinePayment ||
        hotel.settings.paypal ||
        hotel.settings.appleGooglePay,
      waiter: hotel.settings.billRequest || hotel.settings.callWaiter,
    });
  }, [hotel]);

  return (
    <Layout>
      <PageHeader title={t('Edit hotel section')} />

      {hotel && (
        <div className={styles.grid}>
          <Card
            title={t('Dashboard')}
            options={[
              {
                key: 'review',
                label: t('Review (rating)'),
                name: 'review',
                checked: hotel.settings.review,
                onChange: updateSettings,
              },
              {
                key: 'email',
                label: t('Email'),
                name: 'email',
                checked: hotel.settings.email,
                onChange: updateSettings,
              },
              {
                key: 'supplier',
                label: t('Supplier'),
                name: 'supplier',
                checked: hotel.settings.supplier,
                onChange: updateSettings,
              },
            ]}
          />
          <Card
            title={t('Kitchen')}
            headerOption={{
              name: 'kitchen',
              checked: categorySettings.kitchen,
              onChange: updateCategory,
            }}
            options={[
              {
                key: 'onSite',
                label: t('On-site'),
                name: 'onSite',
                checked: hotel.settings.onSite,
                onChange: updateSettings,
              },
              {
                key: 'clickAndCollect',
                label: t('Click&collect'),
                name: 'clickAndCollect',
                checked: hotel.settings.clickAndCollect,
                onChange: updateSettings,
              },
            ]}
          />
          <Card
            title={t('Cashier')}
            headerOption={{
              name: 'cashier',
              checked: categorySettings.cashier,
              onChange: updateCategory,
            }}
            options={[
              {
                key: 'cashPayment',
                label: t('Payment by cash'),
                name: 'cashPayment',
                checked: hotel.settings.cashPayment,
                onChange: updateSettings,
              },
              {
                key: 'onlinePayment',
                label: t('Payment online'),
                name: 'onlinePayment',
                checked: hotel.settings.onlinePayment,
                onChange: updateSettings,
              },
              {
                key: 'paypal',
                label: t('Paypal'),
                name: 'paypal',
                checked: hotel.settings.paypal,
                onChange: updateSettings,
              },
              {
                key: 'appleGooglePay',
                label: t('ApplePay / GooglePay'),
                name: 'appleGooglePay',
                checked: hotel.settings.appleGooglePay,
                onChange: updateSettings,
              },
            ]}
          />
          <Card
            title={t('Waiter')}
            headerOption={{
              name: 'waiter',
              checked: categorySettings.waiter,
              onChange: updateCategory,
            }}
            options={[
              {
                key: 'billRequest',
                label: t('Bill request'),
                name: 'billRequest',
                checked: hotel.settings.billRequest,
                onChange: updateSettings,
              },
              {
                key: 'callWaiter',
                label: t('Call waiter'),
                name: 'callWaiter',
                checked: hotel.settings.callWaiter,
                onChange: updateSettings,
              },
            ]}
          />
          <Input.Select
            options={[
              {
                label: 'Green',
                value: 'green',
              },
              {
                label: 'Blue',
                value: 'blue',
              },
              {
                label: 'Red',
                value: 'red',
              },
            ]}
            value={hotel.settings.theme || 'green'}
            onChange={updateTheme}
          />
        </div>
      )}
    </Layout>
  );
}

export default Edit;
