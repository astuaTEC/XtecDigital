import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { InfoGrupoService } from 'src/app/Vistas/Profesor/ServiciosProfesor/info-grupo.service';
import { RubrosService } from 'src/app/Vistas/Profesor/ServiciosProfesor/rubros.service';
import { Rubro } from '../ModelosProfesor/rubro';


@Component({
  selector: 'app-evaluaciones-profesor',
  templateUrl: './evaluaciones-profesor.component.html',
  styleUrls: ['./evaluaciones-profesor.component.css']
})
export class EvaluacionesProfesorComponent implements OnInit {

  //Archivo a seleccionar
  fileToUpload: File = null;

  //Lista de rubros del grupo
  listaRubros: Rubro[] = [];

  constructor(private rubrosService: RubrosService, private route: ActivatedRoute, private router: Router, private infoGrupo: InfoGrupoService) { }

  ngOnInit(): void {
    //solicitar la lista de rubros
    this.actualizarRubros();
  }


  actualizarRubros(){
    this.rubrosService.getRubros(
      this.infoGrupo.codigoCurso,
      this.infoGrupo.numeroGrupo,
      this.infoGrupo.anio,
      this.infoGrupo.periodo
    ).subscribe(data => {
      this.listaRubros = [];
      for(let i = 0; i < data.length; i++){
        //se crea un nuevo rubro para agregarlo a la lista
        let nuevoRubro = new Rubro(data[i].nombre, data[i].porcentaje)
        this.listaRubros.push(nuevoRubro);
      }
    })
  }

  verEvaluaciones(rubro: Rubro){
    this.router.navigate(['/ProfesorGrupo',this.infoGrupo.numeroCedula, this.infoGrupo.nombreGrupo, 'Evaluaciones', rubro.nombre, rubro.porcentaje]);
  }



}
