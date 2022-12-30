import { useState, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

import styles from './Menu.module.css';
import {
  Layout,
  PageHeader,
  Button,
  Modal,
  Loader,
  NotFoundItems,
} from '../../components';
import MenuCard from './MenuCard';
import AddSection from './AddSection';
import EditSection from './EditSection';
import {
  useGetMenuQuery,
  useDeleteMenuMutation,
  useEditMenuMutation,
  useCreateMenuMutation,
} from '../../redux/services/menu.service';
import InfiniteScroll from 'react-infinite-scroll-component';

const MenuModals = {
  add: 'ADD_SECTION',
  edit: 'EDIT_SECTION',
};

export default function MenuPage() {
  const [infiniteData, setInfiniteData] = useState([]);
  const [page, setPage] = useState(0);
  const { data: sections, isLoading: sectionsLoading } = useGetMenuQuery(
    page + 1
  );
  const [createMenuMutator, { isLoading: createSectionLoading }] =
    useCreateMenuMutation();
  const [updateMenuMutator] = useEditMenuMutation();
  const [deleteMenuMutator] = useDeleteMenuMutation();

  const [activeModal, setActiveModal] = useState(null);
  const [editSectionId, setEditSectionId] = useState(null);

  const { t } = useTranslation();

  useEffect(() => {
    if (!sections) return;
    setInfiniteData((prev) => [...prev, ...sections.data]);
  }, [sections]);

  function openAddModal() {
    setActiveModal(MenuModals.add);
  }

  function openEditModal(sectionId) {
    setEditSectionId(sectionId);
    setActiveModal(MenuModals.edit);
  }

  function closeModal() {
    setActiveModal(null);
    setEditSectionId(null);
  }

  function deleteSection(sectionId) {
    if (!window.confirm(t('Confirm deleting the plate'))) return;
    deleteMenuMutator(sectionId);
  }

  function toggleSectionActive(sectionId, active) {
    const formData = new FormData();
    formData.append('active', Number(active));
    formData.append('_method', 'PATCH');
    updateMenuMutator({ sectionId, data: formData });
  }

  return (
    <Layout>
      <Modal visible={activeModal === MenuModals.add} onClose={closeModal}>
        <AddSection
          loading={createSectionLoading}
          createMenuMutator={createMenuMutator}
          onCancel={closeModal}
        />
      </Modal>

      <Modal
        visible={activeModal === MenuModals.edit && editSectionId !== null}
        onClose={closeModal}
      >
        <EditSection
          sectionId={editSectionId}
          updateSection={updateMenuMutator}
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

      {infiniteData.length > 0 && (
        <InfiniteScroll
          style={{ overflow: 'hidden' }}
          dataLength={sections.meta.total}
          next={() =>
            sections.meta.total !== infiniteData.length &&
            setPage((prev) => prev + 1)
          }
          hasMore={
            sections.meta.total > 20 ||
            sections.meta.total === infiniteData.length
          }
          loader={
            sections.meta.total !== infiniteData.length && <Loader centered />
          }
          scrollableTarget={'scrollId'}
        >
          <div className={styles.grid_content}>
            {infiniteData.map((section) => (
              <MenuCard
                key={section.id}
                {...section}
                onEdit={openEditModal}
                onDelete={deleteSection}
                onToggleActive={toggleSectionActive}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}

      {infiniteData.length === 0 && !sectionsLoading && (
        <NotFoundItems title="Haven't menus" />
      )}
    </Layout>
  );
}
