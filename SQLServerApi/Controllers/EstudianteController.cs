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
    public class EstudianteController : ControllerBase
    {
        private readonly EstudianteRepo _repo;

        public EstudianteController(EstudianteRepo repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Route("api/estudiante/grupos")]
        public IActionResult GetCursosEstudiante([FromQuery] string carnet)
        {
            var resultado = _repo.getGrupos(carnet);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

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
    }
}
