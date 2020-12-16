import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { InfoGrupoService } from 'src/app/Vistas/Profesor/ServiciosProfesor/info-grupo.service';


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

  constructor(private infoGrupo: InfoGrupoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //primero se guarda el número de cédula del profesor
    this.route.params.forEach((urlParams) => {
      this.nombreRubro= urlParams['nombreRubro'];
      this.porcentajeRubro = urlParams['porcentajeRubro'];
    });
  }

  cerrar(){
    this.router.navigate(['/ProfesorGrupo',this.infoGrupo.numeroCedula, this.infoGrupo.nombreGrupo, 'Evaluaciones']);

  }

  nuevaEvaluacion(){
    //Calcular el porcentaje restante que le queda al rubro
    this.router.navigate(['/ProfesorGrupo/NuevaEvaluacion', 'Quices', 30]);
  }

  calificarEntregables(){
    this.router.navigate(['/ProfesorGrupo/Entregables', 'Quiz 1', 30]);
  }

}
