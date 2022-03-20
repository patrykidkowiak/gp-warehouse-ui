import React, { useEffect, useState } from 'react';
import { TestService } from '../service/TestService';
import { Response } from '../core/utils/interfaces'

export const Warehouse = () => {
    const [test, setTest] = useState<Response<string>>({data: 'ERROR', loading: true});

    useEffect(() => {
        (async () => {
            setTest({data: 'LOADING...', loading: true});
            try {
                const {data} = await TestService.getTest();
                setTest({data: data, loading: false});
            } catch (error) {
                setTest({data: 'ERROR', loading: false});
            }
        })()
    }, []);

    return <>
        <div>Hello GP WAREHOUSE!!</div>
        <div>api test: {test.data}</div>
    </>
}
