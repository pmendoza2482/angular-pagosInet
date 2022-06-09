import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cliente } from 'src/app/modelo/cliente.modelo';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  numeroCuenta: string = '';
  saldo: number = 0;

  clientes: Cliente = {};

  realizoPago: boolean = false;


  clienteNombre: string = '';
  clienteCuentaNumero: number = 0;
  clienteSaldo: number = 0;

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

    console.log('Llamada de metodo');

    (await this.usuarioService.obtenerCreditosPorCliente(cuenta))
            .subscribe(async credi => {

              this.clientes = credi['data'];

              this.clienteNombre = this.clientes.nombre || '';
              this.clienteCuentaNumero = this.clientes.codigo || 0;
              this.clienteSaldo = this.clientes.saldo || 0;

    }, (errorObtenido) => {

      //console.log(errorObtenido);

    })

  }

}
