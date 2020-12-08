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


        [HttpPost]
        [Route("api/grupo/rubro/new")]
        public IActionResult Create([FromBody] Rubro rubro)
        {
            _repo.Create(rubro);
            _repo.SaveChanges();
            return Ok("Rubro creado correctamente");
        }

        [HttpPut]
        [Route("api/grupo/rubro/edit")]
        public IActionResult Update([FromBody] List<Rubro> rubros)
        {
            _repo.Update(rubros);
            _repo.SaveChanges();
            return Ok("Rubro actualizado correctamente");
        }

        [HttpDelete]
        [Route("api/grupo/rubro/delete")]
        public IActionResult Delete([FromQuery] string curso, [FromQuery] int grupo,
            [FromQuery] string anio, [FromQuery] string periodo, [FromQuery] string nombre)
        {
            _repo.Delete(curso, grupo, anio, periodo, nombre);
            
            return Ok("Rubro eliminado correctamente");
        }

    }
}
