import React, { Dispatch, SetStateAction } from 'react';
import { Alert, Snackbar } from '@mui/material';

export interface SnackBarOptions {
    visible: boolean,
    message: string,
    severity?: 'error' | 'success'
}

export const SnackbarWrapper = (props: { snackBarOptions: SnackBarOptions, setSnackBarOptions: Dispatch<SetStateAction<SnackBarOptions>> }) => {
    const handleClose = () => {
        props.setSnackBarOptions({...props.snackBarOptions, visible: false},);
    };

    return <Snackbar open={props.snackBarOptions.visible} autoHideDuration={6000} onClose={handleClose}
                     anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert onClose={handleClose} severity={props.snackBarOptions.severity || 'success'}>
            {props.snackBarOptions.message}
        </Alert>
    </Snackbar>
}
