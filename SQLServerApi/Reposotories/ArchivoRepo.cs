using Microsoft.EntityFrameworkCore;
using SQLServerApi.Models;
using SQLServerApi.Models.DTO;
using SQLServerApi.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SQLServerApi.Reposotories
{
    public class ArchivoRepo
    {
        private readonly XtecDigitalDBContext _context;

        // Inject the Data Base Context
        public ArchivoRepo(XtecDigitalDBContext context)
        {
            _context = context;
        }

        /**
        * ------------------------------
        *         MÉTODOS CRUD
        * ------------------------------
        */

        public void Create(ArchivoReadDTO archivoDTO)
        {
            if (archivoDTO == null)
                throw new ArgumentNullException(nameof(archivoDTO));

            var archivo = new Archivo
            {
                Nombre = archivoDTO.Nombre,
                NombreCarpeta = archivoDTO.NombreCarpeta,
                NumeroGrupo = archivoDTO.NumeroGrupo,
                CodigoCurso = archivoDTO.CodigoCurso,
                Periodo = archivoDTO.Periodo,
                Anio = archivoDTO.Anio,
                Tamanio = archivoDTO.Tamanio,
                Fecha = archivoDTO.Fecha
            };

            // si viene un recibo en base64 hay que parsearlo a byte array
            if (archivoDTO.Archivo != null)
                archivo.Archivo1 = Convert.FromBase64String(archivoDTO.Archivo);

            _context.Archivos.Add(archivo);
        }

        public void Update(ArchivoReadDTO archivoDTO)
        {
            if (archivoDTO == null)
                throw new ArgumentNullException(nameof(archivoDTO));

            var archivo = new Archivo
            {
                Nombre = archivoDTO.Nombre,
                NombreCarpeta = archivoDTO.NombreCarpeta,
                NumeroGrupo = archivoDTO.NumeroGrupo,
                CodigoCurso = archivoDTO.CodigoCurso,
                Periodo = archivoDTO.Periodo,
                Anio = archivoDTO.Anio,
                Tamanio = archivoDTO.Tamanio,
                Fecha = archivoDTO.Fecha
            };

            // si viene un recibo en base64 hay que parsearlo a byte array
            if (archivoDTO.Archivo != null)
                archivo.Archivo1 = Convert.FromBase64String(archivoDTO.Archivo);

            _context.Archivos.Update(archivo);
        }


        public List<ArchivoView> getArchivos(string codigoCurso, string carpeta, int grupo, string anio, string periodo)
        {
            return _context.Set<ArchivoView>().FromSqlRaw($"EXEC spGetArchivos " +
                          $"@Curso = {codigoCurso}, @Carpeta = {carpeta}, @Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}").ToList();
        }

        public string getArchivoData(string codigoCurso, string carpeta, string nombreArchivo, int grupo, 
            string anio, string periodo)
        {
            var data = _context.Set<DataView>().FromSqlRaw($"EXEC spGetDataArchivo " +
                          $"@Curso = {codigoCurso}, @Carpeta = {carpeta}, @Nombre = {nombreArchivo}, @Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}").ToList();

            return Convert.ToBase64String(data[0].Archivo);
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
