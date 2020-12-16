import { Component, OnInit } from '@angular/core';
import { Rubro } from 'src/app/Vistas/Profesor/ModelosProfesor/rubro';
import { InfoGrupoService } from 'src/app/Vistas/Profesor/ServiciosProfesor/info-grupo.service';
import { RubrosService } from 'src/app/Vistas/Profesor/ServiciosProfesor/rubros.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private toastr: ToastrService, private infoGrupo: InfoGrupoService, private rubrosService: RubrosService) { }

  ngOnInit(): void {
    //solicitar la lista de rubro correspondientes al curso
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
        this.infoGrupo.numeroGrupo,
        this.infoGrupo.codigoCurso,
        this.infoGrupo.periodo,
        this.infoGrupo.anio,
        0
      ).subscribe(
        data => {
          console.log(data);
       
        },
        error => {
          console.log(error);
          this.actualizarRubros()
          this.Success('Nuevo rubro agregado con éxito', 'Agregar Rubros');
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
    //se manda a eliminar el rubro mediante el servicio
    this.rubrosService.eliminarRubro(
      this.infoGrupo.codigoCurso,
      this.infoGrupo.numeroGrupo,
      this.infoGrupo.anio,
      this.infoGrupo.periodo,
      rubro.nombre
    ).subscribe(
      data => {
        console.log(data);
    
      },
      error => {
        console.log(error);
        //Una vez eliminado el rubro, se resetean todos los porcentajes
        this.actualizarRubros();
        this.advertencia();
        this.verificarSumaPorcentajes();
        
        
      });
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
          numeroGrupo: this.infoGrupo.numeroGrupo,
          codigoCurso: this.infoGrupo.codigoCurso,
          periodo: this.infoGrupo.periodo,
          anio: this.infoGrupo.anio
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
        this.Success('Rubros editados exitosamente', 'Editar Rubros');
      }
      else{
        this.error();
      }
 
  }

  error() {
    this.toastr.error('La suma de los porcentajes debe ser 100%', 'Editar Rubros', 
    {
      timeOut: 2000,
      tapToDismiss: false
    });
  }

  Success(mensaje:string, titulo: string) {
    this.toastr.success(mensaje, titulo, 
    {
      timeOut: 2000,
      tapToDismiss: false
    });
  }

  advertencia(){
    this.toastr.warning('Rubro eliminado. Recuerda editar los porcentajes', 'Eliminar Rubro',
    {
      timeOut: 5000,
      tapToDismiss: false
    });
  }

}
