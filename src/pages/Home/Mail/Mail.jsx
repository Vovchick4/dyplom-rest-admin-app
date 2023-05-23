import { useTranslation } from 'react-i18next';

import styles from './Mail.module.css';
import { useGetRestaurantReviewsQuery } from '../../../redux/services/restaurant.service';

const mas = [
  {
    id: 1,
    name: 'asAD ASfsdf',
    text: 'fsgdfgdf  dggdfgdf gd gfdg d gdfg df',
  },
  {
    id: 2,
    name: 'sada',
    text: 'fsgdfgdf dfggfdgfdgf dgdgdf dggdfgdf gd gfdg d gdfg df',
  },
  {
    id: 3,
    name: 'as ADASfsdf',
    text: 'fsgdfgdf dfggfdgfdgf dgdgd gd gfdg d gdfg df',
  },
  {
    id: 4,
    name: 'asAD ASfsdf',
    text: 'fsgdfgdf asdasd asd ad asd agd gfdg d gdfg df',
  },
  {
    id: 5,
    name: 'asAD ASfsdf',
    text: 'fsgdfgdf dfggfdgfdgf dgdgdf gd gfdg d gdfg df',
  },
  {
    id: 6,
    name: 'asAD ASfsdf',
    text: 'fsgdfgdf dfggfdgfdgf dgdgdf dggdfgdf gd gfdg d gdfg df',
  },
  {
    id: 7,
    name: 'asA DA Sfsdf',
    text: 'fsgdfgdf dfggfdgfdgf dgdgdf dggdfgdf gd gfdg d gdfg df',
  },
];

export default function Mail() {
  const { data, isLoading } = useGetRestaurantReviewsQuery();
  const { t } = useTranslation();

  return (
    <div className={styles.content}>
      <h2 className={styles.content_title}>
        {t('REVIEWS (COMMENTS)')} {isLoading && 'Load....'}{' '}
        {data?.length === 0 && 'No comments yet!'}
      </h2>

      <div className={styles.content_card}>
        {data &&
          data.map((item) => (
            <div
              key={item.id}
              className={
                item.id % 2 === 1 ? styles.card : styles.card_grey_mode
              }
            >
              <p className={styles.user_name}>{item.review}</p>
              <p className={styles.user_text}>{item.comment}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
