"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RubrosProfesorComponent = void 0;
var core_1 = require("@angular/core");
var rubro_1 = require("src/app/Vistas/Profesor/ModelosProfesor/rubro");
var sweetalert2_1 = require("sweetalert2");
;
var RubrosProfesorComponent = /** @class */ (function () {
    function RubrosProfesorComponent(rubrosService) {
        this.rubrosService = rubrosService;
        //La lista de rubros
        this.listaRubros = [];
        //Bandera para abrir o cerrar el apartado de nuevo rubro
        this.nuevoRubroActivado = false;
        //nombre del nuevo rubro
        this.nuevoRubro = '';
        //Bandera para validar si la suma de los porcentajes de los rubros es igual a 100
        //Se supone que al inicio es correcta, viene desde la base de datos
        this.sumaCorrecta = true;
    }
    RubrosProfesorComponent.prototype.ngOnInit = function () {
        //Cargar la información del estado actual
        this.estadoLocal = JSON.parse(localStorage.getItem('EstadoActual'));
        //solicitar la lista de rubro correspondientes al curso
        this.actualizarRubros();
    };
    RubrosProfesorComponent.prototype.actualizarRubros = function () {
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
    RubrosProfesorComponent.prototype.activarNuevoRubro = function () {
        if (!this.nuevoRubroActivado) {
            this.nuevoRubroActivado = true;
        }
        else {
            this.nuevoRubroActivado = false;
        }
    };
    RubrosProfesorComponent.prototype.agregarNuevoRubro = function () {
        var _this = this;
        if (this.nuevoRubro != '') {
            //se crea un nuevo rubro mediate el servicio de rubros
            this.rubrosService.crearNuevoRubro(this.nuevoRubro, this.estadoLocal.numeroGrupo, this.estadoLocal.codigoCurso, this.estadoLocal.periodo, this.estadoLocal.anio, 0).subscribe(function (data) {
                console.log(data);
            }, function (error) {
                console.log(error);
                _this.actualizarRubros();
                sweetalert2_1["default"].fire({
                    icon: 'success',
                    title: 'Nuevo rubro agregado',
                    showConfirmButton: false,
                    timer: 2000
                });
                _this.nuevoRubro = '';
                _this.nuevoRubroActivado = false;
                if (error.status === 400) {
                }
            });
            this.nuevoRubro = '';
            for (var _i = 0, _a = this.listaRubros; _i < _a.length; _i++) {
                var rubro = _a[_i];
                rubro.porcentaje = 0;
            }
        }
    };
    RubrosProfesorComponent.prototype.verificarSumaPorcentajes = function () {
        var sumaTotal = 0;
        for (var _i = 0, _a = this.listaRubros; _i < _a.length; _i++) {
            var rubro = _a[_i];
            sumaTotal += rubro.porcentaje;
        }
        if (sumaTotal === 100) {
            this.sumaCorrecta = true;
        }
        else {
            this.sumaCorrecta = false;
        }
    };
    RubrosProfesorComponent.prototype.eliminarRubro = function (rubro) {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: 'Eliminar Rubro',
            text: "¿Seguro que deseas eliminar el rubro " + rubro.nombre + " ?",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#3085d6',
            confirmButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar'
        }).then(function (result) {
            if (result.isConfirmed) {
                //se manda a eliminar el rubro mediante el servicio
                _this.rubrosService.eliminarRubro(_this.estadoLocal.codigoCurso, _this.estadoLocal.numeroGrupo, _this.estadoLocal.anio, _this.estadoLocal.periodo, rubro.nombre)
                    .subscribe(function (data) {
                    console.log(data);
                }, function (error) {
                    console.log(error);
                    //Una vez eliminado el rubro, se resetean todos los porcentajes
                    _this.actualizarRubros();
                    _this.verificarSumaPorcentajes();
                });
            }
        });
    };
    RubrosProfesorComponent.prototype.guardarRubros = function () {
        var _this = this;
        //solo se guardará si la suma de los porcentajes es 100
        this.verificarSumaPorcentajes();
        if (this.sumaCorrecta) {
            //se modela un cuerpo para enviar los rubros
            var nuevosRubros = [];
            for (var i = 0; i < this.listaRubros.length; i++) {
                nuevosRubros.push({
                    porcentaje: this.listaRubros[i].porcentaje,
                    nombre: this.listaRubros[i].nombre,
                    numeroGrupo: this.estadoLocal.numeroGrupo,
                    codigoCurso: this.estadoLocal.codigoCurso,
                    periodo: this.estadoLocal.periodo,
                    anio: this.estadoLocal.anio
                });
            }
            //Se usa la petición correspondiente
            this.rubrosService.editarRubros(nuevosRubros).subscribe(function (data) {
                console.log(data);
            }, function (error) {
                console.log(error);
                _this.actualizarRubros();
                if (error.status === 400) {
                }
            });
            //enviar mensaje de éxito
            sweetalert2_1["default"].fire({
                icon: 'success',
                title: 'Guardar rubros',
                text: 'Se han editado los rubros exitosamente',
                showConfirmButton: false,
                timer: 2000
            });
        }
        else {
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Guardar rubros',
                text: 'La suma de los porcentajes debe ser igual a 100',
                showConfirmButton: false,
                timer: 2000
            });
        }
    };
    RubrosProfesorComponent = __decorate([
        core_1.Component({
            selector: 'app-rubros-profesor',
            templateUrl: './rubros-profesor.component.html',
            styleUrls: ['./rubros-profesor.component.css']
        })
    ], RubrosProfesorComponent);
    return RubrosProfesorComponent;
}());
exports.RubrosProfesorComponent = RubrosProfesorComponent;
