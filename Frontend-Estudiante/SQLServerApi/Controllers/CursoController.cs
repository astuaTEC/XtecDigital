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

        // se inyecta el repositorio correspondiente
        public CursoController(CursoRepo repo)
        {
            _repo = repo;
        }

        /// <summary>
        /// Petición para acceder a los cursos habilitados
        /// </summary>
        /// <returns>Una lista con los cursos habilitados</returns>
        [HttpGet]
        [Route("api/curso/habilitados/all")]
        public IActionResult GetCursosHabilitados()
        {
            var resultado = _repo.GetCursosHabilitados();
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        /// <summary>
        /// Petición para acceder a todos los cursos, estén o no disponibles
        /// </summary>
        /// <returns>La lista con todos los cursos</returns>
        [HttpGet]
        [Route("api/curso/all")]
        public IActionResult GetCursos()
        {
            var resultado = _repo.GetAll();
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        /// <summary>
        /// Petición para agregar un nuevo curso a la base de datos
        /// </summary>
        /// <param name="curso"></param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/curso/new")]
        public IActionResult AgregarCurso([FromBody] Curso curso)
        {
            _repo.Create(curso);
            _repo.SaveChanges();
            return Ok("Curso creado correctamente");
        }

        /// <summary>
        /// Petición para editar un curso en específico
        /// </summary>
        /// <param name="curso">El curso editado</param>
        /// <returns>Un ok en caso de éxito</returns>
        [HttpPut]
        [Route("api/curso/edit")]
        public IActionResult EditCurso([FromBody] Curso curso)
        {
            _repo.Update(curso);
            _repo.SaveChanges();
            return Ok("Curso actualizado correctamente");
        }

        /// <summary>
        /// Petición para editar una lista de cursos
        /// </summary>
        /// <param name="cursos">La lista de cursos editados</param>
        /// <returns>Un ok en caso de éxito</returns>
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
