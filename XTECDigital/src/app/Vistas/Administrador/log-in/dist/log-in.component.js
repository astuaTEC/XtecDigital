"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LogInComponent = void 0;
var core_1 = require("@angular/core");
var log_in_1 = require("src/app/modelos/administrador/log-in");
var LogInComponent = /** @class */ (function () {
    function LogInComponent(router, _logInService) {
        this.router = router;
        this._logInService = _logInService;
        this.invalid = false;
        this.user = new log_in_1.LogIn();
    }
    LogInComponent.prototype.ngOnInit = function () {
    };
    LogInComponent.prototype.ingresar = function (usuario, contrasena) {
        var _this = this;
        this.user.usuario = usuario;
        this.user.password = contrasena;
        this._logInService.setUsuario(usuario);
        console.log(this.user);
        this._logInService.login(this.user).
            subscribe(function (data) {
            _this.invalid = false;
            _this.router.navigate(['/organizador']);
        }, function (error) {
            console.log(error);
            if (error.status === 400) {
                _this.user.usuario = null;
                _this.user.password = "";
                _this.invalid = true;
            }
            else {
                _this.invalid = false;
                _this.router.navigate(['/Administrador']);
            }
        });
    };
    LogInComponent = __decorate([
        core_1.Component({
            selector: 'app-log-in',
            templateUrl: './log-in.component.html',
            styleUrls: ['./log-in.component.css']
        })
    ], LogInComponent);
    return LogInComponent;
}());
exports.LogInComponent = LogInComponent;
