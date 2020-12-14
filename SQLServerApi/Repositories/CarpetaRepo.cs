using Microsoft.EntityFrameworkCore;
using SQLServerApi.Models;
using SQLServerApi.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Reposotories
{
    public class CarpetaRepo
    {
        private readonly XtecDigitalDBContext _context;

        // Inject the Data Base Context
        public CarpetaRepo(XtecDigitalDBContext context)
        {
            _context = context;
        }

        /**
         * ------------------------------
         *         MÉTODOS CRUD
         * ------------------------------
         */

        public void Create(Carpeta carpeta)
        {
            if (carpeta == null)
                throw new ArgumentNullException(nameof(carpeta));

            _context.Carpeta.Add(carpeta);

        }

        public void Delete(string codigoCurso, int grupo, string anio, string periodo, string nombreCarpeta)
        {
           var carpeta = _context.Carpeta.FirstOrDefault(x => x.Nombre == nombreCarpeta &&
                          x.CodigoCurso == codigoCurso && x.NumeroGrupo == grupo &&
                          x.Anio == anio && x.Periodo == periodo);

          _context.Carpeta.Remove(carpeta);
        }

        /// <summary>
        /// Método para acceder a las carpetas de un grupo determinado
        /// </summary>
        /// <param name="codigoCurso">El curso asociado</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <returns>La lista de carpetas</returns>
        public List<CarpetaView> GetCarpetas(string codigoCurso, int grupo, string anio, string periodo)
        {
            return _context.Set<CarpetaView>().FromSqlRaw($"EXEC spGetCarpetas " +
                          $"@Curso = {codigoCurso}, @Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}").ToList();
        }

        // guarda los cambios en la base de datos
        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
