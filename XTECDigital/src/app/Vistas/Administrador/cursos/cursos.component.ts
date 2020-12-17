import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Curso } from 'src/app/modelos/curso';
import { CursosService} from 'src/app/servicios/administrador/cursos.service';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CursosComponent implements OnInit {
panelOpenState = false;
cursos: Curso[] ;
formVisibility = false;
curso: Curso = new Curso();

  constructor(private _CursosService: CursosService) { }

  ngOnInit(): void {
  	this._CursosService.getCursos().subscribe(data => this.cursos = data );
}
agregar(){
  this.formVisibility = true;
  this.curso = new Curso();

}
submit(){
console.log(this.curso);
this.formVisibility = false;
this.cursos.push(this.curso);
this.curso.habilitado = true;
this._CursosService.crearCurso(this.curso).subscribe();
}

deshabilitar(curso){

this.curso = curso;
this.curso.habilitado = false;
console.log(this.curso);
  
  this._CursosService.actualizaCurso(this.curso).subscribe();
  for(let i = 0 ; i < this.cursos.length; i++) {
      if(this.cursos[i].codigo === this.curso.codigo){
        this.cursos[i] = this.curso;
      }
  }
}
habilitar(curso){

this.curso = curso;
this.curso.habilitado = true;
console.log(this.curso);



 this._CursosService.actualizaCurso(this.curso).subscribe();
 for(let i = 0 ; i < this.cursos.length; i++) {
      if(this.cursos[i].codigo === this.curso.codigo){
        this.cursos[i] = this.curso;
      }
  }
}


}
