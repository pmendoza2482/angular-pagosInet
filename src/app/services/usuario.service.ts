import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PagoInetRequest, ResponseCliente, ResponseLogin, ResponsePago } from '../modelo/cliente.modelo';
import Swal from 'sweetalert2';
import { Pagar } from '../modelo/pago.modelo';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  async LoginPorCodigo(clienteId: number){

    return this.http.get<ResponseLogin>(URL + `Pasarela/LoginPorCodigo?codigo=${clienteId}`);
  }

  async obtenerCreditosPorCliente(clienteId: number){

    return this.http.get<ResponseCliente>(URL + `Pasarela/MostrarClienteSaldoPorCodigo?codigo=${clienteId}`);
  }

  async crearPago(pago: Pagar){

    //return new Promise(resolve => {

      return this.http.post<ResponsePago>(URL + `Pasarela/RegistrarPago`, pago);
    //     .subscribe(async resp => {

    //       if(resp['data']){

    //         resolve(true);
    //       }
    //       else if(!resp['data'] && resp['Error'] !== ''){

    //         resolve(false);
    //         MensajeAdvertencia(`Ocurrio un error: ${resp['Error']}`, 'Validación');
    //       }
    //       else{

    //         resolve(false);
    //         MensajeAdvertencia('Ocurrio un error', 'Validación');
    //       }

    //     })
 
    // });

  }

}
