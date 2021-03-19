// import axios
import axios from 'axios';
import { api } from '../urlconfig';

// instance of axios
const axiosInstance = axios.create({
    baseURL:api,
    // headers:{
    //     'Authorization':''
    // }
}) 

export default axiosInstance;