import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DebounceInput } from 'react-debounce-input';
import { IoMdAdd } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
import { GiCancel } from 'react-icons/gi';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

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
import { setRest } from '../../redux/features/rest-slice';
import {
  useGetRestaurantsQuery,
  useCreateRestaurantMutation,
  useEditRestaurantMutation,
  useRemoveRestaurantMutation,
} from '../../redux/services/restaurant.service';

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
  const [sortBy, setSortBy] = useState(sortingOptions[0].value);

  const [currentPage, setCurrentPage] = useState(0);
  const { data: restaurants, isLoading: restLoading } = useGetRestaurantsQuery({
    page: currentPage + 1,
    searchText,
  });
  const [createRestaurantMutator, { isLoading: createLoading }] =
    useCreateRestaurantMutation();
  const [updateRestaurantMutator, { isLoading: updateLoading }] =
    useEditRestaurantMutation();
  const [deleteRestaurantMutator] = useRemoveRestaurantMutation();

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
    setActiveModal(null);
  }

  function changePage({ selected }) {
    setCurrentPage(selected);
  }

  function createRestaurant(data) {
    createRestaurantMutator(data);
  }

  function editRestaurant(restId, data) {
    updateRestaurantMutator({ restId, data });
  }

  function deleteRestaurant(restId) {
    if (!window.confirm('Confirm deleting the plate')) return;
    deleteRestaurantMutator(restId);
  }

  function selectRestaurant(restData) {
    dispatch(setRest(restData));
    history.push(urls.home);
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
          loading={createLoading}
        />
      </Modal>

      <Modal visible={activeModal === modals.edit} onClose={closeModal}>
        <EditRestaurant
          restId={editRestId}
          onSubmit={editRestaurant}
          onCancel={closeModal}
          loading={updateLoading}
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

      {!restLoading && restaurants?.data.length > 0 && (
        <div className={styles.grid_content}>
          {restaurants.data.map((rest) => (
            <RestCard
              key={rest.id}
              {...rest}
              onEdit={openEditRestModal}
              onDelete={deleteRestaurant}
              onSelect={selectRestaurant}
            />
          ))}
        </div>
      )}

      {restaurants?.meta?.last_page && !searchText && (
        <div className={styles.pagination}>
          <p className={styles.paginationText}>
            Showing {currentPage + 1} out of {restaurants?.meta.last_page}{' '}
            restaurants
          </p>
          <Pagination
            currentPage={currentPage}
            pageCount={restaurants?.meta.last_page}
            onPageChange={changePage}
          />
        </div>
      )}
    </Layout>
  );
}
