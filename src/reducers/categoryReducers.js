import { Switch } from 'react-router';
import { categoryConstants } from '../actions/constants';

// create category initial state
const initState = {
  categories: [],
  laoding: false,
  error: null,
};

// export category reducers
export default (state = initState, action) => {
  switch (action.type) {
    case categoryConstants.GET_ALL_CATEGORY_SUCCESS:
      state = {
        ...state,
        categories: action.payload.categories,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORY_REQUEST:
      state = {
        ...state,
        laoding: true,
      };
      break;
    case categoryConstants.ADD_NEW_CATEGORY_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;

    case categoryConstants.ADD_NEW_CATEGORY_FAILURE:
      state = {
        ...initState,
      };
      break;
  }
  return state;
};
