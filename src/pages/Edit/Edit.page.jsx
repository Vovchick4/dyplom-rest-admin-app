import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

import Card from './Card';
import { Input, Layout, PageHeader } from '../../components';
import styles from './Edit.module.css';
import { useEditRestaurantMutation } from '../../redux/services/restaurant.service';
import { getRestSelector } from '../../redux/features/rest-slice';

export default function Edit() {
  const [restUpdateMutator] = useEditRestaurantMutation();
  const [categorySettings, setCategorySettings] = useState({
    kitchen: true,
    cashier: true,
    waiter: true,
  });

  const { t } = useTranslation();
  const restaurant = useSelector(getRestSelector);

  function updateSettings(e) {
    restUpdateMutator({
      restId: restaurant.id,
      params: {
        name: restaurant.name,
        address: restaurant.address,
        settings: {
          ...restaurant.settings,
          [e.target.name]: e.target.checked,
        },
      },
    });
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

    restUpdateMutator({
      restId: restaurant.id,
      params: {
        name: restaurant.name,
        address: restaurant.address,
        settings: {
          ...restaurant.settings,
          ...newSettings,
        },
      },
    });
  }

  function updateTheme(value) {
    restUpdateMutator({
      restId: restaurant.id,
      params: {
        name: restaurant.name,
        address: restaurant.address,
        settings: {
          ...restaurant.settings,
          theme: value,
        },
      },
    });
  }

  useEffect(() => {
    if (!restaurant?.settings) return;

    setCategorySettings({
      kitchen:
        restaurant.settings.onSite || restaurant.settings.clickAndCollect,
      cashier:
        restaurant.settings.cashPayment ||
        restaurant.settings.onlinePayment ||
        restaurant.settings.paypal ||
        restaurant.settings.appleGooglePay,
      waiter: restaurant.settings.billRequest || restaurant.settings.callWaiter,
    });
  }, [restaurant]);

  return (
    <Layout>
      <PageHeader title={t('Edit hotel section')} />

      {restaurant && (
        <div className={styles.grid}>
          <Card
            title={t('Dashboard')}
            options={[
              {
                key: 'review',
                label: t('Review (rating)'),
                name: 'review',
                checked: restaurant.settings.review,
                onChange: updateSettings,
              },
              {
                key: 'email',
                label: t('Email'),
                name: 'email',
                checked: restaurant.settings.email,
                onChange: updateSettings,
              },
              {
                key: 'supplier',
                label: t('Supplier'),
                name: 'supplier',
                checked: restaurant.settings.supplier,
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
                checked: restaurant.settings.onSite,
                onChange: updateSettings,
              },
              {
                key: 'clickAndCollect',
                label: t('Click&collect'),
                name: 'clickAndCollect',
                checked: restaurant.settings.clickAndCollect,
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
                checked: restaurant.settings.cashPayment,
                onChange: updateSettings,
              },
              {
                key: 'onlinePayment',
                label: t('Payment online'),
                name: 'onlinePayment',
                checked: restaurant.settings.onlinePayment,
                onChange: updateSettings,
              },
              {
                key: 'paypal',
                label: t('Paypal'),
                name: 'paypal',
                checked: restaurant.settings.paypal,
                onChange: updateSettings,
              },
              {
                key: 'appleGooglePay',
                label: t('ApplePay / GooglePay'),
                name: 'appleGooglePay',
                checked: restaurant.settings.appleGooglePay,
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
                checked: restaurant.settings.billRequest,
                onChange: updateSettings,
              },
              {
                key: 'callWaiter',
                label: t('Call waiter'),
                name: 'callWaiter',
                checked: restaurant.settings.callWaiter,
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
            value={restaurant.settings.theme || 'green'}
            onChange={updateTheme}
          />
        </div>
      )}
    </Layout>
  );
}
