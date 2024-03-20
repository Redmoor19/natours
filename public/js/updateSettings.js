/* eslint-disable */

import axios from 'axios';
import { showAlert } from './alerts';

export const updateSettings = async (data, type) => {
  const url = type === 'password' ? 'updateMyPassword' : 'updateMe';

  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/users/${url}`,
      data,
    });

    if (res.data.status === 'success') {
      showAlert('success', `Your ${type} was updated!`);
      window.setTimeout(() => {
        location.assign('/me');
      }, 5000);
    }
  } catch (err) {
    console.log(err);
    showAlert('error', err.response.data.message);
  }
};
