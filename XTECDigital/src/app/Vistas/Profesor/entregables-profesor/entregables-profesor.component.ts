import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { InfoGrupoService } from 'src/app/Vistas/Profesor/ServiciosProfesor/info-grupo.service';
import { Entregable } from '../ModelosProfesor/entregable';
import { Estudiante } from '../ModelosProfesor/estudiante';
import { EvaluacionesService } from '../ServiciosProfesor/evaluaciones.service';

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

  //Variable del archivo que se escoje desde la PC
  fileToUpload: File;

  //Lista de entregables
  listaEntregables: Entregable[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private infoGrupo: InfoGrupoService, private evaluacionesService: EvaluacionesService) { }

  ngOnInit(): void {
    this.route.params.forEach((urlParams) => {
      this.nombreEvaluacion = urlParams['nombreEvaluacion'];
      this.nombreRubro = urlParams['nombreRubro'];
    });
    //Se manda a actualizar la lista de entregables
    this.actualizarEntregables();
  }

  agregarNuevoArchivo(files: FileList) {
    //Se carga el archivo desde el elemento HTML
    this.fileToUpload = files.item(0);
  }

  cerrar(){
    this.router.navigate(['/ProfesorGrupo/Evaluaciones/Ver']);
  }

  actualizarEntregables(){
    //Solicita la lista de entregables correspondiente a una evaluación
    this.evaluacionesService.getEntregables(
      this.infoGrupo.codigoCurso,
      this.nombreRubro,
      this.nombreEvaluacion,
      this.infoGrupo.numeroGrupo,
      this.infoGrupo.anio,
      this.infoGrupo.periodo
    ).subscribe(
      data => {
        //Se limpia la lista de entregables
        this.listaEntregables = [];
        console.log(data);
        //Se guardan los entregables sin repetir el id del subgrupo
        //en caso de que la evaluación sea grupal
        for(let i = 0; i < data.length; i++){
          let repetido: boolean = false;
          for(let entregable of this.listaEntregables){
            //verificar si ya existe algún entregable el mismo id del subgrupo
            if(data[i].idSubGrupo == entregable.idSubGrupo){
              repetido = true;
            }
          }
          //si repetido es false, significa que se debe agregar a la lista
          if(!repetido){
            const grupo: number = data[i].idSubgrupo;
            let nuevoEntregable: Entregable = new Entregable(
              data[i].id,
              data[i].idSubGrupo,
              //Inicialmente vacía
              []
            );
            //Ahora usando el carnet del estudiante, se llena la lista de estudiantes
            //del entregable
            this.evaluacionesService.getSubGrupo(
              this.infoGrupo.codigoCurso,
              this.nombreRubro,
              this.nombreEvaluacion,
              this.infoGrupo.numeroGrupo,
              this.infoGrupo.anio,
              this.infoGrupo.periodo,
              data[i].carnetEstudiante
            ).subscribe(
              data => {
                for(let j = 0; j < data.length; j++){
                  nuevoEntregable.estudiantes.push(
                    new Estudiante(
                      data[i].primerNombre,
                      data[i].primerApellido,
                      data[i].segundoApellido,
                      data[i].carnet,
                      grupo
                    )
                  );
                }
              });
              //Finalmente se agrega el entregable a la lista de entregables
              this.listaEntregables.push(nuevoEntregable);
          }
        }
      }
    );
      
  }

}
