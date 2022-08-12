using Microsoft.EntityFrameworkCore;
using SQLServerApi.Models;
using SQLServerApi.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Reposotories
{
    public class RubroRepo
    {
        private readonly XtecDigitalDBContext _context;

        // Inject the Data Base Context
        public RubroRepo(XtecDigitalDBContext context)
        {
            _context = context;
        }

        /**
         * ------------------------------
         *         MÉTODOS CRUD
         * ------------------------------
         */

        public void Create(Rubro rubro)
        {
            if (rubro == null)
                throw new ArgumentNullException(nameof(rubro));

            _context.Rubros.Add(rubro);

        }
        public void Update(List<Rubro> rubros)
        {
            if (rubros.Count == 0)
                throw new ArgumentNullException(nameof(rubros));

            foreach(var rubro in rubros)
            {
                _context.Rubros.Update(rubro);
                _context.Entry(rubro).State = EntityState.Modified;
            }

        }

        /// <summary>
        /// Método para eliminar un rubro específico
        /// </summary>
        /// <param name="codigoCurso">El curso asociado</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <param name="nombreRubro">El nombre del rubro asociado</param>
        public void Delete(string codigoCurso, int grupo, string anio, string periodo, string nombreRubro)
        {
            // se ejecuta el stored procedure
            _context.Database.ExecuteSqlRaw("spEliminarRubro @p0, @p1, @p2, @p3, @p4",
                codigoCurso, grupo, anio, periodo, nombreRubro);
        }

        /// <summary>
        /// Método para acceder a los rubros de un grupo específico
        /// </summary>
        /// <param name="codigoCurso">El curso asociado</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El perido asociado</param>
        /// <returns>La lista de rubros</returns>
        public List<RubroView> getRubros(string codigoCurso, int grupo, string anio, string periodo)
        {
            return _context.Set<RubroView>().FromSqlRaw($"EXEC spGetRubros " +
                           $"@Curso = {codigoCurso}, @Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}").ToList();
        }

        // guarda los cambios en la base de datos
        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
