import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Estado } from 'src/app/modelos/estado';
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

  //Estado actual de la aplicación
  estadoLocal: Estado;

  constructor(private rubrosService: RubrosService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //Cargar el estado actual en la variable local
    this.estadoLocal = JSON.parse(localStorage.getItem('EstadoActual'));

    //solicitar la lista de rubros
    this.actualizarRubros();
  }


  actualizarRubros(){
    this.rubrosService.getRubros(
      this.estadoLocal.codigoCurso,
      this.estadoLocal.numeroGrupo,
      this.estadoLocal.anio,
      this.estadoLocal.periodo
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
    this.router.navigate(['/ProfesorGrupo',this.estadoLocal.numeroCedula, this.estadoLocal.nombreProfesor, this.estadoLocal.nombreGrupo, 'Evaluaciones', rubro.nombre, rubro.porcentaje]);
  }



}
