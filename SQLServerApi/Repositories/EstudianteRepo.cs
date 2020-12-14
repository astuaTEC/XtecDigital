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

        /// <summary>
        /// Método para acceder a los grupos de determinado estudiante
        /// </summary>
        /// <param name="carnet">El carnet del estudiante a consultar</param>
        /// <returns>La lista de grupos del estudiante</returns>
        public List<GrupoSemestreView> getGrupos(string carnet)
        {
            // se ejecuta el stored procedure correspondiente
            return _context.Set<GrupoSemestreView>().FromSqlRaw($"EXEC spGetSemestresEstudiante " +
                            $"@Carnet = {carnet}").ToList();
        }

        /// <summary>
        /// Método para obtener la nota asociada a un grupo específico
        /// </summary>
        /// <param name="codigoCurso">El curso asociado</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <param name="carnet">El carnet del estudiante a consultar</param>
        /// <returns>La lista con las notas de ese estudiante para ese curso</returns>
        public List<NotaView> getNota(string codigoCurso, int grupo, string anio, string periodo, string carnet)
        {
            // se ejecuta el stored procedure correspondiente
            return _context.Set<NotaView>().FromSqlRaw($"EXEC spNotasEstudianteGrupo " +
                           $"@Curso = {codigoCurso}, @Grupo = {grupo}, " +
                           $"@Anio = {anio}, @Periodo = {periodo}, @Carnet = {carnet}").ToList();
        }

        /// <summary>
        /// Método para obtener el entregable asociado a una determinada evaluación
        /// </summary>
        /// <param name="codigoCurso">El curso asociado</param>
        /// <param name="rubro">El rubro asociado</param>
        /// <param name="nombreEvaluacion">El nombre de la evaluación asociada</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <param name="carnet">El carnet del estudiante a consultar</param>
        /// <returns>El entregable correspondiente</returns>
        public EntregableEstudianteView getEntregableEvaluacion(string codigoCurso, string rubro, string nombreEvaluacion, int grupo,
            string anio, string periodo, string carnet)
        {
            return _context.Set<EntregableEstudianteView>().FromSqlRaw($"EXEC spGetEntregableEstudiante " +
                          $"@Curso = {codigoCurso}, @Rubro = {rubro}, @NombreEvaluacion = {nombreEvaluacion}, " +
                          $"@Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}, @Carnet = {carnet}").ToList()[0];
        }
    }
}
