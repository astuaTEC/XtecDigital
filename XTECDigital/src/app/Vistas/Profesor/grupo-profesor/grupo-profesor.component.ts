import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2'
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
import { Estado } from 'src/app/modelos/estado';
import { ReportesService } from '../ServiciosProfesor/reportes.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs; 

@Component({
  selector: 'app-grupo-profesor',
  templateUrl: './grupo-profesor.component.html',
  styleUrls: ['./grupo-profesor.component.css']
})
export class GrupoProfesorComponent implements OnInit {

  constructor(private reportesService: ReportesService, private route: ActivatedRoute, private router: Router, private http: HttpClient) { }

  //El nombre del grupo seleccionado
  nombreGrupo: string ;

  //numero de cedula del profesor
  numeroCedula: string ;

  //Nombre del profesor que ha iniciado la sesión
  nombreProfesor: string;

  //Estado actual de la aplicación
  estadoLocal: Estado;

  ngOnInit(): void {
    //Se toman los datos de local storage
    this.estadoLocal = JSON.parse(localStorage.getItem('EstadoActual'));
    console.log(this.estadoLocal);
    //primero se guarda el número de cédula del profesor
    this.route.params.forEach((urlParams) => {
      this.numeroCedula = urlParams['cedulaProfesor'];
      this.nombreProfesor = urlParams['nombreProfesor'];
      this.nombreGrupo = urlParams['nombreGrupo'];
    });
  }
  

  gotoDocumentos(){
    this.router.navigate(['/ProfesorGrupo',this.numeroCedula, this.nombreProfesor, this.nombreGrupo, 'Documentos']);
  }

  gotoRubros(){
    this.router.navigate(['/ProfesorGrupo',this.numeroCedula, this.nombreProfesor, this.nombreGrupo, 'Rubros']);
  }

  gotoEvaluaciones(){
    this.router.navigate(['/ProfesorGrupo',this.numeroCedula, this.nombreProfesor,  this.nombreGrupo, 'Evaluaciones']);
  }

  gotoNoticias(){
    this.router.navigate(['/ProfesorGrupo',this.numeroCedula, this.nombreProfesor,  this.nombreGrupo, 'Noticias']);

  }

  estudiantesTabla(curso){
    let estudiantes = [[{text:'Carnet',bold:true,fontSize:15},{text:'Nombre completo',bold:true,fontSize:15},{text:'Correo electrónico',bold:true,fontSize:15},{text:'Teléfono',bold:true,fontSize:15}]];
    for(var estudiante of curso.estudiantesMatriculados){
     estudiantes.push([{text:estudiante.carnet+"",bold:false,fontSize:12},{text:estudiante.nombre,bold:false,fontSize:12},{text:estudiante.correoElectronico,bold:false,fontSize:12},{text:estudiante.telefono+"",bold:false,fontSize:12}]);
   }
   return estudiantes;
 }

  reporteEstudiantes(){
    console.log("pasa");
    //Creando la lista de estudiantes
    let listaEstudiantes = [];
    this.http.get<any[]>('https://xtecdigitalsql.azurewebsites.net/api/profesor/curso/getReporteEstudiantes?', {
      params: {
        curso: this.estadoLocal.codigoCurso,
        grupo: this.estadoLocal.numeroGrupo.toString(),
        anio: this.estadoLocal.anio,
        periodo: this.estadoLocal.periodo
      }}).subscribe(data => {
        console.log(data);
        //Se meten los nuevos datos
        for(let i = 0; i < data.length; i++){
          listaEstudiantes.push(
          {
            carnet: data[i].carnet,
            nombre: data[i].primerNombre + ' ' + data[i].primerApellido + ' ' + data[i].segundoApellido,
            correoElectronico: data[i].email,
            telefono: data[i].telefono
          });     
       }
      //Primero se construye el modelo de datos
      let curso = 
      {
      codigoCurso: this.estadoLocal.codigoCurso,
      nombreCurso: this.estadoLocal.nombreGrupo,
      grupo: this.estadoLocal.numeroGrupo,
      profesor: this.estadoLocal.nombreProfesor,
      cedula: this.estadoLocal.numeroCedula,
      correoElectronico: localStorage.getItem('mailProfesor'),
      estudiantesMatriculados: listaEstudiantes
     }
      let documentoPDF =
      [
        {text: 'Reporte de Estudiantes',bold: true,fontSize: 28,margin: [0, 0, 0, 10]},
        {text:curso.codigoCurso + " " +curso.nombreCurso,fontSize:22,margin: [0, -5, 0, 10]},
        //{text:"Grupo " +curso.grupo,fontSize:22,margin: [0, -5, 0, 10]},
        //{image: localStorage.getItem('logo'),margin:[290, -120, 0, 10],height: 100,width: 250},
        {text:' '},
        {text:' '},
        {columns: [[{text: 'Profesor: ' + curso.profesor,fontSize:15},{text: 'Cédula: ' + curso.cedula,fontSize:15},{text: 'Correo electrónico: ' + curso.correoElectronico,fontSize:15}]]},
        {text:' '},
        {text:'Estudiantes matriculados:',fontSize: 18,bold: true,margin: [0, 20, 0, 10],decoration: 'underline'},
        {table:{headerRows:1,widths:['auto','*','*','auto'],body:this.estudiantesTabla(curso)}}
      ]

      let informacionPDF = 
      {
        title: "Reporte Estudiantes " + curso.codigoCurso + ", Grupo " +curso.grupo,
      }

      const documentDefinition = { info:informacionPDF,content: documentoPDF };
      //Se le pregunta al usuario si desea descargar o simplemente ver el documento
      Swal.fire({
        title: 'Reporte de estudiantes matriculados',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'abrir',
        denyButtonText: 'descargar',
        confirmButtonColor: '#3085d6',
        denyButtonColor: '#3085d6'
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          pdfMake.createPdf(documentDefinition).open();
        } else if (result.isDenied) {
          pdfMake.createPdf(documentDefinition).download();
        }
      })
      
    })
  }

  notasTabla(grupo){
    let listaEstudiantes = [];
    for(var estudiante of grupo.estudiantesMatriculados){
      listaEstudiantes.push([{text:estudiante.carnet+":",fontSize: 18,bold: true,margin: [0, 20, 0, 10],decoration: 'underline'}]);
      let tabla = {table:{headerRows:1,widths:['*','*','*'],body:[[{text:'Nombre del rubro',bold:true,fontSize:15},{text:'Valor porcentual',bold:true,fontSize:15},{text:'Porcentaje obtenido',bold:true,fontSize:15}]]}};
      let porcentajeObtenidoTotal:number = 0;
      for(var rubro of estudiante.calificaciones){
        tabla.table.body.push([{text: rubro.nombreRubro,bold:false,fontSize:12},{text:rubro.valorPorcentual+"%",bold:false,fontSize:12},{text:rubro.porcentajeObtenido+"%",bold:false,fontSize:12}]);
        porcentajeObtenidoTotal = porcentajeObtenidoTotal + rubro.porcentajeObtenido;
      }
      listaEstudiantes.push(tabla);

      let estado = {text:"",bold:true,fontSize:15,color:""}
      if(porcentajeObtenidoTotal>=70){
        estado.text = "Aprobado";
        estado.color = "green";
      }else{
        estado.text ="Reprobado";
        estado.color = "red";
      }

      listaEstudiantes.push({text:' '});
      let tablaResumen = {table:{headerRows:1,widths:['*','*','*'],body: [[{text:'Porcentaje obtenido ',bold:true,fontSize:15},{text:'Porcentaje mínimo',bold:true,fontSize:15},{text:'Estado',bold:true,fontSize:15}],[{text:(Math.round(porcentajeObtenidoTotal * 100) / 100).toFixed(2)+"%",bold:false,fontSize:12},{text:"70%",bold:false,fontSize:12},estado]]}}
      listaEstudiantes.push(tablaResumen);

    }
    return listaEstudiantes;
  }

  reporteNotas(){
    this.reportesService.getNotasEstudiantes(
      this.estadoLocal.codigoCurso,
      this.estadoLocal.numeroGrupo,
      this.estadoLocal.anio,
      this.estadoLocal.periodo
    ).subscribe(
      data => {
        //Primero se construye la lista estudiantes con sus calificaciones
        let listaEstudiantes = [];
        
        let carnetAnterior: string = '';
        for(let i = 0; i < data.length; i++){
          //Se verifica si el carnet en el índice i es distinto al anterior
          if(data[i].carnetEstudiante != carnetAnterior){
            //Se cambia al nuevo valor
            carnetAnterior = data[i].carnetEstudiante;
            //Se agrega un nuevo estudiante a la lista
            listaEstudiantes.push(
              {
                carnet: data[i].carnetEstudiante,
                calificaciones: [
                  {
                    nombreRubro: data[i].nombreRubro,
                    valorPorcentual: data[i].porcentaje,
                    porcentajeObtenido: data[i].porcentajeObtenido
                  }
                ]
              }) 
          }

          else{
            //Recorrer la lista de estudiantes para encontrar el estudiante del índice i
            for(let estudiante of listaEstudiantes){
              //Se localiza el estudiante en la lista
              if(data[i].carnetEstudiante == estudiante.carnet){
                //Se le agrega un nuevo rubro con su información
                estudiante.calificaciones.push(
                  {
                    nombreRubro: data[i].nombreRubro,
                    valorPorcentual: data[i].porcentaje,
                    porcentajeObtenido: data[i].porcentajeObtenido
                  });
              }
            } 
          }
        }
        //Ahora se construye el cuerpo de la información
        let grupo =
        {
          codigoCurso: this.estadoLocal.codigoCurso,
          nombreCurso: this.estadoLocal.nombreGrupo,
          grupo: this.estadoLocal.numeroGrupo,
          profesor: this.estadoLocal.nombreProfesor,
          cedula: this.estadoLocal.numeroCedula,
          correoElectronico: localStorage.getItem('mailProfesor'),
          estudiantesMatriculados: listaEstudiantes
        }
        let documentoPDF = 
        [
          {text: 'Reporte de Notas',bold: true,fontSize: 30,margin: [0, 0, 0, 10]},
          {text:this.estadoLocal.codigoCurso + " " +this.estadoLocal.nombreGrupo,fontSize:22,margin: [0, -5, 0, 10]},
          //{image: localStorage.getItem('logo'),margin:[290, -90, 0, 10],height: 100,width: 250},
          {columns: [[{text: 'Profesor: ' + this.estadoLocal.nombreProfesor,fontSize:15},{text: 'Cédula: ' + this.estadoLocal.numeroCedula,fontSize:15},{text: 'Correo electrónico: ' + localStorage.getItem('mailProfesor'),fontSize:15}]]},
          {text:' '},
          this.notasTabla(grupo),
          
        ]
    
        let informacionPDF = 
        {
          title: "Reporte de Notas " + this.estadoLocal.codigoCurso + this.estadoLocal.nombreGrupo
        }
    
        const documentDefinition = { info:informacionPDF,content: documentoPDF };
              //Se le pregunta al usuario si desea descargar o simplemente ver el documento
        Swal.fire({
          title: 'Reporte de notas',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'abrir',
          denyButtonText: 'descargar',
          confirmButtonColor: '#3085d6',
          denyButtonColor: '#3085d6'
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            pdfMake.createPdf(documentDefinition).open();
          } else if (result.isDenied) {
            pdfMake.createPdf(documentDefinition).download();
          }
        })

      },
      error => {
        console.log(error);
      }
    )
  }

  gotoHome(){
    this.router.navigate(['/ProfesorHome', this.numeroCedula, this.nombreProfesor]);
  }

  cerrarSesion(){
    Swal.fire({
      title: 'Cerrar Sesión',
      text: "¿Seguro que deseas cerrar la sesión?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        //Ahora se limpian los datos de local storage
        localStorage.clear();
        this.router.navigate(['/ProfesorLogin']);
      }
    })
  }

}
