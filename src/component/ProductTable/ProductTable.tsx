import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { StoredProduct } from '../../service/StoredProductService';
import { columns } from './ProductTable.utils';
import { StyledTableContainer, StyledTableHeadCell, StyledTableRowCell } from './ProductTable.styles';

function createData(storedProduct: StoredProduct): StoredProductRow {
    return {
        productName: `${storedProduct.product.name} ${storedProduct.product.weight}`,
        position: `${storedProduct.rack.name}.${storedProduct.column.name}.${storedProduct.row.name}`,
        status: 'STORED'
    };
}

export interface ProductTableProps {
    storedProducts: StoredProduct[];
}


interface StoredProductRow {
    productName: string,
    position: string,
    status: string
}

export const ProductTable = (props: ProductTableProps) => {
    const rows: StoredProductRow[] = props.storedProducts.map((storedProduct) => createData(storedProduct));

    return (
        // @ts-ignore
        <StyledTableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    {
                        columns.map((column) => (
                            <StyledTableHeadCell key={`${column.id}-head`}>
                                {column.label}
                            </StyledTableHeadCell>
                        ))
                    }
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={`${row.productName}-${row.position}`}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            {
                                columns.map((column) =>
                                    <StyledTableRowCell key={`${column.id}-row`} align="right">{row[column.id]}</StyledTableRowCell>
                                )
                            }

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </StyledTableContainer>
    );
}
