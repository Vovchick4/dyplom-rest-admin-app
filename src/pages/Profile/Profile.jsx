import styles from './Profile.module.css';

import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineEdit } from 'react-icons/ai';
import placeHolderImage from '../../images/placeholder.jpg';

import { useProfileFormik } from './model/use-formik';
import { Button, FormRow, Input, Layout, PageHeader } from '../../components';
import {
  useUpdateUserMutation,
  useConfirmEmailMutation,
  useResetUserPasswordMutation,
} from '../../redux/services/auth.service';

const reader = new FileReader();

export default function Profile() {
  const user = useSelector((state) => state.auth.user);

  const formRef = useRef();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(
    user.image || placeHolderImage
  );

  const [updateUser, { isLoading: isUpdatingUser }] = useUpdateUserMutation();
  const [confirmEmailMutation, { isLoading: isLoadingConfirmingEmail }] =
    useConfirmEmailMutation();
  const { values, errors, handleSubmit, handleBlur, handleChange } =
    useProfileFormik(user, updateUser, formRef);
  const [resetPasswordUserMutation, { isLoading: resetPasswordLoading }] =
    useResetUserPasswordMutation();

  useEffect(() => {
    if (!image) {
      setImagePreview(user.image || placeHolderImage);
    } else {
      reader.readAsDataURL(image);
      reader.onloadend = () => setImagePreview(reader.result);
    }
  }, [image, user.image]);

  return (
    <Layout>
      <form ref={formRef} onSubmit={handleSubmit}>
        <PageHeader
          title={'Edit your profile'}
          Button={
            <div className={styles.content_btns}>
              {!user?.email_verify_at && (
                <Button
                  type="button"
                  onClick={() => confirmEmailMutation(user?.remember_token)}
                  loading={
                    isLoadingConfirmingEmail ||
                    isUpdatingUser ||
                    resetPasswordLoading
                  }
                >
                  Verify Your Accaount
                </Button>
              )}
              <Button
                type="button"
                loading={
                  isLoadingConfirmingEmail ||
                  isUpdatingUser ||
                  resetPasswordLoading
                }
                onClick={resetPasswordUserMutation}
              >
                Change Your Password
              </Button>
              <Button
                type="submit"
                loading={
                  isLoadingConfirmingEmail ||
                  isUpdatingUser ||
                  resetPasswordLoading
                }
              >
                Update
              </Button>
            </div>
          }
        />

        <FormRow>
          <Input
            type="text"
            name="name"
            required
            error={errors.name}
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Your name"
            autoComplete="username"
            disabled={
              isUpdatingUser || isLoadingConfirmingEmail || resetPasswordLoading
            }
          />

          <Input
            type="text"
            name="lastname"
            required
            error={errors.lastname}
            value={values.lastname}
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Your LastNmae"
            autoComplete="username"
            disabled={
              isUpdatingUser || isLoadingConfirmingEmail || resetPasswordLoading
            }
          />
        </FormRow>

        <div className={styles.content_image}>
          <img src={imagePreview} alt={imagePreview} />
        </div>
        <Input.FileIcon
          name="image"
          icon={AiOutlineEdit}
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          disabled={
            isUpdatingUser || isLoadingConfirmingEmail || resetPasswordLoading
          }
        />
      </form>
    </Layout>
  );
}
