"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EvaluacionesService = void 0;
var core_1 = require("@angular/core");
var EvaluacionesService = /** @class */ (function () {
    function EvaluacionesService(http) {
        this.http = http;
    }
    //Solicita la lista de rubros con sus porcentaje
    EvaluacionesService.prototype.getRubros = function (codigoCurso, nombreRubro, numeroGrupo, anio, periodo) {
        return this.http.get('https://xtecdigitalsql.azurewebsites.net/api/grupo/rubros?', {
            params: {
                curso: codigoCurso,
                grupo: numeroGrupo.toString(),
                anio: anio,
                periodo: periodo
            }
        });
    };
    //Solicita las evaluaciones relacionadas a un rubro
    EvaluacionesService.prototype.getEvaluaciones = function (codigoCurso, nombreRubro, numeroGrupo, anio, periodo) {
        return this.http.get('https://xtecdigitalsql.azurewebsites.net/api/grupo/rubro/evaluaciones?', {
            params: {
                curso: codigoCurso,
                rubro: nombreRubro,
                grupo: numeroGrupo.toString(),
                anio: anio,
                periodo: periodo
            }
        });
    };
    //Crear una nueva evaluacion individual
    EvaluacionesService.prototype.crearNuevaEvaluacion = function (cuerpo) {
        return this.http.post('https://xtecdigitalsql.azurewebsites.net/api/grupo/evaluacion/new', cuerpo);
    };
    //Crear una nueva evaluacion Grupal
    EvaluacionesService.prototype.crearNuevaEvaluacionGrupal = function (cuerpo) {
        return this.http.post('https://xtecdigitalsql.azurewebsites.net/api/grupo/evaluacion/subgrupos', cuerpo);
    };
    //Elimina una evaluacion en específico
    EvaluacionesService.prototype.eliminarEvaluacion = function (codigoCurso, nombreRubro, nombreEvaluacion, numeroGrupo, anio, periodo) {
        return this.http["delete"]('https://xtecdigitalsql.azurewebsites.net/api/grupo/evaluacion/delete?', {
            params: {
                curso: codigoCurso,
                rubro: nombreRubro,
                nombre: nombreEvaluacion,
                grupo: numeroGrupo.toString(),
                anio: anio,
                periodo: periodo
            }
        });
    };
    //Solicita las evaluaciones relacionadas a un rubro
    EvaluacionesService.prototype.getEntregables = function (codigoCurso, nombreRubro, nombreEvaluacion, numeroGrupo, anio, periodo) {
        return this.http.get('https://xtecdigitalsql.azurewebsites.net/api/grupo/rubro/evaluacion/entregables?', {
            params: {
                curso: codigoCurso,
                rubro: nombreRubro,
                nombre: nombreEvaluacion,
                grupo: numeroGrupo.toString(),
                anio: anio,
                periodo: periodo
            }
        });
    };
    //Solicita el entregable correspondiente a una evaluación
    EvaluacionesService.prototype.getArchivoEntregable = function (codigoCurso, nombreRubro, nombreEvaluacion, numeroGrupo, anio, periodo, carnet, id) {
        return this.http.get('https://xtecdigitalsql.azurewebsites.net/api/grupo/rubro/evaluacion/entregable/archivo?', {
            params: {
                curso: codigoCurso,
                rubro: nombreRubro,
                nombre: nombreEvaluacion,
                grupo: numeroGrupo.toString(),
                anio: anio,
                periodo: periodo,
                carnet: carnet,
                id: id.toString()
            }
        });
    };
    EvaluacionesService.prototype.calificarEntregable = function (cuerpo) {
        return this.http.post('https://xtecdigitalsql.azurewebsites.net/api/grupo/evaluacion/entregable/calificar', cuerpo);
    };
    //Publica las notas de los entregables calificados
    EvaluacionesService.prototype.publicarNotas = function (codigoCurso, nombreRubro, nombreEvaluacion, numeroGrupo, anio, periodo, nombreProfesor) {
        return this.http.get('https://xtecdigitalsql.azurewebsites.net/api/grupo/evaluacion/publicarNotas?', {
            params: {
                curso: codigoCurso,
                rubro: nombreRubro,
                nombre: nombreEvaluacion,
                grupo: numeroGrupo.toString(),
                anio: anio,
                periodo: periodo,
                profesor: nombreProfesor
            }
        });
    };
    EvaluacionesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], EvaluacionesService);
    return EvaluacionesService;
}());
exports.EvaluacionesService = EvaluacionesService;
