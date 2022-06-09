export interface RequestTPAutenticar {
    user: string;
    password: string;
}

export interface ResponseTPAutenticar {
    status: number;
    message: string;
    data: TodoPago;
    rows: string;
    ok: boolean;
}





export interface TodoPago{
    token: string;
    verificationStatus: string;
    commmerceID: number;
    expirationDate: Date;
    mustChangePassword: boolean;
    activeUser: boolean;
    userType: string;
    commmerceName: string;
}