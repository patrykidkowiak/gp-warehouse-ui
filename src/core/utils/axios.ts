import Axios from 'axios';

// export const GP_WAREHOUSE_BACKEND = process.env.NODE_ENV === 'development' ? 'http://localhost:8080' : 'https://gp-warehouse.herokuapp.com/';
export const GP_WAREHOUSE_BACKEND = 'https://gp-warehouse.herokuapp.com/';
// export const GP_WAREHOUSE_BACKEND = 'http://localhost:8080';

const axios = Axios.create({
    baseURL: GP_WAREHOUSE_BACKEND,
});

export default axios;
