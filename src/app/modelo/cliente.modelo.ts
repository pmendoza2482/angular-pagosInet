export interface Cliente{
    codigo?: number;
    nombre?: string;
    saldo?: number;
    corte?: number;
}

export interface PagoInetRequest{
    codigo?: number;
    nombre?: string;
    saldo?: number;
    corte?: number;
}

export interface ResponseCliente {
    message?: string;
    data: Cliente;
    error?: string;  
}

export interface ResponseLogin {
    message?: string;
    data: boolean;
    error?: string;  
}

export interface ResponsePago {
    message?: string;
    data: boolean;
    error?: string;  
}