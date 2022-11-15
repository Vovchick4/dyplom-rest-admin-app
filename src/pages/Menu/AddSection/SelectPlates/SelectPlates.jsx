import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import styles from './SelectPlates.module.css';
import { Checkbox, Button, Modal, Loader } from '../../../../components';
import { getErrorMessage } from '../../../../utils/getErrorMessage';

const validationSchema = Yup.object().shape({
  plates: Yup.array(Yup.string()),
});

export default function SelectPlates({ section, loading, onSubmit, onCancel }) {
  const [plates, setPlates] = useState([]);
  const [platesLoading, setPlatesLoading] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    if (!section) return;

    setPlatesLoading(true);

    axios({
      url: `/categories/${section.id}/plates-list`,
      method: 'GET',
    })
      .then((res) => setPlates(res.data.data))
      .catch((error) => toast.error(getErrorMessage(error)))
      .finally(() => setPlatesLoading(false));
  }, [section]);

  const formik = useFormik({
    initialValues: {
      plates: [],
    },
    validationSchema,
    onSubmit: (values) => {
      const formattedValues = validationSchema.cast(values);
      onSubmit(formattedValues.plates);
    },
  });

  return (
    <div className={styles.platesContainer}>
      <Modal.Header
        title={`${t('Add plates to')} "${section.name}" ${t('section')}`}
        onCancel={onCancel}
      />

      <form onSubmit={formik.handleSubmit}>
        <div>
          {platesLoading && (
            <div className={styles.loader}>
              <Loader centered />
            </div>
          )}

          {plates.length > 0 && !platesLoading && (
            <div className={styles.platesGrid}>
              {plates.map((plate, index) => (
                <Checkbox
                  key={index}
                  disabled={loading}
                  label={
                    <div className={styles.plateItemLabel}>
                      <img
                        className={styles.plateItemIcon}
                        src={plate.image}
                        alt={plate.name}
                      />
                      <h5 className={styles.plateItemText}>{plate.name}</h5>
                    </div>
                  }
                  name="plates"
                  value={plate.id}
                  checked={formik.values.plates.includes(plate.id.toString())}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
              ))}
            </div>
          )}
        </div>

        <div className={styles.platesApplyBox}>
          <Button
            type="submit"
            disabled={platesLoading || loading}
            loading={loading}
          >
            {t('Apply')}
          </Button>
        </div>
      </form>
    </div>
  );
}
