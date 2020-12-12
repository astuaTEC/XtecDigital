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

        public SemestreController(SemestreRepo repo)
        {
            _repo = repo;
        }

        [HttpPost]
        [Route("api/semestre/new")]
        public IActionResult Create([FromBody] Semestre semestre)
        {
            _repo.Create(semestre);
            _repo.SaveChanges();
            return Ok("Semestre creado correctamente");
        }

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
