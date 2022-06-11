import React, { FC, useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, IconButton, Input, InputAdornment, InputLabel, TextField } from '@mui/material';
import { StoredProductService } from '../../../service/StoredProductService';
import { useKeycloak } from '@react-keycloak/web';
import { StyledDialogContent } from './ProductOut.styles';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';

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
    const [storedProductsIdsToOut2, setStoredProductsIdsToOut2] = React.useState<Map<number, number>>(new Map());
    const [firstInputValue, setFirstInputValue] = useState<string>('');
    const {keycloak} = useKeycloak();

    const handleStoredProductOut = () => {
        props.setOpenOut(false);
        try {
            StoredProductService.setStoredProductAsOut(Array.from(storedProductsIdsToOut2.values()), keycloak.token).then(() => {
                props.fetchStoredProduct();
            })
        } catch (error) {
            console.error(error)
        }

    };

    const onInputChanged = (id: number, event: any) => {
        setStoredProductsIdsToOut2(map => new Map(map.set(id, Number(event.target.value))));
    }

    const onFirstInputChanged = (id: number, value: string) => {
        setFirstInputValue(value)

        if (value.length >= 10) {
            setFirstInputValue('')
            setStoredProductsIdsToOut2(map => new Map(map.set(id, Number(value))));
        }


    }


    useEffect(() => {
        console.log(storedProductsIdsToOut2)
    }, [storedProductsIdsToOut2])


    const handleCancelProductOut = () => {
        props.setOpenOut(false);
    };

    const inputs: any[] = [];

    storedProductsIdsToOut2.forEach((value, key) =>
        inputs.push(
            <FormControl>
                <Input id={`${key}`} aria-describedby="my-helper-text"
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
                       onChange={(event) => onFirstInputChanged(storedProductsIdsToOut2.size, event.target.value)}
                    // @ts-ignore
                           InputProps={{
                               endAdornment: (
                                   <InputAdornment position="end">
                                       <IconButton
                                           edge="end"
                                           color="primary"
                                           onClick = {() => navigator.clipboard.readText().then(text => onFirstInputChanged(storedProductsIdsToOut2.size, text))}
                                       >
                                           <ContentPasteIcon />
                                       </IconButton>
                                   </InputAdornment>
                               ),
                           }}
                />
            </FormControl>
        </StyledDialogContent>
        <DialogActions>
            <Button variant="contained" disabled={!storedProductsIdsToOut2.size} onClick={handleStoredProductOut}>Wydaj</Button>
            <Button variant="outlined" onClick={handleCancelProductOut}>Anuluj</Button>
        </DialogActions>
    </Dialog>
}
