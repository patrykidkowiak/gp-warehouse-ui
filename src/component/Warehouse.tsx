import React, { FC, useEffect, useState } from 'react';
import { Response } from '../core/utils/interfaces'
import { useKeycloak } from '@react-keycloak/web';
import { StoredProduct, StoredProductService } from '../service/StoredProductService';
import { ProductTable } from './ProductTable/ProductTable';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import { StyledOperationButton } from './ProductTable/ProductTable.styles';
import { StyledButtonContainer, StyledWarehouse } from './Warehouse.styles';

export const Warehouse: FC = () => {
    const [storedProducts, setStoredProducts] = useState<Response<StoredProduct[]>>({data: [], loading: true});
    const [inOpen, setOpenIn] = React.useState(false);
    const [outOpen, setOpenOut] = React.useState(false);

    const {keycloak} = useKeycloak();
    const handleOpenIn = () => {
        setOpenIn(true);

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


    return <StyledWarehouse>
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
                <Button onClick={handlePrint}>Drukuj</Button>
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
}
