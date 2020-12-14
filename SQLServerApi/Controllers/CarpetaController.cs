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

        // se inyecta el repositorio correspondiente
        public CarpetaController(CarpetaRepo repo)
        {
            _repo = repo;
        }

        /// <summary>
        /// Petición para acceder a todas las carpetas de un grupo específico
        /// </summary>
        /// <param name="curso">El curso asociado</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <returns>Un ok en caso de éxito</returns>
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

        /// <summary>
        /// Petición para crear una carpeta
        /// </summary>
        /// <param name="carpeta">La carpeta a crear</param>
        /// <returns>Un ok en caso de éxito</returns>
        [HttpPost]
        [Route("api/grupo/carpeta/new")]
        public IActionResult Create([FromBody] Carpeta carpeta)
        {
            _repo.Create(carpeta);
            _repo.SaveChanges();
            return Ok("Carpeta creada correctamente");
        }

        /// <summary>
        /// Petición para eliminar una carpeta específica
        /// </summary>
        /// <param name="curso">El curso asociado</param>
        /// <param name="grupo">El grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <param name="nombre">El nombre de la carpeta a eliminar</param>
        /// <returns>Un ok en caso de éxito</returns>
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
