using Microsoft.AspNetCore.Mvc;
using SQLServerApi.Models.DTO;
using SQLServerApi.Reposotories;

namespace SQLServerApi.Controllers
{
    [ApiController]
    public class ArchivoController : ControllerBase
    {
        private readonly ArchivoRepo _repo;

        public ArchivoController(ArchivoRepo repo)
        {
            _repo = repo;
        }

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

        [HttpPost]
        [Route("api/grupo/carpeta/newArchivo")]
        public IActionResult Create([FromBody] ArchivoReadDTO archivo)
        {
            _repo.Create(archivo);
            _repo.SaveChanges();
            return Ok("Archivo subido correctamente");
        }

        [HttpPut]
        [Route("api/grupo/carpeta/updateArchivo")]
        public IActionResult Update([FromBody] ArchivoReadDTO archivo)
        {
            _repo.Update(archivo);
            _repo.SaveChanges();
            return Ok("Archivo actualizado correctamente");
        }

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
