import { styled } from '@mui/styles';
import { DialogContent, Select } from '@mui/material';

export const StyledProductIn = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    marginTop: '30px',
})

export const StyledPlaceSelectors = styled('div')({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '20px',
})

export const StyledDialogContent = styled(DialogContent)({
    width: '350px',
})

export const StyledPlaceSelector = styled(Select)({
    width: '110px',
})
