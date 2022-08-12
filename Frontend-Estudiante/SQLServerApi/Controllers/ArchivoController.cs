using Microsoft.AspNetCore.Mvc;
using SQLServerApi.Models.DTO;
using SQLServerApi.Reposotories;

namespace SQLServerApi.Controllers
{
    [ApiController]
    public class ArchivoController : ControllerBase
    {
        private readonly ArchivoRepo _repo;
        
        // se inyecta el repositorio correspondiente
        public ArchivoController(ArchivoRepo repo)
        {
            _repo = repo;
        }

        /// <summary>
        /// Petición para acceder a los archivos disponibles en una carpeta
        /// </summary>
        /// <param name="curso">El curso asociado</param>
        /// <param name="carpeta">El nombre de la carpeta a buscar</param>
        /// <param name="grupo">El número de grupo al que pertenece la carpeta</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <returns>Una lista de los archivos encontrados</returns>
        [HttpGet]
        [Route("api/grupo/carpeta/archivos")]
        public IActionResult GetArchivos([FromQuery] string curso, [FromQuery] string carpeta, [FromQuery] int grupo,
            [FromQuery] string anio, [FromQuery] string periodo)
        {
            var resultado = _repo.getArchivos(curso, carpeta, grupo, anio, periodo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        /// <summary>
        /// Petición para acceder al archivo base64 específico
        /// </summary>
        /// <param name="curso">El curso asociado</param>
        /// <param name="carpeta">La carpeta donde está el archivo</param>
        /// <param name="nombre">El nombre del archivo</param>
        /// <param name="grupo">El número de grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El periodo asociado</param>
        /// <returns>El archivo base64</returns>
        [HttpGet]
        [Route("api/grupo/carpeta/archivo/data")]
        public IActionResult GetArchivo([FromQuery] string curso, [FromQuery] string carpeta, [FromQuery] string nombre,
            [FromQuery] int grupo, [FromQuery] string anio, [FromQuery] string periodo)
        {
            var resultado = _repo.getArchivoData(curso, carpeta, nombre, grupo, anio, periodo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        /// <summary>
        /// Petición para crear un nuevo archivo
        /// </summary>
        /// <param name="archivo">El archivo a crear</param>
        /// <returns>Un ok en caso de éxito</returns>
        [HttpPost]
        [Route("api/grupo/carpeta/newArchivo")]
        public IActionResult Create([FromBody] ArchivoReadDTO archivo)
        {
            _repo.Create(archivo);
            _repo.SaveChanges();
            return Ok("Archivo subido correctamente");
        }

        /// <summary>
        /// Petición para actualizar un archivo específico
        /// </summary>
        /// <param name="archivo">El archivo con los cambios hechos</param>
        /// <returns>Un ok en caso de éxitp</returns>
        [HttpPut]
        [Route("api/grupo/carpeta/updateArchivo")]
        public IActionResult Update([FromBody] ArchivoReadDTO archivo)
        {
            _repo.Update(archivo);
            _repo.SaveChanges();
            return Ok("Archivo actualizado correctamente");
        }

        /// <summary>
        /// Petición para eliminar un archivo específico
        /// </summary>
        /// <param name="curso">El curso asociado</param>
        /// <param name="grupo">EL grupo asociado</param>
        /// <param name="anio">El anio asociado</param>
        /// <param name="periodo">El perido asociado</param>
        /// <param name="carpeta">La carpeta a la que pertenece el archivo</param>
        /// <param name="nombre">El nombre del archivo a eliminar</param>
        /// <returns>Un ok en caso de éxito</returns>
        [HttpDelete]
        [Route("api/grupo/carpeta/archivo/delete")]
        public IActionResult Delete([FromQuery] string curso, [FromQuery] int grupo,
            [FromQuery] string anio, [FromQuery] string periodo, [FromQuery] string carpeta, [FromQuery] string nombre)
        {
            _repo.Delete(curso, grupo, anio, periodo, carpeta, nombre);
            _repo.SaveChanges();
            return Ok("Archivo eliminado correctamente");
        }
    }
}
