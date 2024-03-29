import { useState } from 'react';

import SectionName from './SectionName';
import SelectPlates from './SelectPlates';
import { Loader } from '../../../components';
import {
  useGetMenuByIdQuery,
  usePlateSyncMutation,
} from '../../../redux/services/menu.service';

const Pages = {
  SetName: 'SET_NAME',
  AddPlates: 'ADD_PLATES',
};

export default function EditSection({ sectionId, updateSection, onCancel }) {
  const { data: section, isLoading: loading } = useGetMenuByIdQuery(sectionId, {
    skip: !sectionId,
  });
  const [plateSyncUpdateMutator, { isLoading: isLoadingUpdating }] =
    usePlateSyncMutation();
  const [activePage, setActivePage] = useState(Pages.SetName);

  function handleSectionNameSubmit(formData) {
    formData.append('_method', 'PATCH');
    updateSection({ sectionId, data: formData });
    setActivePage(Pages.AddPlates);
  }

  function handleSelectPlatesSubmit(plates) {
    plateSyncUpdateMutator({ sectionId: section.id, plates });
    onCancel();
  }

  return (
    <div>
      {isLoadingUpdating && <Loader />}

      {activePage === Pages.SetName && (
        <SectionName
          section={section}
          loading={loading || isLoadingUpdating}
          onSubmit={handleSectionNameSubmit}
          onCancel={onCancel}
        />
      )}

      {activePage === Pages.AddPlates && section && (
        <SelectPlates
          section={section}
          onSubmit={handleSelectPlatesSubmit}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}
