using Microsoft.AspNetCore.Mvc;
using SQLServerApi.Models;
using SQLServerApi.Reposotories;
using System.Collections.Generic;

namespace SQLServerApi.Controllers
{
    [ApiController]
    public class CursoController : ControllerBase
    {
        private readonly CursoRepo _repo;

        public CursoController(CursoRepo repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Route("api/curso/habilitados/all")]
        public IActionResult GetCursosHabilitados()
        {
            var resultado = _repo.GetCursosHabilitados();
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpGet]
        [Route("api/curso/all")]
        public IActionResult GetCursos()
        {
            var resultado = _repo.GetAll();
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpPost]
        [Route("api/curso/new")]
        public IActionResult AgregarCurso([FromBody] Curso curso)
        {
            _repo.Create(curso);
            _repo.SaveChanges();
            return Ok("Curso creado correctamente");
        }

        [HttpPut]
        [Route("api/curso/edit")]
        public IActionResult EditCurso([FromBody] Curso curso)
        {
            _repo.Update(curso);
            _repo.SaveChanges();
            return Ok("Curso actualizado correctamente");
        }

        [HttpPut]
        [Route("api/curso/editRange")]
        public IActionResult EditCursos([FromBody] List<Curso> cursos)
        {
            _repo.Update(cursos);
            _repo.SaveChanges();
            return Ok("Cursos actualizados correctamente");
        }

    }
}
