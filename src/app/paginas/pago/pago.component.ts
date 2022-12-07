import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Pagar } from 'src/app/modelo/pago.modelo';
import { TodoPagoApiService } from 'src/app/services/todo-pago-api.service';
import { TodoPago } from '../../modelo/todoPagoAutenticar.modelo';
import { RequestTPPagar } from 'src/app/modelo/todoPagoPagar.modelo';
import Swal from 'sweetalert2';
import { PagoInetRequest } from 'src/app/modelo/cliente.modelo';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  //numeroCuenta: string = '';
  pagoForm: FormGroup;
  tpRespuesta: TodoPago | undefined;
  pagarCuota: Pagar = {};

  //tpStatus: number = 0;
  tpToken: string = '';
  pagoTotal: number = 0;
  NopagarParcial: boolean = true;
  montoParcialRequerrido: boolean = false;
  montoParcialValido: boolean = false;

 // cantidadMontoParcial: number = 0;

  //NopagarContado: boolean = false;


  requestTodoPagoPagar: RequestTPPagar | undefined;

  @Input() nombreCliente: string = '';
  @Input() clienteCuenta: number = 0;
  @Input() clienteSldo:number = 0;

  @Output() ejecutarSaldos: EventEmitter<number>;

  constructor(private state: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private tpService: TodoPagoApiService,
    private usuarioService: UsuarioService) {

      this.ejecutarSaldos = new EventEmitter();

      this.pagoForm = this.fb.group({
        nombreTarjeta:['', [ Validators.required, Validators.maxLength(35)]],
        numeroTarjeta: ['', [ Validators.required, Validators.maxLength(20)]],
        mm: ['', [ Validators.required, Validators.maxLength(2)]],
        aa: ['', [ Validators.required, Validators.maxLength(2)]],
        cvc: ['', [ Validators.required, Validators.maxLength(6)]],
        montoParcial: [''],
        correo: ['', [ Validators.maxLength(120)]],
        //codigoPostal: ['', [ Validators.required, Validators.maxLength(20)]]
      });
     }

  ngOnInit(): void {

    console.log(this.nombreCliente, this.clienteCuenta, this.clienteSldo)


  }

  get first(): any { return this.pagoForm.get('montoParcial'); }

  marcarContado(event: any){

    let df  = event.target;

    console.log('contado');

    this.first.reset();

    this.montoParcialRequerrido = false;

    this.NopagarParcial = true;

  

  }

  marcarParcial(event: any){

    let df  = event.target;

    console.log('parcial');

    this.montoParcialRequerrido = true;

    this.NopagarParcial = false;

  }

  onPercentChange(montoP: number) {

    if(montoP > 0){

      this.montoParcialRequerrido = false;

      if(montoP >= this.clienteSldo){

        this.montoParcialValido = true;
      }
      else{

        this.montoParcialValido = false;
      }

    }else{

      this.montoParcialRequerrido = true;
    }

    
  }

  async pagar(){

    this.pagoTotal = this.NopagarParcial == false ?
     this.pagoForm.get('montoParcial')?.value 
     : this.clienteSldo; 

        this.pagarCuota = {
          codigo: this.clienteCuenta,
          descripcion: 'Tarjeta Crédito',
          tipo: this.NopagarParcial == false ? 'parcial' : 'Pago total',
          //tipo: 'Pago parcial',
          valor: this.pagoTotal * (-1),
          autorizacion: '',
          documento: '',
      // codigoPostal: this.pagoForm.get('codigoPostal')?.value,
    };


    Swal.fire({
      title: 'Confirmar!',
      text: `Estas seguro que deseas realizar el pago por el valor de : Lps. ${ this.pagoTotal }?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Pagar!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {

        await this.autenticarTodoPagoApi();
      }
    })


  }

  async autenticarTodoPagoApi(){

  
    (await this.tpService.autenticarTodoPagoApi())
    .subscribe(async resp => {

      if(resp['status'] == 200){

        this.tpRespuesta = resp['data'];
        this.tpToken = this.tpRespuesta.token;

        let d = new Date();
        let externalRef = d.getDate() + "" + d.getFullYear() + "" + d.getHours() + "" + d.getMinutes() + "" + d.getSeconds(); 

        this.requestTodoPagoPagar = 
        { 
          accountNumber: this.pagoForm.get('numeroTarjeta')?.value,
          amount: this.pagoTotal,
          taxes: 18,
          cardHolderName: "Inet",
          comment: this.clienteCuenta.toString(),
          commerceID: 882,
          customerName: this.nombreCliente,
          cvc: this.pagoForm.get('cvc')?.value,
          expirationMonth: this.pagoForm.get('mm')?.value,
          expirationYear: this.pagoForm.get('aa')?.value,
          externalReference: externalRef,
          customerEmail: this.pagoForm.get('correo')?.value || '',
          terminalNbr: "1",
          currency: "HNL"
        }

        await this.procesarPago(this.requestTodoPagoPagar);
      }
  

    
    }, (error) => {
    
      console.log(error);

    })
  }

  async procesarPago(requestTodoPagoPagar: RequestTPPagar){

    (await this.tpService.pagarTodoPagoApi(this.tpToken, requestTodoPagoPagar))
    .subscribe(pago => {

      console.log(pago)

      if(pago.status == 200){

        this.PagarCuotaInet(this.pagarCuota);

      }else{

        Swal.fire(
          'Error!',
          `La Transacción no se ejecutó!!`,
          'error'
        )

      }

    }, (error) => {


      Swal.fire(
          'Error!',
          `${error.error.message}`,
          'error'
        )

    })

  }


  async PagarCuotaInet(requestTodoPagoPagar: Pagar){

    (await this.usuarioService.crearPago(requestTodoPagoPagar))
    .subscribe(pago => {

      console.log(pago)

      if(pago.data){

        Swal.fire(
          'Información',
          `La Transacción fue realizada con exito!!`,
          'success'
        );

        this.ejecutarSaldos.emit( this.pagoTotal );

      }else{

        Swal.fire(
          'Error!',
          `La transacción se realizada pero el saldo no se aplicó!!, consulte a nuestras oficinas para mas detalle.`,
          'error'
        )

      }

    }, (error) => {


      Swal.fire(
          'Error!',
          `La transacción se realizada pero el saldo no se aplicó!!, consulte a nuestras oficacinas para mas detale., ${error.error.message}`,
          'error'
        )

    })

  }

}