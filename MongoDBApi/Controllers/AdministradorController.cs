using Microsoft.AspNetCore.Mvc;
using MongoDBApi.Models;
using MongoDBApi.Repositories;

namespace MongoDBApi.Controllers
{
    [ApiController]
    public class AdministradorController : ControllerBase
    {
        private readonly AdministradorRepo _repo;

        public AdministradorController(AdministradorRepo repo)
        {
            _repo = repo;
        }

        [HttpPost]
        [Route("api/admin/login")]
        public IActionResult Login([FromBody] Login login)
        {
            var resultado = _repo.verificarLogin(login);

            if (resultado == false)
                return BadRequest("Cédula o contaseña incorrectos");
            return Ok("Ha iniciado sesión como: " + login.Usuario);
        }
    }
}
