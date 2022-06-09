import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-informacion-cliente',
  templateUrl: './informacion-cliente.component.html',
  styleUrls: ['./informacion-cliente.component.css']
})
export class InformacionClienteComponent {

  @Input() nombreCliente: string = '';
  @Input() clienteCuenta: number = 0;

  constructor() { }

}
