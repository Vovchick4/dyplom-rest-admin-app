import { Link, useLocation } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';

import styles from './Settings.module.css';

import { Button } from '../../';
import urls from '../../../config/urls';

export default function Settings() {
  const location = useLocation();

  return (
    <Button as={Link} className={styles.settings} to={urls.profile}>
      <FiSettings
        size={25}
        color={location.pathname === urls.profile ? '#589442' : '#979797'}
      />
    </Button>
  );
}
