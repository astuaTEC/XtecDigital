import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { ProfesorInfoService } from 'src/app/Vistas/Profesor/ServiciosProfesor/profesor-info.service'
import { UsuarioProfesor } from 'src/app/Vistas/Profesor/ModelosProfesor/usuario-profesor'
import { ToastrService } from 'ngx-toastr';
import { InfoGrupoService } from 'src/app/Vistas/Profesor/ServiciosProfesor/info-grupo.service';


@Component({
  selector: 'app-login-profesor',
  templateUrl: './login-profesor.component.html',
  styleUrls: ['./login-profesor.component.css']
})
export class LoginProfesorComponent implements OnInit {

  constructor(private infoGrupo: InfoGrupoService, private route: ActivatedRoute, private router: Router, private profesorInfoService: ProfesorInfoService, private toastr: ToastrService) { }

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
        //Se almacena el nombre del profesor para usos posteriores
        this.infoGrupo.nombreProfesor = data['primerNombre'] + ' '  + data['primerApellido'] + ' ' + data['segundoApellido'];
        //Se configuran los datos del profesor que inicia sesión
        this.router.navigate(['/ProfesorHome', this.usuarioProfesor.usuario]);
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
