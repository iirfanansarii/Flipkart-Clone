// import auth constants
import { authConstants } from '../actions/constants';

// auth initial state
const initState = {
  token: null,
  user: {
    firstName: '',
    lastName: '',
    email: '',
    pictures: '',
  },
  authenticate: false,
  authenticating: false,
  loading: false,
  error: null,
  message: '',
};

// auth reducers
export default (state = initState, action) => {
  switch (action.type) {
    // case to login request
    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
      };
      break;

    // case to login success
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
      };
      break;

    // case to request
    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    // case to logout success
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
      };
      break;
    // case to logout failure
    case authConstants.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
  }
  return state;
};
