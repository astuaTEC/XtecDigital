"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AgregarEvaluacionProfesorComponent = void 0;
var core_1 = require("@angular/core");
var evaluacion_1 = require("../ModelosProfesor/evaluacion");
var es_1 = require("../ModelosProfesor/es");
var ems_1 = require("../ModelosProfesor/ems");
var AgregarEvaluacionProfesorComponent = /** @class */ (function () {
    function AgregarEvaluacionProfesorComponent(toastr, evaluacionesService, route, router) {
        this.toastr = toastr;
        this.evaluacionesService = evaluacionesService;
        this.route = route;
        this.router = router;
        //Nombre del rubro correspondiente
        this.nombreRubro = '';
        //Porcentaje del rubro correspondiente
        this.porcentajeRubro = '';
        //hora máxima de entrega
        this.horaEntrega = '';
        //Fecha máxima de entrega
        this.fechaEntrega = '';
        //Modelo que almacena los valores agregados por el usuario
        this.evaluacion = new evaluacion_1.Evaluacion('', 0, '', '');
        //Lista de los estudiantes matriculados en el curso
        this.listaEstudiantes = [];
    }
    AgregarEvaluacionProfesorComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Se carga la información de local storage
        this.estadoLocal = JSON.parse(localStorage.getItem('EstadoActual'));
        //Se reciben la información que se encuentra en los parámetros del navegador
        this.route.params.forEach(function (urlParams) {
            _this.nombreRubro = urlParams['nombreRubro'];
            _this.porcentajeRubro = urlParams['porcentajeRubro'];
        });
        //Se actualiza la lista de los estudiantes
        this.listaEstudiantes = this.estadoLocal.estudiantes;
    };
    AgregarEvaluacionProfesorComponent.prototype.agregarNuevoArchivo = function (files) {
        var _this = this;
        //Se carga el archivo desde el elemento HTML
        this.fileToUpload = files.item(0);
        var reader = new FileReader();
        reader.readAsDataURL(this.fileToUpload);
        reader.onload = function (completionEvent) {
            console.log(completionEvent);
            _this.archivo = reader.result;
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        };
    };
    AgregarEvaluacionProfesorComponent.prototype.agregarEvaluacion = function () {
        var _this = this;
        if (this.valoresCorrectos()) {
            var cuerpo = {
                nombre: this.evaluacion.nombre,
                nombreRubro: this.nombreRubro,
                numeroGrupo: this.estadoLocal.numeroGrupo,
                codigoCurso: this.estadoLocal.codigoCurso,
                periodo: this.estadoLocal.periodo,
                anio: this.estadoLocal.anio,
                individualGrupal: this.evaluacion.participacion,
                fechaHoraMax: this.fechaEntrega + ' ' + this.horaEntrega + ':59',
                archivo: this.archivo.toString().split(',')[1],
                porcentaje: this.evaluacion.porcentaje
            };
            //Se realiza la petición al servidor
            this.evaluacionesService.crearNuevaEvaluacion(cuerpo)
                .subscribe(function (data) {
                console.log(data);
                _this.cerrar();
            }, function (error) {
                console.log(error);
                if (_this.evaluacion.participacion == 'Grupal') {
                    _this.agregarEvaluacion2();
                    _this.Success();
                    _this.cerrar();
                }
                else {
                    _this.Success();
                    _this.cerrar();
                }
            });
        }
        else {
            this.error();
        }
    };
    AgregarEvaluacionProfesorComponent.prototype.agregarEvaluacion2 = function () {
        var _this = this;
        //Primero se recorre la lista de estudiantes y se crean EvaluacionesSubgrupos
        var evaluacionesSubgrupos = [];
        for (var _i = 0, _a = this.listaEstudiantes; _i < _a.length; _i++) {
            var estudiante = _a[_i];
            //Se verifica si el idSubgrupo del estudiante ya está asociado a una ES
            var repetido = false;
            for (var _b = 0, evaluacionesSubgrupos_1 = evaluacionesSubgrupos; _b < evaluacionesSubgrupos_1.length; _b++) {
                var es = evaluacionesSubgrupos_1[_b];
                if (estudiante.grupo == es.Id) {
                    repetido = true;
                }
            }
            ;
            //Una vez validado la repetición se decide si crear una nueva ES
            if (!repetido) {
                evaluacionesSubgrupos.push(new es_1.ES(estudiante.grupo, this.evaluacion.nombre, this.nombreRubro, this.estadoLocal.numeroGrupo, this.estadoLocal.codigoCurso, this.estadoLocal.periodo, this.estadoLocal.anio, 
                //Al inicio está vacía
                []));
            }
        }
        //Ahora se agregan los estudiantes a sus respectivos subgrupos
        for (var _c = 0, _d = this.listaEstudiantes; _c < _d.length; _c++) {
            var estudiante = _d[_c];
            for (var _e = 0, evaluacionesSubgrupos_2 = evaluacionesSubgrupos; _e < evaluacionesSubgrupos_2.length; _e++) {
                var es = evaluacionesSubgrupos_2[_e];
                if (estudiante.grupo == es.Id) {
                    es.estudianteSubgrupos.push(new ems_1.EMS(estudiante.grupo, es.nombreEvaluacion, es.nombreRubro, es.numeroGrupo, es.codigoCurso, es.periodo, es.anio, estudiante.carnet));
                }
            }
        }
        //Ahora se envían los datos a la base de datos por medio del servicio de evaluaciones
        this.evaluacionesService.crearNuevaEvaluacionGrupal(evaluacionesSubgrupos).subscribe(function (data) {
            console.log(data);
            _this.cerrar();
        }, function (error) {
            console.log(error);
        });
    };
    AgregarEvaluacionProfesorComponent.prototype.valoresCorrectos = function () {
        var correcto = true;
        if (this.evaluacion.nombre == '' || this.fechaEntrega == '' || this.horaEntrega == '' || this.fileToUpload == undefined) {
            correcto = false;
        }
        if (this.evaluacion.participacion == 'Grupal') {
            for (var _i = 0, _a = this.listaEstudiantes; _i < _a.length; _i++) {
                var estudiante = _a[_i];
                if (estudiante.grupo == 0) {
                    correcto = false;
                }
            }
        }
        console.log(correcto);
        return correcto;
    };
    AgregarEvaluacionProfesorComponent.prototype.cerrar = function () {
        this.listaEstudiantes = this.estadoLocal.estudiantes;
        this.router.navigate(['/ProfesorGrupo', this.estadoLocal.numeroCedula, this.estadoLocal.nombreProfesor, this.estadoLocal.nombreGrupo, 'Evaluaciones', this.nombreRubro, this.porcentajeRubro]);
    };
    AgregarEvaluacionProfesorComponent.prototype.error = function () {
        this.toastr.error('No se puede agregar la nueva evaluación', 'Agregar Nueva Evaluación', {
            timeOut: 2000,
            tapToDismiss: false
        });
    };
    AgregarEvaluacionProfesorComponent.prototype.Success = function () {
        this.toastr.success('Evaluación agregada exitosamente', 'Agregar Nueva Evaluación', {
            timeOut: 2000,
            tapToDismiss: false
        });
    };
    AgregarEvaluacionProfesorComponent = __decorate([
        core_1.Component({
            selector: 'app-agregar-evaluacion-profesor',
            templateUrl: './agregar-evaluacion-profesor.component.html',
            styleUrls: ['./agregar-evaluacion-profesor.component.css']
        })
    ], AgregarEvaluacionProfesorComponent);
    return AgregarEvaluacionProfesorComponent;
}());
exports.AgregarEvaluacionProfesorComponent = AgregarEvaluacionProfesorComponent;
