using Microsoft.EntityFrameworkCore;
using SQLServerApi.Models;
using SQLServerApi.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Reposotories
{
    public class ProfesorRepo
    {
        private readonly XtecDigitalDBContext _context;

        // Inject the Data Base Context
        public ProfesorRepo(XtecDigitalDBContext context)
        {
            _context = context;
        }

        public List<GrupoSemestreView> getGrupos(string cedulaProfesor)
        {
            return _context.Set<GrupoSemestreView>().FromSqlRaw($"EXEC spGetSemestresProfesor " +
                            $"@Profesor = {cedulaProfesor}").ToList();
        }

        public List<EstudianteGrupoView> getEstudiantesGrupo(string codigoCurso, int grupo, string anio, string periodo)
        {
            return _context.Set<EstudianteGrupoView>().FromSqlRaw($"EXEC spGetEstudiantesCurso " +
                           $"@Curso = {codigoCurso}, @Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}").ToList();
        }

        public List<NotaView> getNotasGrupo(string codigoCurso, int grupo, string anio, string periodo)
        {
            return _context.Set<NotaView>().FromSqlRaw($"EXEC spNotasGrupo " +
                           $"@Curso = {codigoCurso}, @Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}").ToList();
        }

    }
}
