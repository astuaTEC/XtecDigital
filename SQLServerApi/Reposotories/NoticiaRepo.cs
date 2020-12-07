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


        public List<NoticiaView> getNoticias(string codigoCurso, int grupo, string anio, string periodo)
        {
            return _context.Set<NoticiaView>().FromSqlRaw($"EXEC spGetNoticias " +
                           $"@Curso = {codigoCurso}, @Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}").ToList();
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

    }
}
