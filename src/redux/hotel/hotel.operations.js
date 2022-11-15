import axios from 'axios';
import { toast } from 'react-toastify';

import { hotelActions as actions } from './';
import { getErrorMessage } from '../../utils/getErrorMessage';

export const getHotelById = (id, cb) => (dispatch) => {
  dispatch(actions.getHotelRequest());

  axios({
    method: 'GET',
    url: `/restaurants/${id}`,
  })
    .then((res) => {
      dispatch(actions.getHotelSuccess(res.data.data));
      if (cb) {
        cb();
      }
    })
    .catch((error) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      dispatch(actions.getHotelError(errorMessage));
    });
};

export const updateHotel = (id, data) => (dispatch) => {
  dispatch(actions.updateHotelRequest());

  axios({
    method: 'POST',
    url: `/restaurants/${id}`,
    data: {
      _method: 'PATCH',
      ...data,
    },
  })
    .then((res) => {
      dispatch(actions.updateHotelSuccess(res.data.data));
    })
    .catch((error) => {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
      dispatch(actions.updateHotelError(errorMessage));
    });
};
