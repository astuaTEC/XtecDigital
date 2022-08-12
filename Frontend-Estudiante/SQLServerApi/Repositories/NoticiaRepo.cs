using Microsoft.EntityFrameworkCore;
using SQLServerApi.Models;
using SQLServerApi.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Reposotories
{
    public class NoticiaRepo
    {
        private readonly XtecDigitalDBContext _context;

        // Inject the Data Base Context
        public NoticiaRepo(XtecDigitalDBContext context)
        {
            _context = context;
        }

        /**
        * ------------------------------
        *         MÉTODOS CRUD
        * ------------------------------
        */

        public void Create(Noticia noticia)
        {
            if (noticia == null)
                throw new ArgumentNullException(nameof(noticia));

            _context.Noticia.Add(noticia);
        }

        public void Update(Noticia noticia)
        {
            if (noticia == null)
                throw new ArgumentNullException(nameof(noticia));

            _context.Noticia.Update(noticia);
        }

        public void Delete(string codigoCurso, int grupo, string anio, string periodo, int id)
        {
            var noticia = _context.Noticia.FirstOrDefault(x => x.Id == id &&
                           x.CodigoCurso == codigoCurso && x.NumeroGrupo == grupo &&
                           x.Anio == anio && x.Periodo == periodo);

            _context.Noticia.Remove(noticia);
        }

        /// <summary>
        /// Método para acceder a todas las noticias correspondientes a un grupo
        /// </summary>
        /// <param name="codigoCurso">El curso asociado</param>
        /// <param name="grupo">El grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <returns>La lista de noticias</returns>
        public List<NoticiaView> getNoticias(string codigoCurso, int grupo, string anio, string periodo)
        {
            // se ejecuta el stored procedure
            return _context.Set<NoticiaView>().FromSqlRaw($"EXEC spGetNoticias " +
                           $"@Curso = {codigoCurso}, @Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}").ToList();
        }

        // guarda los cambios en la base de datos
        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

    }
}
