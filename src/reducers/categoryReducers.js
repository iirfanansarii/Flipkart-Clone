import { categoryConstants } from '../actions/constants';

// create category initial state
const initState = {
  categories: [],
  laoding: false,
  error: null,
};

// build new category function
const buildNewCategory = (categories, category) => {
  const myCategories = [];
  for (let cat of categories) {
    myCategories.push({
      ...cat,
      children:
        cat.children && cat.children.length > 0
          ? buildNewCategory(cat.children, category)
          : [],
    });
  }
  return myCategories;
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
      const updatedCategories = buildNewCategory(
        state.categories,
        action.payload.category
      );
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
