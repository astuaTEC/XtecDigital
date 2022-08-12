"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HomeProfesorComponent = void 0;
var core_1 = require("@angular/core");
var anio_contenedor_1 = require("../ModelosProfesor/anio-contenedor");
var grupo_1 = require("../ModelosProfesor/grupo");
var estado_1 = require("src/app/modelos/estado");
var estudiante_1 = require("../ModelosProfesor/estudiante");
var sweetalert2_1 = require("sweetalert2");
var HomeProfesorComponent = /** @class */ (function () {
    function HomeProfesorComponent(http, route, router, profesorInfoService) {
        this.http = http;
        this.route = route;
        this.router = router;
        this.profesorInfoService = profesorInfoService;
        //Lista de los periodos asociados al profesor
        this.listaPeriodos = [];
    }
    HomeProfesorComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.forEach(function (urlParams) {
            _this.cedulaProfesor = urlParams['cedulaProfesor'];
            _this.nombreProfesor = urlParams['nombreProfesor'];
        });
        //luego se solicitan los cursos
        this.getProfesorGrupos(this.cedulaProfesor);
    };
    HomeProfesorComponent.prototype.getProfesorGrupos = function (cedulaProfesor) {
        var _this = this;
        //La cédula debe ir con comillas
        var cedula = "'" + cedulaProfesor + "'";
        this.profesorInfoService.misCursos(cedula)
            .subscribe(function (data) {
            console.log(data);
            //primero se deben crear los periodos
            for (var i = 0; i < data.length; i++) {
                var nuevoPeriodo = new anio_contenedor_1.AnioContenedor(data[i].anio, data[i].periodo, []);
                //revisando si ya existe este periodo
                var repetido = false;
                for (var j = 0; j < _this.listaPeriodos.length; j++) {
                    if (nuevoPeriodo.anio == _this.listaPeriodos[j].anio && nuevoPeriodo.periodo == _this.listaPeriodos[j].periodo) {
                        repetido = true;
                    }
                }
                //validando si se debe agregar o no
                if (!repetido) {
                    _this.listaPeriodos.push(nuevoPeriodo);
                }
            }
            //Ahora se agregan los grupos a sus respectivos periodos
            for (var i = 0; i < data.length; i++) {
                var nuevoGrupo = new grupo_1.Grupo(data[i].codigoCurso, data[i].nombre, data[i].numeroGrupo);
                //se localiza su periodo para agregarlo
                for (var j = 0; j < _this.listaPeriodos.length; j++) {
                    if (data[i].anio == _this.listaPeriodos[j].anio && data[i].periodo == _this.listaPeriodos[j].periodo) {
                        _this.listaPeriodos[j].grupos.push(nuevoGrupo);
                    }
                }
            }
        });
    };
    HomeProfesorComponent.prototype.gotoInicioSesion = function () {
        var _this = this;
        sweetalert2_1["default"].fire({
            title: 'Cerrar Sesión',
            text: "¿Seguro que deseas cerrar la sesión?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar'
        }).then(function (result) {
            if (result.isConfirmed) {
                //Ahora se limpian los datos de local storage
                localStorage.clear();
                _this.router.navigate(['/ProfesorLogin']);
            }
        });
    };
    HomeProfesorComponent.prototype.gotoGrupo = function (grupo, periodo) {
        var _this = this;
        //Configurando el estado con la información del grupo seleccionado
        var listaEstudiantes = [];
        this.http.get('https://xtecdigitalsql.azurewebsites.net/api/profesor/curso/getReporteEstudiantes?', {
            params: {
                curso: '"' + grupo.codigoCurso + '"',
                grupo: grupo.numeroGrupo.toString(),
                anio: periodo.anio,
                periodo: periodo.periodo
            }
        }).subscribe(function (data) {
            console.log(data);
            //Se meten los nuevos datos
            for (var i = 0; i < data.length; i++) {
                listaEstudiantes.push(new estudiante_1.Estudiante(data[i].primerNombre, data[i].primerApellido, data[i].segundoApellido, data[i].carnet, 0));
                _this.estadoLocal = new estado_1.Estado(grupo.codigoCurso, grupo.nombre, grupo.numeroGrupo, periodo.anio, periodo.periodo, _this.cedulaProfesor, listaEstudiantes, _this.nombreProfesor);
                //Almacenando el local storage
                localStorage.setItem('EstadoActual', JSON.stringify(_this.estadoLocal));
                _this.router.navigate(['/ProfesorGrupo', _this.cedulaProfesor, _this.nombreProfesor, grupo.nombre, 'Documentos']);
            }
        });
    };
    HomeProfesorComponent = __decorate([
        core_1.Component({
            selector: 'app-home-profesor',
            templateUrl: './home-profesor.component.html',
            styleUrls: ['./home-profesor.component.css']
        })
    ], HomeProfesorComponent);
    return HomeProfesorComponent;
}());
exports.HomeProfesorComponent = HomeProfesorComponent;
