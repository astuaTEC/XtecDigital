"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GrupoProfesorComponent = void 0;
var core_1 = require("@angular/core");
var GrupoProfesorComponent = /** @class */ (function () {
    function GrupoProfesorComponent(route, router) {
        this.route = route;
        this.router = router;
    }
    GrupoProfesorComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log(this.route.params);
        //primero se guarda el número de cédula del profesor
        this.route.params.forEach(function (urlParams) {
            _this.numeroCedula = urlParams['cedulaProfesor'];
            _this.nombreProfesor = urlParams['nombreProfesor'];
            _this.nombreGrupo = urlParams['nombreGrupo'];
        });
    };
    GrupoProfesorComponent.prototype.gotoDocumentos = function () {
        this.router.navigate(['/ProfesorGrupo', this.numeroCedula, this.nombreProfesor, this.nombreGrupo, 'Documentos']);
    };
    GrupoProfesorComponent.prototype.gotoRubros = function () {
        this.router.navigate(['/ProfesorGrupo', this.numeroCedula, this.nombreProfesor, this.nombreGrupo, 'Rubros']);
    };
    GrupoProfesorComponent.prototype.gotoEvaluaciones = function () {
        this.router.navigate(['/ProfesorGrupo', this.numeroCedula, this.nombreProfesor, this.nombreGrupo, 'Evaluaciones']);
    };
    GrupoProfesorComponent.prototype.gotoNoticias = function () {
        this.router.navigate(['/ProfesorGrupo', this.numeroCedula, this.nombreProfesor, this.nombreGrupo, 'Noticias']);
    };
    GrupoProfesorComponent.prototype.gotoHome = function () {
        this.router.navigate(['/ProfesorHome', this.numeroCedula, this.nombreProfesor]);
    };
    GrupoProfesorComponent = __decorate([
        core_1.Component({
            selector: 'app-grupo-profesor',
            templateUrl: './grupo-profesor.component.html',
            styleUrls: ['./grupo-profesor.component.css']
        })
    ], GrupoProfesorComponent);
    return GrupoProfesorComponent;
}());
exports.GrupoProfesorComponent = GrupoProfesorComponent;
