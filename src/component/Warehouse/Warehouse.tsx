import React, { FC, useEffect, useState } from 'react';
import { Response } from '../../core/utils/interfaces'
import { useKeycloak } from '@react-keycloak/web';
import { StoredProduct, StoredProductService } from '../../service/StoredProductService';
import { ProductTable } from './ProductTable/ProductTable';
import { StyledOperationButton } from './ProductTable/ProductTable.styles';
import { StyledButtonContainer, StyledPieChart, StyledWarehouse } from './Warehouse.styles';
import { SnackBarOptions, SnackbarWrapper } from '../SnackbarWrapper';
import { ProductInDialog } from './ProductIn/ProductInDialog';
import { LoadingOverlay } from '../LoadingOverlay';
import { ProductOutDialog } from './ProductOut/ProductOutDialog';
import { PieChart } from 'react-minimal-pie-chart';
import { pink, yellow } from '@mui/material/colors';
import { Place, PlaceService } from '../../service/PlaceService';

export const initialSnackbarOptions: SnackBarOptions = {visible: false, message: ''};

export const Warehouse: FC = () => {
    const [storedProducts, setStoredProducts] = useState<Response<StoredProduct[]>>({data: [], loading: true});
    const [inOpen, setOpenIn] = React.useState(false);
    const [outOpen, setOpenOut] = React.useState(false);
    const [snackBarOptions, setSnackBarOptions] = useState<SnackBarOptions>(initialSnackbarOptions);
    const [places, setPlaces] = useState<Response<Place[]>>({data: null, loading: true});
    const {keycloak} = useKeycloak();

    const handleOpenIn = () => {
        setOpenIn(true);
    };

    const handleOpenOut = () => {
        setOpenOut(true);
    };

    const fetchStoredProduct = async () => {
        setStoredProducts({data: storedProducts.data, loading: true});
        try {
            const {data} = await StoredProductService.getStoredProducts(keycloak.token);
            setStoredProducts({data: data, loading: false});
        } catch (error) {
            setSnackBarOptions({
                visible: true,
                message: 'Błąd pobierania danych do tabeli produktów.',
                severity: 'error'
            });
            console.error(error)
            setStoredProducts({data: [], loading: false});
        }
    };

    useEffect(() => {
        (async () => {
            setPlaces({data: places.data, loading: true});
            try {
                const {data} = await PlaceService.getFreePlaces(keycloak.token);
                setPlaces({data: data, loading: false});
            } catch (error) {
                setPlaces({data: null, loading: false});
            }
        })()
    }, [storedProducts])

    useEffect(() => {
        fetchStoredProduct()
    }, []);

    const productStoredPercentage = 100 - (100 * places.data?.filter(place => place.status !== 'STORED')?.length) / places.data?.length;

    return <>
        <StyledWarehouse>
            <StyledButtonContainer>
                <StyledOperationButton variant="outlined" onClick={handleOpenIn}>Dodaj produkt na
                    magazyn</StyledOperationButton>
                <StyledOperationButton variant="outlined" onClick={handleOpenOut}>Wydaj produkt z
                    magazynu</StyledOperationButton>
                <StyledPieChart>

                    <PieChart
                        data={[{value: productStoredPercentage, color: pink['400']}]}
                        reveal={productStoredPercentage}
                        lineWidth={20}
                        background="#bfbfbf"
                        rounded
                        animate
                        label={({dataEntry}) => `${dataEntry.value}%`}
                        labelStyle={{
                            fontSize: '25px',
                            fontFamily: 'sans-serif',
                            fill: pink['400'],
                        }}
                        labelPosition={0}
                    />
                </StyledPieChart>

            </StyledButtonContainer>

            <ProductTable storedProducts={storedProducts.data}/>

            {storedProducts.loading && <LoadingOverlay/>}

            {inOpen && <ProductInDialog setOpenIn={setOpenIn} inOpen={inOpen} fetchStoredProduct={fetchStoredProduct} places={places}/>}
            {outOpen && <ProductOutDialog setOpenOut={setOpenOut} outOpen={outOpen} fetchStoredProduct={fetchStoredProduct}/>}


        </StyledWarehouse>

        <SnackbarWrapper snackBarOptions={snackBarOptions} setSnackBarOptions={setSnackBarOptions}/>
    </>

}
