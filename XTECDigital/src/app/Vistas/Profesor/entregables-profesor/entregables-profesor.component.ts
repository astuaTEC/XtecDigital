import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { Estado } from 'src/app/modelos/estado';
import { Entregable } from '../ModelosProfesor/entregable';
import { Estudiante } from '../ModelosProfesor/estudiante';
import { EvaluacionesService } from '../ServiciosProfesor/evaluaciones.service';
import Swal from 'sweetalert2'

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'app-entregables-profesor',
  templateUrl: './entregables-profesor.component.html',
  styleUrls: ['./entregables-profesor.component.css']
})
export class EntregablesProfesorComponent implements OnInit {

  //Variable que almacena el nombre de la evaluación
  nombreEvaluacion: string = '';

  //Variable que almacena el nombre del rubro
  nombreRubro: string = '';

  //Porcentaje del rubro correspondiente
  porcentajeRubro: number = 0;

  //Variable del archivo que se escoje desde la PC
  fileToUpload: File;

  //Lista de entregables
  listaEntregables: Entregable[] = [];

  //Estado actual de la aplicación
  estadoLocal: Estado;



  constructor(private route: ActivatedRoute, private router: Router, private evaluacionesService: EvaluacionesService) { }

  ngOnInit(): void {
    //Se pide la información que se encuentra en local storge
    this.estadoLocal = JSON.parse(localStorage.getItem('EstadoActual'));
    this.route.params.forEach((urlParams) => {
      this.nombreEvaluacion = urlParams['nombreEvaluacion'];
      this.nombreRubro = urlParams['nombreRubro'];
      this.porcentajeRubro = urlParams['porcentajeRubro'];
    });
    //Se manda a actualizar la lista de entregables
    this.actualizarEntregables();
  }


  cerrar(){
    this.router.navigate(['/ProfesorGrupo',this.estadoLocal.numeroCedula, this.estadoLocal.nombreProfesor, this.estadoLocal.nombreGrupo, 'Evaluaciones', this.nombreRubro, this.porcentajeRubro]);
  }

  actualizarEntregables(){
    //Solicita la lista de entregables correspondiente a una evaluación
    this.evaluacionesService.getEntregables(
      this.estadoLocal.codigoCurso,
      this.nombreRubro,
      '"' + this.nombreEvaluacion + '"',
      this.estadoLocal.numeroGrupo,
      this.estadoLocal.anio,
      this.estadoLocal.periodo
    ).subscribe(
      data => {
        //Se limpia la lista de entregables local
        this.listaEntregables = [];
        console.log(data);

        if(data.length > 0){
                    //EVALUACIÓN INDIVIDUAL
          if(data[0].idSubGrupo == null){
            console.log('EVALUACIÓN INDIVIDUAL');
            for(let i = 0; i < data.length; i++){
              let nuevoEntregable: Entregable = new Entregable(
                data[i].id,
                data[i].idSubGrupo,
                [],
                '',
                null,
                0,
                false
              ); 
              //Tomar la información del estudiante desde el estado local
              for(let estudiante of this.estadoLocal.estudiantes){
                if(estudiante.carnet == data[i].carnetEstudiante){
                  nuevoEntregable.estudiantes.push(
                    new Estudiante(estudiante.nombre, estudiante.primerApellido, estudiante.segundoApellido, estudiante.carnet, data[i].idSubGrupo)
                  );
                }
              }
              //Finalmente se agrega el entregable a la lista de entregables
              this.listaEntregables.push(nuevoEntregable);
            }
          }


          //EVALUACIÓN GRUPAL
          else{
            console.log('EVALUACIÓN GRUPAL');
            for(let i = 0; i < data.length; i++){
              //Se verifica si ya existe un entregable con el número de subgrupo
              let repetido: boolean = false;
              for(let miEntregable of this.listaEntregables){
                if(miEntregable.idSubGrupo == data[i].idSubGrupo){
                  repetido = true;
                  break;
                }
              }
              //Si no es repetido
              if(!repetido){
                //Primero se crea un nuevo entregable con información escencial
                let nuevoEntregable: Entregable = new Entregable(
                  data[i].id,
                  data[i].idSubGrupo,
                  [],
                  '',
                  null,
                  0,
                  false
                );
                //Se agrega el nuevo entregable a la lista
                this.listaEntregables.push(nuevoEntregable);
              }
            }
            //Ahora se agregan los estudiantes a cada entregable
            for(let j = 0; j < data.length; j++){
              for(let miEntregable of this.listaEntregables){
                //Se localiza el entregable que tenga el mismo id de subgrupo que el estudiante
                if(data[j].idSubGrupo == miEntregable.idSubGrupo){
                  //Ahora se busca la información del entregable dentro del estado local del grupo
                  for(let estudiante of this.estadoLocal.estudiantes){
                    if(estudiante.carnet == data[j].carnetEstudiante){
                      miEntregable.estudiantes.push(
                        new Estudiante(estudiante.nombre, estudiante.primerApellido, estudiante.segundoApellido, estudiante.carnet, data[j].idSubGrupo)
                      );
                      break;
                    }
                  }
                }
                
              }
            }
          }

          } 
          if(this.listaEntregables.length == 0){
            Swal.fire({
              icon: 'info',
              title: this.nombreRubro,
              text: 'No hay entregables disponibles para ' + this.nombreEvaluacion,
              showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
            })
          }   
        }
        
       
    );
    
  }

  descargarArchivoEntregable(entregable: Entregable){
    this.evaluacionesService.getArchivoEntregable(
      this.estadoLocal.codigoCurso,
      this.nombreRubro,
      '"' + this.nombreEvaluacion + '"',
      this.estadoLocal.numeroGrupo,
      this.estadoLocal.anio,
      this.estadoLocal.periodo,
      entregable.estudiantes[0].carnet,
      entregable.id
    ).subscribe(
      data => {
        console.log(data);
       
      },
      error => {
        console.log(error);
        let documento = 'data:application/pdf;base64,' + error["error"]["text"];
        const pdfName = 'entregable_' + entregable.estudiantes[0].nombre;
        FileSaver.saveAs(documento , pdfName);

      });
  }

  drop(entregable: Entregable){
    //Ahora se abre solamente el que se ha seleccionado
    if(entregable.drop == false){
      entregable.drop = true;
    }
    else{
      entregable.drop = false;
    }

    for(let e of this.listaEntregables){
      if(e.drop && e != entregable){
        e.drop = false;
      }
    }
  }

  agregarNuevoArchivo(files: FileList, entregable: Entregable) {
    //Se carga el archivo desde el elemento HTML
    this.fileToUpload = files.item(0);
    var reader = new FileReader();
    reader.readAsDataURL(this.fileToUpload);
    reader.onload = (completionEvent) => {
      console.log(completionEvent);
      //Cuando termine el proceso, se guarda el documento
      entregable.retroalimentacion = reader.result;
    };

    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  calificar(entregable: Entregable){
    //Solo si los campos del formulario están llenos
    if(entregable.observaciones != '' && entregable.retroalimentacion != null){
      let cuerpo = {
        id: entregable.id,
        carnetEstudiante: entregable.estudiantes[0].carnet,
        nombreEvaluacion: this.nombreEvaluacion,
        nombreRubro: this.nombreRubro,
        numeroGrupo: this.estadoLocal.numeroGrupo,
        codigoCurso: this.estadoLocal.codigoCurso,
        periodo: this.estadoLocal.periodo,
        anio: this.estadoLocal.anio,
        nota: entregable.calificacion,
        observaciones: entregable.observaciones,
        archivoRetroalimentacion: entregable.retroalimentacion.toString().split(',')[1]
      }
      console.log(cuerpo);
      this.evaluacionesService.calificarEntregable(cuerpo)
      .subscribe(
        data => {
          console.log(data);
         
        },
        error => {
          console.log(error);
          Swal.fire({
            icon: 'success',
            title: 'Se ha calificado con éxito',
            showConfirmButton: false,
            timer: 1500
          })
          //Se actualiza la lista de entregables
          this.actualizarEntregables();
        });
    }
    //En caso de que falten datos del form
    else{
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Se deben llenar todos los campos!',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
    }
    }

    publicarNotas(){
      //Se valida si no hay entregables disponibles
      //Eso puede indicar si ya se han calificado apropiadamente
      if(this.listaEntregables.length == 0){
        this.evaluacionesService.publicarNotas(
          this.estadoLocal.codigoCurso,
          this.nombreRubro,
          this.nombreEvaluacion,
          this.estadoLocal.numeroGrupo,
          this.estadoLocal.anio,
          this.estadoLocal.periodo,
          this.estadoLocal.nombreProfesor
        ).subscribe(
          data => {
            console.log(data);
          },
          error => {
            console.log(error);
            Swal.fire({
              icon: 'success',
              title: 'Se han publicado las notas de ' + this.nombreEvaluacion,
              showConfirmButton: false,
              timer: 1500
            })
          });
      }
    }


}
