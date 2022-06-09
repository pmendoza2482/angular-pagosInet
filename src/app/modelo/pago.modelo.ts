export interface Pagar{
    codigo?: number;
    descripcion?: string;
    tipo?: string;
    valor?: number;
    autorizacion?: string;
    documento?: string;
    // nombreTarjeta?: string;
    // numeroTarjeta?: string;
    // mm?: string;
    // aa?: string;
    // cvc?: string;
    // codigoPostal?: string;
}

export interface ResponsePago {
    message?: string;
    data: Pagar[];
    error?: string;  
}