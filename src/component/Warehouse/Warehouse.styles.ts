import { styled } from '@mui/styles';
import { PieChart } from 'react-minimal-pie-chart/types/Chart';


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
    paddingTop: '20px',
    // width: '200em'
    height: '10em'
})

export const StyledToPrint = styled('div')({
    marginTop: '50px',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    height: '1000px',
    '@media screen': {
        visibility: 'hidden',
        display: 'none'
    },
    '@media print': {
        visibility: 'visible',
    },
})

export const StyledBarCode = styled('div')({
    height: '50%'
})

export const StyledPieChart = styled('div')({
    width: '30%'
})
