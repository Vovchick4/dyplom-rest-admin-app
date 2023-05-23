import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';

import styles from './Statistics.module.css';
import InfoItem from './InfoItem';
import { Loader } from '../../../components';
import { useGetRestaurantStatsQuery } from '../../../redux/services/restaurant.service';

/*
  data: {
    excellent: {
      percentage: number;
      percentageAlt: number;
      up: boolean;
    },
    ...
  }
*/
export default function Statistics() {
  const { data } = useGetRestaurantStatsQuery();

  const { t } = useTranslation();

  if (data === undefined) {
    return <Loader />;
  }

  const excellentCount = data.excellent.count.toString().replace('.', ',');

  return (
    <div className={styles.container}>
      <div className={styles.chart}>
        <Doughnut
          data={{
            labels: [
              t('Excellent'),
              t('Good'),
              t('Satisfactory'),
              t('Poor'),
              t('Bad'),
            ],
            datasets: [
              {
                data: [
                  data.excellent.percentage,
                  data.good.percentage,
                  data.satisfactory.percentage,
                  data.poor.percentage,
                  data.bad.percentage,
                ],
                backgroundColor: [
                  '#77C75A',
                  '#FDCE35',
                  '#6979E2',
                  '#05CCD6',
                  '#FF664F',
                ],
                borderWidth: 0,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
          width={260}
          height={260}
        />
        <div className={styles.chartLabelBox}>
          <h3 className={styles.chartTitle}>{data.excellent.percentage}%</h3>
          <p className={styles.chartDescription}>{t('Excellent')}</p>
          <p className={styles.chartDescription}>{excellentCount}</p>
        </div>
      </div>
      <div className={styles.info}>
        <InfoItem
          status="excellent"
          label={t('Excellent')}
          {...data.excellent}
        />
        <InfoItem status="good" label={t('Good')} {...data.good} />
        <InfoItem
          status="satisfactory"
          label={t('Satisfactory')}
          {...data.satisfactory}
        />
        <InfoItem status="poor" label={t('Poor')} {...data.poor} />
        <InfoItem status="bad" label={t('Bad')} {...data.bad} />
      </div>
    </div>
  );
}
