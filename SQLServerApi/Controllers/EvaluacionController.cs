using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SQLServerApi.Models;
using SQLServerApi.Models.DTO;
using SQLServerApi.Reposotories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Controllers
{
    [ApiController]
    public class EvaluacionController : ControllerBase
    {
        private readonly EvaluacionRepo _repo;

        public EvaluacionController(EvaluacionRepo repo)
        {
            _repo = repo;
        }

        [HttpGet]
        [Route("api/grupo/rubro/evaluaciones")]
        public IActionResult GetEvaluacionesPorRubro([FromQuery] string curso, [FromQuery] string rubro, [FromQuery] int grupo,
            [FromQuery] string anio, [FromQuery] string periodo)
        {
            var resultado = _repo.getEvaluacionesPorRubro(curso, rubro, grupo, anio, periodo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpGet]
        [Route("api/grupo/rubro/evaluacion/archivo")]
        public IActionResult GetArchivoEvaluacion([FromQuery] string curso, [FromQuery] string rubro, [FromQuery] string nombre,
            [FromQuery] int grupo, [FromQuery] string anio, [FromQuery] string periodo)
        {
            var resultado = _repo.getArchivoEvaluacion(curso, rubro, nombre, grupo, anio, periodo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpGet]
        [Route("api/grupo/rubro/evaluacion/entregable/archivo")]
        public IActionResult GetArchivoEntregable([FromQuery] string curso, [FromQuery] string rubro, [FromQuery] string nombre,
            [FromQuery] int grupo, [FromQuery] string anio, [FromQuery] string periodo, [FromQuery] string carnet, [FromQuery] string id)
        {
            var resultado = _repo.getArchivoEntregable(curso, rubro, nombre, grupo, anio, periodo, carnet, id);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpGet]
        [Route("api/grupo/rubro/evaluacion/entregables")]
        public IActionResult GetEntregablesEvaluacion([FromQuery] string curso, [FromQuery] string rubro, [FromQuery] string nombre,
            [FromQuery] int grupo, [FromQuery] string anio, [FromQuery] string periodo)
        {
            var resultado = _repo.getEntregablesEvaluacion(curso, rubro, nombre, grupo, anio, periodo);
            if (resultado == null)
                return BadRequest("Ha ocurrido un error");
            return Ok(resultado);
        }

        [HttpPost]
        [Route("api/grupo/evaluacion/new")]
        public IActionResult Create([FromBody] EvaluacionReadDTO evaluacion)
        {
            _repo.Create(evaluacion);
            _repo.SaveChanges();
            return Ok("Evaluación asignada correctamente");
        }

        [HttpPost]
        [Route("api/grupo/evaluacion/entregable/new")]
        public IActionResult CreateEntregable([FromBody] EntregableReadDTO entregable)
        {
            _repo.CreateEntregable(entregable);
            _repo.SaveChanges();
            return Ok("Entregable subido correctamente");
        }

        [HttpPost]
        [Route("api/grupo/evaluacion/subgrupos")]
        public IActionResult AgregarSubGrupos([FromBody] List<Subgrupo> subgrupos)
        {
            _repo.agregarSubGrupos(subgrupos);
            _repo.SaveChanges();
            return Ok("SubGrupos asignados correctamente");
        }

        [HttpPost]
        [Route("api/grupo/evaluacion/entregable/calificar")]
        public IActionResult CalificarEntregable([FromBody] EntregableReadDTO entregable)
        {
            _repo.CalificarEntregable(entregable);
            //_repo.SaveChanges();
            return Ok("Entregable calificado correctamente");
        }

        [HttpPost]
        [Route("api/grupo/evaluacion/publicarNotas")]
        public IActionResult PublicarNotas([FromQuery] string curso, [FromQuery] string rubro, [FromQuery] string nombre,
            [FromQuery] int grupo, [FromQuery] string anio, [FromQuery] string periodo, [FromQuery] string profesor)
        {
            _repo.publicarNotas(curso, rubro, nombre, grupo, anio, periodo, profesor);

            return Ok("Notas publicadas correctamente");
        }
    }
}
