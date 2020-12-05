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
    public class RubroController : ControllerBase
    {
        private readonly RubroRepo _repo;

        public RubroController(RubroRepo repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Route("api/grupo/rubros")]
        public IActionResult GetRubrosPorGrupo([FromQuery] string curso, [FromQuery] int grupo,
            [FromQuery] string anio, [FromQuery] string periodo)
        {
            var resultado = _repo.getRubros(curso, grupo, anio, periodo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }
    }
}
