import { Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import { ArchivosProfesorService } from 'src/app/Vistas/Profesor/ServiciosProfesor/archivos-profesor.service';
import { Router, ActivatedRoute, ParamMap, } from '@angular/router';
import WebViewer from '@pdftron/webviewer';

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

  constructor(private route: ActivatedRoute, private router: Router, private archivosService: ArchivosProfesorService) { }

  ngAfterViewInit(): void {
    this.documento = this.archivosService.b64;
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
                //Construir el nuevo archivo en Base64
                this.base64(nuevoFile);
              }
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
