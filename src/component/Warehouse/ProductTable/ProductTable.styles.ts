import TableContainer from '@mui/material/TableContainer';
import { styled, withTheme } from '@mui/styles';
import TableCell from '@mui/material/TableCell';
import Button from '@mui/material/Button';

export const StyledTableContainer = styled(TableContainer)({
    margin: 'auto',
    marginTop: '20px',
    width: '100%',
    marginBottom: '100px'
})

export const StyledTableHeadCell = styled(withTheme(TableCell))(props =>({
    textAlign: 'center',
    backgroundColor: 'gold',
}))

export const StyledTableRowCell = styled(TableCell)({
    textAlign: 'center',
})

export const StyledOperationButton = styled(Button)({
    // height: '150px',
    width: '100%',
    fontSize: '2em'
})

export const StyledActionButtons = styled('div')({
    textAlign: 'left',
    marginLeft: '-20px',
})
