import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Input, FormRow, Container, Button } from '../../../components';

import styles from './AddRestaurant.module.css';
import placeholderImage from '../../../images/placeholder.jpg';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(1, 'Restaurant name must be at least 1 character')
    .max(255, 'Restaurant name must be at most 255 characters')
    .required('Restaurant name is required'),
  // 'name:fr': Yup.string()
  //   .trim()
  //   .min(1, 'Restaurant name must be at least 1 character')
  //   .max(255, 'Restaurant name must be at most 255 characters')
  //   .required('Restaurant name is required'),
  address: Yup.string()
    .trim()
    .min(1, 'Address must be at least 1 character')
    .max(255, 'Address must be at most 255 characters')
    .required('Address is required'),
  // 'address:fr': Yup.string()
  //   .trim()
  //   .min(1, 'Address must be at least 1 character')
  //   .max(255, 'Address must be at most 255 characters')
  //   .required('Address is required'),
});

const reader = new FileReader();

export default function AddRestaurant({ loading, onSubmit, onCancel }) {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(placeholderImage);

  const { t } = useTranslation();

  // const [dataLanguage, setDataLanguage] = useState(i18n.language);

  useEffect(() => {
    if (!image) {
      setImagePreview(placeholderImage);
    } else {
      reader.readAsDataURL(image);
      reader.onloadend = () => setImagePreview(reader.result);
    }
  }, [image]);

  const formRef = useRef();

  const formik = useFormik({
    initialValues: {
      name: '',
      // 'name:fr': '',
      address: '',
      // 'address:fr': '',
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData(formRef.current);

      // Object.entries(values).forEach(([key, value]) => {
      //   if (key.includes(':') && !key.endsWith(`:${dataLanguage}`)) {
      //     formData.append(key, value);
      //   }
      // });

      onSubmit(formData);
    },
  });

  return (
    <React.Fragment>
      <Container>
        <div className={styles.formBox}>
          <div className={styles.header}>
            <h3 className={styles.title}>{t('Add a hotel')}</h3>
            <button className={styles.closeBtn} onClick={onCancel}>
              <AiOutlineClose fontSize="30px" />
            </button>
          </div>
          <form ref={formRef} onSubmit={formik.handleSubmit}>
            <FormRow>
              <Input
                required
                disabled={loading}
                type="text"
                placeholder={t('Name of the hotel')}
                autoComplete="name"
                name={`name`}
                value={formik.values[`name`]}
                error={formik.touched[`name`] && t(formik.errors[`name`])}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormRow>
            <FormRow>
              <Input
                required
                disabled={loading}
                type="text"
                placeholder={t('Address')}
                autoComplete="street-address"
                name={`address`}
                value={formik.values[`address`]}
                error={formik.touched[`address`] && t(formik.errors[`address`])}
                onChange={formik.handleChange}
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
                  name="logo"
                  icon={AiOutlineEdit}
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>

            <Button type="submit" fullWidth disabled={loading}>
              <span className={styles.submitText}>{t('Add')}</span>
            </Button>
            <div className={styles.footerContent}>
              <p onClick={onCancel} className={styles.footerLink}>
                {t('Cancel')}
              </p>
            </div>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
}
