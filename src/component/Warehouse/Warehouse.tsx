import React, { FC, useEffect, useState } from 'react';
import { Response } from '../../core/utils/interfaces'
import { useKeycloak } from '@react-keycloak/web';
import {  RackColumn, Row, StoredProduct, StoredProductService } from '../../service/StoredProductService';
import { ProductTable } from './ProductTable/ProductTable';
import { StyledOperationButton } from './ProductTable/ProductTable.styles';
import { StyledButtonContainer, StyledCarousel, StyledCarouselButton, StyledCarouselContent, StyledCarouselPaper, StyledCarouselTitle, StyledDiagramsContainer, StyledPieChart, StyledRow, StyledRows, StyledWarehouse } from './Warehouse.styles';
import { SnackBarOptions, SnackbarWrapper } from '../SnackbarWrapper';
import { ProductInDialog } from './ProductIn/ProductInDialog';
import { LoadingOverlay } from '../LoadingOverlay';
import { ProductOutDialog } from './ProductOut/ProductOutDialog';
import { PieChart } from 'react-minimal-pie-chart';
import { pink } from '@mui/material/colors';
import { Place, PlaceService } from '../../service/PlaceService';
import { Button, Paper, Tooltip } from '@mui/material';

export const initialSnackbarOptions: SnackBarOptions = {visible: false, message: ''};

export const Warehouse: FC = () => {
    const [storedProducts, setStoredProducts] = useState<Response<StoredProduct[]>>({data: [], loading: true});
    const [inOpen, setOpenIn] = React.useState(false);
    const [outOpen, setOpenOut] = React.useState(false);
    const [snackBarOptions, setSnackBarOptions] = useState<SnackBarOptions>(initialSnackbarOptions);
    const [places, setPlaces] = useState<Response<Place[]>>({data: null, loading: true});
    const {keycloak} = useKeycloak();

    // @ts-ignore
    const racks = [...new Map(places.data?.map(place => place.rack).map(item => [item['id'], item])).values()];

    const getRowsByRackId = (rackId: number): Row[] => {
        const freeRowsNonUnique = places.data?.filter(place => place.rack?.id === rackId).map(place => place.row);
        // @ts-ignore
        return [...new Map(freeRowsNonUnique?.map(item => [item['id'], item])).values()];
    }

    const getColumnByRackIdAndRowId = (rackId: number, rowId: number): RackColumn[] => {
        const freeColumnsNonUnique = places.data?.filter(place => place.rack?.id === rackId && place.row?.id === rowId).map(place => place.column);
        // @ts-ignore
        return [...new Map(freeColumnsNonUnique?.map(item => [item['id'], item])).values()];
    }

    const map = racks.map(rack => {
        return {
            rack: rack,
            rows: getRowsByRackId(rack.id)
        }
    }).map(rack => {
            return {
                rack: rack.rack,
                rows: rack.rows.map(row => {
                    return {
                        row: row,
                        columns: getColumnByRackIdAndRowId(rack.rack.id, row.id)
                    }
                })
            }
        }
    );

    console.log(map)



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


    const getProductByPlace = (rackId: number, columnId: number, rowId: number): StoredProduct => {
        return storedProducts.data?.find(product => product.rack.id === rackId && product.rackColumn.id === columnId && product.row.id === rowId)
    }

    const productStoredPercentage = 100 - (100 * places.data?.filter(place => place.status !== 'STORED')?.length) / places.data?.length || 0;

    return <>
        <StyledWarehouse>
            <StyledButtonContainer>
                <StyledOperationButton variant="outlined" onClick={handleOpenIn}>Dodaj produkt na
                    magazyn</StyledOperationButton>
                <StyledOperationButton variant="outlined" onClick={handleOpenOut}>Wydaj produkt z
                    magazynu</StyledOperationButton>
            </StyledButtonContainer>
            <StyledDiagramsContainer>
                <StyledPieChart>
                    <PieChart
                        data={[{value: productStoredPercentage, color: pink['400']}]}
                        reveal={productStoredPercentage}
                        lineWidth={20}
                        background="#bfbfbf"
                        rounded
                        animate
                        label={({dataEntry}) => `${dataEntry.value.toFixed(1)}%`}
                        labelStyle={{
                            fontSize: '25px',
                            fontFamily: 'sans-serif',
                            fill: pink['400'],
                        }}
                        labelPosition={0}
                    />
                </StyledPieChart>
                <StyledCarousel
                    autoPlay={false}
                    navButtonsAlwaysVisible={true}
                >
                    {
                        map.map(rack => (
                            <StyledCarouselPaper>
                                <StyledCarouselTitle>Regał {rack.rack.name}</StyledCarouselTitle>
                                <StyledCarouselContent>
                                    <div>
                                        {
                                            rack.rows.map(row => (<StyledRows>
                                                {row.row.name}: {row.columns.map(column => (
                                                <>
                                                    <Tooltip title={
                                                        <>
                                                            <div>{`${rack.rack.name} ${row.row.name} ${column.name}`}</div>
                                                            <div>{`${getProductByPlace(rack.rack.id, column.id, row.row.id)?.product.name || ''}`}</div>
                                                        </>
                                                    }
                                                    >
                                                        {getProductByPlace(rack.rack.id, column.id, row.row.id)?.status === 'STORED' ?
                                                            <StyledCarouselButton variant="contained"/> :
                                                            <StyledCarouselButton variant="outlined" onClick={() => {
                                                                setOpenIn(true)
                                                            }}/>}
                                                    </Tooltip>
                                                </>
                                            ))}
                                            </StyledRows>))
                                        }
                                    </div>
                                </StyledCarouselContent>
                            </StyledCarouselPaper>
                        ))
                    }

                </StyledCarousel>
            </StyledDiagramsContainer>

            <ProductTable storedProducts={storedProducts.data}/>

            {(storedProducts.loading || places.loading) && <LoadingOverlay/>}

            {inOpen && <ProductInDialog setOpenIn={setOpenIn} inOpen={inOpen} fetchStoredProduct={fetchStoredProduct} places={places}/>}
            {outOpen && <ProductOutDialog setOpenOut={setOpenOut} outOpen={outOpen} fetchStoredProduct={fetchStoredProduct}/>}


        </StyledWarehouse>

        <SnackbarWrapper snackBarOptions={snackBarOptions} setSnackBarOptions={setSnackBarOptions}/>
    </>

}
