import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaldoCeroComponent } from './saldo-cero/saldo-cero.component';
import { InformacionClienteComponent } from './informacion-cliente/informacion-cliente.component';
import { PagoRealizadoComponent } from './pago-realizado/pago-realizado.component';



@NgModule({
  declarations: [
    SaldoCeroComponent,
    InformacionClienteComponent,
    PagoRealizadoComponent
  ],
  exports: [
    SaldoCeroComponent,
    InformacionClienteComponent,
    PagoRealizadoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentesModule { }
