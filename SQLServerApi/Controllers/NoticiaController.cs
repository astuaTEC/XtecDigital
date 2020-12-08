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
    public class NoticiaController : ControllerBase
    {
        private readonly NoticiaRepo _repo;

        public NoticiaController(NoticiaRepo repo)
        {
            _repo = repo;
        }


        [HttpGet]
        [Route("api/grupo/noticias")]
        public IActionResult GetNoticiasPorGrupo([FromQuery] string curso, [FromQuery] int grupo,
           [FromQuery] string anio, [FromQuery] string periodo)
        {
            var resultado = _repo.getNoticias(curso, grupo, anio, periodo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpPost]
        [Route("api/grupo/noticia/new")]
        public IActionResult NuevaNoticia([FromBody] Noticia noticia)
        {
            _repo.Create(noticia);
            _repo.SaveChanges();
            return Ok("Noticia agregada correctamente");
        }

        [HttpPut]
        [Route("api/grupo/noticia/edit")]
        public IActionResult EditarNoticia([FromBody] Noticia noticia)
        {
            _repo.Update(noticia);
            _repo.SaveChanges();
            return Ok("Noticia actualizada correctamente");
        }

        [HttpDelete]
        [Route("api/grupo/noticia/delete")]
        public IActionResult Delete([FromQuery] string curso, [FromQuery] int grupo,
            [FromQuery] string anio, [FromQuery] string periodo, [FromQuery] int id)
        {
            _repo.Delete(curso, grupo, anio, periodo, id);
            _repo.SaveChanges();
            return Ok("Noticia eliminada correctamente");
        }
    }
}
