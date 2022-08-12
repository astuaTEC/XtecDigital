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

        // se inyecta el repositorio correspondiente
        public RubroController(RubroRepo repo)
        {
            _repo = repo;
        }

        /// <summary>
        /// Petición para acceder a los rubros asociados a un grupo
        /// </summary>
        /// <param name="curso">El curso asociado</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">EL anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <returns>La lista de rubros</returns>
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

        /// <summary>
        /// Petición para crear un nuevo rubro
        /// </summary>
        /// <param name="rubro"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/grupo/rubro/new")]
        public IActionResult Create([FromBody] Rubro rubro)
        {
            _repo.Create(rubro);
            _repo.SaveChanges();
            return Ok("Rubro creado correctamente");
        }

        /// <summary>
        /// Petición para editar una lista de rubros
        /// </summary>
        /// <param name="rubros">La lista de rubros editados</param>
        /// <returns>Un ok en caso de éxito</returns>
        [HttpPut]
        [Route("api/grupo/rubro/edit")]
        public IActionResult Update([FromBody] List<Rubro> rubros)
        {
            _repo.Update(rubros);
            _repo.SaveChanges();
            return Ok("Rubro actualizado correctamente");
        }

        /// <summary>
        /// Petición para eliminar un rubro específico
        /// </summary>
        /// <param name="curso">El curso asociado</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <param name="nombre">El nombre del rubro a eliminar</param>
        /// <returns></returns>
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
