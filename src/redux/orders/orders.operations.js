import axios from 'axios';
import { toast } from 'react-toastify';

import { ordersActions as actions } from './';
import { getErrorMessage } from '../../utils/getErrorMessage';

export const fetchAll = () => (dispatch) => {
  dispatch(actions.fetchAllRequest());

  axios({
    method: 'GET',
    url: '/orders',
  })
    .then((res) => {
      dispatch(actions.fetchAllSuccess(res.data.data));
    })
    .catch((error) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      dispatch(actions.fetchAllError(errorMessage));
    });
};

export const edit = (orderId, data) => (dispatch) => {
  dispatch(actions.editRequest());

  axios({
    method: 'POST',
    url: `/orders/${orderId}`,
    data: {
      _method: 'PATCH',
      ...data,
    },
  })
    .then((res) => {
      dispatch(actions.editSuccess(res.data.data));
    })
    .catch((error) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      dispatch(actions.editError(errorMessage));
    });
};

export const remove = (orderId) => (dispatch) => {
  dispatch(actions.removeRequest());

  axios({
    method: 'DELETE',
    url: `/orders/${orderId}`,
  })
    .then(() => {
      dispatch(actions.removeSuccess(orderId));
    })
    .catch((error) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      dispatch(actions.removeError(errorMessage));
    });
};
