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
    public class CarpetaController : ControllerBase
    {
        private readonly CarpetaRepo _repo;

        public CarpetaController(CarpetaRepo repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Route("api/grupo/carpetas")]
        public IActionResult GetCarpetasPorGrupo([FromQuery] string curso, [FromQuery] int grupo,
            [FromQuery] string anio, [FromQuery] string periodo)
        {
            var resultado = _repo.GetCarpetas(curso, grupo, anio, periodo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }
    }
}
