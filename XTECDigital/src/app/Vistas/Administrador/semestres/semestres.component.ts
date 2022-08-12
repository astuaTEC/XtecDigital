import { Component, OnInit, ViewEncapsulation, ElementRef } from '@angular/core';
import { Curso } from 'src/app/modelos/curso';
import { EstudianteGrupo} from 'src/app/modelos/administrador/estudiante-grupo';
import * as XLSX from 'xlsx';
import { Grupo } from 'src/app/modelos/administrador/grupo';
import { ProfesorGrupo} from 'src/app/modelos/administrador/profesor-grupo';
import { SemestreExcel} from 'src/app/modelos/administrador/semestre-excel';
import { Semestre} from 'src/app/modelos/administrador/semestre';
import { CursosService} from 'src/app/servicios/administrador/cursos.service';
import { AdminService} from 'src/app/servicios/administrador/admin.service';

import { ViewChild } from '@angular/core';
import { Estudiante} from 'src/app/modelos/estudiante';
import { Profesor } from 'src/app/modelos/profesor';

@Component({
  selector: 'app-semestres',
  templateUrl: './semestres.component.html',
  styleUrls: ['./semestres.component.css'],
   encapsulation: ViewEncapsulation.None
})
export class SemestresComponent implements OnInit {
formVisibility = false;
file: any;
anios: number[] = [];
cursos: Curso[];
grupos: Grupo[] = [];
formVisibility3  = false;
carnets: Estudiante[];
data: any =[];
estudiantes: any[] =[];
p1 = '';
p2 = '';
grupo: number;
anio = '';
periodo = '';
curso: Curso;
estudiante: EstudianteGrupo;
estudiantesGrupo: EstudianteGrupo[] = [];
profesores: ProfesorGrupo[] = [];
profesor: ProfesorGrupo;
group: Grupo;
estudianteE: SemestreExcel;
estudiantesE = [];
semestre: Semestre;
profesores1: Profesor[] = [];
selectedStates: Profesor[] = [];
selectedStates2: Profesor[] = [];
sem: string;
@ViewChild('file') myInputVariable: ElementRef;

  constructor(private _CursosService: CursosService, private _AdminService: AdminService) { 

  }
test = '';



  ngOnInit(): void {

    this._CursosService.getCursosHabilitados().subscribe(data => this.cursos = data );
this._AdminService.getEstudiantes().subscribe(data => this.carnets = data );
this._AdminService.getProfesores().subscribe(data => this.profesores1 = data );
this._AdminService.getProfesores().subscribe(data => this.selectedStates = data );
this._AdminService.getProfesores().subscribe(data => this.selectedStates2 = data );

const today = new Date();
const year = today.getFullYear();
for (let i = 0 ; i < 11; i++) {
let anio = year + i;
this.anios.push(anio);
}






}

  



  submit(){
    console.log("Iniciando");


    console.log(this.data);
    if(this.data != null){
      for(let i = 0 ; i < this.data.length; i++) {
         if(this.data[i].length > 0){
           this.estudianteE = new SemestreExcel();
         
            this.estudianteE.anio = this.data[i][6];
             this.estudianteE.periodo = this.data[i][7];
             this.estudianteE.codigoCurso = this.data[i][4];
             this.estudianteE.numeroGrupo = this.data[i][8];
             this.estudianteE.carnetEstudiante = this.data[i][0];
             this.estudianteE.profesor1 = this.data[i][9];
             this.estudiantesE.push(this.estudianteE);

         }

         console.log(this.estudiantesE);
console.log(JSON.stringify(this.estudiantesE));
this.sem =JSON.stringify(this.estudiantesE);
this._AdminService.iniciarSemestreE(this.estudiantesE).subscribe();
    window.alert('Semestre inicializado de forma correcta!');
    this.myInputVariable.nativeElement.value = "";

    
      }

    

  }

  }

 onFileChange(evt: any) {
    const target: DataTransfer =  <DataTransfer>(evt.target);
   
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');

    const reader: FileReader = new FileReader();

    reader.onload = (e: any) => {
      const bstr: string = e.target.result;

      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      const wsname: string = wb.SheetNames[0];

      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));

    

      let x = this.data.slice(1);
      console.log(x);
      this.data = x;

    };

    reader.readAsBinaryString(target.files[0]);

  }

   openDialog(p1,p2,grupo, curso) {
    this.formVisibility3 = true;
    this.p1 = p1;
    this.p2 = p2;
    this.curso = curso;
    this.grupo = grupo;
    console.log(this.p1);
    console.log(this.p2);
    console.log(this.grupo);

   
  }

  addEstudiantes(){
    
    for(let i = 0 ; i < this.estudiantes.length; i++) {
      this.estudiante = new EstudianteGrupo();
      this.estudiante.codigoCurso = this.curso.codigo;
      this.estudiante.carnetEstudiante = this.estudiantes[i];
      this.estudiante.numeroGrupo = this.grupo;
      this.estudiantesGrupo.push(this.estudiante);
      }
 

this.profesor = new ProfesorGrupo();
this.profesor.codigoCurso = this.curso.codigo;
this.profesor.numeroGrupo = this.grupo;
this.profesor.cedulaProfesor = this.p1;
this.profesores.push(this.profesor);

 if(this.p2 != '') {
  this.profesor = new ProfesorGrupo();
this.profesor.codigoCurso = this.curso.codigo;
this.profesor.numeroGrupo = this.grupo;
this.profesor.cedulaProfesor = this.p2;
this.profesores.push(this.profesor);
 
 }
   

this.group = new Grupo();
this.group.numero = this.grupo;
this.group.codigoCurso = this.curso.codigo;
this.group.estudianteGrupos = this.estudiantesGrupo;
this.group.profesorGrupos = this.profesores;

this.grupos.push(this.group);



  this.estudiantes = [];
  this.estudiantesGrupo = [];
  this.profesores = [];




    this.formVisibility3 = false;
  }

  

  onCheckboxChangegroup(option, event) {
     if(event.target.checked) {
       this.estudiantes.push(option);
     } else {
     for(let i = 0 ; i < this.estudiantes.length; i++) {
       if(this.estudiantes[i] === option) {
         this.estudiantes.splice(i,1);
      }
    }
  }
  
}

inicio(anio, periodo){
  this.semestre = new Semestre();
  this.semestre.anio = anio;
  this.semestre.periodo = this.periodo;

  for(let i = 0 ; i < this.grupos.length; i++) {
     this.grupos[i].anio = anio;
     this.grupos[i].periodo = this.periodo;
    for(let j = 0 ; j < this.grupos[i].estudianteGrupos.length; j++) {
      this.grupos[i].estudianteGrupos[j].anio = anio;
      this.grupos[i].estudianteGrupos[j].periodo = this.periodo;
    }
    for(let k = 0 ; k < this.grupos[i].profesorGrupos.length; k++) {
    
    this.grupos[i].profesorGrupos[k].anio = anio;
      this.grupos[i].profesorGrupos[k].periodo = this.periodo;
    }
      }

      this.semestre.grupos = this.grupos;
      console.log(this.semestre);
  this.formVisibility = false;
this._AdminService.iniciarSemestre(this.semestre).subscribe();
this.semestre = new Semestre();
this.grupos = [];


}

per(value){
  this.periodo = value;
}

onKey(value) { 
this.selectedStates = this.search(value);
console.log(this.carnets);
console.log(this.profesores1);
console.log(this.selectedStates);
}

onKey2(value) { 
this.selectedStates2 = this.search(value);
console.log(this.carnets);
console.log(this.profesores1);
console.log(this.selectedStates);
}

// Filter the states list and send back to populate the selectedStates**
search(value: string) { 
  let filter = value.toString().toLowerCase();
  return this.profesores1.filter(option => option.cedula.toString().toLowerCase().startsWith(filter));
}




}
