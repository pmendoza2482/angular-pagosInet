import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoComponent } from './pago/pago.component';
import { PaginasComponent } from './paginas.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentesModule } from '../componentes/componentes.module';
import { PrincipalComponent } from './principal/principal.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import {NgxPaginationModule} from 'ngx-pagination';
import { GeneralComponent } from './general/general.component';

@NgModule({
  declarations: [
    PagoComponent,
    PrincipalComponent,
    GeneralComponent
  ],
  exports: [ 
    PagoComponent,
    PrincipalComponent,
    GeneralComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    ComponentesModule, 
    NgxPaginationModule,
    NgxMaskModule.forRoot(),
  ]
})
export class PaginasModule { }
