import * as React from 'react';
import Paper from '@mui/material/Paper';
import { StoredProduct } from '../../../service/StoredProductService';
import { columns } from './ProductTable.utils';
import { StyledActionButtons, StyledTableContainer } from './ProductTable.styles';
import MUIDataTable from "mui-datatables";
import { Button, createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/styles';
import { useEffect, useState } from 'react';
import { BarcodesToPrint } from '../BarcodesToPrint/BarcodesToPrint';
import PrintIcon from '@mui/icons-material/Print';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import moment from 'moment';

function createData(storedProduct: StoredProduct): StoredProductRow {
    const formattedInsertDate = moment(storedProduct.insertDate).format('DD.MM.YYYY, H:mm');
    return {
        identifier: `${String(storedProduct.id).padStart(10, '0')}`,
        productName: `${storedProduct.product?.name} ${storedProduct.product?.weight}kg`,
        rack: storedProduct.rack?.name || '',
        row: storedProduct.row?.name || '',
        column: storedProduct.rackColumn?.name || '',
        status: storedProduct.status || '',
        insertDate: formattedInsertDate,
        nettoWeight: storedProduct.nettoWeight === null ? '' : `${storedProduct.nettoWeight}kg`,
        bruttoWeight: storedProduct.bruttoWeight === null ? '' : `${storedProduct.bruttoWeight}kg`,
    };
}

export interface ProductTableProps {
    storedProducts: StoredProduct[];
}


interface StoredProductRow {
    identifier: string,
    productName: string,
    rack: string,
    row: string,
    column: string,
    status: string,
    insertDate: string,
    nettoWeight: string,
    bruttoWeight: string
}

export const ProductTable = (props: ProductTableProps) => {
    const rows: StoredProductRow[] = [...props.storedProducts].map((storedProduct) => createData(storedProduct));
    const [productToPrint, setProductToPrint] = useState<StoredProduct>(null)
    const [idToPrint, setIdToPrint] = useState<number>(null);
    // const selectedProduct = ;

    const getMuiTheme = () => createTheme({

        // components: {
        //     // @ts-ignore
        //     MUIDataTableToolbar: {
        //         styleOverrides: {
        //             root: {
        //                 backgroundColor: 'gold'
        //             }
        //         }
        //     },
        //     MuiTableHead: {
        //         styleOverrides: {
        //             root: {
        //                 backgroundColor: 'gold'
        //             }
        //         }
        //     }
        // }
    });


    useEffect(() => {
        columns.length = 8;
        columns.push(
            {
                name: 'actions', label: 'Akcje', options: {
                    customBodyRender: (value: any, tableMeta: any) => (
                        <StyledActionButtons>
                            <Button onClick={() => {setIdToPrint(tableMeta.rowData[0])}}> <PrintIcon/> </Button>
                            <Button onClick={() => {{navigator.clipboard.writeText(tableMeta.rowData[0])}}}> <ContentCopyIcon/> </Button>
                        </StyledActionButtons>
                    ),

                }
            }
        )
    }, []);


    useEffect(() => {
        if (idToPrint) {
            const newVar = props.storedProducts?.find(product => product.id === Number(idToPrint)) || null;
            setProductToPrint(newVar)
        } else {
            setProductToPrint(null)
        }
    }, [idToPrint])

    return (
        // @ts-ignore
        <StyledTableContainer component={Paper}>
            <ThemeProvider theme={getMuiTheme()}>
                <MUIDataTable
                    title={"Tabela produktów na magazynie"}
                    data={rows}
                    columns={columns}
                    options={{
                        selectableRowsHideCheckboxes: true,
                        download: false,
                        search: false,
                        print: false,
                        viewColumns: false
                    }}
                >
                </MUIDataTable>
            </ThemeProvider>
            {
                idToPrint && productToPrint &&
                <BarcodesToPrint
                    id={idToPrint}
                    product={productToPrint.product}
                    printCallback= {() => setIdToPrint(null)}
                    barcodesInfo={[{
                        id: idToPrint,
                        product: productToPrint.product,
                        place: {rack: productToPrint.rack, row: productToPrint.row, column: productToPrint.rackColumn}
                    }]}
                />
            }
        </StyledTableContainer>
    );
}
