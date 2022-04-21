import axios from '../core/utils/axios';
import { AxiosResponse } from 'axios';
import { Product } from './ProductService';

export interface StoredProduct {
    id: number,
    product: Product
    row: Row,
    column: Column,
    rack: Rack
}

export interface Row {
    id: number,
    name: string
}

export interface Column {
    id: number,
    name: string
}

export interface Rack {
    id: number,
    name: string
}

export class StoredProductService {
    public static getStoredProducts = async (token?: string): Promise<AxiosResponse<StoredProduct[]>> => {
        return axios.get(`api/v1/stored-product`, {
            headers: {
                'Authorization': bearerAuth(token)
            }
        });
    }
    public static getNexValue = async (token?: string): Promise<AxiosResponse<number>> => {
        return axios.get(`api/v1/stored-product/nextValue`, {
            headers: {
                'Authorization': bearerAuth(token)
            }
        });
    }
}

export const bearerAuth = (token?: string) => {
    return `Bearer ${token}`
}
