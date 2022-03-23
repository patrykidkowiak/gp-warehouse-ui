import React, { useEffect, useState } from 'react';
import { TestService } from '../service/TestService';
import { Response } from '../core/utils/interfaces'
import ResponsiveAppBar from './app-bar/ResponsiveAppBar';
import { Product, ProductService } from '../service/ProductService';

export const Warehouse = () => {
    const [test, setTest] = useState<Response<Product[]>>({data: [], loading: true});

    useEffect(() => {
        (async () => {
            setTest({data: [], loading: true});
            try {
                const {data} = await ProductService.getProducts();
                setTest({data: data, loading: false});
            } catch (error) {
                setTest({data: [], loading: false});
            }
        })()
    }, []);

    return <>
        <ResponsiveAppBar/>
        <div>Hello GP WAREHOUSE!!</div>
        <div>{test.loading ? 'LOADING...' : test.data.map(data => data.name)}</div>
    </>
}
