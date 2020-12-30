using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SQLServerApi.Models;
using SQLServerApi.Models.DTO;
using SQLServerApi.Reposotories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Controllers
{
    [ApiController]
    public class EvaluacionController : ControllerBase
    {
        private readonly EvaluacionRepo _repo;

        // se inyecta el repositorio correspondiente
        public EvaluacionController(EvaluacionRepo repo)
        {
            _repo = repo;
        }

        /// <summary>
        /// Petición para acceder a todas las evaluaciones asociadas a un rubro
        /// </summary>
        /// <param name="curso">El curso asociado</param>
        /// <param name="rubro">El rubro asociado</param>
        /// <param name="grupo">El grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <returns>La lista con las evaluaciones correspondientes</returns>
        [HttpGet]
        [Route("api/grupo/rubro/evaluaciones")]
        public IActionResult GetEvaluacionesPorRubro([FromQuery] string curso, [FromQuery] string rubro, [FromQuery] int grupo,
            [FromQuery] string anio, [FromQuery] string periodo)
        {
            var resultado = _repo.getEvaluacionesPorRubro(curso, rubro, grupo, anio, periodo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        /// <summary>
        /// Petición para acceder al archivo con las instrucciones de 
        /// una evaluación específica
        /// </summary>
        /// <param name="curso">El curso asociado</param>
        /// <param name="rubro">El rubro asociado</param>
        /// <param name="nombre">El nombre de la evaluación</param>
        /// <param name="grupo">El grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <returns>El archivo en base64</returns>
        [HttpGet]
        [Route("api/grupo/rubro/evaluacion/archivo")]
        public IActionResult GetArchivoEvaluacion([FromQuery] string curso, [FromQuery] string rubro, [FromQuery] string nombre,
            [FromQuery] int grupo, [FromQuery] string anio, [FromQuery] string periodo)
        {
            var resultado = _repo.getArchivoEvaluacion(curso, rubro, nombre, grupo, anio, periodo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        /// <summary>
        /// Petición para acceder a un entregable específico
        /// </summary>
        /// <param name="curso">El curso asociado</param>
        /// <param name="rubro">El rubro asociado</param>
        /// <param name="nombre">El nombre de la evaluación</param>
        /// <param name="grupo">El grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <param name="carnet">El carnet del estudiante específico</param>
        /// <param name="id">El id del entregable</param>
        /// <returns>El archivo en base64</returns>
        [HttpGet]
        [Route("api/grupo/rubro/evaluacion/entregable/archivo")]
        public IActionResult GetArchivoEntregable([FromQuery] string curso, [FromQuery] string rubro, [FromQuery] string nombre,
            [FromQuery] int grupo, [FromQuery] string anio, [FromQuery] string periodo, [FromQuery] string carnet, [FromQuery] string id)
        {
            var resultado = _repo.getArchivoEntregable(curso, rubro, nombre, grupo, anio, periodo, carnet, id);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        /// <summary>
        /// Petición para acceder al archivo de retroalimentación
        /// de una evaluación específica
        /// </summary>
        /// <param name="curso">El curso asociado</param>
        /// <param name="rubro">El rubro asociado</param>
        /// <param name="nombre">El nombre de la evaluación</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <param name="carnet">El carnet del estudiante específico</param>
        /// <param name="id">El id del entregable</param>
        /// <returns>El archivo base64</returns>
        [HttpGet]
        [Route("api/grupo/rubro/evaluacion/entregable/archivoRA")]
        public IActionResult GetArchivoRetroalimentacion([FromQuery] string curso, [FromQuery] string rubro, [FromQuery] string nombre,
            [FromQuery] int grupo, [FromQuery] string anio, [FromQuery] string periodo, [FromQuery] string carnet, [FromQuery] string id)
        {
            var resultado = _repo.getArchivoRetroalimentacion(curso, rubro, nombre, grupo, anio, periodo, carnet, id);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        /// <summary>
        /// Petición para acceder a todos los entregables que tiene una evaluación
        /// </summary>
        /// <param name="curso">El curso asociado</param>
        /// <param name="rubro">El rubro asociado</param>
        /// <param name="nombre">El nombre de la evaluación</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <returns>La lista con los entregables</returns>
        [HttpGet]
        [Route("api/grupo/rubro/evaluacion/entregables")]
        public IActionResult GetEntregablesEvaluacion([FromQuery] string curso, [FromQuery] string rubro, [FromQuery] string nombre,
            [FromQuery] int grupo, [FromQuery] string anio, [FromQuery] string periodo)
        {
            var resultado = _repo.getEntregablesEvaluacion(curso, rubro, nombre, grupo, anio, periodo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        /// <summary>
        /// Petición para crear una evaluación
        /// </summary>
        /// <param name="evaluacion">La evaluación a crear</param>
        /// <returns>Un ok en caso de éxito</returns>
        [HttpPost]
        [Route("api/grupo/evaluacion/new")]
        public IActionResult Create([FromBody] EvaluacionReadDTO evaluacion)
        {
            _repo.Create(evaluacion);
            _repo.SaveChanges();
            return Ok("Evaluación asignada correctamente");
        }

        /// <summary>
        /// Petición para crear un nuevo entregable
        /// </summary>
        /// <param name="entregable">El entregable a crear</param>
        /// <returns>Un ok en caso de éxito</returns>
        [HttpPost]
        [Route("api/grupo/evaluacion/entregable/new")]
        public IActionResult CreateEntregable([FromBody] EntregableReadDTO entregable)
        {
            _repo.CreateEntregable(entregable);
            _repo.SaveChanges();
            return Ok("Entregable subido correctamente");
        }

        /// <summary>
        /// Petición para crear subgrupos asociados a una evaluación
        /// </summary>
        /// <param name="subgrupos">La lista con los subgrupos conformados</param>
        /// <returns>Un ok en caso de éxito</returns>
        [HttpPost]
        [Route("api/grupo/evaluacion/subgrupos")]
        public IActionResult AgregarSubGrupos([FromBody] List<Subgrupo> subgrupos)
        {
            _repo.agregarSubGrupos(subgrupos);
            _repo.SaveChanges();
            return Ok("SubGrupos asignados correctamente");
        }

        /// <summary>
        /// Petición para calificar un entregable específico
        /// </summary>
        /// <param name="entregable">El entregable calificado</param>
        /// <returns>Un ok en caso de éxito</returns>
        [HttpPost]
        [Route("api/grupo/evaluacion/entregable/calificar")]
        public IActionResult CalificarEntregable([FromBody] EntregableReadDTO entregable)
        {
            _repo.CalificarEntregable(entregable);
            return Ok("Entregable calificado correctamente");
        }

        /// <summary>
        /// Petición para publicar las notas asociadas a un entregable
        /// </summary>
        /// <param name="curso">El curso asociado</param>
        /// <param name="rubro">El rubro asociado</param>
        /// <param name="nombre">El nombre de la evaluación</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <param name="profesor">El profesor que publica las notas</param>
        /// <returns>Un ok en caso de éxito</returns>
        [HttpPost]
        [Route("api/grupo/evaluacion/publicarNotas")]
        public IActionResult PublicarNotas([FromQuery] string curso, [FromQuery] string rubro, [FromQuery] string nombre,
            [FromQuery] int grupo, [FromQuery] string anio, [FromQuery] string periodo, [FromQuery] string profesor)
        {
            _repo.publicarNotas(curso, rubro, nombre, grupo, anio, periodo, profesor);

            return Ok("Notas publicadas correctamente");
        }

        /// <summary>
        /// Peticion para eliminar una evaluacion específica
        /// </summary>
        /// <param name="curso">El curso asociado</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <param name="nombre">El nombre de la evaluación a eliminar</param>
        /// <returns>Un ok en caso de éxito</returns>
        [HttpDelete]
        [Route("api/grupo/evaluacion/delete")]
        public IActionResult Delete([FromQuery] string curso, [FromQuery] string rubro, [FromQuery] string nombre,
            [FromQuery] int grupo, [FromQuery] string anio, [FromQuery] string periodo)
        {
            _repo.Delete(curso, grupo, anio, periodo, rubro, nombre);
            _repo.SaveChanges();
            return Ok("Evaluación eliminada correctamente");
        }
    }
}
