import { styled } from '@mui/styles';
import { PieChart } from 'react-minimal-pie-chart/types/Chart';
import Carousel from 'react-material-ui-carousel';
import { Button, Paper } from '@mui/material';
import { pink } from '@mui/material/colors';


export const StyledWarehouse = styled('div')({
    display: 'flex',
    width: '80%',
    margin: 'auto',
    flexDirection: 'column',
})

export const StyledRows = styled('div')({
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
})

export const StyledRow = styled('div')({
    display: 'flex',
})

export const StyledButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
    paddingTop: '20px',
    // width: '200em'
    height: '10em'
})

export const StyledDiagramsContainer = styled('div')({
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

export const StyledCarousel = styled(Carousel)({
    // height: '500px'
    width: '100%'
})

export const StyledBarCode = styled('div')({
    height: '50%'
})

export const StyledPieChart = styled('div')({
    width: '30%'
})

export const StyledCarouselPaper = styled(Paper)({
    backgroundColor: pink['50'],
    height: '200px'
})

export const StyledCarouselButton = styled(Button)({
    height: '15px',
    minWidth: '15px'
})

export const StyledCarouselContent = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    margin: 'auto',
    width: '100%',
    gap: '10px',
    marginTop: '30px',
    // flexDirection: 'column',
})

export const StyledCarouselTitle = styled('div')({
    fontSize: '1.5em'
})
