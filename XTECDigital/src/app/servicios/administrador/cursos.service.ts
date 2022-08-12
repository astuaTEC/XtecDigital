import { Injectable } from '@angular/core';
import { Curso } from 'src/app/modelos/curso';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private http: HttpClient) { }

  getCursos(): Observable<Curso[]>{
    return this.http.get<Curso[]>('https://xtecdigitalsql.azurewebsites.net/api/curso/all');
}
 getCursosHabilitados(): Observable<Curso[]>{
    return this.http.get<Curso[]>('https://xtecdigitalsql.azurewebsites.net/api/curso/habilitados/all');
}

crearCurso(curso: Curso){
    return this.http.post<string>('https://xtecdigitalsql.azurewebsites.net/api/curso/new', curso);
}

actualizaCurso(curso: Curso){
    return this.http.put<string>('https://xtecdigitalsql.azurewebsites.net/api/curso/edit', curso);
}

}
 