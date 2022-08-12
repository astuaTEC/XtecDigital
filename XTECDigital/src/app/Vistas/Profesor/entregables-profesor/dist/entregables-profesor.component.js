"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EntregablesProfesorComponent = void 0;
var core_1 = require("@angular/core");
var entregable_1 = require("../ModelosProfesor/entregable");
var estudiante_1 = require("../ModelosProfesor/estudiante");
var sweetalert2_1 = require("sweetalert2");
var FileSaver = require('file-saver');
var EntregablesProfesorComponent = /** @class */ (function () {
    function EntregablesProfesorComponent(route, router, evaluacionesService) {
        this.route = route;
        this.router = router;
        this.evaluacionesService = evaluacionesService;
        //Variable que almacena el nombre de la evaluación
        this.nombreEvaluacion = '';
        //Variable que almacena el nombre del rubro
        this.nombreRubro = '';
        //Porcentaje del rubro correspondiente
        this.porcentajeRubro = 0;
        //Lista de entregables
        this.listaEntregables = [];
    }
    EntregablesProfesorComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Se pide la información que se encuentra en local storge
        this.estadoLocal = JSON.parse(localStorage.getItem('EstadoActual'));
        this.route.params.forEach(function (urlParams) {
            _this.nombreEvaluacion = urlParams['nombreEvaluacion'];
            _this.nombreRubro = urlParams['nombreRubro'];
            _this.porcentajeRubro = urlParams['porcentajeRubro'];
        });
        //Se manda a actualizar la lista de entregables
        this.actualizarEntregables();
    };
    EntregablesProfesorComponent.prototype.cerrar = function () {
        this.router.navigate(['/ProfesorGrupo', this.estadoLocal.numeroCedula, this.estadoLocal.nombreProfesor, this.estadoLocal.nombreGrupo, 'Evaluaciones', this.nombreRubro, this.porcentajeRubro]);
    };
    EntregablesProfesorComponent.prototype.actualizarEntregables = function () {
        var _this = this;
        //Solicita la lista de entregables correspondiente a una evaluación
        this.evaluacionesService.getEntregables(this.estadoLocal.codigoCurso, this.nombreRubro, '"' + this.nombreEvaluacion + '"', this.estadoLocal.numeroGrupo, this.estadoLocal.anio, this.estadoLocal.periodo).subscribe(function (data) {
            //Se limpia la lista de entregables local
            _this.listaEntregables = [];
            console.log(data);
            if (data.length > 0) {
                //EVALUACIÓN INDIVIDUAL
                if (data[0].idSubGrupo == null) {
                    console.log('EVALUACIÓN INDIVIDUAL');
                    for (var i = 0; i < data.length; i++) {
                        var nuevoEntregable = new entregable_1.Entregable(data[i].id, data[i].idSubGrupo, [], '', null, 0, false);
                        //Tomar la información del estudiante desde el estado local
                        for (var _i = 0, _a = _this.estadoLocal.estudiantes; _i < _a.length; _i++) {
                            var estudiante = _a[_i];
                            if (estudiante.carnet == data[i].carnetEstudiante) {
                                nuevoEntregable.estudiantes.push(new estudiante_1.Estudiante(estudiante.nombre, estudiante.primerApellido, estudiante.segundoApellido, estudiante.carnet, data[i].idSubGrupo));
                            }
                        }
                        //Finalmente se agrega el entregable a la lista de entregables
                        _this.listaEntregables.push(nuevoEntregable);
                    }
                }
                //EVALUACIÓN GRUPAL
                else {
                    console.log('EVALUACIÓN GRUPAL');
                    for (var i = 0; i < data.length; i++) {
                        //Se verifica si ya existe un entregable con el número de subgrupo
                        var repetido = false;
                        for (var _b = 0, _c = _this.listaEntregables; _b < _c.length; _b++) {
                            var miEntregable = _c[_b];
                            if (miEntregable.idSubGrupo == data[i].idSubGrupo) {
                                repetido = true;
                                break;
                            }
                        }
                        //Si no es repetido
                        if (!repetido) {
                            //Primero se crea un nuevo entregable con información escencial
                            var nuevoEntregable = new entregable_1.Entregable(data[i].id, data[i].idSubGrupo, [], '', null, 0, false);
                            //Se agrega el nuevo entregable a la lista
                            _this.listaEntregables.push(nuevoEntregable);
                        }
                    }
                    //Ahora se agregan los estudiantes a cada entregable
                    for (var j = 0; j < data.length; j++) {
                        for (var _d = 0, _e = _this.listaEntregables; _d < _e.length; _d++) {
                            var miEntregable = _e[_d];
                            //Se localiza el entregable que tenga el mismo id de subgrupo que el estudiante
                            if (data[j].idSubGrupo == miEntregable.idSubGrupo) {
                                //Ahora se busca la información del entregable dentro del estado local del grupo
                                for (var _f = 0, _g = _this.estadoLocal.estudiantes; _f < _g.length; _f++) {
                                    var estudiante = _g[_f];
                                    if (estudiante.carnet == data[j].carnetEstudiante) {
                                        miEntregable.estudiantes.push(new estudiante_1.Estudiante(estudiante.nombre, estudiante.primerApellido, estudiante.segundoApellido, estudiante.carnet, data[j].idSubGrupo));
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (_this.listaEntregables.length == 0) {
                sweetalert2_1["default"].fire({
                    icon: 'info',
                    title: _this.nombreRubro,
                    text: 'No hay entregables disponibles para ' + _this.nombreEvaluacion,
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                });
            }
        });
    };
    EntregablesProfesorComponent.prototype.descargarArchivoEntregable = function (entregable) {
        this.evaluacionesService.getArchivoEntregable(this.estadoLocal.codigoCurso, this.nombreRubro, '"' + this.nombreEvaluacion + '"', this.estadoLocal.numeroGrupo, this.estadoLocal.anio, this.estadoLocal.periodo, entregable.estudiantes[0].carnet, entregable.id).subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
            var documento = 'data:application/pdf;base64,' + error["error"]["text"];
            var pdfName = 'entregable_' + entregable.estudiantes[0].nombre;
            FileSaver.saveAs(documento, pdfName);
        });
    };
    EntregablesProfesorComponent.prototype.drop = function (entregable) {
        //Ahora se abre solamente el que se ha seleccionado
        if (entregable.drop == false) {
            entregable.drop = true;
        }
        else {
            entregable.drop = false;
        }
        for (var _i = 0, _a = this.listaEntregables; _i < _a.length; _i++) {
            var e = _a[_i];
            if (e.drop && e != entregable) {
                e.drop = false;
            }
        }
    };
    EntregablesProfesorComponent.prototype.agregarNuevoArchivo = function (files, entregable) {
        //Se carga el archivo desde el elemento HTML
        this.fileToUpload = files.item(0);
        var reader = new FileReader();
        reader.readAsDataURL(this.fileToUpload);
        reader.onload = function (completionEvent) {
            console.log(completionEvent);
            //Cuando termine el proceso, se guarda el documento
            entregable.retroalimentacion = reader.result;
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };
    EntregablesProfesorComponent.prototype.calificar = function (entregable) {
        var _this = this;
        //Solo si los campos del formulario están llenos
        if (entregable.observaciones != '' && entregable.retroalimentacion != null) {
            var cuerpo = {
                id: entregable.id,
                carnetEstudiante: entregable.estudiantes[0].carnet,
                nombreEvaluacion: this.nombreEvaluacion,
                nombreRubro: this.nombreRubro,
                numeroGrupo: this.estadoLocal.numeroGrupo,
                codigoCurso: this.estadoLocal.codigoCurso,
                periodo: this.estadoLocal.periodo,
                anio: this.estadoLocal.anio,
                nota: entregable.calificacion,
                observaciones: entregable.observaciones,
                archivoRetroalimentacion: entregable.retroalimentacion.toString().split(',')[1]
            };
            console.log(cuerpo);
            this.evaluacionesService.calificarEntregable(cuerpo)
                .subscribe(function (data) {
                console.log(data);
            }, function (error) {
                console.log(error);
                sweetalert2_1["default"].fire({
                    icon: 'success',
                    title: 'Se ha calificado con éxito',
                    showConfirmButton: false,
                    timer: 1500
                });
                //Se actualiza la lista de entregables
                _this.actualizarEntregables();
            });
        }
        //En caso de que falten datos del form
        else {
            sweetalert2_1["default"].fire({
                icon: 'error',
                title: 'Error',
                text: 'Se deben llenar todos los campos!',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
        }
    };
    EntregablesProfesorComponent.prototype.publicarNotas = function () {
        var _this = this;
        //Se valida si no hay entregables disponibles
        //Eso puede indicar si ya se han calificado apropiadamente
        if (this.listaEntregables.length == 0) {
            this.evaluacionesService.publicarNotas(this.estadoLocal.codigoCurso, this.nombreRubro, this.nombreEvaluacion, this.estadoLocal.numeroGrupo, this.estadoLocal.anio, this.estadoLocal.periodo, this.estadoLocal.nombreProfesor).subscribe(function (data) {
                console.log(data);
            }, function (error) {
                console.log(error);
                sweetalert2_1["default"].fire({
                    icon: 'success',
                    title: 'Se han publicado las notas de ' + _this.nombreEvaluacion,
                    showConfirmButton: false,
                    timer: 1500
                });
            });
        }
    };
    EntregablesProfesorComponent = __decorate([
        core_1.Component({
            selector: 'app-entregables-profesor',
            templateUrl: './entregables-profesor.component.html',
            styleUrls: ['./entregables-profesor.component.css']
        })
    ], EntregablesProfesorComponent);
    return EntregablesProfesorComponent;
}());
exports.EntregablesProfesorComponent = EntregablesProfesorComponent;
