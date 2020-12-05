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

        public ProfesorController(ProfesorRepo repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Route("api/profesor/grupos")]
        public IActionResult GetCursosProfesor([FromQuery] string cedula)
        {
            var resultado = _repo.getGrupos(cedula);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }
    }
}
