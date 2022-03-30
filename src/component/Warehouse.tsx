import React, { FC, useEffect, useState } from 'react';
import { Response } from '../core/utils/interfaces'
import { Product, ProductService } from '../service/ProductService';
import { TestService } from '../service/TestService';

export const Warehouse: FC = () => {
    const [test, setTest] = useState<Response<String>>({data: 'Loading...', loading: true});

    useEffect(() => {
        (async () => {
            setTest({data: 'Loading...', loading: true});
            try {
                const {data} = await TestService.getTest();
                setTest({data: data, loading: false});
            } catch (error) {
                setTest({data: 'Error', loading: false});
            }
        })()
    }, []);

    return <>
        <div>Hello GP WAREHOUSE!!</div>
        <div>{test.data}</div>
    </>
}
