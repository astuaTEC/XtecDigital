import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ProfesorInfoService } from 'src/app/Vistas/Profesor/ServiciosProfesor/profesor-info.service'
import { UsuarioProfesor } from 'src/app/Vistas/Profesor/ModelosProfesor/usuario-profesor'
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login-profesor',
  templateUrl: './login-profesor.component.html',
  styleUrls: ['./login-profesor.component.css']
})
export class LoginProfesorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private profesorInfoService: ProfesorInfoService, private toastr: ToastrService) { }

  //Información de usuario del profesor
  usuarioProfesor: UsuarioProfesor = new UsuarioProfesor('', '');

  ngOnInit(): void {
  }


  gotoHome(){
    this.profesorInfoService.iniciarSesion(this.usuarioProfesor)
    .subscribe(
      data => {
        console.log(data);
        this.Success();
        //Se configuran los datos del profesor que inicia sesión
        this.router.navigate(['/ProfesorHome', this.usuarioProfesor.usuario, data['primerNombre'] + ' '  + data['primerApellido'] + ' ' + data['segundoApellido']]);
        this.usuarioProfesor = new UsuarioProfesor('', '');
      },
      error => {
        console.log(error);
        if(error.status === 400){
          this.usuarioProfesor = new UsuarioProfesor('', '');
          this.error();
        }
      }); 
  }

  error() {
    this.toastr.error('usuario o contraseña inválidos', 'Inicio de sesión', 
    {
      timeOut: 2000,
      tapToDismiss: false
    });
  }

  Success() {
    this.toastr.success('Inicio de sesión exitoso', 'Inicio de sesión', 
    {
      timeOut: 2000,
      tapToDismiss: false
    });
  }

}
