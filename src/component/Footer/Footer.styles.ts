import { styled } from '@mui/styles';
import { pink } from '@mui/material/colors';


export const StyledFooter = styled('div')(({theme: any}) => ({
    // position: 'absolute',
    // bottom: 0,
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: '4em',
    // width: '100%',
    // backgroundColor: `${pink['600']}`,
    // color: 'white',
    position: 'fixed',
    left: '0',
    // top: '10px',
    bottom: '0',
    width: '100%',
    height: '3em',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // height: '3vh',
    // backgroundColor: 'red',
    backgroundColor: `${pink['600']}`,

    color: 'white',
    textAlign: 'center'
}));
