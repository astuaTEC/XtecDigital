"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var login_profesor_component_1 = require("./Vistas/Profesor/login-profesor/login-profesor.component");
var home_profesor_component_1 = require("./Vistas/Profesor/home-profesor/home-profesor.component");
var grupo_profesor_component_1 = require("./Vistas/Profesor/grupo-profesor/grupo-profesor.component");
var documentos_profesor_component_1 = require("./Vistas/Profesor/documentos-profesor/documentos-profesor.component");
var archivos_profesor_component_1 = require("./Vistas/Profesor/archivos-profesor/archivos-profesor.component");
var vista_archivo_profesor_component_1 = require("./Vistas/Profesor/vista-archivo-profesor/vista-archivo-profesor.component");
var rubros_profesor_component_1 = require("./Vistas/Profesor/rubros-profesor/rubros-profesor.component");
var evaluaciones_profesor_component_1 = require("./Vistas/Profesor/evaluaciones-profesor/evaluaciones-profesor.component");
var agregar_evaluacion_profesor_component_1 = require("./Vistas/Profesor/agregar-evaluacion-profesor/agregar-evaluacion-profesor.component");
var entregables_profesor_component_1 = require("./Vistas/Profesor/entregables-profesor/entregables-profesor.component");
var crear_noticia_profesor_component_1 = require("./Vistas/Profesor/crear-noticia-profesor/crear-noticia-profesor.component");
var noticias_profesor_component_1 = require("./Vistas/Profesor/noticias-profesor/noticias-profesor.component");
var ver_evaluaciones_component_1 = require("./Vistas/Profesor/ver-evaluaciones/ver-evaluaciones.component");
var log_in_component_1 = require("./Vistas/Administrador/log-in/log-in.component");
var administrador_component_1 = require("./Vistas/Administrador/administrador.component");
var routes = [
    //RUTA INICIAL
    {
        path: '', redirectTo: 'AdministradorLogin',
        pathMatch: 'full'
    },
    { path: 'ProfesorLogin',
        component: login_profesor_component_1.LoginProfesorComponent
    },
    {
        path: 'ProfesorHome/:cedulaProfesor/:nombreProfesor',
        component: home_profesor_component_1.HomeProfesorComponent
    },
    {
        path: 'ProfesorGrupo/:cedulaProfesor/:nombreProfesor/:nombreGrupo',
        component: grupo_profesor_component_1.GrupoProfesorComponent,
        children: [
            { path: 'Documentos', component: documentos_profesor_component_1.DocumentosProfesorComponent },
            { path: 'Documentos/:nombreCarpeta', component: archivos_profesor_component_1.ArchivosProfesorComponent },
            { path: 'Documentos/:nombreCarpeta/:nombreArchivo', component: vista_archivo_profesor_component_1.VistaArchivoProfesorComponent },
            { path: 'Rubros', component: rubros_profesor_component_1.RubrosProfesorComponent },
            { path: 'Evaluaciones', component: evaluaciones_profesor_component_1.EvaluacionesProfesorComponent },
            { path: 'Evaluaciones/:nombreRubro/:porcentajeRubro', component: ver_evaluaciones_component_1.VerEvaluacionesComponent },
            { path: 'NuevaEvaluacion/:nombreRubro/:porcentajeRubro', component: agregar_evaluacion_profesor_component_1.AgregarEvaluacionProfesorComponent },
            { path: 'Entregables/:nombreEvaluacion/:nombreRubro/:porcentajeRubro', component: entregables_profesor_component_1.EntregablesProfesorComponent },
            { path: 'NuevaNoticia/:Opcion', component: crear_noticia_profesor_component_1.CrearNoticiaProfesorComponent },
            { path: 'Noticias', component: noticias_profesor_component_1.NoticiasProfesorComponent },
        ]
    },
    {
        path: 'AdministradorLogin',
        component: log_in_component_1.LogInComponent
    },
    {
        path: 'Administrador',
        component: administrador_component_1.AdministradorComponent
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
