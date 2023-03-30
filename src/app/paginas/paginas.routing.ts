import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeneralComponent } from './general/general.component';
import { PaginasComponent } from './paginas.component';
import { PagoComponent } from './pago/pago.component';
import { PrincipalComponent } from './principal/principal.component';

const routes : Routes = [
    {   
        path: '', 
        component: PaginasComponent,
        // canActivate: [ AuthGuard ],
        children: [
            { path: 'pago/:cuenta', component: PagoComponent },
            { path: 'principal/:cuenta', component: PrincipalComponent },
            { path: 'general/:cuenta', component: GeneralComponent },
            //{ path: '', redirectTo: 'selecRubro', pathMatch: 'full' },
        ] 
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class PaginasRoutingModule { }