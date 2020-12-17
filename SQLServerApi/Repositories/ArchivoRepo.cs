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

            // si viene un archivo en base64 hay que parsearlo a byte array
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

            // si viene un archivo en base64 hay que parsearlo a byte array
            if (archivoDTO.Archivo != null)
                archivo.Archivo1 = Convert.FromBase64String(archivoDTO.Archivo);

            _context.Archivos.Update(archivo);
        }

        public void Delete(string codigoCurso, int grupo, string anio, string periodo, string nombreCarpeta, string nombre)
        {
            var archivo = _context.Archivos.FirstOrDefault(x => x.Nombre == nombre &&
                           x.CodigoCurso == codigoCurso && x.NumeroGrupo == grupo &&
                           x.Anio == anio && x.Periodo == periodo &&
                           x.NombreCarpeta == nombreCarpeta);

            _context.Archivos.Remove(archivo);
        }

        /// <summary>
        /// Método para acceder a los archivos de determinada carpeta
        /// </summary>
        /// <param name="codigoCurso">El curso asociado</param>
        /// <param name="carpeta">La carpeta que contiene el archivo</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <returns>La lista con los archivos</returns>
        public List<ArchivoView> getArchivos(string codigoCurso, string carpeta, int grupo, string anio, string periodo)
        {
            // se ejecuta el stored procedure correspondiente
            return _context.Set<ArchivoView>().FromSqlRaw($"EXEC spGetArchivos " +
                          $"@Curso = {codigoCurso}, @Carpeta = {carpeta}, @Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}").ToList();
        }

        /// <summary>
        /// Método para acceder a la data almacenada dentro
        /// de determinado archivo
        /// </summary>
        /// <param name="codigoCurso">El curso asociado</param>
        /// <param name="carpeta">La carpeta asociada</param>
        /// <param name="nombreArchivo">El nombre del archivo a obtener</param>
        /// <param name="grupo">El grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <returns>El archivo en base64</returns>
        public string getArchivoData(string codigoCurso, string carpeta, string nombreArchivo, int grupo, 
            string anio, string periodo)
        {
            var data = _context.Set<DataView>().FromSqlRaw($"EXEC spGetDataArchivo " +
                          $"@Curso = {codigoCurso}, @Carpeta = {carpeta}, @Nombre = {nombreArchivo}, " +
                          $"@Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}").ToList();

            if(data.Count > 0 && data[0] != null)
                return Convert.ToBase64String(data[0].Archivo);

            return null;
        }

        // guarda los cambios en la base de datos
        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
