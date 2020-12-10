using SQLServerApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Reposotories
{
    public class SemestreRepo
    {
        private readonly XtecDigitalDBContext _context;

        // Inject the Data Base Context
        public SemestreRepo(XtecDigitalDBContext context)
        {
            _context = context;
        }

        /**
         * ------------------------------
         *         MÉTODOS CRUD
         * ------------------------------
         */

        public void Create(Semestre semestre)
        {
            if (semestre == null)
                throw new ArgumentNullException(nameof(semestre));

            _context.Semestres.Add(semestre);

        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
