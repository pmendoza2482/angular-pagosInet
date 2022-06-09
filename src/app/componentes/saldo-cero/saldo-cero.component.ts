import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-saldo-cero',
  templateUrl: './saldo-cero.component.html',
  styleUrls: ['./saldo-cero.component.css']
})
export class SaldoCeroComponent implements OnInit {

  constructor(private _location: Location) { }

  ngOnInit(): void {
  }

  regresar() {

    this._location.back();

    //this.router.navigate([`/login`]);    

  }

}
