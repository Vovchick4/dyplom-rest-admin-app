import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineClose, AiOutlineEdit } from 'react-icons/ai';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { Input, FormRow, Container, Button } from '../../../components';

import styles from '../AddRestaurant/AddRestaurant.module.css';
import placeholderImage from '../../../images/placeholder.jpg';
import { useGetRestaurantByIdEditQuery } from '../../../redux/services/restaurant.service';

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .trim()
    .min(1, 'Restaurant name must be at least 1 character')
    .max(255, 'Restaurant name must be at most 255 characters')
    .required('Restaurant name is required'),
  address: Yup.string()
    .trim()
    .min(1, 'Address must be at least 1 character')
    .max(255, 'Address must be at most 255 characters')
    .required('Address is required'),
});

const reader = new FileReader();

export default function EditRestaurant({
  restId,
  loading,
  onSubmit,
  onCancel,
}) {
  const { data, isLoading } = useGetRestaurantByIdEditQuery(restId);

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(placeholderImage);

  const { t } = useTranslation();

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
      name: '',
      address: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData(formRef.current);

      if (!image) {
        formData.delete('logo');
      }

      onSubmit(restId, formData);
    },
  });

  useEffect(() => {
    if (!data) return;
    setImagePreview(data.logo);
    formik.setValues({
      name: data.name,
      address: data.address,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

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
                disabled={isLoading || loading}
                type="text"
                placeholder={t('Name of the hotel')}
                autoComplete="name"
                name="name"
                value={formik.values.name}
                error={formik.touched.name && t(formik.errors.name)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormRow>
            <FormRow>
              <Input
                required
                disabled={isLoading || loading}
                type="text"
                placeholder={t('Address')}
                autoComplete="street-address"
                name="address"
                value={formik.values.address}
                error={formik.touched.address && t(formik.errors.address)}
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
                  name="logo"
                  isabled={isLoading || loading}
                  icon={AiOutlineEdit}
                  accept="image/*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
            </div>

            <Button
              type="submit"
              fullWidth
              disabled={isLoading || loading}
              loading={isLoading || loading}
            >
              <span className={styles.submitText}>{t('Save')}</span>
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
