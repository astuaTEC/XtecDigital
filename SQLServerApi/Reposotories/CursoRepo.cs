using Microsoft.EntityFrameworkCore;
using SQLServerApi.Models;
using SQLServerApi.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Reposotories
{
    public class CursoRepo
    {
        private readonly XtecDigitalDBContext _context;

        // Inject the Data Base Context
        public CursoRepo(XtecDigitalDBContext context)
        {
            _context = context;
        }

        /**
         * ------------------------------
         *         MÉTODOS CRUD
         * ------------------------------
         */

        public void Create(Curso curso)
        {
            if (curso == null)
                throw new ArgumentNullException(nameof(curso));

            _context.Cursos.Add(curso);

        }
        public void Update(Curso curso)
        {
            if (curso == null)
                throw new ArgumentNullException(nameof(curso));

            _context.Cursos.Update(curso);
            _context.Entry(curso).State = EntityState.Modified;

        }

        public void Update(List<Curso> cursos)
        {
            if (cursos.Count == 0)
                throw new ArgumentNullException(nameof(cursos));

            _context.Cursos.UpdateRange(cursos);
        }

        public List<Curso> GetAll()
        {
            return _context.Cursos.ToList();
        }

        public List<Curso> GetCursosHabilitados()
        {
            return _context.Cursos.Where(x => x.Habilitado == true).ToList();
        }


        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

    }
}
