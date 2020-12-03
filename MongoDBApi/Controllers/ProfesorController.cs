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

        [HttpPost]
        [Route("api/profesor/login")]
        public IActionResult Login([FromBody] Login login)
        {
            var resultado = _repo.verificarLogin(login);

            if (resultado == false)
                return BadRequest("Cédula o contaseña incorrectos");
            return Ok("Ha iniciado sesión como: " + login.Usuario);
        }
    }
}
