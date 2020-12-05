using SQLServerApi.Models;
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

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

    }
}
