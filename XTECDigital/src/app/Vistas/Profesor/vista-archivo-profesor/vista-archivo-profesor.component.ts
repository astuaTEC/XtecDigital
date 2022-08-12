import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { Router, ActivatedRoute, ParamMap, } from '@angular/router';
import { DocumentosService } from 'src/app/Vistas/Profesor/ServiciosProfesor/documentos.service';

import WebViewer from '@pdftron/webviewer';
import { Estado } from 'src/app/modelos/estado';

@Component({
  selector: 'app-vista-archivo-profesor',
  templateUrl: './vista-archivo-profesor.component.html',
  styleUrls: ['./vista-archivo-profesor.component.css']
})
export class VistaArchivoProfesorComponent implements AfterViewInit {
  @ViewChild('viewer') viewerRef: ElementRef;

  //El documento que se debe mostrar en pantalla (en Base64)
  documento: any;

  //El nuevo documento si el usuario usa el botón de guardar
  nuevoDocumento: any;

  //El nombre de la carpeta que contiene al documento
  nombreCarpeta: string = '';

  //El nombre del documento PDF
  nombreArchivo: string = '';

  //Nombre temporal del archivo
  //Se usa para pedir el PDF
  nombreArchivoTemporal: string = '';

  //Estado actual de la aplicación
  estadoLocal: Estado;

  constructor(private route: ActivatedRoute, private router: Router, private documentos: DocumentosService) { }

  ngAfterViewInit(): void {
    //Se carga el estado actual de local storage
    this.estadoLocal = JSON.parse(localStorage.getItem('EstadoActual'));

    //Se guarda el número de cédula del profesor
     this.route.params.forEach((urlParams) => {
      this.nombreCarpeta = urlParams['nombreCarpeta'];
      //nombre temporal que se usará para pedir el PDF
      this.nombreArchivoTemporal = '"' + urlParams['nombreArchivo'] + '"';
      this.nombreArchivo = urlParams['nombreArchivo'];

    });
    //solicitar el archivo al servidor
    this.documentos.getArchivo(
      this.estadoLocal.codigoCurso,
      this.nombreCarpeta,
      this.nombreArchivoTemporal,
      this.estadoLocal.numeroGrupo.toString(),
      this.estadoLocal.anio,
      this.estadoLocal.periodo
    ).subscribe(
      data => {
        console.log(data);
       
      },
      error => {
        console.log(error);
        this.documento = 'data:application/pdf;base64,' + error["error"]["text"];
        
        WebViewer({
          path: 'assets/lib',
          initialDoc: this.documento
        }, this.viewerRef.nativeElement).then(instance => {
            instance.setTheme('dark');
            const { docViewer, annotManager, CoreControls } = instance;
            // Add header button that will get file data on click
            instance.setHeaderItems(header => {
              header.push({
                  type: 'actionButton',
                  img: 'https://img.icons8.com/ios/100/000000/save-as.png',
                  onClick: async () => {
                    const doc = docViewer.getDocument();
                    const xfdfString = await annotManager.exportAnnotations();
                    const saveOptions = CoreControls.SaveOptions;
                    const options = {
                      xfdfString,
                      flags: saveOptions.LINEARIZED,
                      downloadType: 'pdf'
                    };
                    const data = await doc.getFileData(options);
                    const arr = new Uint8Array(data);
                    const blob = new Blob([arr], { type: 'application/pdf' });
                    //parsear de Blob a File
                    const nuevoFile = this.blobToFile(blob, 'nuevoArchivo');

                    //Construyendo la fecha en que se está subiendo
                    var date = new Date();
                    var fecha = date.getFullYear() +'-'+(date.getMonth()+1) + '-'+date.getDate();
                    var hora = date.getHours() +':' + date.getMinutes() + ':' + date.getSeconds();
                    var fechaHoraString = fecha + ' ' + hora;


                    //Construir el nuevo archivo en Base64
                    var reader = new FileReader();
                    reader.readAsDataURL(nuevoFile);
                    reader.onload = (completionEvent) => {
                      console.log(completionEvent);
                      this.documentos.archivoB64 = reader.result;
                      //Solicitando la actualización al servidor
                      this.documentos.actualizarArchivo(
                        this.nombreArchivo,
                        this.nombreCarpeta,
                        this.estadoLocal.numeroGrupo,
                        this.estadoLocal.codigoCurso,
                        this.estadoLocal.periodo,
                        this.estadoLocal.anio,
                        Math.round(nuevoFile.size / 1024).toString() + ' KB',
                        fechaHoraString
                      ).subscribe(
                        data => {
                          console.log(data);
                        },
                        error => {
                        console.log(error);
                          if(error.status === 400){ 
                          }
                        });
                    };
                    reader.onerror = (error) => {
                      console.log('Error: ', error);
                    };
                  }
              });

              
            });
          });
      }); 

  }


  public blobToFile = (theBlob: Blob, fileName:string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;
    //Cast to a File() type
    return <File>theBlob;
}


base64(file:File) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    console.log(reader.result);
    this.nuevoDocumento = reader.result;
  };
  reader.onerror = (error) => {
    console.log('Error: ', error);
  };
}
 


}
