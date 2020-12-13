using FastMember;
using Microsoft.Data.SqlClient;
using Microsoft.Data.SqlClient.Server;
using Microsoft.EntityFrameworkCore;
using SQLServerApi.Models;
using SQLServerApi.Models.DTO;
using System;
using System.Collections.Generic;
using System.Data;
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

        public void CreateFromExcel(IEnumerable<SemestreExcel> semestre)
        {
            if (semestre == null)
                throw new ArgumentNullException(nameof(semestre));
            
            var table = new DataTable();
            table.Columns.Add("Id", typeof(int));
            table.Columns.Add("Anio", typeof(string));
            table.Columns.Add("Periodo", typeof(string));
            table.Columns.Add("CodigoCurso", typeof(string));
            table.Columns.Add("NumeroGrupo", typeof(int));
            table.Columns.Add("CarnetEstudiante", typeof(string));
            table.Columns.Add("Profesor1", typeof(string));

            int id = 1;
            foreach(var s in semestre)
            {
                table.Rows.Add(id, s.Anio, s.Periodo, s.CodigoCurso, s.NumeroGrupo, s.CarnetEstudiante, s.Profesor1);
                id++;
            }
            var parameter = new SqlParameter("@TablaE", SqlDbType.Structured);
            parameter.Value = table;
            parameter.TypeName = "dbo.SemestreExcel";
            _context.Database.ExecuteSqlRaw("exec spSemestreExcel @TablaE",
                 parameter); 
        }

        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
