import { NavLink, Link } from 'react-router-dom';
import {
  BiDish,
  BiFoodMenu,
  BiDollarCircle,
  BiPowerOff,
  BiHome,
} from 'react-icons/bi';
import { FaBlender } from 'react-icons/fa';
import { BsPerson, BsPencil } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import styles from './Sidebar.module.css';
import urls from '../../config/urls';
import { Button } from '../';
import logoImg from '../../images/Ouiorder_logo_horiz.svg';
import { authOperations, authSelectors } from '../../redux/auth';

const links = [
  {
    label: 'Home',
    to: urls.home,
    exact: true,
    icon: <BiHome />,
  },
  {
    label: 'Plates',
    to: urls.plates,
    exact: true,
    icon: <BiDish />,
  },
  {
    label: 'Menu',
    to: urls.menu,
    exact: true,
    icon: <BiFoodMenu />,
  },
  {
    label: 'Kitchen',
    to: urls.kitchen,
    exact: true,
    icon: <FaBlender />,
  },
  {
    label: 'Cashier',
    to: urls.cashier,
    exact: true,
    icon: <BiDollarCircle />,
  },
  // {
  //   label: 'Account',
  //   to: urls.account,
  //   exact: true,
  //   icon: <BsPerson />,
  // },
  {
    label: 'Waiter',
    to: urls.waiter,
    exact: true,
    icon: <BsPerson />,
  },
  // {
  //   label: 'Edit',
  //   to: urls.edit,
  //   exact: true,
  //   icon: <BsPencil />,
  // },
];

export default function Sidebar({ open, onClose }) {
  const containerClasses = [styles.container];
  const dimmerClasses = [styles.dimmer];
  if (open) {
    containerClasses.push(styles.active);
    dimmerClasses.push(styles.active);
  }

  const dispatch = useDispatch();
  const user = useSelector(authSelectors.getUser);
  const { t } = useTranslation();

  function logout() {
    dispatch(authOperations.logout());
  }

  return (
    <div>
      <div className={dimmerClasses.join(' ')} onClick={onClose} />
      <aside className={containerClasses.join(' ')}>
        <div className={styles.inner}>
          <div>
            <Link to={urls.home} className={styles.logoLink}>
              <img
                className={styles.logoImg}
                src={logoImg}
                alt="Ouiorder Logo"
                height="40"
              />
            </Link>

            <p className={styles.headerTitle}>{t('Hi')}, Hotel</p>

            {links.map(({ label, icon, ...link }) => (
              <NavLink
                key={link.to}
                {...link}
                className={styles.link}
                activeClassName={styles.linkActive}
              >
                <span className={styles.linkIcon}>{icon}</span>
                <span className={styles.linkLabel}>{t(label)}</span>
              </NavLink>
            ))}

            {user.role === 'super-admin' && (
              <NavLink
                className={styles.link}
                activeClassName={styles.linkActive}
                to={urls.edit}
              >
                <span className={styles.linkIcon}>
                  <BsPencil />
                </span>
                <span className={styles.linkLabel}>{t('Edit')}</span>
              </NavLink>
            )}
          </div>

          <div className={styles.logout}>
            <Button variant="text" icon={<BiPowerOff />} onClick={logout}>
              {t('Logout')}
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
