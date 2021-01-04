"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DocumentosService = void 0;
var core_1 = require("@angular/core");
var DocumentosService = /** @class */ (function () {
    function DocumentosService(http) {
        this.http = http;
    }
    //Solicita las carpetas relacionadas a un grupo
    DocumentosService.prototype.getCarpetas = function (codigoCurso, numeroGrupo, anio, periodo) {
        return this.http.get('https://xtecdigitalsql.azurewebsites.net/api/grupo/carpetas?', {
            params: {
                curso: codigoCurso,
                grupo: numeroGrupo.toString(),
                anio: anio,
                periodo: periodo
            }
        });
    };
    //Crear una nueva carpeta
    DocumentosService.prototype.crearNuevaCarpeta = function (nombre, numeroGrupo, codigoCurso, periodo, anio, creador) {
        //se modela el objeto JSON que se va a enviar
        var cuerpo = {
            nombre: nombre,
            numeroGrupo: numeroGrupo,
            codigoCurso: codigoCurso,
            periodo: periodo,
            anio: anio,
            creador: creador
        };
        return this.http.post('https://xtecdigitalsql.azurewebsites.net/api/grupo/carpeta/new', cuerpo);
    };
    //Solicita eliminar una carpeta relacionada a un grupo
    DocumentosService.prototype.eliminarCarpeta = function (codigoCurso, numeroGrupo, anio, periodo, nombreCarpeta) {
        return this.http["delete"]('https://xtecdigitalsql.azurewebsites.net/api/grupo/carpeta/delete?', {
            params: {
                curso: codigoCurso,
                grupo: numeroGrupo.toString(),
                anio: anio,
                periodo: periodo,
                nombre: nombreCarpeta
            }
        });
    };
    //Solicita el nombre de los archivos de una carpeta
    DocumentosService.prototype.getArchivos = function (codigoCurso, numeroGrupo, anio, periodo, nombreCarpeta) {
        return this.http.get('https://xtecdigitalsql.azurewebsites.net/api/grupo/carpeta/archivos?', {
            params: {
                curso: codigoCurso,
                carpeta: nombreCarpeta,
                grupo: numeroGrupo.toString(),
                anio: anio,
                periodo: periodo
            }
        });
    };
    //Crear una nueva carpeta
    DocumentosService.prototype.crearNuevoArchivo = function (nombre, nombreCarpeta, numeroGrupo, codigoCurso, periodo, anio, tamanio, fecha) {
        //se modela el objeto JSON que se va a enviar
        var cuerpo = {
            nombre: nombre,
            nombreCarpeta: nombreCarpeta,
            numeroGrupo: numeroGrupo,
            codigoCurso: codigoCurso,
            periodo: periodo,
            anio: anio,
            archivo: this.archivoB64.toString().split(',')[1],
            tamanio: tamanio,
            fecha: fecha
        };
        console.log(cuerpo.archivo);
        return this.http.post('https://xtecdigitalsql.azurewebsites.net/api/grupo/carpeta/newArchivo', cuerpo);
    };
    //Solicita el documento pdf en base 64
    DocumentosService.prototype.getArchivo = function (codigoCurso, carpeta, nombreArchivo, numeroGrupo, anio, periodo) {
        return this.http.get('https://xtecdigitalsql.azurewebsites.net/api/grupo/carpeta/archivo/data?', {
            params: {
                curso: codigoCurso,
                carpeta: carpeta,
                nombre: nombreArchivo,
                grupo: numeroGrupo,
                anio: anio,
                periodo: periodo
            }
        });
    };
    //Solicita eliminar una carpeta relacionada a un grupo
    DocumentosService.prototype.eliminarArchivo = function (codigoCurso, nombreCarpeta, nombreArchivo, numeroGrupo, anio, periodo) {
        return this.http["delete"]('https://xtecdigitalsql.azurewebsites.net/api/grupo/carpeta/archivo/delete?', {
            params: {
                curso: codigoCurso,
                carpeta: nombreCarpeta,
                nombre: nombreArchivo,
                grupo: numeroGrupo.toString(),
                anio: anio,
                periodo: periodo
            }
        });
    };
    //Crear una nueva carpeta
    DocumentosService.prototype.actualizarArchivo = function (nombreArchivo, nombreCarpeta, numeroGrupo, codigoCurso, periodo, anio, tamanio, fecha) {
        //se modela el objeto JSON que se va a enviar
        var cuerpo = {
            nombre: nombreArchivo,
            nombreCarpeta: nombreCarpeta,
            numeroGrupo: numeroGrupo,
            codigoCurso: codigoCurso,
            periodo: periodo,
            anio: anio,
            archivo: this.archivoB64.toString().split(',')[1],
            tamanio: tamanio,
            fecha: fecha
        };
        return this.http.put('https://xtecdigitalsql.azurewebsites.net/api/grupo/carpeta/updateArchivo', cuerpo);
    };
    DocumentosService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], DocumentosService);
    return DocumentosService;
}());
exports.DocumentosService = DocumentosService;
