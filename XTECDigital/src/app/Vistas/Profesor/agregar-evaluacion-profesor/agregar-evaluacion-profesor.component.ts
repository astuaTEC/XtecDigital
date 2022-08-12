import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { Evaluacion } from '../ModelosProfesor/evaluacion';
import { EvaluacionesService } from 'src/app/Vistas/Profesor/ServiciosProfesor/evaluaciones.service';
import { Estudiante } from '../ModelosProfesor/estudiante';
import { ES } from '../ModelosProfesor/es';
import { EMS } from '../ModelosProfesor/ems';
import { Estado } from 'src/app/modelos/estado';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-agregar-evaluacion-profesor',
  templateUrl: './agregar-evaluacion-profesor.component.html',
  styleUrls: ['./agregar-evaluacion-profesor.component.css']
})
export class AgregarEvaluacionProfesorComponent implements OnInit {

  //Archivo a seleccionar
  fileToUpload: File;

  //Nombre del rubro correspondiente
  nombreRubro: string = '';

  //Porcentaje del rubro correspondiente
  porcentajeRubro: string = '';

  //hora máxima de entrega
  horaEntrega: string = '';

  //Fecha máxima de entrega
  fechaEntrega: string = '';

  //Modelo que almacena los valores agregados por el usuario
  evaluacion: Evaluacion = new Evaluacion('', 0, '','');

  //archivo cargado en base 64
  archivo: any;

  //Lista de los estudiantes matriculados en el curso
  listaEstudiantes: Estudiante[] = [];

  //Estado actual de la aplicación
  estadoLocal: Estado;


  constructor(private evaluacionesService: EvaluacionesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //Se carga la información de local storage
    this.estadoLocal = JSON.parse(localStorage.getItem('EstadoActual'));

    //Se reciben la información que se encuentra en los parámetros del navegador
    this.route.params.forEach((urlParams) => {
      this.nombreRubro = urlParams['nombreRubro'];
      this.porcentajeRubro = urlParams['porcentajeRubro'];
    });
    //Se actualiza la lista de los estudiantes
    this.listaEstudiantes = this.estadoLocal.estudiantes;
  }

  agregarNuevoArchivo(files: FileList) {
  //Se carga el archivo desde el elemento HTML
  this.fileToUpload = files.item(0);
  var reader = new FileReader();
  reader.readAsDataURL(this.fileToUpload);
  reader.onload = (completionEvent) => {
    console.log(completionEvent);
    this.archivo = reader.result;
    
  reader.onerror = (error) => {
    console.log('Error: ', error);
  };
  }

}

  agregarEvaluacion(){
    if(this.valoresCorrectos()){
      let cuerpo = {
        nombre: this.evaluacion.nombre,
        nombreRubro: this.nombreRubro,
        numeroGrupo: this.estadoLocal.numeroGrupo,
        codigoCurso: this.estadoLocal.codigoCurso,
        periodo: this.estadoLocal.periodo,
        anio: this.estadoLocal.anio,
        individualGrupal: this.evaluacion.participacion,
        fechaHoraMax: this.fechaEntrega + ' ' + this.horaEntrega + ':59',
        archivo: this.archivo.toString().split(',')[1],
        porcentaje: this.evaluacion.porcentaje
      };
      //Se realiza la petición al servidor
      this.evaluacionesService.crearNuevaEvaluacion(cuerpo)
      .subscribe(
       data => {
         console.log(data);
         this.cerrar();
       },
       error => {
         console.log(error);
         if(this.evaluacion.participacion == 'Grupal'){
           this.agregarEvaluacion2();
           Swal.fire({
            icon: 'success',
            title: 'Se ha agregado una nueva evaluación',
            showConfirmButton: false,
            timer: 2000
          })
           this.cerrar();
         }
         else{
          Swal.fire({
            icon: 'success',
            title: 'Se ha agregado una nueva evaluación',
            showConfirmButton: false,
            timer: 2000
          })
           this.cerrar();
         }
       });
    }
    else{
      Swal.fire({
        icon: 'error',
        title: 'Faltan campos por llenar',
        showConfirmButton: false,
        timer: 2000
      })
      
    }
  }

  agregarEvaluacion2(){
    //Primero se recorre la lista de estudiantes y se crean EvaluacionesSubgrupos
    let evaluacionesSubgrupos: ES[] = [];
    for(let estudiante of this.listaEstudiantes){
      //Se verifica si el idSubgrupo del estudiante ya está asociado a una ES
      let repetido: boolean = false;
      for(let es of evaluacionesSubgrupos){
        if(estudiante.grupo == es.Id){
          repetido = true;
        }
      };
      //Una vez validado la repetición se decide si crear una nueva ES
      if(!repetido){
        evaluacionesSubgrupos.push(
          new ES(
            estudiante.grupo,
            this.evaluacion.nombre,
            this.nombreRubro,
            this.estadoLocal.numeroGrupo,
            this.estadoLocal.codigoCurso,
            this.estadoLocal.periodo,
            this.estadoLocal.anio,
            //Al inicio está vacía
            []
          ));
      }
      }
      //Ahora se agregan los estudiantes a sus respectivos subgrupos
      for(let estudiante of this.listaEstudiantes){
        for(let es of evaluacionesSubgrupos){
          if(estudiante.grupo == es.Id){
            es.estudianteSubgrupos.push(
              new EMS(
                estudiante.grupo,
                es.nombreEvaluacion,
                es.nombreRubro,
                es.numeroGrupo,
                es.codigoCurso,
                es.periodo,
                es.anio,
                estudiante.carnet
              ));
          }
        }
      }
      //Ahora se envían los datos a la base de datos por medio del servicio de evaluaciones
      this.evaluacionesService.crearNuevaEvaluacionGrupal(
        evaluacionesSubgrupos
      ).subscribe(
        data => {
          console.log(data);
          this.cerrar();    },
        error => {
          console.log(error);
          
        });
  }

  valoresCorrectos(){
    let correcto: boolean = true;
    if(this.evaluacion.nombre == '' || this.fechaEntrega == '' || this.horaEntrega == '' || this.fileToUpload == undefined){
      correcto = false;
    }
    if(this.evaluacion.participacion == 'Grupal'){
      for(let estudiante of this.listaEstudiantes){
        if(estudiante.grupo == 0){
          correcto = false;
        }
      }
    }
    console.log(correcto);
    return correcto;
  }

  cerrar(){
    this.listaEstudiantes = this.estadoLocal.estudiantes;
    this.router.navigate(['/ProfesorGrupo',this.estadoLocal.numeroCedula, this.estadoLocal.nombreProfesor, this.estadoLocal.nombreGrupo, 'Evaluaciones', this.nombreRubro, this.porcentajeRubro]);
  }

}
