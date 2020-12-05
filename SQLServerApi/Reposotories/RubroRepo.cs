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

        public List<RubroView> getRubros(string codigoCurso, int grupo, string anio, string periodo)
        {
            return _context.Set<RubroView>().FromSqlRaw($"EXEC spGetRubros " +
                           $"@Curso = {codigoCurso}, @Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}").ToList();
        }
    }
}
