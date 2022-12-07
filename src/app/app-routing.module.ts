import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthRoutingModule } from './auth/auth.routing';
import { PaginasRoutingModule } from './paginas/paginas.routing';

const routes: Routes = [
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
    AuthRoutingModule,
    PaginasRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
