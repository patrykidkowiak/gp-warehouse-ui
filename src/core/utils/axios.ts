import Axios from 'axios';

export const GP_WAREHOUSE_BACKEND = process.env.NODE_ENV === 'production' ? 'https://gp-warehouse.herokuapp.com/' : 'http://localhost:8080';

const axios = Axios.create({
    baseURL: GP_WAREHOUSE_BACKEND,
});

export default axios;
