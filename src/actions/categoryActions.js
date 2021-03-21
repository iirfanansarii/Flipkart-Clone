import axios from '../helpers/axios';
import { categoryConstants } from './constants';

// create action to gell all categories
export const getAllCategory = () => {
  return async (dispatch) => {
      dispatch({
          type:categoryConstants.GET_ALL_CATEGORY_REQUEST
      });
    const res = await axios.get('/categories');
    if (res.status === 200) {
        const { categoryList }= res.data;
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
        payload: {
          categories: categoryList,
        },
      });
    } else {
        dispatch({
            type:categoryConstants.GET_ALL_CATEGORY_FAILURE,
            payload:{
                error:res.data.error
            }
        })
    }
  };
};

// add category actions
export const addCategory = (form) =>{
return async dispatch =>{

    dispatch({
        type:categoryConstants.ADD_NEW_CATEGORY_REQUEST,
    })
    const res = await axios.post('/category',form);

    if(res.status === 201){
        dispatch({
          type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
          payload: res.data.category,
        });
    } else {
        dispatch({
            type:categoryConstants.ADD_NEW_CATEGORY_FAILURE,
            payload:res.data.error,
        })
    }
} 
}