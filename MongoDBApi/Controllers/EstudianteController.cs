using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MongoDBApi.Models;
using MongoDBApi.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MongoDBApi.Controllers
{
    [ApiController]
    public class EstudianteController : ControllerBase
    {
        private readonly EstudianteRepo _repo;

        public EstudianteController(EstudianteRepo repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Route("api/estudiantes")]
        public IActionResult Get()
        {
            var resultado = _repo.getEstudiantes();

            if (resultado == null)
                return BadRequest("Algo salió mal");
            return Ok(resultado);
        }

        [HttpGet]
        [Route("api/estudiantes/carnets")]
        public IActionResult GetCarnets()
        {
            var resultado = _repo.getCarnets();

            if (resultado == null)
                return BadRequest("Algo salió mal");
            return Ok(resultado);
        }

        [HttpPost]
        [Route("api/estudiante/login")]
        public IActionResult Login([FromBody] Login login)
        {
            var resultado = _repo.verificarLogin(login);

            if (resultado == false)
                return BadRequest("Carnet o contaseña incorrectos");
            return Ok("Ha iniciado sesión como: " + login.Usuario);
        }
    }
}
