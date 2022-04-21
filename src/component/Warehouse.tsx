import React, { FC, useEffect, useRef, useState } from 'react';
import { Response } from '../core/utils/interfaces'
import { useKeycloak } from '@react-keycloak/web';
import { StoredProduct, StoredProductService } from '../service/StoredProductService';
import { ProductTable } from './ProductTable/ProductTable';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { StyledOperationButton } from './ProductTable/ProductTable.styles';
import { StyledToPrint, StyledButtonContainer, StyledWarehouse, StyledBarCode } from './Warehouse.styles';
import { useBarcode } from 'react-barcodes';
import { useReactToPrint } from 'react-to-print';

export const Warehouse: FC = () => {
    const [storedProducts, setStoredProducts] = useState<Response<StoredProduct[]>>({data: [], loading: true});
    const [nextValue, setNextValue] = useState<Response<number>>({data: 0, loading: true});
    const [inOpen, setOpenIn] = React.useState(false);
    const [outOpen, setOpenOut] = React.useState(false);

    const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')

    const inputRef1 = useBarcode({
        value: zeroPad(nextValue.data, 10),
        options: {
            width: 6
        }
    }).inputRef;

    const inputRef2 = useBarcode({
        value: zeroPad(nextValue.data, 10),
        options: {
            width: 6
        }
    }).inputRef;

    const componentRef = useRef();
    const handlePrintt = useReactToPrint({
        // @ts-ignore
        content: () => componentRef.current,
    });

    const {keycloak} = useKeycloak();
    const handleOpenIn = () => {
        setOpenIn(true);
        fetchNextValue();
    };
    const handleCloseIn = () => {
        setOpenIn(false);

    };
    const handlePrint = () => {
        window.print();
        setOpenIn(false);

    };

    const handleOpenOut = () => {
        setOpenOut(true);
    };

    const handleCloseOut = () => {
        setOpenOut(false);
    };

    useEffect(() => {
        (async () => {
            setStoredProducts({data: storedProducts.data, loading: true});
            try {
                const {data} = await StoredProductService.getStoredProducts(keycloak.token);
                setStoredProducts({data: data, loading: false});
            } catch (error) {
                setStoredProducts({data: [], loading: false});
            }
        })()
    }, []);

    const fetchNextValue = async () => {
        setNextValue({data: nextValue.data, loading: true});
        try {
            const {data} = await StoredProductService.getNexValue(keycloak.token);
            setNextValue({data: data, loading: false});
        } catch (error) {
            setNextValue({data: 0, loading: false});
        }
    };

    return <>
        <StyledWarehouse>
            <StyledButtonContainer>
                <StyledOperationButton variant="outlined" onClick={handleOpenIn}>Dodaj produkt na
                    magazyn</StyledOperationButton>
                <StyledOperationButton variant="outlined" onClick={handleOpenOut}>Wydaj produkt z
                    magazynu</StyledOperationButton>
            </StyledButtonContainer>
            <ProductTable storedProducts={storedProducts.data}/>

            <Dialog open={inOpen} onClose={handleCloseIn}>
                <DialogTitle>Dodaj produkt</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Wybierz produkt oraz miejsce na magazynie.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handlePrintt}>Drukuj</Button>
                    <Button onClick={handleCloseIn}>Anuluj</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={outOpen} onClose={handleCloseOut}>
                <DialogTitle>Wydaj produkt</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Wybierz produkt który chcesz wydać z magazynu.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseOut}>Ok</Button>
                    <Button onClick={handleCloseOut}>Anuluj</Button>
                </DialogActions>
            </Dialog>
        </StyledWarehouse>
        {// @ts-ignore
            <StyledToPrint ref={componentRef}>
                <StyledBarCode>
                    <svg ref={inputRef1}/>
                </StyledBarCode>
                <StyledBarCode>
                    <svg ref={inputRef2}/>
                </StyledBarCode>
            </StyledToPrint>
        }
    </>

}
