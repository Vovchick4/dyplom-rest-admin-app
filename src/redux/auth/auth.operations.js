import axios from 'axios';
import { toast } from 'react-toastify';

import { authActions as actions, authSelectors as selectors } from './';
import { setToken, unsetToken } from '../../config/axios';
import { getErrorMessage } from '../../utils/getErrorMessage';

/*
  "name": string,
  "phone": string,
  "email": string,
  "restaurant_id": string, ?
  "password": string,
  "address": string,
  "lastname": string,
  "image": string
  "restaurantName": string ???
*/
export const signUp = (values) => async (dispatch) => {
  try {
    dispatch(actions.signUpRequest());

    // Sign Up
    const { data: signUpData } = await axios({
      method: 'POST',
      url: '/auth/register',
      data: values,
    });

    // Confirm
    await axios.get(signUpData.link);

    setToken(signUpData.token.accessToken);
    dispatch(actions.signUpSuccess(signUpData));
  } catch (error) {
    const message = getErrorMessage(error);

    toast.error(message);
    dispatch(actions.signUpError(message));
  }
};

export const login = (values) => (dispatch) => {
  dispatch(actions.loginRequest());

  axios({
    method: 'POST',
    url: '/auth/login',
    data: values,
  })
    .then((res) => {
      setToken(res.data.token.accessToken);
      dispatch(actions.loginSuccess(res.data));
    })
    .catch((error) => {
      const message = getErrorMessage(error);

      toast.error(message);
      dispatch(actions.loginError(message));
    });
};

export const logout = () => (dispatch) => {
  dispatch(actions.logoutRequest());

  axios({
    method: 'POST',
    url: '/auth/logout',
  })
    .then(() => {
      unsetToken();
      dispatch(actions.logoutSuccess());
    })
    .catch((error) => {
      const message = getErrorMessage(error);

      toast.error(message);
      dispatch(actions.logoutError(message));
    });
};

export const getUser = () => (dispatch, getState) => {
  const token = selectors.getToken(getState());
  if (!token) return;

  setToken(token.accessToken);

  dispatch(actions.getUserRequest());

  axios({
    method: 'GET',
    url: '/auth/get-user',
  })
    .then((res) => dispatch(actions.getUserSuccess(res.data)))
    .catch((error) => {
      unsetToken();
      const message = getErrorMessage(error);

      toast.error(message);
      dispatch(actions.getUserError(message));
    });
};

export const resetPassword = (email) => (dispatch) => {
  dispatch(actions.resetPasswordRequest());

  axios({
    url: '/auth/password/reset',
    method: 'POST',
    data: {
      email,
    },
  })
    .then((res) => {
      toast(res.data.message);
      dispatch(actions.resetPasswordSuccess());
    })
    .catch((error) => {
      const message = getErrorMessage(error);
      toast.error(message);
      dispatch(actions.resetPasswordError(message));
    });
};
