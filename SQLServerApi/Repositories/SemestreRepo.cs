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

        /// <summary>
        /// Método para crear un semestre a partir de un excel
        /// </summary>
        /// <param name="semestre">El semestre leido del excel</param>
        public void CreateFromExcel(IEnumerable<SemestreExcel> semestre)
        {
            if (semestre == null)
                throw new ArgumentNullException(nameof(semestre));
            
            // se crea una tabla
            var table = new DataTable();

            // se agregan las columnas a la tabla
            table.Columns.Add("Id", typeof(int));
            table.Columns.Add("Anio", typeof(string));
            table.Columns.Add("Periodo", typeof(string));
            table.Columns.Add("CodigoCurso", typeof(string));
            table.Columns.Add("NumeroGrupo", typeof(int));
            table.Columns.Add("CarnetEstudiante", typeof(string));
            table.Columns.Add("Profesor1", typeof(string));

            int id = 1;
            // se recorre la lista y se agregan los elementos a la tabla
            foreach(var s in semestre)
            {
                table.Rows.Add(id, s.Anio, s.Periodo, s.CodigoCurso, s.NumeroGrupo, s.CarnetEstudiante, s.Profesor1);
                id++;
            }
            // se crea un parámetro de SQL
            var parameter = new SqlParameter("@TablaE", SqlDbType.Structured);
            parameter.Value = table;
            parameter.TypeName = "dbo.SemestreExcel";

            // se ejcuta el stored procedure
            _context.Database.ExecuteSqlRaw("exec spSemestreExcel @TablaE",
                 parameter); 
        }

        // guarda los cambios en la base de datos
        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }
    }
}
