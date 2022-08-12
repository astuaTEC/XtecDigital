using Microsoft.EntityFrameworkCore;
using SQLServerApi.Models;
using SQLServerApi.Models.DTO;
using SQLServerApi.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Reposotories
{
    public class EvaluacionRepo
    {
        private readonly XtecDigitalDBContext _context;

        // Inject the Data Base Context
        public EvaluacionRepo(XtecDigitalDBContext context)
        {
            _context = context;
        }

        /**
       * ------------------------------
       *         MÉTODOS CRUD
       * ------------------------------
       */

        public void Create(EvaluacionReadDTO evaluacionDTO)
        {
            if (evaluacionDTO == null)
                throw new ArgumentNullException(nameof(evaluacionDTO));

            var evaluacion = new Evaluacion
            {
                Nombre = evaluacionDTO.Nombre,
                NombreRubro = evaluacionDTO.NombreRubro,
                NumeroGrupo = evaluacionDTO.NumeroGrupo,
                CodigoCurso = evaluacionDTO.CodigoCurso,
                Periodo = evaluacionDTO.Periodo,
                Anio = evaluacionDTO.Anio,
                IndividualGrupal = evaluacionDTO.IndividualGrupal,
                FechaHoraMax = evaluacionDTO.FechaHoraMax,
                Porcentaje = evaluacionDTO.Porcentaje
            };

            // si viene un archivo en base64 hay que parsearlo a byte array
            if (evaluacionDTO.Archivo != null)
                evaluacion.Archivo = Convert.FromBase64String(evaluacionDTO.Archivo);

            _context.Evaluacions.Add(evaluacion);
        }

        /// <summary>
        /// Método para crear un nuevo entregable
        /// </summary>
        /// <param name="entregableDTO">El entregable a subir</param>
        public void CreateEntregable(EntregableReadDTO entregableDTO)
        {
            if (entregableDTO == null)
                throw new ArgumentNullException(nameof(entregableDTO));

            byte[] ArchivoEntregable;

            // si existe entregable
            if (entregableDTO.ArchivoEntregable != null) 
            {
                ArchivoEntregable = Convert.FromBase64String(entregableDTO.ArchivoEntregable);
                
                // se ejecuta el stored procedure correspondiente
                _context.Database.ExecuteSqlRaw("spSubirEntregable @p0, @p1, @p2, @p3, @p4, @p5, @p6, @p7",
                entregableDTO.CodigoCurso, entregableDTO.NombreRubro, entregableDTO.NombreEvaluacion, entregableDTO.NumeroGrupo,
                entregableDTO.Anio, entregableDTO.Periodo, entregableDTO.CarnetEstudiante, ArchivoEntregable);
            }
            
        }

        public void Delete(string codigoCurso, int grupo, string anio, string periodo, string rubro, string nombreEvaluacion)
        {
            var evaluacion = _context.Evaluacions.FirstOrDefault(x => x.Nombre == nombreEvaluacion &&
                           x.NombreRubro == rubro && x.CodigoCurso == codigoCurso 
                           && x.NumeroGrupo == grupo && x.Anio == anio && x.Periodo == periodo);

            _context.Evaluacions.Remove(evaluacion);
        }

        /// <summary>
        /// Método para calificar un entregable 
        /// </summary>
        /// <param name="entregableDTO">El entregable calificado</param>
        public void CalificarEntregable(EntregableReadDTO entregableDTO)
        {
            if (entregableDTO == null)
                throw new ArgumentNullException(nameof(entregableDTO));

            byte[] ArchivoRetroAlimentacion = new byte[] { };

            // si existe archivo de retroalimentación hay que pasarlo a byte array
            if (entregableDTO.ArchivoRetroAlimentacion != null)
                ArchivoRetroAlimentacion = Convert.FromBase64String(entregableDTO.ArchivoRetroAlimentacion);
           
            // se ejecuta el stored procedure correspondiente
            _context.Database.ExecuteSqlRaw("spCalificarEntregable @p0, @p1, @p2, @p3, @p4, @p5, @p6, @p7, @p8, @p9, @p10",
               entregableDTO.CodigoCurso, entregableDTO.NombreRubro, entregableDTO.NombreEvaluacion, entregableDTO.NumeroGrupo,
               entregableDTO.Anio, entregableDTO.Periodo, entregableDTO.CarnetEstudiante, entregableDTO.Id,
               ArchivoRetroAlimentacion, entregableDTO.Observaciones, entregableDTO.Nota);
        }

        /// <summary>
        /// Método para agregar subgrupos de una evaluación a la base de datos
        /// </summary>
        /// <param name="subgrupos">Los subgrupos a agregar</param>
        public void agregarSubGrupos(List<Subgrupo> subgrupos)
        {
            if (subgrupos.Count == 0)
                throw new ArgumentNullException(nameof(subgrupos));
            
            foreach(var subgrupo in subgrupos)
            {
                _context.Subgrupos.Add(subgrupo);
            }
        }

        /// <summary>
        /// Método para acceder a las evaluaciones asociadas a un rubro
        /// </summary>
        /// <param name="codigoCurso">El curso asociado</param>
        /// <param name="rubro">El rubro asociado</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <returns>La lista de las evaluaciones correspondientes</returns>
        public List<EvaluacionView> getEvaluacionesPorRubro(string codigoCurso, string rubro, int grupo, string anio, string periodo)
        {
            // se ejecuta el stored procedure
            return _context.Set<EvaluacionView>().FromSqlRaw($"EXEC spGetEvaluaciones " +
                           $"@Curso = {codigoCurso}, @Rubro = {rubro}, @Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}").ToList();
        }

        /// <summary>
        /// Método para acceder la data del archivo de una evaluación
        /// </summary>
        /// <param name="codigoCurso">El curso asociado</param>
        /// <param name="rubro">El rubro asociado</param>
        /// <param name="nombreEvaluacion">La evaluación asociada</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <returns>El archivo en base64</returns>
        public string getArchivoEvaluacion(string codigoCurso, string rubro, string nombreEvaluacion, int grupo,
            string anio, string periodo)
        {
            // se ejecutra el stored procedure
            var data = _context.Set<DataView>().FromSqlRaw($"EXEC spGetArchivoEvaluacion " +
                          $"@Curso = {codigoCurso}, @Rubro = {rubro}, @Nombre = {nombreEvaluacion}, @Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}").ToList();

            // el resultado se parsea a base64
            return Convert.ToBase64String(data[0].Archivo);
        }

        /// <summary>
        /// Método para acceder a todos los entregables de una evaluación
        /// </summary>
        /// <param name="codigoCurso">El curso asociado</param>
        /// <param name="rubro">El rubro asociado</param>
        /// <param name="nombreEvaluacion">El nombre de la evaluación asociada</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <returns>La lista de entregables</returns>
        public List<EntregableView> getEntregablesEvaluacion(string codigoCurso, string rubro, string nombreEvaluacion, int grupo,
            string anio, string periodo)
        {
            // se ejecuta el stored procedure
            return _context.Set<EntregableView>().FromSqlRaw($"EXEC spGetEntregables " +
                          $"@Curso = {codigoCurso}, @Rubro = {rubro}, @NombreEvaluacion = {nombreEvaluacion}, " +
                          $"@Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}").ToList();
        }

        /// <summary>
        /// Método para publicar las notas de una evaluación
        /// </summary>
        /// <param name="codigoCurso">El curso asociado</param>
        /// <param name="rubro">El rubro asociado</param>
        /// <param name="nombreEvaluacion">El nombre de la evaluación asociada</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El perido asociado</param>
        /// <param name="profesor">El profesor que evalúa</param>
        public void publicarNotas(string codigoCurso, string rubro, string nombreEvaluacion, int grupo,
            string anio, string periodo, string profesor)
        {
            // se ejecuta el stored procedure
            _context.Database.ExecuteSqlRaw("spPublicarNotas @p0, @p1, @p2, @p3, @p4, @p5, @p6", codigoCurso, rubro, nombreEvaluacion,
                grupo, anio, periodo, profesor);

        }

        /// <summary>
        /// Método para acceder la data del archivo entregable
        /// </summary>
        /// <param name="codigoCurso">El curso asociado</param>
        /// <param name="rubro">El rubro asociado</param>
        /// <param name="nombreEvaluacion">El nombre de la evaluación asociada</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <param name="carnet">El carnet del estudiante a consultar</param>
        /// <param name="id">El id del entregable a consultar</param>
        /// <returns>El archivo base64 correspondiente</returns>
        public string getArchivoEntregable(string codigoCurso, string rubro, string nombreEvaluacion, int grupo,
           string anio, string periodo, string carnet, string id)
        {
            // se ejecuta el stored procedure
            var data = _context.Set<DataView>().FromSqlRaw($"EXEC spGetDataEntregable " +
                          $"@Curso = {codigoCurso}, @Rubro = {rubro}, @Evaluacion = {nombreEvaluacion}, " +
                          $"@Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}, @Carnet = {carnet}, @Id = {id}").ToList();
            
            // se parsea  a base64
            return Convert.ToBase64String(data[0].Archivo);
        }

        /// <summary>
        /// Método para acceder la data del archivo de retroalimentación de un entregable
        /// </summary>
        /// <param name="codigoCurso">El curso asociado</param>
        /// <param name="rubro">El rubro asociado</param>
        /// <param name="nombreEvaluacion">El nombre de la evaluación asociada</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El perido asociado</param>
        /// <param name="carnet">El carnet del estudiante asociado</param>
        /// <param name="id">El id del entregable a consultar</param>
        /// <returns>El archivo en base64 correspondiente</returns>
        public string getArchivoRetroalimentacion(string codigoCurso, string rubro, string nombreEvaluacion, int grupo,
           string anio, string periodo, string carnet, string id)
        {
            // se ejecuta el stored procedure
            var data = _context.Set<DataView>().FromSqlRaw($"EXEC spGetArchivoRetroalimentacion " +
                          $"@Curso = {codigoCurso}, @Rubro = {rubro}, @Evaluacion = {nombreEvaluacion}, " +
                          $"@Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}, @Carnet = {carnet}, @Id = {id}").ToList();
            
            // se parsea a base64
            return Convert.ToBase64String(data[0].Archivo);
        }

        // guarda los cambios en la base de datos
        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

    }
}
