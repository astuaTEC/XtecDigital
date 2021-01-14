import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { ProfesorInfoService } from 'src/app/Vistas/Profesor/ServiciosProfesor/profesor-info.service'
import { AnioContenedor } from '../ModelosProfesor/anio-contenedor';
import { Grupo } from '../ModelosProfesor/grupo';
import { Estado } from 'src/app/modelos/estado';
import { HttpClient } from '@angular/common/http';
import { Estudiante } from '../ModelosProfesor/estudiante';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-home-profesor',
  templateUrl: './home-profesor.component.html',
  styleUrls: ['./home-profesor.component.css']
})
export class HomeProfesorComponent implements OnInit {

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router, private profesorInfoService: ProfesorInfoService) { }

  //Cedula del profesor
  cedulaProfesor: string;

  //Nombre del profesor que se ha logeado
  nombreProfesor: string;

  //Lista de los periodos asociados al profesor
  listaPeriodos: AnioContenedor[] = [];

  //Modelo para el estado que se va a guardar en local storage
  estadoLocal: Estado;

  ngOnInit(): void {
   
    this.route.params.forEach((urlParams) => {
      this.cedulaProfesor = urlParams['cedulaProfesor'];
      this.nombreProfesor = urlParams['nombreProfesor'];
    });
  //luego se solicitan los cursos
  this.getProfesorGrupos(this.cedulaProfesor);
  }

  getProfesorGrupos(cedulaProfesor: string){
    //La cédula debe ir con comillas
    let cedula = "'" + cedulaProfesor + "'";
    this.profesorInfoService.misCursos(cedula)
    .subscribe(data => {
      console.log(data);
      //primero se deben crear los periodos
      for(let i = 0; i < data.length; i++){
        let nuevoPeriodo = new AnioContenedor(data[i].anio, data[i].periodo, []);
        //revisando si ya existe este periodo
        let repetido = false;
        for(let j = 0; j < this.listaPeriodos.length; j++){
          if(nuevoPeriodo.anio == this.listaPeriodos[j].anio && nuevoPeriodo.periodo == this.listaPeriodos[j].periodo){
            repetido = true;
          }
        }
        //validando si se debe agregar o no
        if(!repetido){
          this.listaPeriodos.push(nuevoPeriodo);
        }
      }

      //Ahora se agregan los grupos a sus respectivos periodos
      for(let i = 0; i < data.length; i++){
        let nuevoGrupo = new Grupo(data[i].codigoCurso, data[i].nombre, data[i].numeroGrupo);
        //se localiza su periodo para agregarlo
        for(let j = 0; j < this.listaPeriodos.length; j++){
          if(data[i].anio == this.listaPeriodos[j].anio && data[i].periodo == this.listaPeriodos[j].periodo){
            this.listaPeriodos[j].grupos.push(nuevoGrupo);
          }
        }
      }
    });
  }


  gotoInicioSesion(){
  Swal.fire({
    title: 'Cerrar Sesión',
    text: "¿Seguro que deseas cerrar la sesión?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Confirmar'
  }).then((result) => {
    if (result.isConfirmed) {
      //Ahora se limpian los datos de local storage
      localStorage.clear();
      this.router.navigate(['/ProfesorLogin']);
    }
  })
    
  }

  gotoGrupo(grupo: Grupo, periodo: AnioContenedor){
    //Configurando el estado con la información del grupo seleccionado
    let listaEstudiantes = [];
    this.http.get<any[]>('https://xtecdigitalsql.azurewebsites.net/api/profesor/curso/getReporteEstudiantes?', {
      params: {
        curso: grupo.codigoCurso,
        grupo: grupo.numeroGrupo.toString(),
        anio: periodo.anio,
        periodo: periodo.periodo
      }}).subscribe(data => {
        console.log(data);
        //Se meten los nuevos datos
        for(let i = 0; i < data.length; i++){
          listaEstudiantes.push(
            new Estudiante(data[i].primerNombre,
              data[i].primerApellido,
              data[i].segundoApellido,
              data[i].carnet,
              0)
          );     
      this.estadoLocal = new Estado(
        grupo.codigoCurso, grupo.nombre, grupo.numeroGrupo, periodo.anio, periodo.periodo, this.cedulaProfesor, listaEstudiantes, this.nombreProfesor
      );
      
      //Almacenando el local storage
      localStorage.setItem('EstadoActual', JSON.stringify(this.estadoLocal));
      this.router.navigate(['/ProfesorGrupo',this.cedulaProfesor, this.nombreProfesor, grupo.nombre, 'Documentos']);

        }})
  }

}
