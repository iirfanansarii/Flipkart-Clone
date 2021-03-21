// import axios
import axios from 'axios';
import { api } from '../urlconfig';
const token = window.localStorage.getItem('token');

// instance of axios
const axiosInstance = axios.create({
    baseURL:api,
    headers:{
        'Authorization':token ? `Bearer ${token}`: ''
    }
}) 

export default axiosInstance;