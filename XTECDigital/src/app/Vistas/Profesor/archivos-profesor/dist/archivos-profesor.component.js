"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ArchivosProfesorComponent = void 0;
var core_1 = require("@angular/core");
var archivo_1 = require("src/app/Vistas/Profesor/ModelosProfesor/archivo");
var sweetalert2_1 = require("sweetalert2");
var ArchivosProfesorComponent = /** @class */ (function () {
    function ArchivosProfesorComponent(documentos, route, router) {
        this.documentos = documentos;
        this.route = route;
        this.router = router;
        //Archivo a seleccionar
        this.fileToUpload = null;
        //Mostrar el seleccionador de archivos
        this.seleccionarArchivo = false;
        //Lista de archivos que se muestran
        this.listaArchivos = [];
    }
    ArchivosProfesorComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Primero se carga la información del estado local en la variable local
        this.estadoLocal = JSON.parse(localStorage.getItem('EstadoActual'));
        console.log(this.estadoLocal);
        this.route.paramMap.subscribe(function (params) {
            var nombreCarpeta = params.get('nombreCarpeta');
            _this.nombreCarpeta = nombreCarpeta;
        });
        //Se pide la información de los archivos que se encuentran en esta carpeta
        this.actualizarArchivos();
    };
    ArchivosProfesorComponent.prototype.agregarNuevoArchivo = function (files) {
        var _this = this;
        //Se carga el archivo desde el elemento HTML
        this.fileToUpload = files.item(0);
        var reader = new FileReader();
        reader.readAsDataURL(this.fileToUpload);
        reader.onload = function (completionEvent) {
            console.log(completionEvent);
            _this.documentos.archivoB64 = reader.result;
            //Construyendo la fecha en que se está subiendo
            var date = new Date();
            var fecha = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
            var hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            var fechaHoraString = fecha + ' ' + hora;
            //Agregando el nuevo archivo mediante el servicio de documentos
            _this.documentos.crearNuevoArchivo(_this.fileToUpload.name, _this.nombreCarpeta, _this.estadoLocal.numeroGrupo, _this.estadoLocal.codigoCurso, _this.estadoLocal.periodo, _this.estadoLocal.anio, Math.round(_this.fileToUpload.size / 1024).toString() + ' KB', fechaHoraString).subscribe(function (data) {
                console.log(data);
            }, function (error) {
                console.log(error);
                _this.actualizarArchivos();
                //cerrar el apartado de nuevo archivo
                _this.activarSeleccionarArchivo();
                if (error.status === 400) {
                }
            });
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };
    ArchivosProfesorComponent.prototype.activarSeleccionarArchivo = function () {
        if (!this.seleccionarArchivo) {
            this.seleccionarArchivo = true;
        }
        else {
            this.seleccionarArchivo = false;
        }
    };
    ArchivosProfesorComponent.prototype.eliminarArchivo = function (archivo) {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: 'Eliminar Archivo',
            text: "¿ Seguro que deseas eliminar el archivo " + archivo.nombre + " ?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar'
        }).then(function (result) {
            if (result.isConfirmed) {
                _this.documentos.eliminarArchivo(_this.estadoLocal.codigoCurso, _this.nombreCarpeta, archivo.nombre, _this.estadoLocal.numeroGrupo, _this.estadoLocal.anio, _this.estadoLocal.periodo)
                    .subscribe(function (data) {
                    console.log(data);
                }, function (error) {
                    console.log(error);
                    _this.actualizarArchivos();
                });
            }
        });
    };
    ArchivosProfesorComponent.prototype.actualizarArchivos = function () {
        var _this = this;
        //Solicitar la lista de archivos por medio del servicio
        this.documentos.getArchivos(this.estadoLocal.codigoCurso, this.estadoLocal.numeroGrupo, this.estadoLocal.anio, this.estadoLocal.periodo, this.nombreCarpeta).subscribe(function (data) {
            //limpiar la lista de archivos
            _this.listaArchivos = [];
            for (var i = 0; i < data.length; i++) {
                _this.listaArchivos.push(new archivo_1.Archivo(data[i].nombre, data[i].tamanio, data[i].fecha));
            }
        });
    };
    ArchivosProfesorComponent.prototype.gotoVisor = function (archivo) {
        this.router.navigate(['/ProfesorGrupo', this.estadoLocal.numeroCedula, this.estadoLocal.nombreProfesor, this.estadoLocal.nombreGrupo, 'Documentos', this.nombreCarpeta, archivo.nombre]);
    };
    ArchivosProfesorComponent.prototype.gotoDocumentos = function () {
        this.router.navigate(['/ProfesorGrupo', this.estadoLocal.numeroCedula, this.estadoLocal.nombreProfesor, this.estadoLocal.nombreGrupo, 'Documentos']);
    };
    ArchivosProfesorComponent = __decorate([
        core_1.Component({
            selector: 'app-archivos-profesor',
            templateUrl: './archivos-profesor.component.html',
            styleUrls: ['./archivos-profesor.component.css']
        })
    ], ArchivosProfesorComponent);
    return ArchivosProfesorComponent;
}());
exports.ArchivosProfesorComponent = ArchivosProfesorComponent;
