import axios from '../core/utils/axios';
import { AxiosResponse } from 'axios';

export class TestService {


    public static getAnonTest = async (token?: string): Promise<AxiosResponse<string>> => {
        return axios.get(`/anon`);
    }

    public static getAdminTest = async (token?: string): Promise<AxiosResponse<string>> => {
        return axios.get(`/check/admin`, {
            headers: {
                'Authorization': bearerAuth(token)
            }
        });
    }

    public static getCustomerTest = async (token?: string): Promise<AxiosResponse<string>> => {
        return axios.get(`/check/customer`, {
            headers: {
                'Authorization': bearerAuth(token)
            }
        });
    }

}

export const bearerAuth = (token?: string) => {
    return `Bearer ${token}`
}
