import React, { FC, useEffect, useState } from 'react';
import { Product, ProductService } from '../../service/ProductService';
import { Response } from '../../core/utils/interfaces';
import { useKeycloak } from '@react-keycloak/web';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { StyledProductIn } from '../Warehouse/ProductIn/ProductIn.styles';
import { StyledProducts } from './Products.styles';

export const Products: FC = () => {
    const [products, setProducts] = useState<Response<Product[] | null>>({data: null, loading: true});
    const {keycloak} = useKeycloak();
    const [selectedProductId, setSelectedProductId] = React.useState(0);
    const handleChange = (event: any) => {
        setSelectedProductId(event.target.value);
    };

    useEffect(() => {
        (async () => {
            setProducts({data: products.data, loading: true});
            try {
                const {data} = await ProductService.getProducts(keycloak.token);
                setProducts({data: data, loading: false});
            } catch (error) {
                setProducts({data: [], loading: false});
            }
        })()
    }, []);

    return <></>
    //
    // return <StyledProducts>
    //     <FormControl>
    //         <InputLabel id="select-product-lebel">Produkt</InputLabel>
    //         <Select
    //             labelId="select-product-lebel"
    //             id="select-product"
    //             value={selectedProductId}
    //             label="Produkt"
    //             onChange={handleChange}
    //         >
    //             {
    //                 products.data?.map(product =>
    //                     <MenuItem key={`product-${product.id}`}
    //                               value={product.id}>{`${product.name} ${product.weight}kg`}</MenuItem>
    //                 )
    //             }
    //         </Select>
    //         <FormHelperText id="my-helper-text">Wybierz produkt z listy</FormHelperText>
    //     </FormControl>
    // </StyledProducts>
}
