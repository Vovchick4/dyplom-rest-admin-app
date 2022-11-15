import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import QRcode from 'qrcode';

import { Layout, PageHeader, Button } from '../../components';
import Mail from './Mail';
import Order from './Order';
import Statistics from './Statistics/Statistics';
import { data } from './data';

import { authSelectors } from '../../redux/auth';
import { hotelSelectors } from '../../redux/hotel';
import styles from './Home.module.css';

const clientBaseURL = 'https://resthotel.ouiorder.fr';

export default function HomePage() {
  const user = useSelector(authSelectors.getUser);
  const restaurant = useSelector(hotelSelectors.getHotel);
  const [qrCodeValue, setQrCodeValue] = useState(null);
  const [clientSideUrl, setClientSideUrl] = useState(null);

  useEffect(() => {
    if (!user) {
      setQrCodeValue(null);
      return;
    }

    const url =
      user.role === 'super-admin' && restaurant
        ? `${clientBaseURL}/${restaurant.slug}/restaurant`
        : `${clientBaseURL}/${user.restaurant_slug}/restaurant`;

    setClientSideUrl(url);
    QRcode.toDataURL(url, {
      width: 200,
    }).then((value) => setQrCodeValue(value));
  }, [user, restaurant]);

  return (
    <Layout>
      <PageHeader title="" />

      <div className={styles.content}>
        <Statistics data={data} />
        {qrCodeValue ? (
          <div>
            <div className={styles.qrBox}>
              <img
                className={styles.qrImage}
                src={qrCodeValue}
                alt={`QR_${
                  user.restaurant_slug
                }_${new Date().toISOString()}.png`}
              />
              <Button
                as="a"
                download={`QR_${
                  user.restaurant_slug
                }_${new Date().toISOString()}.png`}
                href={qrCodeValue}
                title="ImageName"
              >
                Download
              </Button>
            </div>
            {clientSideUrl && (
              <div className={styles.clientUrlBox}>
                <p className={styles.clientUrlText}>
                  Client side URL: <b>{clientSideUrl}</b>
                </p>
                <div>
                  <Button
                    as="a"
                    href={clientSideUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Client Side
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div>QR Code loading</div>
        )}
        <Mail />
        <Order />
      </div>
    </Layout>
  );
}
