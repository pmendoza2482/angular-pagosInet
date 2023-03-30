import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formSubmitted = false;

  loginForm: FormGroup;
  autenticado: boolean = false;



  constructor(private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService) {

      this.loginForm = this.fb.group({
        numCuenta:['', [ Validators.required, Validators.maxLength(6)]]
        // password: ['', [ Validators.required, Validators.maxLength(20)]]
      });

     }

  ngOnInit(): void {
  }

  async autenticarUsuario(){

    if(this.loginForm.value.numCuenta !== ''){
 
     // this.router.navigate([`/principal/${ this.loginForm.value.numCuenta }`]);    
      this.router.navigate([`/general/${ this.loginForm.value.numCuenta }`]);       
    }
  }


  async login(){

    (await this.usuarioService.LoginPorCodigo(Number(this.loginForm.value.numCuenta)))
            .subscribe(async user => {

              if(user['data'] && user['error'] == null && user['message'] == null){

                this.autenticarUsuario();

              }else if(!user['data'] && user['error'] == null && user['message'] != null){

                // mensaje user no existe

                Swal.fire(
                  'Validación!',
                  `${user['message']}`,
                  'warning'
                )


              }else{

                Swal.fire(
                  'Error!',
                  `${user['error']}`,
                  'error'
                )

                // error de ustenticacion
              }


    }, (errorObtenido) => {

      Swal.fire(
        'Ocurrió un error!',
        `${errorObtenido}`,
        'error'
      )

      //console.log(errorObtenido);

    })

  }

}
