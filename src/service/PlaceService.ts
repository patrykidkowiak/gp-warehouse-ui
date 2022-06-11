import axios from '../core/utils/axios';
import { AxiosResponse } from 'axios';
import { bearerAuth, RackColumn, Rack, Row } from './StoredProductService';

export interface Place {
    rack: Rack | null,
    row: Row | null,
    column: RackColumn | null,
    status?: string,
}

export class PlaceService {
    public static getFirstFreePlace = async (token?: string): Promise<AxiosResponse<Place>> => {
        return axios.get(`api/v1/place/firstFree`, {
            headers: {
                'Authorization': bearerAuth(token)
            }
        });
    }

    public static getFreePlaces = async (token?: string): Promise<AxiosResponse<Place[]>> => {
        return axios.get(`api/v1/place/freePlaces`, {
            headers: {
                'Authorization': bearerAuth(token)
            }
        });
    }
}
