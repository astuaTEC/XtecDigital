using Microsoft.AspNetCore.Mvc;
using MongoDBApi.Models;
using MongoDBApi.Repositories;

namespace MongoDBApi.Controllers
{
    [ApiController]
    public class ProfesorController : ControllerBase
    {
        private readonly ProfesorRepo _repo;

        // se inyecta el repositorio correspondiente
        public ProfesorController(ProfesorRepo repo)
        {
            _repo = repo;
        }

        /// <summary>
        /// Petición para acceder a la información personal de un profesor
        /// específico (Excepto la contraseña)
        /// </summary>
        /// <param name="cedula">La cédula del profesor a consultar</param>
        /// <returns>La información correspondiente al profesor</returns>
        [HttpGet]
        [Route("api/profesor/info")]
        public IActionResult GetInfoProfesor([FromQuery] string cedula)
        {
            var resultado = _repo.getInfoProfesor(cedula);

            if (resultado == null)
                return BadRequest("Algo salió mal");
            return Ok(resultado);
        }

        /// <summary>
        /// Petición para acceder a todas las cédulas de
        /// profesores en la base de datos
        /// </summary>
        /// <returns>La lista de cédulas</returns>
        [HttpGet]
        [Route("api/profesores/cedulas")]
        public IActionResult GetCedulas()
        {
            var resultado = _repo.getCedulas();

            if (resultado == null)
                return BadRequest("Algo salió mal");
            return Ok(resultado);
        }

        /// <summary>
        /// Petición para acceder a la información personal (excepto contraseña)
        /// de todos los profesores de la base de datos
        /// </summary>
        /// <returns>La información de todos los profesores</returns>
        [HttpGet]
        [Route("api/profesores/info/all")]
        public IActionResult GetInfoProfesores()
        {
            var resultado = _repo.getInfoProfesores();

            if (resultado == null)
                return BadRequest("Algo salió mal");
            return Ok(resultado);
        }

        /// <summary>
        /// Petición para loguearse como profesor
        /// </summary>
        /// <param name="login">El login a consultar (usuario y contraseña)</param>
        /// <returns>Un ok en caso de éxito</returns>
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
