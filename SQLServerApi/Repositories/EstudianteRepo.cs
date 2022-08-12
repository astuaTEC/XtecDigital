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
            var resultado = _context.Set<EntregableEstudianteView>().FromSqlRaw($"EXEC spGetEntregableEstudiante " +
                          $"@Curso = {codigoCurso}, @Rubro = {rubro}, @NombreEvaluacion = {nombreEvaluacion}, " +
                          $"@Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}, @Carnet = {carnet}").ToList();

            if(resultado.Count > 0)
            {
                return resultado[0];
            }

            return null;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="codigoCurso"></param>
        /// <param name="grupo"></param>
        /// <param name="anio"></param>
        /// <param name="periodo"></param>
        /// <param name="carnet"></param>
        /// <param name="nombreRubro"></param>
        /// <param name="nombreEvaluacion"></param>
        /// <returns></returns>
        public List<EstudianteDTO> getEstudiantesSubgrupo(string codigoCurso, int grupo, string anio, string periodo, string carnet, 
            string nombreRubro, string nombreEvaluacion)
        {
            // se ejecuta el stored procedure
            var estudiantes = _context.Set<CarnetView>().FromSqlRaw($"EXEC spGetEstudiantesSubgrupo " +
                           $"@Curso = {codigoCurso}, @Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}, " +
                           $"@Carnet = {carnet}, @Rubro = {nombreRubro}, @Evaluacion = {nombreEvaluacion}").ToList();

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
            foreach (var estudiante in estudiantes)
            {
                foreach (var estudianteInfo in estudiantesInfo)
                {
                    if (estudiante.CarnetEstudiante == estudianteInfo.Carnet)
                    {
               
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
    }
}
