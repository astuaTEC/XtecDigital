using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SQLServerApi.Models;
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

        [HttpPost]
        [Route("api/grupo/carpeta/new")]
        public IActionResult Create([FromBody] Carpeta carpeta)
        {
            _repo.Create(carpeta);
            _repo.SaveChanges();
            return Ok("Carpeta creada correctamente");
        }

        [HttpDelete]
        [Route("api/grupo/carpeta/delete")]
        public IActionResult Delete([FromQuery] string curso, [FromQuery] int grupo,
            [FromQuery] string anio, [FromQuery] string periodo, [FromQuery] string nombre)
        {
            _repo.Delete(curso, grupo, anio, periodo, nombre);
            _repo.SaveChanges();
            return Ok("Carpeta eliminada correctamente");
        }
    }
}
