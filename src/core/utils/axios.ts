import Axios from 'axios';

const axios = Axios.create({
    baseURL: process.env.REACT_APP_GP_WAREHOUSE_BACKEND,
});

export default axios;
