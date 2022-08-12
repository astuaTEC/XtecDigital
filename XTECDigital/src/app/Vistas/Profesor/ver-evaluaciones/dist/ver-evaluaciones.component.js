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
var sweetalert2_1 = require("sweetalert2");
var VerEvaluacionesComponent = /** @class */ (function () {
    function VerEvaluacionesComponent(evaluacionesService, route, router) {
        this.evaluacionesService = evaluacionesService;
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
        //Se carga la información de la aplicación almacenada en local storage
        this.estadoLocal = JSON.parse(localStorage.getItem('EstadoActual'));
        //primero se guarda el número de cédula del profesor
        this.route.params.forEach(function (urlParams) {
            _this.nombreRubro = urlParams['nombreRubro'];
            _this.porcentajeRubro = urlParams['porcentajeRubro'];
        });
        //se actualiza la lista de evaluaciones
        this.actualizarEvaluaciones();
    };
    VerEvaluacionesComponent.prototype.cerrar = function () {
        this.router.navigate(['/ProfesorGrupo', this.estadoLocal.numeroCedula, this.estadoLocal.nombreProfesor, this.estadoLocal.nombreGrupo, 'Evaluaciones']);
    };
    VerEvaluacionesComponent.prototype.nuevaEvaluacion = function () {
        //Calcular el porcentaje restante que le queda al rubro
        var porcentajeRestante = this.porcentajeRubro;
        for (var _i = 0, _a = this.listaEvaluaciones; _i < _a.length; _i++) {
            var evaluacion = _a[_i];
            porcentajeRestante -= evaluacion.porcentaje;
        }
        this.router.navigate(['/ProfesorGrupo', this.estadoLocal.numeroCedula, this.estadoLocal.nombreProfesor, this.estadoLocal.nombreGrupo, 'NuevaEvaluacion', this.nombreRubro, porcentajeRestante]);
    };
    VerEvaluacionesComponent.prototype.calificarEntregables = function (evaluacion) {
        this.router.navigate(['/ProfesorGrupo', this.estadoLocal.numeroCedula, this.estadoLocal.nombreProfesor, this.estadoLocal.nombreGrupo, 'Entregables', evaluacion.nombre, this.nombreRubro, this.porcentajeRubro]);
    };
    VerEvaluacionesComponent.prototype.actualizarEvaluaciones = function () {
        var _this = this;
        //Se solicitan los datos por medio del servicio de evaluaciones
        this.evaluacionesService.getEvaluaciones(this.estadoLocal.codigoCurso, this.nombreRubro, this.estadoLocal.numeroGrupo, this.estadoLocal.anio, this.estadoLocal.periodo).subscribe(function (data) {
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
        sweetalert2_1["default"].fire({
            title: 'Eliminar Evaluación',
            text: "¿ Seguro que deseas cerrar la evaluación " + nombreEvaluacion + " ?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar'
        }).then(function (result) {
            if (result.isConfirmed) {
                //Se solicita eliminar una evaluacion mediante el servicio de evaluaciones
                _this.evaluacionesService.eliminarEvaluacion(_this.estadoLocal.codigoCurso, _this.nombreRubro, nombreEvaluacion, _this.estadoLocal.numeroGrupo, _this.estadoLocal.anio, _this.estadoLocal.periodo).subscribe(function (data) {
                    console.log(data);
                }, function (error) {
                    console.log(error);
                    sweetalert2_1["default"].fire({
                        icon: 'success',
                        title: 'Evaluación eliminada',
                        showConfirmButton: false,
                        timer: 2000
                    });
                    _this.actualizarEvaluaciones();
                });
            }
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