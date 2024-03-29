import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/modelo/cliente.modelo';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  numeroCuenta: string = '';
  saldo: number = 0;

  realizoPago: boolean = false;

  clientes: Cliente = {};
  clienteNombre: string = '';
  clienteCuentaNumero: number = 0;
  clienteSaldo: number = 0;
  clienteEstado: string = '';

  pagoDelCliente: number = 0;

  constructor(private state: ActivatedRoute, private usuarioService: UsuarioService ) { }

  async ngOnInit(): Promise<void> {

    this.numeroCuenta = this.state.snapshot.paramMap.get('cuenta') || '';

    await this.ObtenerSaldoPorCliente(Number(this.numeroCuenta));

  }

  PonerStatusPago(pago: number){

    this.realizoPago = true;
    this.pagoDelCliente = pago;
  }

  async ObtenerSaldoPorCliente(cuenta: number){

    //console.log('Llamada de metodo');

    (await this.usuarioService.obtenerCreditosPorCliente(cuenta))
            .subscribe(async credi => {

              this.clientes = credi['data'];

              this.clienteNombre = this.clientes.nombre || '';
              this.clienteCuentaNumero = this.clientes.codigo || 0;
              this.clienteSaldo = this.clientes.saldo || 0;
              this.clienteEstado = this.clientes.status || '';

    }, (errorObtenido) => {

      Swal.fire(
        'Error!',
        `No se pudo obtener la información del cliente, la transacción no se ejecutó : ${errorObtenido}`,
        'error'
      )

    })

  }

}
