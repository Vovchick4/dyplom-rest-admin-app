import { useState } from 'react';
import { usePlateSyncMutation } from '../../../redux/services/menu.service';

import SectionName from './SectionName';
import SelectPlates from './SelectPlates';

const Pages = {
  SetName: 'SET_NAME',
  AddPlates: 'ADD_PLATES',
};

export default function AddSection({ loading, createMenuMutator, onCancel }) {
  const [plateSyncUpdateMutator] = usePlateSyncMutation();

  const [activePage, setActivePage] = useState(Pages.SetName);
  const [section, setSection] = useState(null);

  function handleSectionNameSubmit(formData) {
    createMenuMutator(formData)
      .unwrap()
      .then((res) => {
        setSection(res.data);
        setActivePage(Pages.AddPlates);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSelectPlatesSubmit(plates) {
    plateSyncUpdateMutator({ sectionId: section.id, plates });
    onCancel();
  }

  return (
    <div>
      {activePage === Pages.SetName && (
        <SectionName
          loading={loading}
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
