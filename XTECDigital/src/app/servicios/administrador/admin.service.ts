import { Injectable } from '@angular/core';
import { LogIn } from 'src/app/modelos/administrador/log-in';
import { HttpClient } from '@angular/common/http';
import { Estudiante } from 'src/app/modelos/estudiante';
import { Profesor } from 'src/app/modelos/profesor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
Usuario: number;

 constructor(private http: HttpClient) { }

  setUsuario(cedula){
  	this.Usuario = cedula;

  }


login( user: LogIn){
    return this.http.post<string>('https://xtecdigitalmongodb.azurewebsites.net/api/admin/login', user);
  }


  getUsuario(): number{
    return this.Usuario;
  }
  logOut(){
    this.Usuario = null;
   
  }

   getEstudiantes(): Observable<Estudiante[]>{
    return this.http.get<Estudiante[]>('https://xtecdigitalmongodb.azurewebsites.net/api/estudiantes/carnets');
}
 getProfesores(): Observable<Profesor[]>{
    return this.http.get<Profesor[]>('https://xtecdigitalmongodb.azurewebsites.net/api/profesores/cedulas');
}

iniciarSemestre(semestre){
    return this.http.post<string>('https://xtecdigitalsql.azurewebsites.net/api/semestre/new', semestre);
}
iniciarSemestreE(semestre){
    return this.http.post<string>('https://xtecdigitalsql.azurewebsites.net/api/semestre/newExcel', semestre);
}
}

