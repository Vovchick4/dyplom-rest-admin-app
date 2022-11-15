import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import { getErrorMessage } from '../../../utils/getErrorMessage';
import SectionName from './SectionName';
import SelectPlates from './SelectPlates';

const Pages = {
  SetName: 'SET_NAME',
  AddPlates: 'ADD_PLATES',
};

export default function AddSection({
  loading,
  setLoading,
  onSubmit,
  onCancel,
}) {
  const [activePage, setActivePage] = useState(Pages.SetName);
  const [section, setSection] = useState(null);

  function handleSectionNameSubmit(formData) {
    setLoading(true);

    axios({
      url: '/categories',
      method: 'POST',
      data: formData,
    })
      .then((res) => {
        setSection(res.data.data);
        setActivePage(Pages.AddPlates);
      })
      .catch((error) => toast.error(getErrorMessage(error)))
      .finally(() => setLoading(false));
  }

  function handleSelectPlatesSubmit(plates) {
    setLoading(true);

    axios({
      url: `/categories/${section.id}/plates-sync`,
      method: 'POST',
      data: {
        plate_ids: plates,
      },
    })
      .then(() => onSubmit(section))
      .catch((error) => toast.error(getErrorMessage(error)))
      .finally(() => setLoading(false));
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
          loading={loading}
          setLoading={setLoading}
          onSubmit={handleSelectPlatesSubmit}
          onCancel={onCancel}
        />
      )}
    </div>
  );
}
