import axios from '../core/utils/axios';
import { AxiosResponse } from 'axios';
import { bearerAuth, StoredProduct } from './StoredProductService';

export interface Product {
    id: number,
    name: string,
    weight: number,
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
