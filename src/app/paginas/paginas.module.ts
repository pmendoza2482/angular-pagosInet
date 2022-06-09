import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoComponent } from './pago/pago.component';
import { PaginasComponent } from './paginas.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentesModule } from '../componentes/componentes.module';
import { PrincipalComponent } from './principal/principal.component';

@NgModule({
  declarations: [
    PagoComponent,
    PrincipalComponent
  ],
  exports: [ 
    PagoComponent,
    PrincipalComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentesModule
  ]
})
export class PaginasModule { }
