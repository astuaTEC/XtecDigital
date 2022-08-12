import { Component, OnInit } from '@angular/core';
import { Rubro } from 'src/app/Vistas/Profesor/ModelosProfesor/rubro';

@Component({
  selector: 'app-rubros-profesor',
  templateUrl: './rubros-profesor.component.html',
  styleUrls: ['./rubros-profesor.component.css']
})
export class RubrosProfesorComponent implements OnInit {

  //La lista de rubros
  listaRubros: Rubro[] = [
    new Rubro('Quices', 30),
    new Rubro('Exámenes', 30),
    new Rubro('Proyectos', 40)
  ];

  //Bandera para abrir o cerrar el apartado de nuevo rubro
  nuevoRubroActivado: boolean = false;

  //nombre del nuevo rubro
  nuevoRubro: string = '';

  //Bandera para validar si la suma de los porcentajes de los rubros es igual a 100
  //Se supone que al inicio es correcta, viene desde la base de datos
  sumaCorrecta: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  activarNuevoRubro(){
    if(!this.nuevoRubroActivado){
      this.nuevoRubroActivado = true;
    }
    else{
      this.nuevoRubroActivado = false;
    }
  }

  agregarNuevoRubro(){
    if(this.nuevoRubro != ''){
      this.listaRubros.push(
        new Rubro(this.nuevoRubro, 0)
      );
      this.nuevoRubro = '';
      for(let rubro of this.listaRubros){
        rubro.porcentaje = 0;
      }
    }
  }

  verificarSumaPorcentajes(){
    let sumaTotal = 0;
    for(let rubro of this.listaRubros){
      sumaTotal += rubro.porcentaje;
    }
    if(sumaTotal === 100){
      this.sumaCorrecta = true;
    }
    else{
      this.sumaCorrecta = false;
    }
  }

  eliminarRubro(rubro: Rubro){
    for(let i = 0; i < this.listaRubros.length; i++){
      if(rubro === this.listaRubros[i]){
        this.listaRubros.splice(i, 1);
        this.verificarSumaPorcentajes();
      }
    }
  }

}
