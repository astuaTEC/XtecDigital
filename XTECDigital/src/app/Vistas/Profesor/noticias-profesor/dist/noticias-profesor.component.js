"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NoticiasProfesorComponent = void 0;
var core_1 = require("@angular/core");
var noticia_1 = require("../ModelosProfesor/noticia");
var sweetalert2_1 = require("sweetalert2");
var NoticiasProfesorComponent = /** @class */ (function () {
    function NoticiasProfesorComponent(route, router, noticiasService) {
        this.route = route;
        this.router = router;
        this.noticiasService = noticiasService;
        //La lista de noticias que están relacionadas con el grupo
        this.listaNoticias = [];
    }
    NoticiasProfesorComponent.prototype.ngOnInit = function () {
        //Cargar la información del estado actual desde el local storage
        this.estadoLocal = JSON.parse(localStorage.getItem('EstadoActual'));
        //Cuando carga el componente se piden las noticias relacionadas con el grupo
        this.actualizarNoticias();
    };
    NoticiasProfesorComponent.prototype.nuevaNoticia = function () {
        this.router.navigate(['/ProfesorGrupo', this.estadoLocal.numeroCedula, this.estadoLocal.nombreGrupo, 'NuevaNoticia', 'Crear']);
    };
    NoticiasProfesorComponent.prototype.editarNoticia = function (noticia) {
        this.router.navigate(['/ProfesorGrupo', this.estadoLocal.numeroCedula, this.estadoLocal.nombreGrupo, 'NuevaNoticia', noticia.id]);
    };
    NoticiasProfesorComponent.prototype.actualizarNoticias = function () {
        var _this = this;
        //Se hace la petición por medio del servicio de noticias
        this.noticiasService.getNoticias(this.estadoLocal.codigoCurso, this.estadoLocal.numeroGrupo, this.estadoLocal.anio, this.estadoLocal.periodo).subscribe(function (data) {
            //Se limpia la lista de noticias
            _this.listaNoticias = [];
            for (var i = 0; i < data.length; i++) {
                _this.listaNoticias.push(new noticia_1.Noticia(data[i].id, data[i].titulo, data[i].mensaje, data[i].fechaPublicacion, data[i].autor));
            }
        });
    };
    NoticiasProfesorComponent.prototype.eliminarNoticia = function (noticia) {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: 'Eliminar Noticia',
            text: "¿ Seguro que deseas eliminar la noticia referente a " + noticia.titulo + " ?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar'
        }).then(function (result) {
            if (result.isConfirmed) {
                //Se solicita eliminar la noticia mediante el servicio de noticias
                _this.noticiasService.eliminarNoticia(_this.estadoLocal.codigoCurso, _this.estadoLocal.numeroGrupo, _this.estadoLocal.anio, _this.estadoLocal.periodo, noticia.id).subscribe(function (data) {
                    console.log(data);
                }, function (error) {
                    console.log(error);
                    //Una vez eliminado el rubro, se resetean todos los porcentajes
                    _this.actualizarNoticias();
                });
            }
        });
    };
    NoticiasProfesorComponent = __decorate([
        core_1.Component({
            selector: 'app-noticias-profesor',
            templateUrl: './noticias-profesor.component.html',
            styleUrls: ['./noticias-profesor.component.css']
        })
    ], NoticiasProfesorComponent);
    return NoticiasProfesorComponent;
}());
exports.NoticiasProfesorComponent = NoticiasProfesorComponent;
