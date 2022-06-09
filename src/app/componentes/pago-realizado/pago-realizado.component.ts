import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pago-realizado',
  templateUrl: './pago-realizado.component.html',
  styleUrls: ['./pago-realizado.component.css']
})
export class PagoRealizadoComponent implements OnInit {

  @Input() pagoDelCliente:number = 0;

  today = new Date();
  date: any;

  constructor(private _location: Location) { }

  ngOnInit(): void {

    
    this.date = this.today.getFullYear()+'-'+(this.today.getMonth()+1)+'-'+this.today.getDate();
  }

  regresar() {

    this._location.back();

    //this.router.navigate([`/login`]);    

  }


}
