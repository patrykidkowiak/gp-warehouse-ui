import { styled } from '@mui/styles';


export const StyledWarehouse = styled('div')({
    display: 'flex',
    width: '80%',
    margin: 'auto',
    flexDirection: 'column',
})

export const StyledButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    paddingTop: '20px'
})

export const StyledToPrint = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    height: '1000px',
    '@media screen': {
        visibility: 'hidden',

    },
    '@media print': {
        visibility: 'visible',
    },
})

export const StyledBarCode = styled('div')({
    height: '50%'
})
