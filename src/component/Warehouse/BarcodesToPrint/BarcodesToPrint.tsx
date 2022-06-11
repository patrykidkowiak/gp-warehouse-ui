import React, { FC, useEffect, useRef, useState } from 'react';
import { StyledBarCode, StyledToPrint } from '../Warehouse.styles';
import { useBarcode } from 'react-barcodes';
import { Product } from '../../../service/ProductService';
import { Place } from '../../../service/PlaceService';
import { useReactToPrint } from 'react-to-print';

export interface BarcodesToPrintProps {
    id: number,
    product: Product,
    place: Place,
    printCallback: () => void;
}

export const BarcodesToPrint: FC<BarcodesToPrintProps> = (props: BarcodesToPrintProps) => {
    const zeroPad = (num: number, places: number) => String(num).padStart(places, '0')

    const inputRef1 = useBarcode({
        value: zeroPad(props.id, 10),
        options: {
            width: 6,
            height: 300
        }
    }).inputRef;

    const inputRef2 = useBarcode({
        value: zeroPad(props.id, 10),
        options: {
            width: 6,
            height: 300
        }
    }).inputRef;

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

    // @ts-ignore
    return <StyledToPrint ref={componentRef}>
        <StyledBarCode>
            <svg ref={inputRef1}/>
            <div>
                {`${props.place?.rack?.name}.${props.place?.row?.name}.${props.place?.column?.name} `}
                {`${props.product?.name} ${props.product?.weight}kg`.toUpperCase()}
            </div>
        </StyledBarCode>
        <StyledBarCode>
            <svg ref={inputRef2}/>
            <div>
                {`${props.place?.rack?.name}.${props.place?.row?.name}.${props.place?.column?.name} `}
                {`${props.product?.name} ${props.product?.weight}kg`.toUpperCase()}
            </div>
        </StyledBarCode>
    </StyledToPrint>

}
