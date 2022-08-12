"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EvaluacionesProfesorComponent = void 0;
var core_1 = require("@angular/core");
var rubro_1 = require("../ModelosProfesor/rubro");
var EvaluacionesProfesorComponent = /** @class */ (function () {
    function EvaluacionesProfesorComponent(rubrosService, route, router) {
        this.rubrosService = rubrosService;
        this.route = route;
        this.router = router;
        //Archivo a seleccionar
        this.fileToUpload = null;
        //Lista de rubros del grupo
        this.listaRubros = [];
    }
    EvaluacionesProfesorComponent.prototype.ngOnInit = function () {
        //Cargar el estado actual en la variable local
        this.estadoLocal = JSON.parse(localStorage.getItem('EstadoActual'));
        //solicitar la lista de rubros
        this.actualizarRubros();
    };
    EvaluacionesProfesorComponent.prototype.actualizarRubros = function () {
        var _this = this;
        this.rubrosService.getRubros(this.estadoLocal.codigoCurso, this.estadoLocal.numeroGrupo, this.estadoLocal.anio, this.estadoLocal.periodo).subscribe(function (data) {
            _this.listaRubros = [];
            for (var i = 0; i < data.length; i++) {
                //se crea un nuevo rubro para agregarlo a la lista
                var nuevoRubro = new rubro_1.Rubro(data[i].nombre, data[i].porcentaje);
                _this.listaRubros.push(nuevoRubro);
            }
        });
    };
    EvaluacionesProfesorComponent.prototype.verEvaluaciones = function (rubro) {
        this.router.navigate(['/ProfesorGrupo', this.estadoLocal.numeroCedula, this.estadoLocal.nombreProfesor, this.estadoLocal.nombreGrupo, 'Evaluaciones', rubro.nombre, rubro.porcentaje]);
    };
    EvaluacionesProfesorComponent = __decorate([
        core_1.Component({
            selector: 'app-evaluaciones-profesor',
            templateUrl: './evaluaciones-profesor.component.html',
            styleUrls: ['./evaluaciones-profesor.component.css']
        })
    ], EvaluacionesProfesorComponent);
    return EvaluacionesProfesorComponent;
}());
exports.EvaluacionesProfesorComponent = EvaluacionesProfesorComponent;
