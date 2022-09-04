import React, { FC, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContentText, DialogTitle, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import { StoredProductService } from '../../../service/StoredProductService';
import { useKeycloak } from '@react-keycloak/web';
import { StyledDialogContent } from './ProductOut.styles';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import BarcodeScannerComponent from 'react-qr-barcode-scanner';
import { MobileView } from 'react-device-detect';

export interface ProductOutDialogProps {
    setOpenOut: React.Dispatch<React.SetStateAction<boolean>>,
    outOpen: boolean,
    fetchStoredProduct: Function
}

export interface StoredProductId {
    id: number,
    value: string
}

export const ProductOutDialog: FC<ProductOutDialogProps> = (props) => {
    const [storedProductsIdsToOut, setStoredProductsIdsToOut] = React.useState<number[]>([]);
    const [firstInputValue, setFirstInputValue] = useState<string>('');
    const {keycloak} = useKeycloak();

    const handleStoredProductOut = () => {
        props.setOpenOut(false);
        try {
            StoredProductService.setStoredProductAsOut(storedProductsIdsToOut, keycloak.token).then(() => {
                props.fetchStoredProduct();
            })
        } catch (error) {
            console.error(error)
        }
    };

    const onInputChanged = (id: number, event: any) => {
        setStoredProductsIdsToOut(oldArray => {
            oldArray[id] = Number(event.target.value)
            return [...oldArray]
        } );
    }

    const onFirstInputChanged = (value: string) => {
        setFirstInputValue(value)

        if (value.length >= 10) {
            setFirstInputValue('')
            setStoredProductsIdsToOut(oldArray => Array.from(new Set([...oldArray,Number(value)])) );
        }
    }

    const handleCancelProductOut = () => {
        props.setOpenOut(false);
    };

    const inputs: any[] = [];

    storedProductsIdsToOut.forEach((value, key) =>
        inputs.push(
            <FormControl key={`input-${key}`}>
                <Input id={`${key}`}  aria-describedby="my-helper-text"
                       onChange={(event) => onInputChanged(key, event)} value={`${String(value).padStart(10, '0')}`}/>
            </FormControl>
        )
    )

    return <Dialog open={props.outOpen} onClose={handleStoredProductOut}>
        <DialogTitle>Wydaj produkt</DialogTitle>
        <StyledDialogContent>
            <DialogContentText>
                Wprowadź identyfikatory produktów które chcesz wydać z magazynu.
            </DialogContentText>
            {inputs}
            <FormControl>
                {/*<InputLabel htmlFor="my-input">Identyfikator produktu</InputLabel>*/}
                <TextField id="my-input" label="Identyfikator produktu" aria-describedby="my-helper-text" value={firstInputValue}
                       onChange={(event) => onFirstInputChanged(event.target.value)}
                    // @ts-ignore
                           InputProps={{
                               endAdornment: (
                                   <InputAdornment position="end">
                                       <IconButton
                                           edge="end"
                                           color="primary"
                                           onClick = {() => navigator.clipboard.readText().then(text => onFirstInputChanged(text))}
                                       >
                                           <ContentPasteIcon />
                                       </IconButton>
                                   </InputAdornment>
                               ),
                           }}
                />
            </FormControl>

        </StyledDialogContent>
        <MobileView>
            <BarcodeScannerComponent
                width={300}
                onUpdate={(err, result: any) => {
                    if (result) {
                        onFirstInputChanged(result.text)
                    }

                }}
            />
        </MobileView>
        <DialogActions>
            <Button variant="contained" disabled={!storedProductsIdsToOut.length} onClick={handleStoredProductOut}>Wydaj</Button>
            <Button variant="outlined" onClick={handleCancelProductOut}>Anuluj</Button>
        </DialogActions>
    </Dialog>
}
