using Microsoft.AspNetCore.Mvc;
using MongoDBApi.Models;
using MongoDBApi.Repositories;

namespace MongoDBApi.Controllers
{
    [ApiController]
    public class AdministradorController : ControllerBase
    {
        private readonly AdministradorRepo _repo;

        // se inyecta el repositorio correspondiente
        public AdministradorController(AdministradorRepo repo)
        {
            _repo = repo;
        }

        /// <summary>
        /// Petición para acceder la información personal
        /// de un determinado administrador
        /// </summary>
        /// <param name="cedula">La cédula a consultar</param>
        /// <returns>La información personal correspondiente</returns>
        [HttpGet]
        [Route("api/admin/info")]
        public IActionResult GetInfoAdmin([FromQuery] string cedula)
        {
            var resultado = _repo.getInfoAdmin(cedula);

            if (resultado == null)
                return BadRequest("Algo salió mal");
            return Ok(resultado);
        }

        /// <summary>
        /// Petición para loguearse como administrador
        /// </summary>
        /// <param name="login">El login a consultar (usuario y contraseña)</param>
        /// <returns>Un ok en caso de éxito</returns>
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
