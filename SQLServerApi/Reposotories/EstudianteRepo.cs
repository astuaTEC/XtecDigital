using Microsoft.EntityFrameworkCore;
using SQLServerApi.Models;
using SQLServerApi.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Reposotories
{
    public class EstudianteRepo
    {
        private readonly XtecDigitalDBContext _context;

        // Inject the Data Base Context
        public EstudianteRepo(XtecDigitalDBContext context)
        {
            _context = context;
        }

        public List<GrupoSemestreView> getGrupos(string carnet)
        {
            return _context.Set<GrupoSemestreView>().FromSqlRaw($"EXEC spGetSemestresEstudiante " +
                            $"@Carnet = {carnet}").ToList();
        }

        public List<NotaView> getNota(string codigoCurso, int grupo, string anio, string periodo, string carnet)
        {
            return _context.Set<NotaView>().FromSqlRaw($"EXEC spNotasEstudianteGrupo " +
                           $"@Curso = {codigoCurso}, @Grupo = {grupo}, " +
                           $"@Anio = {anio}, @Periodo = {periodo}, @Carnet = {carnet}").ToList();
        }

        public EntregableEstudianteView getEntregableEvaluacion(string codigoCurso, string rubro, string nombreEvaluacion, int grupo,
            string anio, string periodo, string carnet)
        {
            return _context.Set<EntregableEstudianteView>().FromSqlRaw($"EXEC spGetEntregableEstudiante " +
                          $"@Curso = {codigoCurso}, @Rubro = {rubro}, @NombreEvaluacion = {nombreEvaluacion}, " +
                          $"@Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}, @Carnet = {carnet}").ToList()[0];
        }
    }
}
