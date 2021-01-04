import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { InfoGrupoService } from 'src/app/Vistas/Profesor/ServiciosProfesor/info-grupo.service';
import { EvaluacionesService } from 'src/app/Vistas/Profesor/ServiciosProfesor/evaluaciones.service';
import { Evaluacion } from '../ModelosProfesor/evaluacion';


@Component({
  selector: 'app-ver-evaluaciones',
  templateUrl: './ver-evaluaciones.component.html',
  styleUrls: ['./ver-evaluaciones.component.css']
})
export class VerEvaluacionesComponent implements OnInit {

  //Nombre del rubro corrrespondiente a las evaluaciones
  nombreRubro: string = '';

  //Porcentaje del rubro correspondiente
  porcentajeRubro: number = 0;

  //Lista de evaluaciones correspondientes a un rubro
  listaEvaluaciones: Evaluacion[] = [];

  constructor(private evaluacionesService: EvaluacionesService, private infoGrupo: InfoGrupoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //primero se guarda el número de cédula del profesor
    this.route.params.forEach((urlParams) => {
      this.nombreRubro= urlParams['nombreRubro'];
      this.porcentajeRubro = urlParams['porcentajeRubro'];
    });
    //se actualiza la lista de evaluaciones
    this.actualizarEvaluaciones();

  }

  cerrar(){
    this.router.navigate(['/ProfesorGrupo',this.infoGrupo.numeroCedula, this.infoGrupo.nombreGrupo, 'Evaluaciones']);

  }

  nuevaEvaluacion(){
    //Calcular el porcentaje restante que le queda al rubro
    this.router.navigate(['/ProfesorGrupo',this.infoGrupo.numeroCedula, this.infoGrupo.nombreGrupo, 'NuevaEvaluacion', this.nombreRubro, this.porcentajeRubro ]);
  }

  calificarEntregables(evaluacion: Evaluacion){
    this.router.navigate(['/ProfesorGrupo',this.infoGrupo.numeroCedula, this.infoGrupo.nombreGrupo, 'Entregables', evaluacion.nombre, this.nombreRubro ]);
  }

  actualizarEvaluaciones(){
    //Se solicitan los datos por medio del servicio de evaluaciones
    this.evaluacionesService.getEvaluaciones(
      this.infoGrupo.codigoCurso,
      this.nombreRubro,
      this.infoGrupo.numeroGrupo,
      this.infoGrupo.anio,
      this.infoGrupo.periodo
    ).subscribe(
      data => {
        //Se limpia la lista de evaluaciones
        this.listaEvaluaciones = [];
        for(let i = 0; i < data.length; i++){
          this.listaEvaluaciones.push(
            new Evaluacion(
              data[i].nombre,
              data[i].porcentaje,
              data[i].fechaHoraMax,
              data[i].individualGrupal
            )
          );
        }
      },
      error => {
      console.log(error);
        if(error.status === 400){ 
        }
      });
  }

  eliminarEvaluacion(nombreEvaluacion: string){
    //Se solicita eliminar una evaluacion mediante el servicio de evaluaciones
    this.evaluacionesService.eliminarEvaluacion(
      this.infoGrupo.codigoCurso,
      this.nombreRubro,
      nombreEvaluacion,
      this.infoGrupo.numeroGrupo,
      this.infoGrupo.anio,
      this.infoGrupo.periodo
    ).subscribe(
      data => {
        console.log(data);
      },
      error => {
      console.log(error);
      this.actualizarEvaluaciones();
      });

  }

}
