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

        // se inyecta el repositorio correspondiente
        public NoticiaController(NoticiaRepo repo)
        {
            _repo = repo;
        }

        /// <summary>
        /// Petición para acceder a todas las noticias asociadas a un grupo
        /// </summary>
        /// <param name="curso">Elk curso asociado</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociaso</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <returns>La lista con las noticias</returns>
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

        /// <summary>
        /// Petición para crear una nueva noticia
        /// </summary>
        /// <param name="noticia">La noticia a crear</param>
        /// <returns>Un ok en caso de éxito</returns>
        [HttpPost]
        [Route("api/grupo/noticia/new")]
        public IActionResult NuevaNoticia([FromBody] Noticia noticia)
        {
            _repo.Create(noticia);
            _repo.SaveChanges();
            return Ok("Noticia agregada correctamente");
        }

        /// <summary>
        /// Petición para editar una noticia específica
        /// </summary>
        /// <param name="noticia">La noticia a editar</param>
        /// <returns>Un ok en caso de éxito</returns>
        [HttpPut]
        [Route("api/grupo/noticia/edit")]
        public IActionResult EditarNoticia([FromBody] Noticia noticia)
        {
            _repo.Update(noticia);
            _repo.SaveChanges();
            return Ok("Noticia actualizada correctamente");
        }

        /// <summary>
        /// Petición para eliminar una noticia específica
        /// </summary>
        /// <param name="curso">El curso asociado</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <param name="id">El id de la noticia</param>
        /// <returns>Un ok en caso de éxito</returns>
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
