import React, { FC, useEffect, useRef, useState } from 'react';
import { StyledBarCode, StyledToPrint } from '../Warehouse.styles';
import { Product } from '../../../service/ProductService';
import { BarcodesInfo } from '../../../service/PlaceService';
import { useReactToPrint } from 'react-to-print';
// @ts-ignore
import Barcode from 'react-barcode';

export interface BarcodesToPrintProps {
    id: number,
    product: Product,
    barcodesInfo: BarcodesInfo[],
    printCallback: () => void;
}

export const BarcodesToPrint: FC<BarcodesToPrintProps> = (props: BarcodesToPrintProps) => {
    const zeroPad = (num: number, places: number): string => String(num).padStart(places, '0')
    const componentRef = useRef();

    useEffect(() => {
        if (props.id) {
            print();
            props.printCallback();
        }
    }, [props.id])

    const print = useReactToPrint({
        // @ts-ignore
        content: () => componentRef.current,
    });

    return <>
        <StyledToPrint ref={componentRef}>
            {
                [...props.barcodesInfo, ...props.barcodesInfo].map(barcode => (
                    <StyledBarCode>
                        <Barcode value={zeroPad(barcode.id, 10)}/>
                        {`${barcode.place?.rack?.name}.${barcode.place?.row?.name}.${barcode.place?.column?.name} `}
                        {`${props.product?.name} ${props.product?.weight}kg`.toUpperCase()}
                    </StyledBarCode>
                ))
            }
        </StyledToPrint>
    </>

}
