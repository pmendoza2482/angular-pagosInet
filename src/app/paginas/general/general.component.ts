import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/modelo/cliente.modelo';
import { Pagar } from 'src/app/modelo/pago.modelo';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.css']
})
export class GeneralComponent implements OnInit {

  clientes: Cliente = {};
  movimientos: Pagar[] = [];

  clienteNombre: string = '';
  clienteCuentaNumero: number = 0;
  clienteSaldo: number = 0;
  clienteCorte?: number = 0;
  clienteIPPublica?: string = '';
  clienteMAC?: string = '';
  clienteTelefono?: string = '';
  clienteEmail?: string = '';
  clienteStatus?: string = '';

  codigoIngresado: string = '';

  page: number = 1;
  count: number = 0;
  tableSize: number = 10;
  tableSizes: any = [3, 6, 9];

  constructor(private router: Router,private state: ActivatedRoute, private usuarioService: UsuarioService) { }

  async ngOnInit(): Promise<void> {

    this.codigoIngresado = this.state.snapshot.paramMap.get('cuenta') || '';


    await this.ObtenerSaldoPorCliente(Number(this.codigoIngresado));
  }

  async ObtenerSaldoPorCliente(cuenta: number){

    console.log('Llamada de metodo', cuenta);

    (await this.usuarioService.obtenerCreditosPorCliente(cuenta))
            .subscribe(async credi => {

              this.clientes = credi['data'];

              console.log(this.clientes)

              this.clienteNombre = this.clientes.nombre || '';
              this.clienteCuentaNumero = this.clientes.codigo || 0;
              this.clienteSaldo = this.clientes.saldo || 0;

              this.clienteIPPublica = this.clientes.ipPublica || '';
              this.clienteMAC = this.clientes.mac || '';
              this.clienteTelefono = this.clientes.telefono || '';
              this.clienteEmail = this.clientes.email || '';
              this.clienteStatus = this.clientes.status || '';

              this.ObtenerMovimientosPorCodigo(cuenta);

    }, (errorObtenido) => {

      //console.log(errorObtenido);

      Swal.fire(
        'Error',
        `Ocurrió un error al obtener información del cliente, ${errorObtenido}`,
        'error'
      )
      return;

    })

  }

  async ObtenerMovimientosPorCodigo(cuenta: number){

    (await this.usuarioService.obtenerMovimientosPorCodigo(cuenta))
        .subscribe(proy => {

          this.movimientos = proy['data'];

          console.log(this.movimientos)

        }, (error) => {

          Swal.fire(
            'Ocurrió un error!',
            `${error}`,
            'error'
          )
        })
  }

  async onTableDataChange(event: number){

    this.page = event;
    await this.ObtenerMovimientosPorCodigo(Number(this.codigoIngresado));
  }

  pagarCuota(){

    if(this.codigoIngresado !== ''){
 
      // this.router.navigate([`/principal/${ this.loginForm.value.numCuenta }`]);    
       this.router.navigate([`/principal/${ this.codigoIngresado }`]);       
     }

  }

}
