using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using SQLServerApi.Models;
using SQLServerApi.Models.DTO;
using SQLServerApi.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

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

        /// <summary>
        /// Método para acceder a los grupos de un profesor
        /// </summary>
        /// <param name="cedulaProfesor">La cédula del profesor a consultar</param>
        /// <returns>La lista de grupos</returns>
        public List<GrupoSemestreView> getGrupos(string cedulaProfesor)
        {
            // se ejecuta el stored procedure
            return _context.Set<GrupoSemestreView>().FromSqlRaw($"EXEC spGetSemestresProfesor " +
                            $"@Profesor = {cedulaProfesor}").ToList();
        }

        /// <summary>
        /// Método para acceder a los estudiantes de un grupo específico
        /// </summary>
        /// <param name="codigoCurso">El curso asociado</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <returns>La lista de estudiantes matriculados</returns>
        public List<EstudianteGrupoView> getEstudiantesGrupo(string codigoCurso, int grupo, string anio, string periodo)
        {
            // se ejecuta el stored procedure
            return _context.Set<EstudianteGrupoView>().FromSqlRaw($"EXEC spReporteEstudiantesCurso " +
                           $"@Curso = {codigoCurso}, @Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}").ToList();
            
        }

        /// <summary>
        /// Método para acceder al reporte de estudiantes matriculados en un curso
        /// </summary>
        /// <param name="codigoCurso">El curso asociado</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <returns>La lista de estudiantes matriculados</returns>
        public List<EstudianteDTO> getReporteEstudiantes(string codigoCurso, int grupo, string anio, string periodo)
        {
            // se ejecuta el stored procedure
            var estudiantes = _context.Set<EstudianteGrupoView>().FromSqlRaw($"EXEC spReporteEstudiantesCurso " +
                           $"@Curso = {codigoCurso}, @Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}").ToList();

            // se crean 2 listas
            List<EstudianteDTO> estudiantesInfo = new List<EstudianteDTO>();
            List<EstudianteDTO> estudiantesInfoEnGrupo = new List<EstudianteDTO>();

            // se llama al método que conecta con la API de MongoDB
            var responseTask = GetAsync("https://xtecdigitalmongodb.azurewebsites.net/api/estudiante/info/all");
            var result = responseTask.Result;

            if (result != null) // si el resultado no es nulo
            {
                // se parsea el resultado
                estudiantesInfo = JsonConvert.DeserializeObject<List<EstudianteDTO>>(result); 
            }

            // se escogen únicamente los estuidantes que pertenecen a este grupo
            foreach(var estudiante in estudiantes)
            {
                foreach(var estudianteInfo in estudiantesInfo)
                {
                    if(estudiante.CarnetEstudiante == estudianteInfo.Carnet)
                    {
                        // se inserta el código de curso y el nombre del grupo
                        estudianteInfo.CodigoCurso = estudiante.CodigoCurso;
                        estudianteInfo.NombreGrupo = estudiante.NombreGrupo;
                        estudiantesInfoEnGrupo.Add(estudianteInfo);
                        break;
                    }
                }
            }

            // se retorna el resultado
            return estudiantesInfoEnGrupo;
        }

        /// <summary>
        /// Método para acceder a otra api y retornar un resultado
        /// </summary>
        /// <param name="uri">La uri de la API a consultar</param>
        /// <returns>El resultado de la petición</returns>
        public async Task<string> GetAsync(string uri)
        {
            var httpClient = new HttpClient();
            var content = await httpClient.GetStringAsync(uri);
            return content;
        }

        /// <summary>
        /// Método para acceder a las notas de los estudiantes de un grupo
        /// </summary>
        /// <param name="codigoCurso">El curso asociado</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <returns>La lista de notas</returns>
        public List<NotaView> getNotasGrupo(string codigoCurso, int grupo, string anio, string periodo)
        {
            // se ejecuta el stored procedure
            return _context.Set<NotaView>().FromSqlRaw($"EXEC spNotasGrupo " +
                           $"@Curso = {codigoCurso}, @Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}").ToList();
        }

    }
}
