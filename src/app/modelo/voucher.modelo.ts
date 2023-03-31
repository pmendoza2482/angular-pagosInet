export interface Voucher{
    name?: string;
    value?: string;
}

export interface Data{
    transaccionID?: number;
    voucher?: Voucher[];
}

export interface TodoPagoResponse{
    status?: number;
    data?: Data;
}