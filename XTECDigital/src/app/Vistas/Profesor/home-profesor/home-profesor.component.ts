import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { ProfesorInfoService } from 'src/app/Vistas/Profesor/ServiciosProfesor/profesor-info.service'
import { AnioContenedor } from '../ModelosProfesor/anio-contenedor';
import { Grupo } from '../ModelosProfesor/grupo';
import { InfoGrupoService } from 'src/app/Vistas/Profesor/ServiciosProfesor/info-grupo.service';

@Component({
  selector: 'app-home-profesor',
  templateUrl: './home-profesor.component.html',
  styleUrls: ['./home-profesor.component.css']
})
export class HomeProfesorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router, private profesorInfoService: ProfesorInfoService, private infoGrupo: InfoGrupoService) { }

  //Cedula del profesor
  cedulaProfesor: string;

  //Lista de los periodos asociados al profesor
  listaPeriodos: AnioContenedor[] = [];

  ngOnInit(): void {
    //primero se guarda el número de cédula del profesor
    this.route.paramMap.subscribe((params: ParamMap) => {
      let cedula = params.get('cedulaProfesor');
      this.cedulaProfesor = cedula;
  });
  //luego se solicitan los cursos
  this.getProfesorGrupos(this.cedulaProfesor);
  }

  getProfesorGrupos(cedulaProfesor: string){
    //La cédula debe ir con comillas
    let cedula = "'" + cedulaProfesor + "'";
    this.profesorInfoService.misCursos(cedula)
    .subscribe(data => {
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
    this.router.navigate(['/ProfesorLogin']);
  }

  gotoGrupo(grupo: Grupo, periodo: AnioContenedor){
    //Se actualiza el servicio que provee la información de los grupos seleccionados
    this.infoGrupo.nombreGrupo = grupo.nombre;
    this.infoGrupo.numeroGrupo = grupo.numeroGrupo;
    this.infoGrupo.periodo = periodo.periodo;
    this.infoGrupo.anio = periodo.anio;
    this.infoGrupo.codigoCurso = grupo.codigoCurso;
    this.infoGrupo.numeroCedula = this.cedulaProfesor;
    this.router.navigate(['/ProfesorGrupo',this.cedulaProfesor, grupo.nombre, 'Documentos']);
  }

}
