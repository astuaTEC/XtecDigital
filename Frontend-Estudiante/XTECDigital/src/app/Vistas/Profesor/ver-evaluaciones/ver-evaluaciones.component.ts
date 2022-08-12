import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-ver-evaluaciones',
  templateUrl: './ver-evaluaciones.component.html',
  styleUrls: ['./ver-evaluaciones.component.css']
})
export class VerEvaluacionesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  cerrar(){
    this.router.navigate(['/ProfesorGrupo/Evaluaciones']);
  }

  nuevaEvaluacion(){
    //Calcular el porcentaje restante que le queda al rubro
    this.router.navigate(['/ProfesorGrupo/NuevaEvaluacion', 'Quices', 30]);
  }

  calificarEntregables(){
    this.router.navigate(['/ProfesorGrupo/Entregables', 'Quiz 1', 30]);
  }

}
