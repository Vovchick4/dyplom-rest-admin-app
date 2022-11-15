import { AiOutlineMenu } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import styles from './Navbar.module.css';
import { Container } from '../';
import Notifications from './Notifications';
import Settings from './Settings';
import User from './User';
import { Dropdown } from '../';
import { ordersSelectors } from '../../redux/orders';
import { authSelectors } from '../../redux/auth';
import { hotelSelectors } from '../../redux/hotel';
import urls from '../../config/urls';

export default function Navbar({ onOpenSidebar }) {
  const { t, i18n } = useTranslation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const location = useLocation();

  const user = useSelector(authSelectors.getUser);
  const hotel = useSelector(hotelSelectors.getHotel);
  const newOrdersCount = useSelector(ordersSelectors.getNewOrdersCount);

  function openDropdown() {
    setDropdownVisible(true);
  }

  function closeDropdown() {
    setDropdownVisible(false);
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Container>
          <div className={styles.header_content}>
            <button
              type="button"
              className={styles.sidebarToggler}
              onClick={onOpenSidebar}
            >
              <AiOutlineMenu fontSize="28px" />
            </button>
            <div>
              <span className={styles.header_title}>
                <span>{t('Hi')}, </span>
                {location.pathname === urls.hotelList
                  ? user.name
                  : user.role === 'super-admin' && hotel
                  ? hotel.name
                  : user.restaurant_slug}
              </span>
              <div className={styles.links}>
                {user.role === 'super-admin' ? (
                  location.pathname === urls.hotelList ? (
                    <span className={styles.header_link_rest_disabled}>
                      {t('All hotels')}
                    </span>
                  ) : (
                    <Link
                      className={styles.header_link_rest}
                      to={urls.hotelList}
                    >
                      {t('All hotels')}
                    </Link>
                  )
                ) : null}

                {location.pathname === urls.home ? (
                  <span className={styles.header_link_disabled}>
                    {t('Main page')}
                  </span>
                ) : (
                  <Link className={styles.header_link} to={urls.home}>
                    {t('Main page')}
                  </Link>
                )}
              </div>
            </div>
            <div className={styles.icons}>
              <div className={styles.languageBox}>
                <button
                  type="button"
                  className={styles.languageToggler}
                  onClick={openDropdown}
                >
                  {i18n.language}
                </button>
                <Dropdown
                  open={dropdownVisible}
                  onClose={closeDropdown}
                  options={[
                    {
                      key: 'en',
                      label: 'EN',
                      onClick: () => {
                        i18n.changeLanguage('en');
                        localStorage.setItem('language', 'en');
                      },
                    },
                    {
                      key: 'fr',
                      label: 'FR',
                      onClick: () => {
                        i18n.changeLanguage('fr');
                        localStorage.setItem('language', 'fr');
                      },
                    },
                  ]}
                />
              </div>

              <Notifications count={newOrdersCount} />
              <Settings />
              <User />
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
