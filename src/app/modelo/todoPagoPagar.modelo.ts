

export interface RequestTPPagar {
   accountNumber: string;
   amount: number;
   taxes: number;
   cardHolderName: string;
   comment: string;
   commerceID: number;
   customerName: string;
   cvc: string;
   expirationMonth: string;
   expirationYear: string;
   externalReference: string;
   customerEmail: string;
   terminalNbr: string;
   currency: string;
}

export interface RespuestadeTPPagar {
   status: string;
   message: string;
}

// {
//    "data": {
//      "status": "string",
//      "transaccionID": 0,
//      "processorCode": 0,
//      "voucher": [
//        {
//          "name": "string",
//          "value": "string"
//        }
//      ]
//    },
//    "errors": [
//       "string"
//     ],
//     "message": "string",
//     "ok": true,
//     "rows": 0,
//     "status": 0
//   }
   

// export interface RPPagarTP {
//    data: {
//         status: string,
//         transaccionID: 0,
//         processorCode: 0,
//         voucher: [
//           {
//             "name": "string",
//             "value": "string"
//           }
//         ]
    
// }