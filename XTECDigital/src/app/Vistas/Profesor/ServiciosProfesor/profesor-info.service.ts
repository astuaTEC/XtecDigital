import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioProfesor } from 'src/app/Vistas/Profesor/ModelosProfesor/usuario-profesor'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProfesorInfoService {

  constructor(private http: HttpClient) { }
  

  //Solicita el inicio de sesión mediante un POST
  iniciarSesion(usuarioProfesor: UsuarioProfesor){
    //Se crea un nuevo objeto json con la información recibida
    return this.http.post<string>('https://xtecdigitalmongodb.azurewebsites.net/api/profesor/login',usuarioProfesor);
  }

  //Solicita la información de periodos y grupos referentes al profesor
  misCursos(cedulaProfesor: string): Observable<any[]>{
    return this.http.get<any[]>('https://xtecdigitalsql.azurewebsites.net/api/profesor/grupos?', {
      params: {
        cedula: cedulaProfesor
      }});
  }
}
