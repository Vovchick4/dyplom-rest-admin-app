import { useState, useEffect, useRef } from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import { DebounceInput } from 'react-debounce-input';

import {
  Container,
  FormRow,
  Input,
  Button,
  Modal,
  LanguageTabs,
} from '../../../../components';
import styles from './SectionName.module.css';
import placeholderImage from '../../../../images/placeholder.jpg';
import { useGoogleTranslate } from '../../../../hooks';
import { translationTimeout } from '../../../../constants/translationTimeout';

const validationSchema = Yup.object().shape({
  'name:en': Yup.string()
    .trim()
    .min(1, 'Section name must be at least 1 character')
    .max(255, 'Section name must be at most 255 characters')
    .required('Section name is required'),
  'name:fr': Yup.string()
    .trim()
    .min(1, 'Section name must be at least 1 character')
    .max(255, 'Section name must be at most 255 characters')
    .required('Section name is required'),
});

const reader = new FileReader();

export default function SectionName({ loading, onSubmit, onCancel }) {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(placeholderImage);

  const { t, i18n } = useTranslation();

  const [dataLanguage, setDataLanguage] = useState(i18n.language);

  const formRef = useRef();

  useEffect(() => {
    if (!image) {
      setImagePreview(placeholderImage);
    } else {
      reader.readAsDataURL(image);
      reader.onloadend = () => setImagePreview(reader.result);
    }
  }, [image]);

  const formik = useFormik({
    initialValues: {
      'name:en': '',
      'name:fr': '',
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData(formRef.current);
      Object.entries(values).forEach(([key, value]) => {
        if (key.includes(':') && !key.endsWith(`:${dataLanguage}`)) {
          formData.append(key, value);
        }
      });

      onSubmit(formData);
    },
  });

  const { translate, lastEditedInputRef, translationLoading } =
    useGoogleTranslate(formik);

  return (
    <div>
      <Container>
        <div className={styles.formBox}>
          <Modal.Header title={t('Add section')} onCancel={onCancel} />

          <FormRow>
            <LanguageTabs
              value={dataLanguage}
              onChange={setDataLanguage}
              loading={translationLoading}
            />
          </FormRow>

          <form ref={formRef} onSubmit={formik.handleSubmit}>
            <FormRow>
              <DebounceInput
                element={Input}
                debounceTimeout={translationTimeout}
                type="text"
                required
                disabled={loading}
                autoComplete="off"
                placeholder={t('Name of the section')}
                name={`name:${dataLanguage}`}
                value={formik.values[`name:${dataLanguage}`]}
                error={
                  formik.touched[`name:${dataLanguage}`] &&
                  t(formik.errors[`name:${dataLanguage}`])
                }
                onChange={(e) => {
                  formik.handleChange(e);
                  if (dataLanguage === i18n.language) {
                    translate(e.target.value, 'name');
                  }
                  lastEditedInputRef.current = e.target;
                }}
                onBlur={formik.handleBlur}
              />
            </FormRow>

            <div className={styles.imgPreviewBox}>
              <img
                className={styles.imgPreview}
                src={imagePreview}
                alt="Plate preview"
              />
              <div className={styles.imgInputBox}>
                <Input.FileIcon
                  required
                  disabled={loading}
                  name="image"
                  icon={AiOutlineEdit}
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              disabled={loading}
              loading={loading}
            >
              <span className={styles.submitText}>{t('Create')}</span>
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
