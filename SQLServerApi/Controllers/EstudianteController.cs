using Microsoft.AspNetCore.Mvc;
using SQLServerApi.Reposotories;

namespace SQLServerApi.Controllers
{
    [ApiController]
    public class EstudianteController : ControllerBase
    {
        private readonly EstudianteRepo _repo;

        // se inyecta el repositorio correspondiente
        public EstudianteController(EstudianteRepo repo)
        {
            _repo = repo;
        }

        /// <summary>
        /// Petición para acceder los cursos matriculados por un estudiante
        /// </summary>
        /// <param name="carnet">El carnet del estudiante a consultar</param>
        /// <returns>La lista de los cursos matriculados</returns>
        [HttpGet]
        [Route("api/estudiante/grupos")]
        public IActionResult GetCursosEstudiante([FromQuery] string carnet)
        {
            var resultado = _repo.getGrupos(carnet);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        /// <summary>
        /// Petición para acceder a la nota de un estudiante de un grupo específico
        /// </summary>
        /// <param name="curso">El curso asociado</param>
        /// <param name="grupo">El grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <param name="carnet">El carnet a consultar</param>
        /// <returns>La nota del estudiante</returns>
        [HttpGet]
        [Route("api/estudiante/curso/getNota")]
        public IActionResult GetNotasCurso([FromQuery] string curso, [FromQuery] int grupo,
            [FromQuery] string anio, [FromQuery] string periodo, [FromQuery] string carnet)
        {
            var resultado = _repo.getNota(curso, grupo, anio, periodo, carnet);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        /// <summary>
        /// Petición para acceder al estregable de un esudiante
        /// asociado a una evaluación específica
        /// </summary>
        /// <param name="curso">El curso asociado</param>
        /// <param name="rubro">El rubro asociado</param>
        /// <param name="nombre">El nombre de la evaluación</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <param name="carnet">El carnet asociado</param>
        /// <returns>El archivo en base64</returns>
        [HttpGet]
        [Route("api/grupo/rubro/evaluacion/miEntregable")]
        public IActionResult GetEntregablesEvaluacion([FromQuery] string curso, [FromQuery] string rubro, [FromQuery] string nombre,
            [FromQuery] int grupo, [FromQuery] string anio, [FromQuery] string periodo, [FromQuery] string carnet)
        {
            var resultado = _repo.getEntregableEvaluacion(curso, rubro, nombre, grupo, anio, periodo, carnet);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }
    }
}
