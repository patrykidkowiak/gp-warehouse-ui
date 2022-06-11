import axios from '../core/utils/axios';
import { AxiosResponse } from 'axios';
import { Product } from './ProductService';

export interface StoredProduct {
    id?: number,
    product: Product | null,
    row: Row | null,
    rackColumn: RackColumn | null,
    rack: Rack | null,
    status?: string,
    insertDate?: Date
}

export interface Row {
    id: number,
    name: string
}

export interface RackColumn {
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
    public static persistStoredProduct = async (storedProduct: StoredProduct, token?: string): Promise<AxiosResponse<number>> => {
        return axios.post(`api/v1/stored-product`, storedProduct,{
            headers: {
                'Authorization': bearerAuth(token)
            }
        });
    }
    public static setStoredProductAsOut = async (ids: number[], token?: string): Promise<AxiosResponse<number>> => {
        return axios.post(`api/v1/stored-product/out`, ids,{
            headers: {
                'Authorization': bearerAuth(token)
            }
        });
    }
}

export const bearerAuth = (token?: string) => {
    return `Bearer ${token}`
}
