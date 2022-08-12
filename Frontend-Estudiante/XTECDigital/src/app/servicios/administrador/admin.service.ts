import { Injectable } from '@angular/core';
import { LogIn } from 'src/app/modelos/administrador/log-in';


@Injectable({
  providedIn: 'root'
})
export class AdminService {
	Usuario: number;

  constructor() { }

  setUsuario(cedula){
  	this.Usuario = cedula;

  }
}
