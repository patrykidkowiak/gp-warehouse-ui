export interface Column {
    id: 'productName' | 'position' | 'status',
    label: string,
    minWidth?: number,
    type?: string,
    placeholder?: string
}

export const columns: Column [] = [
    {id: 'productName', label: 'Produkt'},
    {id: 'position', label: 'Pozycja'},
    {id: 'status', label: 'Status'},
];
