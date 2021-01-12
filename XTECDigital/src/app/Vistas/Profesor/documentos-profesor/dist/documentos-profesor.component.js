"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DocumentosProfesorComponent = void 0;
var core_1 = require("@angular/core");
var carpeta_1 = require("../ModelosProfesor/carpeta");
var sweetalert2_1 = require("sweetalert2");
var DocumentosProfesorComponent = /** @class */ (function () {
    function DocumentosProfesorComponent(documentos, route, router) {
        this.documentos = documentos;
        this.route = route;
        this.router = router;
        //Variable que determina cuándo se debe desplegar el input de agregar nueva carpeta
        this.nuevaCarpetaActivado = false;
        //Nombre de la nueva carepeta -> Con ngModel
        this.nuevaCarpeta = '';
        //Lista de las carpetas que deben provenir del servidor
        this.listaCarpetas = [];
    }
    DocumentosProfesorComponent.prototype.ngOnInit = function () {
        //Se debe cargar la información que se encuentra en local storage
        this.estadoLocal = JSON.parse(localStorage.getItem('EstadoActual'));
        console.log(this.estadoLocal);
        this.actualizarCarpetas();
    };
    DocumentosProfesorComponent.prototype.activarNC = function () {
        if (this.nuevaCarpetaActivado === true) {
            this.nuevaCarpetaActivado = false;
        }
        else {
            this.nuevaCarpetaActivado = true;
        }
    };
    DocumentosProfesorComponent.prototype.eliminarCarpeta = function (carpeta) {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: 'Eliminar Carpeta',
            text: "¿ Seguro que deseas eliminar la carpeta " + carpeta.nombre + " ?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar'
        }).then(function (result) {
            if (result.isConfirmed) {
                _this.documentos.eliminarCarpeta(_this.estadoLocal.codigoCurso, _this.estadoLocal.numeroGrupo, _this.estadoLocal.anio, _this.estadoLocal.periodo, carpeta.nombre).subscribe(function (data) {
                    console.log(data);
                }, function (error) {
                    console.log(error);
                    _this.actualizarCarpetas();
                });
            }
        });
    };
    DocumentosProfesorComponent.prototype.agregarNuevaCarpeta = function () {
        var _this = this;
        if (this.nuevaCarpeta != '') {
            this.documentos.crearNuevaCarpeta(this.nuevaCarpeta, this.estadoLocal.numeroGrupo, this.estadoLocal.codigoCurso, this.estadoLocal.periodo, this.estadoLocal.anio, this.estadoLocal.numeroCedula).subscribe(function (data) {
                console.log(data);
                _this.nuevaCarpeta = '';
            }, function (error) {
                console.log(error);
                _this.actualizarCarpetas();
                if (error.status === 400) {
                    _this.nuevaCarpeta = '';
                }
            });
            this.activarNC();
            this.nuevaCarpeta = '';
        }
    };
    DocumentosProfesorComponent.prototype.actualizarCarpetas = function () {
        var _this = this;
        //Se solicitan las carpetas correspondientes a este grupo
        this.documentos.getCarpetas(this.estadoLocal.codigoCurso, this.estadoLocal.numeroGrupo, this.estadoLocal.anio, this.estadoLocal.periodo)
            .subscribe(function (data) {
            //limpiar la lista actual
            _this.listaCarpetas = [];
            //se recorre la lista de carpetas y se almacenan en la lista local
            for (var i = 0; i < data.length; i++) {
                //Se valida la protección de la carpeta
                var protegida = false;
                if (data[i].creador === 'System') {
                    protegida = true;
                }
                var nuevaCarpeta = new carpeta_1.Carpeta(data[i].nombre, protegida);
                //se agrega a la lista de carpetas
                _this.listaCarpetas.push(nuevaCarpeta);
            }
        });
    };
    DocumentosProfesorComponent.prototype.gotoArchivos = function (nombreCarpeta) {
        this.router.navigate(['/ProfesorGrupo', this.estadoLocal.numeroCedula, this.estadoLocal.nombreProfesor, this.estadoLocal.nombreGrupo, 'Documentos', nombreCarpeta]);
    };
    DocumentosProfesorComponent = __decorate([
        core_1.Component({
            selector: 'app-documentos-profesor',
            templateUrl: './documentos-profesor.component.html',
            styleUrls: ['./documentos-profesor.component.css']
        })
    ], DocumentosProfesorComponent);
    return DocumentosProfesorComponent;
}());
exports.DocumentosProfesorComponent = DocumentosProfesorComponent;
