import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { LogIn } from 'src/app/modelos/administrador/log-in';
 import { AdminService} from 'src/app/servicios/administrador/admin.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
invalid = false;
user = new LogIn();
constructor( private router: Router,private _logInService: AdminService) { }

  ngOnInit(): void {
  }

ingresar(usuario, contrasena): void{
this.user.usuario = usuario;
this.user.password = contrasena;

this._logInService.setUsuario(usuario);
console.log(this.user);

this._logInService.login(this.user).
subscribe(data => {

this.invalid = false;
this.router.navigate(['/organizador']);
},
error => {

        console.log(error);  
        if (error.status === 400){
          this.user.usuario = null;
          this.user.password = "";
          this.invalid = true;
        
       }else{
        	this.invalid = false;
		this.router.navigate(['/Administrador']);

        }

      });

  }

}
