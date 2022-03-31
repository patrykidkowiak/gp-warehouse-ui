import Axios from 'axios';
import { GP_WAREHOUSE_BACKEND } from '../envvars';

const axios = Axios.create({
    baseURL: GP_WAREHOUSE_BACKEND,
});

export default axios;
