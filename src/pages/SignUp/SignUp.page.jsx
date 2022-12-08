import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import urls from '../../config/urls';
import sharedStyles from '../../styles/LoginSignUpShared.module.css';
import { Input, Button, FormRow } from '../../components';
import logoImg from '../../images/Ouiorder_logo_horiz.svg';
import { useRegisterMutation } from '../../redux/services/auth.service';

const validationSchema = Yup.object().shape({
  restaurant_name: Yup.string()
    .trim()
    .min(1, 'Restaurant name must be at least 1 character')
    .max(255, 'Restaurant name must be at most 255 characters')
    .required('Restaurant name is required'),
  address: Yup.string().trim().min(1).max(255).required('Address is required'),
  name: Yup.string()
    .trim()
    .min(1, 'First name must be at least 1 character')
    .max(255, 'First name must be at most 255 characters')
    .required('First name is required'),
  lastname: Yup.string()
    .trim()
    .min(1, 'Last name must be at least 1 character')
    .max(255, 'Last name must be at most 255 characters')
    .required('Last name is required'),
  phone: Yup.string()
    .trim()
    .min(1, 'Phone number must be at least 1 character')
    .max(255, 'Phone number must be at most 255 characters')
    .required('Phone number is required'),
  email: Yup.string()
    .trim()
    .email('Email must be a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(255, 'Password must be at most 255 characters')
    .required('Password is required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required(),
});

export default function SignUpPage() {
  const [registerUserMutation, { isLoading: authLoading }] =
    useRegisterMutation();
  const [image, setImage] = useState(null);
  const [imageTouched, setImageTouched] = useState(false);

  const { t } = useTranslation();

  const formRef = useRef();

  const formik = useFormik({
    initialValues: {
      restaurant_name: '',
      address: '',
      name: '',
      lastname: '',
      phone: '',
      email: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema,
    onSubmit: () => {
      const formData = new FormData(formRef.current);
      registerUserMutation(formData);
    },
  });

  return (
    <div className={sharedStyles.container}>
      <div className={sharedStyles.background}>
        <div className={sharedStyles.bgOverlay} />
      </div>

      <div className={sharedStyles.content}>
        <div className={sharedStyles.logoBox}>
          <img
            className={sharedStyles.logo}
            src={logoImg}
            alt="Ouiorder Logo"
          />
        </div>

        <div className={sharedStyles.main}>
          <div className={sharedStyles.header}>
            <h2 className={sharedStyles.headerTitle}>{t('Sign Up')}</h2>
            <Link className={sharedStyles.headerLink} to={urls.login}>
              {t('Login')}
            </Link>
          </div>

          <form
            ref={formRef}
            className={sharedStyles.form}
            onSubmit={formik.handleSubmit}
          >
            <FormRow>
              <Input
                type="text"
                required
                disabled={authLoading}
                autoComplete="off"
                placeholder="Restaurant name"
                name="restaurant_name"
                value={formik.values.restaurant_name}
                error={
                  formik.touched.restaurant_name &&
                  t(formik.errors.restaurant_name)
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormRow>

            <FormRow>
              <Input
                type="text"
                required
                disabled={authLoading}
                autoComplete="street-address"
                placeholder={t('Address')}
                name="address"
                value={formik.values.address}
                error={formik.touched.address && t(formik.errors.address)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormRow>

            <FormRow>
              <Input
                type="text"
                required
                disabled={authLoading}
                autoComplete="given-name"
                placeholder={t('First name')}
                name="name"
                value={formik.values.name}
                error={formik.touched.name && t(formik.errors.name)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Input
                type="text"
                required
                disabled={authLoading}
                autoComplete="family-name"
                placeholder={t('Last name')}
                name="lastname"
                value={formik.values.lastname}
                error={formik.touched.lastname && t(formik.errors.lastname)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormRow>

            <FormRow>
              <Input
                type="tel"
                required
                disabled={authLoading}
                autoComplete="tel"
                placeholder={t('Phone')}
                name="phone"
                value={formik.values.phone}
                error={formik.touched.phone && t(formik.errors.phone)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormRow>

            <FormRow>
              <Input
                type="email"
                required
                disabled={authLoading}
                autoComplete="email"
                placeholder={t('Email')}
                name="email"
                value={formik.values.email}
                error={formik.touched.email && t(formik.errors.email)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormRow>

            <FormRow>
              <Input
                type="password"
                required
                disabled={authLoading}
                autoComplete="new-password"
                placeholder={t('Password')}
                name="password"
                value={formik.values.password}
                error={formik.touched.password && t(formik.errors.password)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormRow>

            <FormRow>
              <Input
                type="password"
                required
                disabled={authLoading}
                autoComplete="off"
                placeholder={t('Repeat password')}
                name="repeatPassword"
                value={formik.values.repeatPassword}
                error={
                  formik.touched.repeatPassword &&
                  t(formik.errors.repeatPassword)
                }
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormRow>

            <FormRow>
              <Input.File
                required
                disabled={authLoading}
                accept="image/*"
                placeholder={t('Photo upload')}
                name="image"
                value={image}
                onChange={(e) => setImage(e.target.files[0])}
                onBlur={() => setImageTouched(true)}
                error={
                  imageTouched && image === null
                    ? t('Image is required')
                    : undefined
                }
              />
            </FormRow>

            <FormRow>
              <Button
                type="submit"
                fullWidth
                disabled={authLoading}
                loading={authLoading}
              >
                {t('SIGN UP')}
              </Button>
            </FormRow>
          </form>
        </div>
      </div>
    </div>
  );
}
