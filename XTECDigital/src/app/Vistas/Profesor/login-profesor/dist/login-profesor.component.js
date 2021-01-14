"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginProfesorComponent = void 0;
var core_1 = require("@angular/core");
var usuario_profesor_1 = require("src/app/Vistas/Profesor/ModelosProfesor/usuario-profesor");
var sweetalert2_1 = require("sweetalert2");
var LoginProfesorComponent = /** @class */ (function () {
    function LoginProfesorComponent(route, router, profesorInfoService) {
        this.route = route;
        this.router = router;
        this.profesorInfoService = profesorInfoService;
        //Información de usuario del profesor
        this.usuarioProfesor = new usuario_profesor_1.UsuarioProfesor('', '');
    }
    LoginProfesorComponent.prototype.ngOnInit = function () {
    };
    LoginProfesorComponent.prototype.gotoHome = function () {
        var _this = this;
        this.profesorInfoService.iniciarSesion(this.usuarioProfesor)
            .subscribe(function (data) {
            console.log(data);
            //Se guarda el mail del profesor en local storage
            localStorage.setItem('mailProfesor', data['email']);
            //Se configuran los datos del profesor que inicia sesión
            _this.router.navigate(['/ProfesorHome', _this.usuarioProfesor.usuario, data['primerNombre'] + ' ' + data['primerApellido'] + ' ' + data['segundoApellido']]);
            _this.usuarioProfesor = new usuario_profesor_1.UsuarioProfesor('', '');
        }, function (error) {
            console.log(error);
            if (error.status === 400) {
                _this.usuarioProfesor = new usuario_profesor_1.UsuarioProfesor('', '');
                sweetalert2_1["default"].fire({
                    icon: 'error',
                    title: 'El usuario o la contraseña son incorrectos',
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        });
    };
    LoginProfesorComponent = __decorate([
        core_1.Component({
            selector: 'app-login-profesor',
            templateUrl: './login-profesor.component.html',
            styleUrls: ['./login-profesor.component.css']
        })
    ], LoginProfesorComponent);
    return LoginProfesorComponent;
}());
exports.LoginProfesorComponent = LoginProfesorComponent;
