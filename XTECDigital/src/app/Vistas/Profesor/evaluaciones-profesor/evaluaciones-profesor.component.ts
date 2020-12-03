import { Component, OnInit } from '@angular/core';
import { EvaluacionContenedor } from 'src/app/Vistas/Profesor/ModelosProfesor/evaluacion-contenedor'
import { Evaluacion } from '../ModelosProfesor/evaluacion';

@Component({
  selector: 'app-evaluaciones-profesor',
  templateUrl: './evaluaciones-profesor.component.html',
  styleUrls: ['./evaluaciones-profesor.component.css']
})
export class EvaluacionesProfesorComponent implements OnInit {

  //Archivo a seleccionar
  fileToUpload: File = null;

  //lista de contenedores de evaluaciones
  listaContenedores: EvaluacionContenedor[] = [
    new EvaluacionContenedor('Quices', 30, false, false, '',
    [
      new Evaluacion('Quiz 1', 0, '', '', '', 'individual', ''),
      new Evaluacion('Quiz 2', 0,'', '', '', 'individual', '')
    ]),
    new EvaluacionContenedor('Exámenes', 70, false, false, '',
    [
      new Evaluacion('Examen 1', 0, '', '', '', 'individual', ''),
      new Evaluacion('Examen 2', 0,'', '', '', 'individual', '')
    ])
  ];

  constructor() { }

  ngOnInit(): void {
  }

  activarMostrarEvaluaciones(contenedor: EvaluacionContenedor){
    if(!contenedor.mostrar){
      contenedor.mostrar = true;
    }
    else{
      contenedor.mostrar = false;
    }
  }

  activarAgregarEvaluacion(contenedor: EvaluacionContenedor){
    if(!contenedor.agregarActivado){
      contenedor.agregarActivado = true;
    }
    else{
      contenedor.agregarActivado = false;
    }
  }

  agregarNuevaEvaluacion(contenedor: EvaluacionContenedor){
    if(contenedor.nombreNuevaEvaluacion != ''){
      contenedor.evaluaciones.push(
        new Evaluacion(contenedor.nombreNuevaEvaluacion, 0, '', '', '', 'individual', '')
      );
      this.activarAgregarEvaluacion(contenedor);
    }
  }

  agregarNuevoArchivo(files: FileList, evaluacion: Evaluacion) {
    //Se carga el archivo desde el elemento HTML
    this.fileToUpload = files.item(0);
  
    //Construyendo la fecha en que se está subiendo
    var date = new Date();
    var fecha = date.getFullYear() +'-'+(date.getMonth()+1) + '-'+date.getDate();
    var hora = date.getHours() +':' + date.getMinutes() + ':' + date.getSeconds();
    var fechaHoraString = fecha + ' ' + hora;
    //almacenar el nombre del documento
    evaluacion.nombreEspecificacion = this.fileToUpload.name;
    //Crear el documento en Base64
    this.base64(this.fileToUpload, evaluacion);
  }

  base64(file:File, evaluacion: Evaluacion) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      evaluacion.especificacion = reader.result;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  eliminarEvaluacion(evaluacion: Evaluacion){
    console.log(evaluacion.nombre);
    console.log(evaluacion.porcentaje);
    console.log(evaluacion.fechaEntrega);
    console.log(evaluacion.horaEntrega);
  }

}
