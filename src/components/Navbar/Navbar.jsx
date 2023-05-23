import Popup from 'reactjs-popup';
import { AiOutlineMenu } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import styles from './Navbar.module.css';
import { Container } from '../';
import Notifications from './Notifications';
import Settings from './Settings';
import User from './User';
import { NotFoundItems, Dropdown } from '../';
import { ordersSelectors } from '../../redux/orders';
import urls from '../../config/urls';
import { getUserSelector } from '../../redux/features/auth-slice';
import { setLocale } from '../../redux/features/localization-slice';
import { getRestSelector } from '../../redux/features/rest-slice';
import { useGetOrdersQuery } from '../../redux/services/order.service';

export default function Navbar({ onOpenSidebar }) {
  const { t, i18n } = useTranslation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const location = useLocation();

  const dispatch = useDispatch();
  const user = useSelector(getUserSelector);
  const rest = useSelector(getRestSelector);
  // const newOrdersCount = useSelector(ordersSelectors.getNewOrdersCount);
  const { data } = useGetOrdersQuery();

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
                  : user.role === 'super-admin' && rest
                  ? rest.name
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
                        dispatch(setLocale('en'));
                      },
                    },
                    {
                      key: 'fr',
                      label: 'FR',
                      onClick: () => {
                        dispatch(setLocale('fr'));
                      },
                    },
                  ]}
                />
              </div>

              <Popup
                trigger={
                  <button style={{ background: 'none', border: 0 }}>
                    <Notifications
                      count={
                        data?.data?.filter(({ status }) => status === 'new')
                          .length
                      }
                    />
                  </button>
                }
                position="bottom center"
              >
                {data?.data?.filter(({ status }) => status === 'new')
                  ?.length === 0 && (
                  <NotFoundItems title={"Haven't order(s)"} size="small" />
                )}
                {data?.data?.filter(({ status }) => status === 'new')
                  ?.length !== 0 && <NotFoundItems size="medium" />}
              </Popup>
              <Settings />
              <User />
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}
