import { Injectable } from '@angular/core';
import { Evaluacion } from '../ModelosProfesor/evaluacion';
import { EvaluacionContenedor } from '../ModelosProfesor/evaluacion-contenedor';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionesProfesorService {

  //Lista de rubros con evaluaciones que se usa en Evaluaciones y nueva evaluacion
  listaContenedores: EvaluacionContenedor[] = [
    new EvaluacionContenedor('Quices', 30, false,
    [
      new Evaluacion('Quiz 1', 5, '20-12-2020', '19:00', '', 'individual', '', [] ),
      new Evaluacion('Quiz 2', 15, '20-12-2020', '19:00', '', 'individual', '', [])    
    ]),
    new EvaluacionContenedor('Exámenes', 70, false,
    [])
  ];

  agregarRubro(nombreRubro: string, porcentaje: number){
    this.listaContenedores.push(
      new EvaluacionContenedor(nombreRubro, porcentaje, false, [])
    );
  }

  setListaContenedores(contenedores: EvaluacionContenedor[]){
    this.listaContenedores = contenedores;
  }

  getListaContenedores(){
    return this.listaContenedores;
  }

  agregarEvaluacion(nombreRubro: string, nuevaEvaluacion: Evaluacion){
    for(let contenedor of this.listaContenedores){
      if(nombreRubro == contenedor.nombre){
        contenedor.evaluaciones.push(nuevaEvaluacion);
      }
    }
  }

  eliminarEvaluacion(nombreContenedor: string, evaluacion: Evaluacion){
    for(let i = 0; i < this.listaContenedores.length; i++){
      if(nombreContenedor == this.listaContenedores[i].nombre){
        for(let j = 0; j < this.listaContenedores[i].evaluaciones.length; j++){
          if(evaluacion == this.listaContenedores[i].evaluaciones[j]){
            this.listaContenedores[i].evaluaciones.splice(j, 1);
          }
        }
      }
    }
  }

  constructor() { }
}
