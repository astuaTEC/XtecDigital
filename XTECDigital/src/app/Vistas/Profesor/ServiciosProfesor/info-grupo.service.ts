import { Injectable } from '@angular/core';
import { Estudiante } from '../ModelosProfesor/estudiante';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InfoGrupoService {

  //nombre del grupo
  nombreGrupo: string = '';

  //Código del curso
  codigoCurso: string = '';

  //número del grupo
  numeroGrupo: number = 0;

  //año
  anio: string = '';

  //Periodo
  periodo: string = '';

  //Cedula del profesor
  numeroCedula: string = '';

  //Información del profesor que ha iniciado sesión

  //Nombre completo del profesor
  nombreProfesor: string = '';

  //Lista de los estudiantes que pertenecen al grupo
  estudiantes: Estudiante[] = [];

  constructor(private http: HttpClient) { }

   //Solicita las noticias relacionadas a un grupo
   getEstudiantesMatriculados(codigoCurso: string, numeroGrupo: number, anio: string, periodo: string){
    this.http.get<any[]>('https://xtecdigitalsql.azurewebsites.net/api/profesor/curso/getReporteEstudiantes?', {
      params: {
        curso: codigoCurso,
        grupo: numeroGrupo.toString(),
        anio: anio,
        periodo: periodo
      }}).subscribe(data => {
        //Primero se limpia la lista actual
        this.estudiantes = [];
        //Luego se meten los nuevos datos
        for(let i = 0; i < data.length; i++){
          this.estudiantes.push(
            new Estudiante(data[i].primerNombre,
              data[i].primerApellido,
              data[i].segundoApellido,
              data[i].carnet,
              0)
          );
        }
        console.log(this.estudiantes);
      }
      )
  }
}
