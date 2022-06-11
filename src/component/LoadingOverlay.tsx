import { Backdrop, CircularProgress } from '@mui/material';
import React, { FC } from 'react';

export const LoadingOverlay: FC = () => {
    return <Backdrop
        sx={{color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1}}
        open={true}
    >
        <CircularProgress color="primary"/>
    </Backdrop>
}
