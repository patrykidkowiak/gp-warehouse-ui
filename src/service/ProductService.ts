import axios from '../core/utils/axios';
import { AxiosResponse } from 'axios';

export interface Product {
    id: number,
    name: string,
    weight: number,
}

export class ProductService {
    public static getProducts = async (): Promise<AxiosResponse<Product[]>> => {
        return axios.get(`api/v1/product`);
    }

}
