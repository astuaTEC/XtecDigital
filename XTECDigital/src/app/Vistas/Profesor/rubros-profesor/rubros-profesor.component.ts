import { Component, OnInit } from '@angular/core';
import { Rubro } from 'src/app/Vistas/Profesor/ModelosProfesor/rubro';
import { RubrosService } from 'src/app/Vistas/Profesor/ServiciosProfesor/rubros.service';
import { Estado } from 'src/app/modelos/estado';
import Swal from 'sweetalert2'

export interface CuerpoRubro{
  porcentaje: number,
  nombre: string,
  numeroGrupo: number,
  codigoCurso: string,
  periodo: string,
  anio: string
};

@Component({
  selector: 'app-rubros-profesor',
  templateUrl: './rubros-profesor.component.html',
  styleUrls: ['./rubros-profesor.component.css']
})
export class RubrosProfesorComponent implements OnInit {

  //La lista de rubros
  listaRubros: Rubro[] = [];

  //Bandera para abrir o cerrar el apartado de nuevo rubro
  nuevoRubroActivado: boolean = false;

  //nombre del nuevo rubro
  nuevoRubro: string = '';

  //Bandera para validar si la suma de los porcentajes de los rubros es igual a 100
  //Se supone que al inicio es correcta, viene desde la base de datos
  sumaCorrecta: boolean = true;

  //Estado local de la aplicación 
  estadoLocal: Estado;

  constructor(private rubrosService: RubrosService) { }

  ngOnInit(): void {
    //Cargar la información del estado actual
    this.estadoLocal = JSON.parse(localStorage.getItem('EstadoActual'));
    //solicitar la lista de rubro correspondientes al curso
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
      //se crea un nuevo rubro mediate el servicio de rubros
      this.rubrosService.crearNuevoRubro(
        this.nuevoRubro,
        this.estadoLocal.numeroGrupo,
        this.estadoLocal.codigoCurso,
        this.estadoLocal.periodo,
        this.estadoLocal.anio,
        0
      ).subscribe(
        data => {
          console.log(data);
       
        },
        error => {
          console.log(error);
          this.actualizarRubros()
          Swal.fire({
            icon: 'success',
            title: 'Nuevo rubro agregado',
            showConfirmButton: false,
            timer: 2000
          })
          this.nuevoRubro = ''; 
          this.nuevoRubroActivado = false;
          if(error.status === 400){
            
          }
        }); 
     
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
    Swal.fire({
      title: 'Eliminar Rubro',
      text: "¿Seguro que deseas eliminar el rubro " + rubro.nombre + " ?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        //se manda a eliminar el rubro mediante el servicio
        this.rubrosService.eliminarRubro(
        this.estadoLocal.codigoCurso,
        this.estadoLocal.numeroGrupo,
        this.estadoLocal.anio,
        this.estadoLocal.periodo,
        rubro.nombre)
      .subscribe(
        data => {
          console.log(data);
    
        },
        error => {
          console.log(error);
          //Una vez eliminado el rubro, se resetean todos los porcentajes
          this.actualizarRubros();
          this.verificarSumaPorcentajes();
      });
      }
    })
  }

  guardarRubros(){
    //solo se guardará si la suma de los porcentajes es 100
    this.verificarSumaPorcentajes();
    if(this.sumaCorrecta){
          //se modela un cuerpo para enviar los rubros
      let nuevosRubros: CuerpoRubro[] = [];
      for(let i = 0; i < this.listaRubros.length; i++){
        nuevosRubros.push({
          porcentaje: this.listaRubros[i].porcentaje,
          nombre: this.listaRubros[i].nombre,
          numeroGrupo: this.estadoLocal.numeroGrupo,
          codigoCurso: this.estadoLocal.codigoCurso,
          periodo: this.estadoLocal.periodo,
          anio: this.estadoLocal.anio
        });
      }
      //Se usa la petición correspondiente
      this.rubrosService.editarRubros(
        nuevosRubros
      ).subscribe(
        data => {
          console.log(data);
        },
        error => {
        console.log(error);
          this.actualizarRubros();
          if(error.status === 400){ 
          }
        });
        //enviar mensaje de éxito
        Swal.fire({
          icon: 'success',
          title: 'Guardar rubros',
          text: 'Se han editado los rubros exitosamente',
          showConfirmButton: false,
          timer: 2000
        })
      }
      else{
        Swal.fire({
          icon: 'error',
          title: 'Guardar rubros',
          text: 'La suma de los porcentajes debe ser igual a 100',
          showConfirmButton: false,
          timer: 2000
        })
      }
 
  }

}
