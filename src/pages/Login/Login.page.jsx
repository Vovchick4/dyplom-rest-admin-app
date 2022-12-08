import { Link } from 'react-router-dom';
import { SiFacebook, SiTwitter, SiGoogle } from 'react-icons/si';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import urls from '../../config/urls';
import sharedStyles from '../../styles/LoginSignUpShared.module.css';
import styles from './Login.module.css';
import { Input, Button, Checkbox, FormRow } from '../../components';
import logoImg from '../../images/Ouiorder_logo_horiz.svg';
import { ApiUrl } from '../../config/axios';
import {
  useLoginMutation,
  useResetUserPasswordMutation,
} from '../../redux/services/auth.service';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .trim()
    .email('Email must be a valid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(255, 'Password must be at most 255 characters')
    .required('Password is required'),
  rememberMe: Yup.bool().required(),
});

export default function LoginPage() {
  const [logInUserMutation, { isLoading: authLoading }] = useLoginMutation();
  const [resetPasswordUserMutation, { isLoading: resetPasswordLoading }] =
    useResetUserPasswordMutation();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema,
    onSubmit: (values) => {
      const formattedValues = validationSchema.cast(values);
      logInUserMutation({
        ...values,
        remember_me: Number(formattedValues.rememberMe),
      });
    },
  });

  function resetPassword() {
    if (!formik.values.email || formik.errors.email) {
      toast(t('Enter valid email'));
      return;
    }

    resetPasswordUserMutation(formik.values.email);
  }

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
            <h2 className={sharedStyles.headerTitle}>{t('Login')}</h2>
            <Link className={sharedStyles.headerLink} to={urls.signup}>
              {t('Sign Up')}
            </Link>
          </div>

          <form className={sharedStyles.form} onSubmit={formik.handleSubmit}>
            <FormRow>
              <Input
                type="email"
                required
                disabled={authLoading || resetPasswordLoading}
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
                disabled={authLoading || resetPasswordLoading}
                autoComplete="current-password"
                placeholder={t('Password')}
                name="password"
                value={formik.values.password}
                error={formik.touched.password && t(formik.errors.password)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormRow>

            <FormRow>
              <Checkbox
                label={t('Remember me')}
                disabled={authLoading || resetPasswordLoading}
                name="rememberMe"
                checked={formik.values.rememberMe}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </FormRow>

            <FormRow>
              <Button
                type="submit"
                fullWidth
                disabled={authLoading || resetPasswordLoading}
                loading={authLoading || resetPasswordLoading}
              >
                {t('LOGIN')}
              </Button>
            </FormRow>

            <FormRow>
              <p className={styles.forgotPassword} onClick={resetPassword}>
                {t('Forgot Password?')}
              </p>
            </FormRow>
          </form>
        </div>

        <div className={styles.socials}>
          <span className={styles.socialsText}>
            {t('Login with social media')}
          </span>
          <div className={styles.socialsList}>
            <a
              href={`${ApiUrl}/auth/login/facebook/redirect`}
              target="_blank"
              rel="noreferrer"
            >
              <SiFacebook className={styles.socialsListItem} color="#205597" />
            </a>
            <a
              href={`${ApiUrl}/auth/login/twitter/redirect`}
              target="_blank"
              rel="noreferrer"
            >
              <SiTwitter className={styles.socialsListItem} color="#1DA0F2" />
            </a>
            <a
              href={`${ApiUrl}/auth/login/google/redirect`}
              target="_blank"
              rel="noreferrer"
            >
              <SiGoogle className={styles.socialsListItem} color="#DE4837" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
