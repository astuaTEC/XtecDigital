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

        public List<CarpetaView> GetCarpetas(string codigoCurso, int grupo, string anio, string periodo)
        {
            return _context.Set<CarpetaView>().FromSqlRaw($"EXEC spGetCarpetas " +
                          $"@Curso = {codigoCurso}, @Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}").ToList();
        }
    }
}
