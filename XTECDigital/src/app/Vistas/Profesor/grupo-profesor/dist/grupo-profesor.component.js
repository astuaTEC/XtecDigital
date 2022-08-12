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
var sweetalert2_1 = require("sweetalert2");
var pdfmake_1 = require("pdfmake/build/pdfmake");
var vfs_fonts_1 = require("pdfmake/build/vfs_fonts");
pdfmake_1["default"].vfs = vfs_fonts_1["default"].pdfMake.vfs;
var GrupoProfesorComponent = /** @class */ (function () {
    function GrupoProfesorComponent(reportesService, route, router, http) {
        this.reportesService = reportesService;
        this.route = route;
        this.router = router;
        this.http = http;
    }
    GrupoProfesorComponent.prototype.ngOnInit = function () {
        var _this = this;
        //Se toman los datos de local storage
        this.estadoLocal = JSON.parse(localStorage.getItem('EstadoActual'));
        console.log(this.estadoLocal);
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
    GrupoProfesorComponent.prototype.estudiantesTabla = function (curso) {
        var estudiantes = [[{ text: 'Carnet', bold: true, fontSize: 15 }, { text: 'Nombre completo', bold: true, fontSize: 15 }, { text: 'Correo electrónico', bold: true, fontSize: 15 }, { text: 'Teléfono', bold: true, fontSize: 15 }]];
        for (var _i = 0, _a = curso.estudiantesMatriculados; _i < _a.length; _i++) {
            var estudiante = _a[_i];
            estudiantes.push([{ text: estudiante.carnet + "", bold: false, fontSize: 12 }, { text: estudiante.nombre, bold: false, fontSize: 12 }, { text: estudiante.correoElectronico, bold: false, fontSize: 12 }, { text: estudiante.telefono + "", bold: false, fontSize: 12 }]);
        }
        return estudiantes;
    };
    GrupoProfesorComponent.prototype.reporteEstudiantes = function () {
        var _this = this;
        console.log("pasa");
        //Creando la lista de estudiantes
        var listaEstudiantes = [];
        this.http.get('https://xtecdigitalsql.azurewebsites.net/api/profesor/curso/getReporteEstudiantes?', {
            params: {
                curso: this.estadoLocal.codigoCurso,
                grupo: this.estadoLocal.numeroGrupo.toString(),
                anio: this.estadoLocal.anio,
                periodo: this.estadoLocal.periodo
            }
        }).subscribe(function (data) {
            console.log(data);
            //Se meten los nuevos datos
            for (var i = 0; i < data.length; i++) {
                listaEstudiantes.push({
                    carnet: data[i].carnet,
                    nombre: data[i].primerNombre + ' ' + data[i].primerApellido + ' ' + data[i].segundoApellido,
                    correoElectronico: data[i].email,
                    telefono: data[i].telefono
                });
            }
            //Primero se construye el modelo de datos
            var curso = {
                codigoCurso: _this.estadoLocal.codigoCurso,
                nombreCurso: _this.estadoLocal.nombreGrupo,
                grupo: _this.estadoLocal.numeroGrupo,
                profesor: _this.estadoLocal.nombreProfesor,
                cedula: _this.estadoLocal.numeroCedula,
                correoElectronico: localStorage.getItem('mailProfesor'),
                estudiantesMatriculados: listaEstudiantes
            };
            var documentoPDF = [
                { text: 'Reporte de Estudiantes', bold: true, fontSize: 28, margin: [0, 0, 0, 10] },
                { text: curso.codigoCurso + " " + curso.nombreCurso, fontSize: 22, margin: [0, -5, 0, 10] },
                //{text:"Grupo " +curso.grupo,fontSize:22,margin: [0, -5, 0, 10]},
                //{image: localStorage.getItem('logo'),margin:[290, -120, 0, 10],height: 100,width: 250},
                { text: ' ' },
                { text: ' ' },
                { columns: [[{ text: 'Profesor: ' + curso.profesor, fontSize: 15 }, { text: 'Cédula: ' + curso.cedula, fontSize: 15 }, { text: 'Correo electrónico: ' + curso.correoElectronico, fontSize: 15 }]] },
                { text: ' ' },
                { text: 'Estudiantes matriculados:', fontSize: 18, bold: true, margin: [0, 20, 0, 10], decoration: 'underline' },
                { table: { headerRows: 1, widths: ['auto', '*', '*', 'auto'], body: _this.estudiantesTabla(curso) } }
            ];
            var informacionPDF = {
                title: "Reporte Estudiantes " + curso.codigoCurso + ", Grupo " + curso.grupo
            };
            var documentDefinition = { info: informacionPDF, content: documentoPDF };
            //Se le pregunta al usuario si desea descargar o simplemente ver el documento
            sweetalert2_1["default"].fire({
                title: 'Reporte de estudiantes matriculados',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'abrir',
                denyButtonText: 'descargar',
                confirmButtonColor: '#3085d6',
                denyButtonColor: '#3085d6'
            }).then(function (result) {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    pdfmake_1["default"].createPdf(documentDefinition).open();
                }
                else if (result.isDenied) {
                    pdfmake_1["default"].createPdf(documentDefinition).download();
                }
            });
        });
    };
    GrupoProfesorComponent.prototype.notasTabla = function (grupo) {
        var listaEstudiantes = [];
        for (var _i = 0, _a = grupo.estudiantesMatriculados; _i < _a.length; _i++) {
            var estudiante = _a[_i];
            listaEstudiantes.push([{ text: estudiante.carnet + ":", fontSize: 18, bold: true, margin: [0, 20, 0, 10], decoration: 'underline' }]);
            var tabla = { table: { headerRows: 1, widths: ['*', '*', '*'], body: [[{ text: 'Nombre del rubro', bold: true, fontSize: 15 }, { text: 'Valor porcentual', bold: true, fontSize: 15 }, { text: 'Porcentaje obtenido', bold: true, fontSize: 15 }]] } };
            var porcentajeObtenidoTotal = 0;
            for (var _b = 0, _c = estudiante.calificaciones; _b < _c.length; _b++) {
                var rubro = _c[_b];
                tabla.table.body.push([{ text: rubro.nombreRubro, bold: false, fontSize: 12 }, { text: rubro.valorPorcentual + "%", bold: false, fontSize: 12 }, { text: rubro.porcentajeObtenido + "%", bold: false, fontSize: 12 }]);
                porcentajeObtenidoTotal = porcentajeObtenidoTotal + rubro.porcentajeObtenido;
            }
            listaEstudiantes.push(tabla);
            var estado = { text: "", bold: true, fontSize: 15, color: "" };
            if (porcentajeObtenidoTotal >= 70) {
                estado.text = "Aprobado";
                estado.color = "green";
            }
            else {
                estado.text = "Reprobado";
                estado.color = "red";
            }
            listaEstudiantes.push({ text: ' ' });
            var tablaResumen = { table: { headerRows: 1, widths: ['*', '*', '*'], body: [[{ text: 'Porcentaje obtenido ', bold: true, fontSize: 15 }, { text: 'Porcentaje mínimo', bold: true, fontSize: 15 }, { text: 'Estado', bold: true, fontSize: 15 }], [{ text: (Math.round(porcentajeObtenidoTotal * 100) / 100).toFixed(2) + "%", bold: false, fontSize: 12 }, { text: "70%", bold: false, fontSize: 12 }, estado]] } };
            listaEstudiantes.push(tablaResumen);
        }
        return listaEstudiantes;
    };
    GrupoProfesorComponent.prototype.reporteNotas = function () {
        var _this = this;
        this.reportesService.getNotasEstudiantes(this.estadoLocal.codigoCurso, this.estadoLocal.numeroGrupo, this.estadoLocal.anio, this.estadoLocal.periodo).subscribe(function (data) {
            //Primero se construye la lista estudiantes con sus calificaciones
            var listaEstudiantes = [];
            var carnetAnterior = '';
            for (var i = 0; i < data.length; i++) {
                //Se verifica si el carnet en el índice i es distinto al anterior
                if (data[i].carnetEstudiante != carnetAnterior) {
                    //Se cambia al nuevo valor
                    carnetAnterior = data[i].carnetEstudiante;
                    //Se agrega un nuevo estudiante a la lista
                    listaEstudiantes.push({
                        carnet: data[i].carnetEstudiante,
                        calificaciones: [
                            {
                                nombreRubro: data[i].nombreRubro,
                                valorPorcentual: data[i].porcentaje,
                                porcentajeObtenido: data[i].porcentajeObtenido
                            }
                        ]
                    });
                }
                else {
                    //Recorrer la lista de estudiantes para encontrar el estudiante del índice i
                    for (var _i = 0, listaEstudiantes_1 = listaEstudiantes; _i < listaEstudiantes_1.length; _i++) {
                        var estudiante = listaEstudiantes_1[_i];
                        //Se localiza el estudiante en la lista
                        if (data[i].carnetEstudiante == estudiante.carnet) {
                            //Se le agrega un nuevo rubro con su información
                            estudiante.calificaciones.push({
                                nombreRubro: data[i].nombreRubro,
                                valorPorcentual: data[i].porcentaje,
                                porcentajeObtenido: data[i].porcentajeObtenido
                            });
                        }
                    }
                }
            }
            //Ahora se construye el cuerpo de la información
            var grupo = {
                codigoCurso: _this.estadoLocal.codigoCurso,
                nombreCurso: _this.estadoLocal.nombreGrupo,
                grupo: _this.estadoLocal.numeroGrupo,
                profesor: _this.estadoLocal.nombreProfesor,
                cedula: _this.estadoLocal.numeroCedula,
                correoElectronico: localStorage.getItem('mailProfesor'),
                estudiantesMatriculados: listaEstudiantes
            };
            var documentoPDF = [
                { text: 'Reporte de Notas', bold: true, fontSize: 30, margin: [0, 0, 0, 10] },
                { text: _this.estadoLocal.codigoCurso + " " + _this.estadoLocal.nombreGrupo, fontSize: 22, margin: [0, -5, 0, 10] },
                //{image: localStorage.getItem('logo'),margin:[290, -90, 0, 10],height: 100,width: 250},
                { columns: [[{ text: 'Profesor: ' + _this.estadoLocal.nombreProfesor, fontSize: 15 }, { text: 'Cédula: ' + _this.estadoLocal.numeroCedula, fontSize: 15 }, { text: 'Correo electrónico: ' + localStorage.getItem('mailProfesor'), fontSize: 15 }]] },
                { text: ' ' },
                _this.notasTabla(grupo),
            ];
            var informacionPDF = {
                title: "Reporte de Notas " + _this.estadoLocal.codigoCurso + _this.estadoLocal.nombreGrupo
            };
            var documentDefinition = { info: informacionPDF, content: documentoPDF };
            //Se le pregunta al usuario si desea descargar o simplemente ver el documento
            sweetalert2_1["default"].fire({
                title: 'Reporte de notas',
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: 'abrir',
                denyButtonText: 'descargar',
                confirmButtonColor: '#3085d6',
                denyButtonColor: '#3085d6'
            }).then(function (result) {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    pdfmake_1["default"].createPdf(documentDefinition).open();
                }
                else if (result.isDenied) {
                    pdfmake_1["default"].createPdf(documentDefinition).download();
                }
            });
        }, function (error) {
            console.log(error);
        });
    };
    GrupoProfesorComponent.prototype.gotoHome = function () {
        this.router.navigate(['/ProfesorHome', this.numeroCedula, this.nombreProfesor]);
    };
    GrupoProfesorComponent.prototype.cerrarSesion = function () {
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
