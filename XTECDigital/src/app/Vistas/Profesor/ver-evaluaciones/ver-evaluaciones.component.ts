import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { EvaluacionesService } from 'src/app/Vistas/Profesor/ServiciosProfesor/evaluaciones.service';
import { Evaluacion } from '../ModelosProfesor/evaluacion';
import { Estado } from 'src/app/modelos/estado';
import Swal from 'sweetalert2'


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

  //Estado actual de la aplicaión
  estadoLocal: Estado;

  constructor(private evaluacionesService: EvaluacionesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //Se carga la información de la aplicación almacenada en local storage
    this.estadoLocal = JSON.parse(localStorage.getItem('EstadoActual'));
    //primero se guarda el número de cédula del profesor
    this.route.params.forEach((urlParams) => {
      this.nombreRubro= urlParams['nombreRubro'];
      this.porcentajeRubro = urlParams['porcentajeRubro'];
    });
    //se actualiza la lista de evaluaciones
    this.actualizarEvaluaciones();

  }

  cerrar(){
    this.router.navigate(['/ProfesorGrupo',this.estadoLocal.numeroCedula, this.estadoLocal.nombreProfesor, this.estadoLocal.nombreGrupo, 'Evaluaciones']);

  }

  nuevaEvaluacion(){
    //Calcular el porcentaje restante que le queda al rubro
    this.router.navigate(['/ProfesorGrupo',this.estadoLocal.numeroCedula, this.estadoLocal.nombreProfesor, this.estadoLocal.nombreGrupo, 'NuevaEvaluacion', this.nombreRubro, this.porcentajeRubro ]);
  }

  calificarEntregables(evaluacion: Evaluacion){
    this.router.navigate(['/ProfesorGrupo',this.estadoLocal.numeroCedula, this.estadoLocal.nombreProfesor, this.estadoLocal.nombreGrupo, 'Entregables', evaluacion.nombre, this.nombreRubro ]);
  }

  actualizarEvaluaciones(){
    //Se solicitan los datos por medio del servicio de evaluaciones
    this.evaluacionesService.getEvaluaciones(
      this.estadoLocal.codigoCurso,
      this.nombreRubro,
      this.estadoLocal.numeroGrupo,
      this.estadoLocal.anio,
      this.estadoLocal.periodo
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
    Swal.fire({
      title: 'Eliminar Evaluación',
      text: "¿ Seguro que deseas cerrar la evaluación " + nombreEvaluacion + " ?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        //Se solicita eliminar una evaluacion mediante el servicio de evaluaciones
        this.evaluacionesService.eliminarEvaluacion(
          this.estadoLocal.codigoCurso,
          this.nombreRubro,
          nombreEvaluacion,
          this.estadoLocal.numeroGrupo,
          this.estadoLocal.anio,
          this.estadoLocal.periodo
        ).subscribe(
          data => {
            console.log(data);
          },
          error => {
          console.log(error);
          this.actualizarEvaluaciones();
          });
          }
        })
  }

}
