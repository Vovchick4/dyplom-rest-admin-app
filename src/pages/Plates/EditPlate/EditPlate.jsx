import { useState, useEffect, useRef } from 'react';
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { DebounceInput } from 'react-debounce-input';

import {
  Container,
  FormRow,
  Input,
  Button,
  LanguageTabs,
} from '../../../components';
import styles from '../AddPlate/AddPlate.module.css';
import placeholderImage from '../../../images/placeholder.jpg';
import { getErrorMessage } from '../../../utils/getErrorMessage';
import { useGoogleTranslate } from '../../../hooks';
import { translationTimeout } from '../../../constants/translationTimeout';

const validationSchema = Yup.object().shape({
  'name:en': Yup.string()
    .trim()
    .min(1, 'Plate name must be at least 1 character')
    .max(255, 'Plate name must be at most 255 characters')
    .required('Plate name is required'),
  'name:fr': Yup.string()
    .trim()
    .min(1, 'Plate name must be at least 1 character')
    .max(255, 'Plate name must be at most 255 characters')
    .required('Plate name is required'),
  price: Yup.number()
    .min(0, "Price can't be less then 0")
    .required('Price is required'),
  'description:en': Yup.string().trim(),
  'description:fr': Yup.string().trim(),
});

const reader = new FileReader();

export default function EditPlate({
  plateId,
  loading,
  setLoading,
  onSubmit,
  onCancel,
}) {
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
      price: '',
      'description:en': '',
      'description:fr': '',
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData(formRef.current);
      if (!image) {
        formData.delete('image');
      }
      Object.entries(values).forEach(([key, value]) => {
        if (key.includes(':') && !key.endsWith(`:${dataLanguage}`)) {
          formData.append(key, value);
        }
      });

      onSubmit(plateId, formData);
    },
  });

  const { translate, lastEditedInputRef, translationLoading } =
    useGoogleTranslate(formik);

  useEffect(() => {
    setLoading(true);

    axios({
      url: `/plates/${plateId}`,
      method: 'GET',
    })
      .then((res) => {
        const plateData = res.data.data;
        setImagePreview(plateData.image);

        formik.setValues({
          'name:en': plateData['name:en'],
          'name:fr': plateData['name:fr'],
          price: plateData.price,
          'description:en': plateData['description:en'],
          'description:fr': plateData['description:fr'],
        });
      })
      .catch((error) => toast.error(getErrorMessage(error)))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.container}>
      <Container>
        <div className={styles.formBox}>
          <div className={styles.header}>
            <h3 className={styles.title}>{t('Edit plate')}</h3>
            <button className={styles.closeBtn} onClick={onCancel}>
              <AiOutlineClose fontSize="30px" />
            </button>
          </div>
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
                type="text"
                debounceTimeout={translationTimeout}
                required
                disabled={loading}
                autoComplete="on"
                placeholder={t('Name of the plate')}
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
            <FormRow>
              <Input
                type="number"
                min="0"
                step=".01"
                required
                disabled={loading}
                placeholder={t('Price')}
                name="price"
                value={formik.values.price}
                error={formik.touched.price && t(formik.errors.price)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormRow>
            <FormRow>
              <DebounceInput
                element={Input}
                debounceTimeout={translationTimeout}
                type="text"
                disabled={loading}
                autoComplete="off"
                placeholder={t('Description')}
                name={`description:${dataLanguage}`}
                value={formik.values[`description:${dataLanguage}`]}
                error={
                  formik.touched[`description:${dataLanguage}`] &&
                  t(formik.errors[`description:${dataLanguage}`])
                }
                onChange={(e) => {
                  formik.handleChange(e);
                  if (dataLanguage === i18n.language) {
                    translate(e.target.value, 'description');
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
                  name="image"
                  disabled={loading}
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
              <span className={styles.submitText}>{t('Save')}</span>
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}
