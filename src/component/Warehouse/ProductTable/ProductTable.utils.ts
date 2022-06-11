
export interface Column {
    name: 'productName' | 'rack' | 'column'  | 'row' | 'status' | 'identifier' | 'insertDate' | 'actions',
    label: string,
    options: any
    // minWidth?: number,
    // type?: string,
    // placeholder?: string
}

export const columns: Column [] = [
    {
        name: 'identifier', label: 'Identyfikator', options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: 'productName', label: 'Produkt', options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: 'rack', label: 'Regał', options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: 'row', label: 'Półka', options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: 'column', label: 'Kolumna', options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: 'insertDate', label: 'Data dodania', options: {
            filter: true,
            sort: true,
        }
    },



];
