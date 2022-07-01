import axios from '../core/utils/axios';
import { AxiosResponse } from 'axios';
import { bearerAuth } from './StoredProductService';

export interface Product {
    id: number,
    name: string,
    weight: number,
    nettoWeight: number,
    bruttoWeight: number
}

export class ProductService {
    public static getProducts = async (token?: string): Promise<AxiosResponse<Product[]>> => {
        return axios.get(`api/v1/product`, {
            headers: {
                'Authorization': bearerAuth(token)
            }
        });
    }
}
