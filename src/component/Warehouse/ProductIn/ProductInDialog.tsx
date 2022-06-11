import React, { FC, useEffect, useRef, useState } from 'react';
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { StyledDialogContent, StyledPlaceSelector, StyledPlaceSelectors, StyledProductIn } from './ProductIn.styles';
import { Response } from '../../../core/utils/interfaces';
import { Product, ProductService } from '../../../service/ProductService';
import { useKeycloak } from '@react-keycloak/web';
import { Place, PlaceService } from '../../../service/PlaceService';
import { Rack, RackColumn, Row, StoredProduct, StoredProductService } from '../../../service/StoredProductService';
import { BarcodesToPrint } from '../BarcodesToPrint/BarcodesToPrint';
import { LoadingOverlay } from '../../LoadingOverlay';

export interface ProductInDialogProps {
    setOpenIn: React.Dispatch<React.SetStateAction<boolean>>,
    inOpen: boolean,
    fetchStoredProduct: Function,
    places: Response<Place[]>
}

export const ProductInDialog: FC<ProductInDialogProps> = (props: ProductInDialogProps) => {
    const [products, setProducts] = useState<Response<Product[] | null>>({data: null, loading: true});
    const [freePlace, setFreePlace] = useState<Response<Place | null>>({data: null, loading: true});
    const [nextValue, setNextValue] = useState(0);
    const {keycloak} = useKeycloak();
    const [selectedProductId, setSelectedProductId] = React.useState(0);

    const [selectedRack, setSelectedRack] = useState<Rack | null>(null);
    const [selectedRow, setSelectedRow] = useState<Row | null>(null);
    const [selectedColumn, setSelectedColumn] = useState<RackColumn | null>(null)

    const selectedProduct = products.data?.find(product => product.id === selectedProductId) || null;

    const freePlaces = props.places.data?.filter(place => place.status !== 'STORED') || null;


    const freeRacksNonUnique = freePlaces?.map(place => place.rack);
    // @ts-ignore
    const freeRacks = [...new Map(freeRacksNonUnique?.map(item => [item['id'], item])).values()];

    const freeRowsNonUnique = freePlaces?.filter(place => place.rack?.id === selectedRack?.id).map(place => place.row);
    // @ts-ignore
    const freeRows = [...new Map(freeRowsNonUnique?.map(item => [item['id'], item])).values()];

    const freeColumnsNonUnique = freePlaces?.filter(place => place.rack?.id === selectedRack?.id && place.row?.id === selectedRow?.id).map(place => place.column);
    // @ts-ignore
    const freeColumns = [...new Map(freeColumnsNonUnique?.map(item => [item['id'], item])).values()];

    const handleChange = (event: any) => {
        setSelectedProductId(event.target.value);
    };

    const handleRackChange = (event: any) => {
        setSelectedRack(event.target.value);
    };

    const handleRowChange = (event: any) => {
        setSelectedRow(event.target.value);
    };

    const handleColumnChange = (event: any) => {
        setSelectedColumn(event.target.value);
    };

    const handleCloseIn = () => {
        props.setOpenIn(false);
    };

    const handlePrint = () => {

        const storedProduct: StoredProduct = {
            product: selectedProduct,
            row: selectedRow,
            rackColumn: selectedColumn,
            rack: selectedRack
        }
        StoredProductService.persistStoredProduct(storedProduct, keycloak.token).then((response) => {
            setNextValue(response.data);
            props.fetchStoredProduct();
            props.setOpenIn(false);
        })
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

    useEffect(() => {
        (async () => {
            setFreePlace({data: freePlace.data, loading: true});
            try {
                const {data} = await PlaceService.getFirstFreePlace(keycloak.token);
                setFreePlace({data: data, loading: false});
            } catch (error) {
                setFreePlace({data: null, loading: false});
            }
        })()
    }, []);




    return <>
        <Dialog open={props.inOpen} onClose={handleCloseIn}>
            <DialogTitle>Dodaj produkt</DialogTitle>
            <StyledDialogContent>
                {
                    products.loading || freePlace.loading ? <LoadingOverlay/> :
                        <StyledProductIn>
                            <FormControl>
                                <InputLabel id="select-product-lebel">Produkt</InputLabel>
                                <Select
                                    labelId="select-product-lebel"
                                    id="select-product"
                                    value={selectedProductId}
                                    label="Produkt"
                                    onChange={handleChange}
                                >
                                    {
                                        products.data?.map(product =>
                                            <MenuItem key={`product-${product.id}`}
                                                      value={product.id}>{`${product.name} ${product.weight}kg`}</MenuItem>
                                        )
                                    }
                                </Select>
                                <FormHelperText id="my-helper-text">Wybierz produkt z listy</FormHelperText>
                            </FormControl>

                            <FormControl>

                                <StyledPlaceSelectors>
                                    <FormControl>
                                        <InputLabel id="select-rack-label">Regał</InputLabel>
                                        <StyledPlaceSelector
                                            labelId="select-rack-label"
                                            id="select-rack"
                                            value={selectedRack}
                                            label="Regał"
                                            onChange={handleRackChange}
                                            disabled={!selectedProduct}
                                        >
                                            {
                                                freeRacks.map(rack =>
                                                    //@ts-ignore - necessary to load object into value
                                                    <MenuItem key={`rack-${rack.id}`}
                                                              value={rack}>{`${rack.name}`}</MenuItem>
                                                )
                                            }
                                        </StyledPlaceSelector>
                                    </FormControl>

                                    <FormControl>

                                        <InputLabel id="select-row-label">Półka</InputLabel>
                                        <StyledPlaceSelector
                                            labelId="select-row-label"
                                            id="select-row"
                                            value={selectedRow}
                                            label="Półka"
                                            onChange={handleRowChange}
                                            disabled={!selectedRack}
                                        >
                                            {
                                                freeRows?.map(row =>
                                                    //@ts-ignore - necessary to load object into value
                                                    <MenuItem key={`row-${row.id}`}
                                                              value={row}>{`${row.name}`}</MenuItem>
                                                )
                                            }
                                        </StyledPlaceSelector>
                                    </FormControl>

                                    <FormControl>

                                        <InputLabel id="select-column-label">Kolumna</InputLabel>
                                        <StyledPlaceSelector
                                            labelId="select-column-label"
                                            id="select-column"
                                            value={selectedColumn}
                                            label="Kolumna"
                                            onChange={handleColumnChange}
                                            disabled={!selectedRow}
                                        >
                                            {
                                                freeColumns?.map(column =>
                                                    <MenuItem key={`product-${column.id}`}
                                                              value={column}>{`${column.name}`}</MenuItem>
                                                )
                                            }
                                        </StyledPlaceSelector>
                                    </FormControl>
                                </StyledPlaceSelectors>
                                <FormHelperText id="place-select-helper-text">Wybierz miejsce na
                                    magazynie</FormHelperText>
                            </FormControl>

                            {/*{`${freePlace.data?.rack.name}.${freePlace.data?.row.name}.${freePlace.data?.column.name}`}*/}
                        </StyledProductIn>
                }
            </StyledDialogContent>
            <DialogActions>
                <Button variant="contained" disabled={!selectedColumn} onClick={handlePrint}>Drukuj</Button>
                <Button variant="outlined" onClick={handleCloseIn}>Anuluj</Button>
            </DialogActions>
        </Dialog>
        <BarcodesToPrint
            id={nextValue}
            product={selectedProduct}
            printCallback={() => {
                setNextValue(null);
                setSelectedRack(null);
                setSelectedRow(null);
                setSelectedColumn(null);
            }}
            place={{rack: selectedRack, row: selectedRow, column: selectedColumn}}/>
    </>


}
