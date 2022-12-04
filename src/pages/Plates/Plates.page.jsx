import { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { DebounceInput } from 'react-debounce-input';

import {
  Button,
  Layout,
  PageHeader,
  Modal,
  Pagination,
  Loader,
  NotFoundItems,
} from '../../components';
import PlateCard from './PlateCard';
import AddPlate from './AddPlate';
import EditPlate from './EditPlate';
import { AiOutlineSearch } from 'react-icons/ai';
import { GiCancel } from 'react-icons/gi';
import styles from './Plates.module.css';
import { translationTimeout } from '../../constants/translationTimeout';
import {
  useCreatePlateMutation,
  useEditPlateMutation,
  useGetPlatesQuery,
  useRemovePlateMutation,
} from '../../redux/services/plate.service';

const PlateModals = {
  add: 'ADD_PLATE',
  edit: 'EDIT_PLATE',
};

export default function PlatesPage() {
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const { data: plates, isLoading: platesLoading } = useGetPlatesQuery({
    searchText,
    page: currentPage,
  });
  const [createPlateMutation, { isLoading: createLoading }] =
    useCreatePlateMutation();
  const [editPlateMutation, { isLoading: editLoading }] =
    useEditPlateMutation();
  const [removePlateMutation] = useRemovePlateMutation();

  const [activeModal, setActiveModal] = useState(null);
  const [editPlateId, setEditPlateId] = useState(null);

  const [totalPages] = useState(plates && plates.meta.last_page);

  const { t, i18n } = useTranslation();

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
    createPlateMutation(data);
  }

  function editPlate(plateId, data) {
    data.append('_method', 'PATCH');
    editPlateMutation({ plateId, data });
  }

  function deletePlate(plateId) {
    if (!window.confirm('Confirm deleting the plate')) return;
    removePlateMutation(plateId);
  }

  function togglePlateActive(plateId, active) {
    const formData = new FormData();
    formData.append('active', Number(active));
    formData.append('_method', 'PATCH');
    editPlateMutation({ plateId, data: formData });
  }

  return (
    <Layout>
      <Modal visible={activeModal === PlateModals.add} onClose={closeModal}>
        <AddPlate
          onCancel={closeModal}
          onSubmit={createPlate}
          loading={createLoading}
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
          loading={editLoading}
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

      {!platesLoading && plates?.data?.length > 0 && (
        <div className={styles.grid_content}>
          {plates.data.map((plate) => (
            <PlateCard
              key={plate.id}
              {...plate}
              loading={platesLoading}
              onEdit={openEditPlateModal}
              onDelete={deletePlate}
              onToggleActive={togglePlateActive}
            />
          ))}
        </div>
      )}

      {plates?.data?.length > 9 && (
        <div className={styles.pagination}>
          <Pagination
            currentPage={currentPage}
            pageCount={totalPages}
            onPageChange={changePage}
          />
        </div>
      )}

      {plates?.data?.length === 0 && !platesLoading && (
        <NotFoundItems title="Haven't plates" />
      )}
    </Layout>
  );
}
