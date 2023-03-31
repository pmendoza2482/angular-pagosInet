import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RequestTPAutenticar, ResponseTPAutenticar } from '../modelo/todoPagoAutenticar.modelo';
import { RequestTPPagar, RespuestadeTPPagar } from '../modelo/todoPagoPagar.modelo';
import { TodoPagoResponse } from '../modelo/voucher.modelo';

const userTP = environment.tpUser;
const passwordTP = environment.tpPassword;
const urlTP = environment.tpUrl;

@Injectable({
  providedIn: 'root'
})
export class TodoPagoApiService {

  requestTodoPago: RequestTPAutenticar | undefined;
  requestTodoPagoPagar: RequestTPPagar | undefined;

  constructor(public http: HttpClient) { }
  async autenticarTodoPagoApi(){

    this.requestTodoPago = 
    { 
      user: userTP, 
      password: passwordTP 
    }

    // user: '0501-9012-46995512', 
    // password: '123456'

    //console.log(this.requestTodoPago);

    const headers = new HttpHeaders({
      'X-Tenant': 'HNTP'
    });

    return this.http.post<ResponseTPAutenticar>(`${urlTP}/v1/login`, this.requestTodoPago, { headers });
  }


  async pagarTodoPagoApi(token: string, requestTodoPagoPagar: RequestTPPagar){

    const headers = new HttpHeaders({
      'X-Token': token,
      'X-Tenant': 'HNTP',
      'X-Content': 'json'
    });

    //<RespuestadeTPPagar>

    return this.http.post<TodoPagoResponse>(`${urlTP}/v1/direct-payment-without-register`, requestTodoPagoPagar, { headers });
  }

}

