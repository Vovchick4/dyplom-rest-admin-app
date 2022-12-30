import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import styles from './SelectPlates.module.css';
import { Checkbox, Button, Modal, Loader } from '../../../../components';
import { useGetPlateListSyncQuery } from '../../../../redux/services/menu.service';

const validationSchema = Yup.object().shape({
  plates: Yup.array(Yup.string()),
});

export default function SelectPlates({ section, onSubmit, onCancel }) {
  const { data: plates, isLoading: platesLoading } = useGetPlateListSyncQuery(
    section?.id
  );

  const { t } = useTranslation();

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

          {plates?.length > 0 && !platesLoading && (
            <div className={styles.platesGrid}>
              {plates.map((plate, index) => (
                <Checkbox
                  key={index}
                  disabled={platesLoading}
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
            disabled={platesLoading}
            loading={platesLoading}
          >
            {t('Apply')}
          </Button>
        </div>
      </form>
    </div>
  );
}
