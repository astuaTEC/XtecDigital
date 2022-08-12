"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReportesService = void 0;
var core_1 = require("@angular/core");
var ReportesService = /** @class */ (function () {
    function ReportesService(http) {
        this.http = http;
    }
    //Solicita la lista de rubros con sus porcentaje
    ReportesService.prototype.getNotasEstudiantes = function (codigoCurso, numeroGrupo, anio, periodo) {
        return this.http.get('https://xtecdigitalsql.azurewebsites.net/api/profesor/curso/getNotas?', {
            params: {
                curso: '"' + codigoCurso + '"',
                grupo: numeroGrupo.toString(),
                anio: anio,
                periodo: periodo
            }
        });
    };
    ReportesService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ReportesService);
    return ReportesService;
}());
exports.ReportesService = ReportesService;
