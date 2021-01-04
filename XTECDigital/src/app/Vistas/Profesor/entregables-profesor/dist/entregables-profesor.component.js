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
var EntregablesProfesorComponent = /** @class */ (function () {
    function EntregablesProfesorComponent(route, router, infoGrupo, evaluacionesService) {
        this.route = route;
        this.router = router;
        this.infoGrupo = infoGrupo;
        this.evaluacionesService = evaluacionesService;
        //Variable que almacena el nombre de la evaluación
        this.nombreEvaluacion = '';
        //Variable que almacena el nombre del rubro
        this.nombreRubro = '';
        //Lista de entregables
        this.listaEntregables = [];
    }
    EntregablesProfesorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (urlParams) {
            _this.nombreEvaluacion = urlParams['nombreEvaluacion'];
            _this.nombreRubro = urlParams['nombreRubro'];
        });
        //Se manda a actualizar la lista de entregables
        this.actualizarEntregables();
    };
    EntregablesProfesorComponent.prototype.agregarNuevoArchivo = function (files) {
        //Se carga el archivo desde el elemento HTML
        this.fileToUpload = files.item(0);
    };
    EntregablesProfesorComponent.prototype.cerrar = function () {
        this.router.navigate(['/ProfesorGrupo/Evaluaciones/Ver']);
    };
    EntregablesProfesorComponent.prototype.actualizarEntregables = function () {
        var _this = this;
        //Solicita la lista de entregables correspondiente a una evaluación
        this.evaluacionesService.getEntregables(this.infoGrupo.codigoCurso, this.nombreRubro, this.nombreEvaluacion, this.infoGrupo.numeroGrupo, this.infoGrupo.anio, this.infoGrupo.periodo).subscribe(function (data) {
            //Se limpia la lista de entregables
            _this.listaEntregables = [];
            console.log(data);
            var _loop_1 = function (i) {
                var repetido = false;
                for (var _i = 0, _a = _this.listaEntregables; _i < _a.length; _i++) {
                    var entregable = _a[_i];
                    //verificar si ya existe algún entregable el mismo id del subgrupo
                    if (data[i].idSubGrupo == entregable.idSubGrupo) {
                        repetido = true;
                    }
                }
                //si repetido es false, significa que se debe agregar a la lista
                if (!repetido) {
                    var grupo_1 = data[i].idSubgrupo;
                    var nuevoEntregable_1 = new entregable_1.Entregable(data[i].id, data[i].idSubGrupo, 
                    //Inicialmente vacía
                    []);
                    //Ahora usando el carnet del estudiante, se llena la lista de estudiantes
                    //del entregable
                    _this.evaluacionesService.getSubGrupo(_this.infoGrupo.codigoCurso, _this.nombreRubro, _this.nombreEvaluacion, _this.infoGrupo.numeroGrupo, _this.infoGrupo.anio, _this.infoGrupo.periodo, data[i].carnetEstudiante).subscribe(function (data) {
                        for (var j = 0; j < data.length; j++) {
                            nuevoEntregable_1.estudiantes.push(new estudiante_1.Estudiante(data[i].primerNombre, data[i].primerApellido, data[i].segundoApellido, data[i].carnet, grupo_1));
                        }
                    });
                    //Finalmente se agrega el entregable a la lista de entregables
                    _this.listaEntregables.push(nuevoEntregable_1);
                }
            };
            //Se guardan los entregables sin repetir el id del subgrupo
            //en caso de que la evaluación sea grupal
            for (var i = 0; i < data.length; i++) {
                _loop_1(i);
            }
        });
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
