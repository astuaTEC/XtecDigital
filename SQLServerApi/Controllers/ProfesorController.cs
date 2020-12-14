using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SQLServerApi.Reposotories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Controllers
{
    [ApiController]
    public class ProfesorController : ControllerBase
    {
        private readonly ProfesorRepo _repo;

        // se inyecta el repositorio correspondiente
        public ProfesorController(ProfesorRepo repo)
        {
            _repo = repo;
        }

        /// <summary>
        /// Petición para acceder a todos los grupos que tiene un
        /// profesor asociados
        /// </summary>
        /// <param name="cedula">La cédula del profesor a consultar</param>
        /// <returns>La lista de los grupos correspondientes</returns>
        [HttpGet]
        [Route("api/profesor/grupos")]
        public IActionResult GetCursosProfesor([FromQuery] string cedula)
        {
            var resultado = _repo.getGrupos(cedula);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        /// <summary>
        /// Petición para acceder a todos los estudiantes de un grupo específico
        /// </summary>
        /// <param name="curso">El curso asociado</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <returns>La lista de los estudiantes correspondientes</returns>
        [HttpGet]
        [Route("api/profesor/curso/getEstudiantes")]
        public IActionResult GetEstudiantesGrupo([FromQuery] string curso, [FromQuery] int grupo,
            [FromQuery] string anio, [FromQuery] string periodo)
        {
            var resultado = _repo.getEstudiantesGrupo(curso, grupo, anio, periodo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        /// <summary>
        /// Petición para acceder a todos los estudiantes de un grupo específico
        /// </summary>
        /// <param name="curso">El curso asociado</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <returns>La lista de los estudiantes correspondientes al grupo</returns>
        [HttpGet]
        [Route("api/profesor/curso/getReporteEstudiantes")]
        public IActionResult GetReporteEstudiantesGrupo([FromQuery] string curso, [FromQuery] int grupo,
            [FromQuery] string anio, [FromQuery] string periodo)
        {
            var resultado = _repo.getReporteEstudiantes(curso, grupo, anio, periodo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        /// <summary>
        /// Petición para acceder a las notas de los estudiantes asociados
        /// a un grupo específico
        /// </summary>
        /// <param name="curso">El curso asociado</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <returns>La lista de notas</returns>
        [HttpGet]
        [Route("api/profesor/curso/getNotas")]
        public IActionResult GetNotasCurso([FromQuery] string curso, [FromQuery] int grupo,
            [FromQuery] string anio, [FromQuery] string periodo)
        {
            var resultado = _repo.getNotasGrupo(curso, grupo, anio, periodo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }
    }
}
