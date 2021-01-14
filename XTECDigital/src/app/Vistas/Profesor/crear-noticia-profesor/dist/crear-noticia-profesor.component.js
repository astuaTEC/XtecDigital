"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CrearNoticiaProfesorComponent = void 0;
var core_1 = require("@angular/core");
var noticia_1 = require("../ModelosProfesor/noticia");
var sweetalert2_1 = require("sweetalert2");
var CrearNoticiaProfesorComponent = /** @class */ (function () {
    function CrearNoticiaProfesorComponent(route, router, noticiasService) {
        this.route = route;
        this.router = router;
        this.noticiasService = noticiasService;
        //El comando a ejecutar
        this.comando = '';
        //Modelo que almacena los datos ingresados por el usuario
        this.noticia = new noticia_1.Noticia(0, '', '', '', '');
    }
    CrearNoticiaProfesorComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Se carga la información del estado actual
        this.estadoLocal = JSON.parse(localStorage.getItem('EstadoActual'));
        //Se guarda el número de cédula del profesor
        this.route.paramMap.subscribe(function (params) {
            _this.comando = params.get('Opcion');
        });
        if (this.comando != 'Crear') {
            //Se deben pedir los datos para mostrarlos
            this.getNoticiaEditar();
        }
    };
    CrearNoticiaProfesorComponent.prototype.cerrar = function () {
        this.router.navigate(['/ProfesorGrupo', this.estadoLocal.numeroCedula, this.estadoLocal.nombreProfesor, this.estadoLocal.nombreGrupo, 'Noticias']);
    };
    CrearNoticiaProfesorComponent.prototype.nuevaNoticia = function () {
        var _this = this;
        //Se debe validar que todos los campos estén llenos
        if (this.noticia.titulo != '' && this.noticia.mensaje != '') {
            //Construyendo la fecha en que se está subiendo
            var date = new Date();
            var fecha = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            var hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            this.noticia.fechaPublicacion = fecha + ' ' + hora;
            //Transfiriendo el nombre del profesor que está agregando la noticia
            this.noticia.autor = this.estadoLocal.nombreProfesor;
            //Se realiza la petición mediante el servicio de Noticias
            this.noticiasService.crearNuevaNoticia(this.estadoLocal.numeroGrupo, this.estadoLocal.codigoCurso, this.estadoLocal.periodo, this.estadoLocal.anio, this.noticia.fechaPublicacion, this.noticia.titulo, this.noticia.mensaje, this.noticia.autor).subscribe(function (data) {
                console.log(data);
            }, function (error) {
                console.log(error);
                sweetalert2_1["default"].fire({
                    icon: 'success',
                    title: 'Se ha creado una nueva noticia',
                    showConfirmButton: false,
                    timer: 2000
                });
                _this.cerrar();
                if (error.status === 400) {
                }
            });
        }
        else {
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Faltan campos por llenar',
                showConfirmButton: false,
                timer: 2000
            });
        }
    };
    CrearNoticiaProfesorComponent.prototype.editarNoticia = function () {
        var _this = this;
        //Construyendo la fecha en que se está subiendo
        var date = new Date();
        var fecha = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        var hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        this.noticia.fechaPublicacion = fecha + ' ' + hora;
        //Transfiriendo el nombre del profesor que está agregando la noticia
        this.noticia.autor = this.estadoLocal.nombreProfesor;
        //Se realiza la petición mediante el servicio de Noticias
        this.noticiasService.editarNoticia(this.noticia.id, this.estadoLocal.numeroGrupo, this.estadoLocal.codigoCurso, this.estadoLocal.periodo, this.estadoLocal.anio, this.noticia.fechaPublicacion, this.noticia.titulo, this.noticia.mensaje, this.noticia.autor).subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
            _this.cerrar();
            if (error.status === 400) {
            }
        });
    };
    CrearNoticiaProfesorComponent.prototype.getNoticiaEditar = function () {
        var _this = this;
        //Se piden los datos de la noticia que se desea editar
        this.noticiasService.getNoticias(this.estadoLocal.codigoCurso, this.estadoLocal.numeroGrupo, this.estadoLocal.anio, this.estadoLocal.periodo).subscribe(function (data) {
            for (var i = 0; i < data.length; i++) {
                //Se localiza la noticia
                if (data[i].id.toString() == _this.comando) {
                    //Se rellenan los valores
                    _this.noticia = new noticia_1.Noticia(data[i].id, data[i].titulo, data[i].mensaje, data[i].fechaPublicacion, data[i].autor);
                }
            }
        });
    };
    CrearNoticiaProfesorComponent.prototype.guardar = function () {
        //Se debe valiadar si el usuario está guardando o editando noticias
        if (this.comando == 'Crear') {
            this.nuevaNoticia();
        }
        else {
            this.editarNoticia();
        }
    };
    CrearNoticiaProfesorComponent = __decorate([
        core_1.Component({
            selector: 'app-crear-noticia-profesor',
            templateUrl: './crear-noticia-profesor.component.html',
            styleUrls: ['./crear-noticia-profesor.component.css']
        })
    ], CrearNoticiaProfesorComponent);
    return CrearNoticiaProfesorComponent;
}());
exports.CrearNoticiaProfesorComponent = CrearNoticiaProfesorComponent;
