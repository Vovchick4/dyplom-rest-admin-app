import { useState, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import styles from './Menu.module.css';
import { Layout, PageHeader, Button, Modal, Loader } from '../../components';
import MenuCard from './MenuCard';
import AddSection from './AddSection';
import EditSection from './EditSection';
import { getErrorMessage } from '../../utils/getErrorMessage';

const MenuModals = {
  add: 'ADD_SECTION',
  edit: 'EDIT_SECTION',
};

export default function MenuPage() {
  const [sections, setSections] = useState([]);
  const [sectionsLoading, setSectionsLoading] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const [editSectionId, setEditSectionId] = useState(null);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    setSectionsLoading(true);

    axios({
      url: '/categories',
      method: 'GET',
      // headers: {
      //   restaurant: restaurant_id,
      // },
    })
      .then((res) => setSections(res.data.data))
      .catch((error) => toast.error(getErrorMessage(error)))
      .finally(() => setSectionsLoading(false));
  }, [i18n.language]);

  function openAddModal() {
    setActiveModal(MenuModals.add);
  }

  function openEditModal(sectionId) {
    setEditSectionId(sectionId);
    setActiveModal(MenuModals.edit);
  }

  function closeModal() {
    setEditSectionId(null);
    setActiveModal(null);
  }

  function handleAddSectionSubmit(section) {
    closeModal();
    setSections((prev) => [...prev, section]);
  }

  function handleSectionNameChanged(section) {
    setSections((prev) =>
      prev.map((sectionItem) =>
        sectionItem.id === section.id ? section : sectionItem
      )
    );
  }

  function handleEditSectionSubmit(section) {
    closeModal();
    setSections((prev) =>
      prev.map((sectionItem) =>
        sectionItem.id === section.id ? section : sectionItem
      )
    );
  }

  function deleteSection(sectionId) {
    if (!window.confirm(t('Confirm deleting the plate'))) return;

    setSectionsLoading(true);

    axios({
      url: `/categories/${sectionId}`,
      method: 'DELETE',
    })
      .then(() =>
        setSections((prev) => prev.filter(({ id }) => sectionId !== id))
      )
      .catch((error) => toast.error(getErrorMessage(error)))
      .finally(() => setSectionsLoading(false));
  }

  function toggleSectionActive(sectionId, active) {
    setSectionsLoading(true);

    const formData = new FormData();
    formData.append('active', Number(active));
    formData.append('_method', 'PATCH');

    axios({
      url: `/categories/${sectionId}`,
      method: 'POST',
      data: formData,
    })
      .then((res) => {
        setSections((prev) =>
          prev.map((sectionItem) =>
            sectionItem.id === sectionId ? res.data.data : sectionItem
          )
        );
      })
      .catch((error) => toast.error(getErrorMessage(error)))
      .finally(() => setSectionsLoading(false));
  }

  return (
    <Layout>
      <Modal visible={activeModal === MenuModals.add} onClose={closeModal}>
        <AddSection
          loading={sectionsLoading}
          setLoading={setSectionsLoading}
          onSubmit={handleAddSectionSubmit}
          onCancel={closeModal}
        />
      </Modal>

      <Modal
        visible={activeModal === MenuModals.edit && editSectionId !== null}
        onClose={closeModal}
      >
        <EditSection
          sectionId={editSectionId}
          loading={sectionsLoading}
          setLoading={setSectionsLoading}
          onNameChanged={handleSectionNameChanged}
          onSubmit={handleEditSectionSubmit}
          onCancel={closeModal}
        />
      </Modal>

      <PageHeader
        title="Menu"
        Button={
          <Button
            variant="page_style"
            icon={<IoMdAdd />}
            onClick={openAddModal}
          >
            {t('Add a section')}
          </Button>
        }
      />

      {sectionsLoading && (
        <div className={styles.loader}>
          <Loader centered />
        </div>
      )}

      {sections.length > 0 && !sectionsLoading && (
        <div className={styles.grid_content}>
          {sections.map((section) => (
            <MenuCard
              key={section.id}
              {...section}
              onEdit={openEditModal}
              onDelete={deleteSection}
              onToggleActive={toggleSectionActive}
            />
          ))}
        </div>
      )}
    </Layout>
  );
}
