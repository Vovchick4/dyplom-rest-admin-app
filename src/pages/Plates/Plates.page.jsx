import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IoMdAdd } from 'react-icons/io';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { DebounceInput } from 'react-debounce-input';

import {
  Button,
  Layout,
  PageHeader,
  Modal,
  Pagination,
  Loader,
} from '../../components';
import PlateCard from './PlateCard';
import AddPlate from './AddPlate';
import EditPlate from './EditPlate';
import { getErrorMessage } from '../../utils/getErrorMessage';
import { AiOutlineSearch } from 'react-icons/ai';
import { GiCancel } from 'react-icons/gi';
import { authSelectors } from '../../redux/auth';
import styles from './Plates.module.css';
import { translationTimeout } from '../../constants/translationTimeout';

const PlateModals = {
  add: 'ADD_PLATE',
  edit: 'EDIT_PLATE',
};

export default function PlatesPage() {
  const [plates, setPlates] = useState([]);
  const [platesLoading, setPlatesLoading] = useState(false);
  const [togglePlateLoading, setTogglePlateLoading] = useState(null);

  const [activeModal, setActiveModal] = useState(null);
  const [editPlateId, setEditPlateId] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [pageCount, setPageCount] = useState(9);
  const [searchText, setSearchText] = useState('');

  const { restaurant_id } = useSelector(authSelectors.getUser);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetchPlates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, i18n.language, searchText]);

  function fetchPlates() {
    setPlatesLoading(true);

    axios({
      url: '/plates',
      method: 'GET',
      headers: {
        searchText,
        //restaurant: restaurant_id,
      },
      params: {
        page: currentPage + 1,
      },
    })
      .then((res) => {
        setPlates(res.data.data);
        setTotalPages(res.data.meta.last_page);
      })
      .catch((error) => toast.error(getErrorMessage(error)))
      .finally(() => setPlatesLoading(false));
  }

  function openAddPlateModal() {
    setActiveModal(PlateModals.add);
  }

  function openEditPlateModal(plateId) {
    setActiveModal(PlateModals.edit);
    setEditPlateId(plateId);
  }

  function closeModal() {
    setEditPlateId(null);
    setActiveModal(null);
  }

  function changePage({ selected }) {
    setCurrentPage(selected);
  }

  function createPlate(data) {
    setPlatesLoading(true);

    axios({
      url: '/plates',
      method: 'POST',
      data,
    })
      .then(() => {
        fetchPlates();
        closeModal();
      })
      .catch((error) => toast.error(getErrorMessage(error)))
      .finally(() => setPlatesLoading(false));
  }

  function editPlate(plateId, data) {
    setPlatesLoading(true);

    data.append('_method', 'PATCH');

    axios({
      url: `/plates/${plateId}`,
      method: 'POST',
      data,
    })
      .then((res) => {
        setEditPlateId(null);
        setPlates((prev) =>
          prev.map((plateItem) =>
            plateItem.id === plateId ? res.data.data : plateItem
          )
        );
        closeModal();
      })
      .catch((error) => toast.error(getErrorMessage(error)))
      .finally(() => setPlatesLoading(false));
  }

  function deletePlate(plateId) {
    if (!window.confirm('Confirm deleting the plate')) return;

    setPlatesLoading(true);

    axios({
      url: `/plates/${plateId}`,
      method: 'DELETE',
    })
      .then(() => {
        setPlates((prev) => prev.filter(({ id }) => plateId !== id));
      })
      .catch((error) => toast.error(getErrorMessage(error)))
      .finally(() => setPlatesLoading(false));
  }

  function togglePlateActive(plateId, active) {
    setTogglePlateLoading(plateId);

    const formData = new FormData();
    formData.append('active', Number(active));
    formData.append('_method', 'PATCH');

    axios({
      url: `/plates/${plateId}`,
      method: 'POST',
      data: formData,
    })
      .then((res) => {
        setPlates((prev) =>
          prev.map((plateItem) =>
            plateItem.id === plateId ? res.data.data : plateItem
          )
        );
      })
      .catch((error) => toast.error(getErrorMessage(error)))
      .finally(() => setTogglePlateLoading(null));
  }

  return (
    <Layout>
      <Modal visible={activeModal === PlateModals.add} onClose={closeModal}>
        <AddPlate
          onCancel={closeModal}
          onSubmit={createPlate}
          loading={platesLoading}
        />
      </Modal>
      <Modal
        visible={activeModal === PlateModals.edit && editPlateId !== null}
        onClose={closeModal}
      >
        <EditPlate
          plateId={editPlateId}
          onCancel={closeModal}
          onSubmit={editPlate}
          loading={platesLoading}
          setLoading={setPlatesLoading}
        />
      </Modal>
      <PageHeader
        title={t('List of plates')}
        Button={
          <Button
            variant="page_style"
            icon={<IoMdAdd />}
            onClick={openAddPlateModal}
          >
            {t('Add a plate')}
          </Button>
        }
      />

      <div className={styles.content}>
        <div className={styles.inputBox}>
          <DebounceInput
            className={styles.input}
            debounceTimeout={translationTimeout}
            type="search"
            name={`searchText:${i18n.language}`}
            autoComplete="off"
            placeholder={t('Search plates')}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <AiOutlineSearch className={styles.searchIcon} />
          <button
            className={styles.clearButton}
            type="button"
            onClick={() => setSearchText('')}
          >
            <GiCancel className={styles.cancelIcon} />
          </button>
        </div>
      </div>

      {platesLoading && (
        <div className={styles.loader}>
          <Loader centered />
        </div>
      )}

      {!platesLoading && plates.length > 0 && (
        <div className={styles.grid_content}>
          {plates.map((plate) => (
            <PlateCard
              key={plate.id}
              {...plate}
              loading={togglePlateLoading === plate.id}
              onEdit={openEditPlateModal}
              onDelete={deletePlate}
              onToggleActive={togglePlateActive}
            />
          ))}
        </div>
      )}

      {plates && (
        <div className={styles.pagination}>
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
