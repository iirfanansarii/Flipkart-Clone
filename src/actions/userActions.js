import axios from '../helpers/axios';
import { userConstants } from './constants';

// sign up action
export const signup = (user) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });

    // api to register user
    const res = await axios.post('/admin/signup', {
      ...user,
    });

    if (res.status === 201) {
      const { message } = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({
        type: userConstants.USER_REGISTER_SUCCESS,
        payload: { message },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.USER_REGISTER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
