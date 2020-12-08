import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-crear-noticia-profesor',
  templateUrl: './crear-noticia-profesor.component.html',
  styleUrls: ['./crear-noticia-profesor.component.css']
})
export class CrearNoticiaProfesorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  cerrar(){
    this.router.navigate(['ProfesorGrupo/Noticias']);
  }

}
