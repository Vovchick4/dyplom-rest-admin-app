import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { DebounceInput } from 'react-debounce-input';
import { toast } from 'react-toastify';
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
import { GiCancel } from 'react-icons/gi';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getErrorMessage } from '../../utils/getErrorMessage';
import { hotelOperations } from '../../redux/hotel';
import urls from '../../config/urls';

import {
  Layout,
  PageHeader,
  Modal,
  Input,
  Button,
  Pagination,
  Loader,
} from '../../components';
import RestCard from './RestCard';
import AddRestaurant from './AddRestaurant';
import EditRestaurant from './EditRestaurant';

import styles from './RestaurantList.module.css';
import { translationTimeout } from '../../constants/translationTimeout';

const sortingOptions = [
  {
    label: 'Sort by name',
    value: 'name',
  },
  {
    label: 'Sort by value',
    value: 'value',
  },
  {
    label: 'Sort by abs',
    value: 'abs',
  },
  {
    label: 'Sort by abs4',
    value: 'abs4',
  },
];

const modals = {
  add: 'ADD REST',
  edit: 'EDIT_PLATE',
};

export default function RestaurantList() {
  const [searchText, setSearchText] = useState('');
  const [activeModal, setActiveModal] = useState(null);
  const [editRestId, setEditRestId] = useState(null);

  const [restaurants, setRestaurants] = useState([]);
  const [restLoading, setRestLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [sortBy, setSortBy] = useState(sortingOptions[0].value);

  const { t, i18n } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  function addRestOpenModal() {
    setActiveModal(modals.add);
  }

  function openEditRestModal(restId) {
    setActiveModal(modals.edit);
    setEditRestId(restId);
  }

  function closeModal() {
    setEditRestId(null);
    setActiveModal(null);
  }

  function changePage({ selected }) {
    setCurrentPage(selected);
  }

  useEffect(() => {
    fetchRests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, searchText, i18n.language]);

  function fetchRests() {
    setRestLoading(true);

    if (!searchText) {
      axios({
        url: '/restaurants',
        method: 'GET',
        params: {
          page: currentPage + 1,
        },
      })
        .then((res) => {
          setRestaurants(res.data.data);
          setTotalPages(res.data.meta.last_page);
        })
        .catch((error) => toast.error(getErrorMessage(error)))
        .finally(() => setRestLoading(false));
    } else {
      axios({
        url: `/restaurants/search/${searchText}`,
        method: 'GET',
      })
        .then((res) => {
          setRestaurants(res.data.data);
        })
        .catch((error) => toast.error(getErrorMessage(error)))
        .finally(() => setRestLoading(false));
    }
  }

  function createRestaurant(data) {
    setRestaurants(true);

    axios({
      url: '/restaurants',
      method: 'POST',
      data,
    })
      .then(() => {
        fetchRests();
        closeModal();
      })
      .catch((error) => toast.error(getErrorMessage(error)))
      .finally(() => setRestaurants(false));
  }

  function editRestaurant(restId, data) {
    setRestLoading(true);

    data.append('_method', 'PATCH');

    axios({
      url: `/restaurants/${restId}`,
      method: 'POST',
      data,
    })
      .then((res) => {
        setEditRestId(null);
        setRestaurants((prev) =>
          prev.map((restItem) =>
            restItem.id === restId ? res.data.data : restItem
          )
        );
        closeModal();
      })
      .catch((error) => toast.error(getErrorMessage(error)))
      .finally(() => setRestLoading(false));
  }

  function deleteRestaurant(restId) {
    if (!window.confirm('Confirm deleting the plate')) return;

    setRestLoading(true);

    axios({
      url: `/restaurants/${restId}`,
      method: 'DELETE',
    })
      .then(() => {
        setRestaurants((prev) => prev.filter(({ id }) => restId !== id));
      })
      .catch((error) => toast.error(getErrorMessage(error)))
      .finally(() => setRestLoading(false));
  }

  function selectHotel(hotelId) {
    dispatch(
      hotelOperations.getHotelById(hotelId, () => history.push(urls.home))
    );
  }

  return (
    <Layout>
      <PageHeader
        title={t('List of hotels')}
        Button={
          <Button
            onClick={addRestOpenModal}
            variant="page_style"
            icon={<IoMdAdd />}
          >
            {t('Add a hotel')}
          </Button>
        }
      />

      <Modal visible={activeModal === modals.add} onClose={closeModal}>
        <AddRestaurant
          onSubmit={createRestaurant}
          onCancel={closeModal}
          loading={restLoading}
        />
      </Modal>

      <Modal visible={activeModal === modals.edit} onClose={closeModal}>
        <EditRestaurant
          restId={editRestId}
          onSubmit={editRestaurant}
          onCancel={closeModal}
          loading={restLoading}
          setLoading={setRestLoading}
        />
      </Modal>

      <div className={styles.contentSearch}>
        <div className={styles.inputBox}>
          <DebounceInput
            className={styles.input}
            debounceTimeout={translationTimeout}
            type="search"
            name={`searchText:${i18n.language}`}
            autoComplete="off"
            placeholder={t('Search')}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {!searchText && <AiOutlineSearch className={styles.searchIcon} />}
          {searchText && (
            <GiCancel
              onClick={() => setSearchText('')}
              className={styles.cancelIcon}
            />
          )}
        </div>

        <div className={styles.selectList}>
          <Input.Select
            options={sortingOptions}
            value={sortBy}
            onChange={setSortBy}
          />
        </div>
      </div>

      <div className={styles.hr}></div>

      {restLoading && (
        <div className={styles.loader}>
          <Loader centered />
        </div>
      )}

      {!restLoading && restaurants.length > 0 && (
        <div className={styles.grid_content}>
          {restaurants.map((rest) => (
            <RestCard
              key={rest.id}
              {...rest}
              onEdit={openEditRestModal}
              onDelete={deleteRestaurant}
              onSelect={selectHotel}
            />
          ))}
        </div>
      )}

      {restaurants && (
        <div className={styles.pagination}>
          <p className={styles.paginationText}>
            Showing {currentPage + 1} out of {totalPages} restaurants
          </p>
          <Pagination
            currentPage={currentPage}
            pageCount={totalPages}
            onPageChange={changePage}
          />
        </div>
      )}
    </Layout>
  );
}
