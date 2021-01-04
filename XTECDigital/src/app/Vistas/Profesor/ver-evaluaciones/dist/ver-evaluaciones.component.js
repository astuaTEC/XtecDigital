"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VerEvaluacionesComponent = void 0;
var core_1 = require("@angular/core");
var evaluacion_1 = require("../ModelosProfesor/evaluacion");
var VerEvaluacionesComponent = /** @class */ (function () {
    function VerEvaluacionesComponent(evaluacionesService, infoGrupo, route, router) {
        this.evaluacionesService = evaluacionesService;
        this.infoGrupo = infoGrupo;
        this.route = route;
        this.router = router;
        //Nombre del rubro corrrespondiente a las evaluaciones
        this.nombreRubro = '';
        //Porcentaje del rubro correspondiente
        this.porcentajeRubro = 0;
        //Lista de evaluaciones correspondientes a un rubro
        this.listaEvaluaciones = [];
    }
    VerEvaluacionesComponent.prototype.ngOnInit = function () {
        var _this = this;
        //primero se guarda el número de cédula del profesor
        this.route.params.forEach(function (urlParams) {
            _this.nombreRubro = urlParams['nombreRubro'];
            _this.porcentajeRubro = urlParams['porcentajeRubro'];
        });
        //se actualiza la lista de evaluaciones
        this.actualizarEvaluaciones();
    };
    VerEvaluacionesComponent.prototype.cerrar = function () {
        this.router.navigate(['/ProfesorGrupo', this.infoGrupo.numeroCedula, this.infoGrupo.nombreGrupo, 'Evaluaciones']);
    };
    VerEvaluacionesComponent.prototype.nuevaEvaluacion = function () {
        //Calcular el porcentaje restante que le queda al rubro
        this.router.navigate(['/ProfesorGrupo', this.infoGrupo.numeroCedula, this.infoGrupo.nombreGrupo, 'NuevaEvaluacion', this.nombreRubro, this.porcentajeRubro]);
    };
    VerEvaluacionesComponent.prototype.calificarEntregables = function (evaluacion) {
        this.router.navigate(['/ProfesorGrupo', this.infoGrupo.numeroCedula, this.infoGrupo.nombreGrupo, 'Entregables', evaluacion.nombre, this.nombreRubro]);
    };
    VerEvaluacionesComponent.prototype.actualizarEvaluaciones = function () {
        var _this = this;
        //Se solicitan los datos por medio del servicio de evaluaciones
        this.evaluacionesService.getEvaluaciones(this.infoGrupo.codigoCurso, this.nombreRubro, this.infoGrupo.numeroGrupo, this.infoGrupo.anio, this.infoGrupo.periodo).subscribe(function (data) {
            //Se limpia la lista de evaluaciones
            _this.listaEvaluaciones = [];
            for (var i = 0; i < data.length; i++) {
                _this.listaEvaluaciones.push(new evaluacion_1.Evaluacion(data[i].nombre, data[i].porcentaje, data[i].fechaHoraMax, data[i].individualGrupal));
            }
        }, function (error) {
            console.log(error);
            if (error.status === 400) {
            }
        });
    };
    VerEvaluacionesComponent.prototype.eliminarEvaluacion = function (nombreEvaluacion) {
        var _this = this;
        //Se solicita eliminar una evaluacion mediante el servicio de evaluaciones
        this.evaluacionesService.eliminarEvaluacion(this.infoGrupo.codigoCurso, this.nombreRubro, nombreEvaluacion, this.infoGrupo.numeroGrupo, this.infoGrupo.anio, this.infoGrupo.periodo).subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
            _this.actualizarEvaluaciones();
        });
    };
    VerEvaluacionesComponent = __decorate([
        core_1.Component({
            selector: 'app-ver-evaluaciones',
            templateUrl: './ver-evaluaciones.component.html',
            styleUrls: ['./ver-evaluaciones.component.css']
        })
    ], VerEvaluacionesComponent);
    return VerEvaluacionesComponent;
}());
exports.VerEvaluacionesComponent = VerEvaluacionesComponent;
