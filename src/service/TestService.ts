import axios from '../core/utils/axios';
import { AxiosResponse } from 'axios';

export class TestService {
    public static getTest = async (): Promise<AxiosResponse<string>> => {
        return axios.get(`api/v1/test`);
    }

}
