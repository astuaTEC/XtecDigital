"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.VistaArchivoProfesorComponent = void 0;
var core_1 = require("@angular/core");
var webviewer_1 = require("@pdftron/webviewer");
var VistaArchivoProfesorComponent = /** @class */ (function () {
    function VistaArchivoProfesorComponent(route, router, documentos) {
        this.route = route;
        this.router = router;
        this.documentos = documentos;
        //El nombre de la carpeta que contiene al documento
        this.nombreCarpeta = '';
        //El nombre del documento PDF
        this.nombreArchivo = '';
        //Nombre temporal del archivo
        //Se usa para pedir el PDF
        this.nombreArchivoTemporal = '';
        this.blobToFile = function (theBlob, fileName) {
            var b = theBlob;
            //A Blob() is almost a File() - it's just missing the two properties below which we will add
            b.lastModifiedDate = new Date();
            b.name = fileName;
            //Cast to a File() type
            return theBlob;
        };
    }
    VistaArchivoProfesorComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        //Se carga el estado actual de local storage
        this.estadoLocal = JSON.parse(localStorage.getItem('EstadoActual'));
        //Se guarda el número de cédula del profesor
        this.route.params.forEach(function (urlParams) {
            _this.nombreCarpeta = urlParams['nombreCarpeta'];
            //nombre temporal que se usará para pedir el PDF
            _this.nombreArchivoTemporal = '"' + urlParams['nombreArchivo'] + '"';
            _this.nombreArchivo = urlParams['nombreArchivo'];
        });
        //solicitar el archivo al servidor
        this.documentos.getArchivo(this.estadoLocal.codigoCurso, this.nombreCarpeta, this.nombreArchivoTemporal, this.estadoLocal.numeroGrupo.toString(), this.estadoLocal.anio, this.estadoLocal.periodo).subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
            _this.documento = 'data:application/pdf;base64,' + error["error"]["text"];
            webviewer_1["default"]({
                path: 'assets/lib',
                initialDoc: _this.documento
            }, _this.viewerRef.nativeElement).then(function (instance) {
                instance.setTheme('dark');
                var docViewer = instance.docViewer, annotManager = instance.annotManager, CoreControls = instance.CoreControls;
                // Add header button that will get file data on click
                instance.setHeaderItems(function (header) {
                    header.push({
                        type: 'actionButton',
                        img: 'https://img.icons8.com/ios/100/000000/save-as.png',
                        onClick: function () { return __awaiter(_this, void 0, void 0, function () {
                            var doc, xfdfString, saveOptions, options, data, arr, blob, nuevoFile, date, fecha, hora, fechaHoraString, reader;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        doc = docViewer.getDocument();
                                        return [4 /*yield*/, annotManager.exportAnnotations()];
                                    case 1:
                                        xfdfString = _a.sent();
                                        saveOptions = CoreControls.SaveOptions;
                                        options = {
                                            xfdfString: xfdfString,
                                            flags: saveOptions.LINEARIZED,
                                            downloadType: 'pdf'
                                        };
                                        return [4 /*yield*/, doc.getFileData(options)];
                                    case 2:
                                        data = _a.sent();
                                        arr = new Uint8Array(data);
                                        blob = new Blob([arr], { type: 'application/pdf' });
                                        nuevoFile = this.blobToFile(blob, 'nuevoArchivo');
                                        date = new Date();
                                        fecha = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
                                        hora = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
                                        fechaHoraString = fecha + ' ' + hora;
                                        reader = new FileReader();
                                        reader.readAsDataURL(nuevoFile);
                                        reader.onload = function (completionEvent) {
                                            console.log(completionEvent);
                                            _this.documentos.archivoB64 = reader.result;
                                            //Solicitando la actualización al servidor
                                            _this.documentos.actualizarArchivo(_this.nombreArchivo, _this.nombreCarpeta, _this.estadoLocal.numeroGrupo, _this.estadoLocal.codigoCurso, _this.estadoLocal.periodo, _this.estadoLocal.anio, Math.round(nuevoFile.size / 1024).toString() + ' KB', fechaHoraString).subscribe(function (data) {
                                                console.log(data);
                                            }, function (error) {
                                                console.log(error);
                                                if (error.status === 400) {
                                                }
                                            });
                                        };
                                        reader.onerror = function (error) {
                                            console.log('Error: ', error);
                                        };
                                        return [2 /*return*/];
                                }
                            });
                        }); }
                    });
                });
            });
        });
    };
    VistaArchivoProfesorComponent.prototype.base64 = function (file) {
        var _this = this;
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            console.log(reader.result);
            _this.nuevoDocumento = reader.result;
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    };
    __decorate([
        core_1.ViewChild('viewer')
    ], VistaArchivoProfesorComponent.prototype, "viewerRef");
    VistaArchivoProfesorComponent = __decorate([
        core_1.Component({
            selector: 'app-vista-archivo-profesor',
            templateUrl: './vista-archivo-profesor.component.html',
            styleUrls: ['./vista-archivo-profesor.component.css']
        })
    ], VistaArchivoProfesorComponent);
    return VistaArchivoProfesorComponent;
}());
exports.VistaArchivoProfesorComponent = VistaArchivoProfesorComponent;
