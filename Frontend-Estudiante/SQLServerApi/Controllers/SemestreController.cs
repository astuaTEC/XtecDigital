using Microsoft.AspNetCore.Mvc;
using SQLServerApi.Models;
using SQLServerApi.Models.DTO;
using SQLServerApi.Reposotories;
using System.Collections.Generic;

namespace SQLServerApi.Controllers
{
    [ApiController]
    public class SemestreController : ControllerBase
    {
        private readonly SemestreRepo _repo;

        // se inyecta el repositorio correspondiente
        public SemestreController(SemestreRepo repo)
        {
            _repo = repo;
        }

        /// <summary>
        /// Petición para crear un semestre de manera manual
        /// </summary>
        /// <param name="semestre">El semestre a crear</param>
        /// <returns>Un ok en caso de éxito</returns>
        [HttpPost]
        [Route("api/semestre/new")]
        public IActionResult Create([FromBody] Semestre semestre)
        {
            _repo.Create(semestre);
            _repo.SaveChanges();
            return Ok("Semestre creado correctamente");
        }

        /// <summary>
        /// Petición para crear un semestre a partir de un archivo excel
        /// </summary>
        /// <param name="semestre">El semestre a inicializar</param>
        /// <returns>Un ok en caso de éxito</returns>
        [HttpPost]
        [Route("api/semestre/newExcel")]
        public IActionResult CreateFromExcel([FromBody] IEnumerable<SemestreExcel> semestre)
        {
            _repo.CreateFromExcel(semestre);
            _repo.SaveChanges();
            return Ok("Semestre creado correctamente");
        }
    }
}
