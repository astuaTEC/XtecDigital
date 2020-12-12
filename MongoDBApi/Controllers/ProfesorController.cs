using Microsoft.AspNetCore.Mvc;
using MongoDBApi.Models;
using MongoDBApi.Repositories;

namespace MongoDBApi.Controllers
{
    [ApiController]
    public class ProfesorController : ControllerBase
    {
        private readonly ProfesorRepo _repo;

        public ProfesorController(ProfesorRepo repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Route("api/profesor/info")]
        public IActionResult GetInfoProfesor([FromQuery] string cedula)
        {
            var resultado = _repo.getInfoProfesor(cedula);

            if (resultado == null)
                return BadRequest("Algo salió mal");
            return Ok(resultado);
        }

        [HttpGet]
        [Route("api/profesores/cedulas")]
        public IActionResult GetCarnets()
        {
            var resultado = _repo.getCedulas();

            if (resultado == null)
                return BadRequest("Algo salió mal");
            return Ok(resultado);
        }

        [HttpGet]
        [Route("api/profesores/info/all")]
        public IActionResult GetInfoProfesores()
        {
            var resultado = _repo.getInfoProfesores();

            if (resultado == null)
                return BadRequest("Algo salió mal");
            return Ok(resultado);
        }

        [HttpPost]
        [Route("api/profesor/login")]
        public IActionResult Login([FromBody] Login login)
        {
            var resultado = _repo.verificarLogin(login);

            if (resultado == false)
                return BadRequest("Cédula o contaseña incorrectos");
            return Ok(_repo.getInfoProfesor(login.Usuario));
        }
    }
}
