﻿using Microsoft.AspNetCore.Http;
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
        public IActionResult getEvaluacionesPorRubro([FromQuery] string curso, [FromQuery] string rubro, [FromQuery] int grupo,
            [FromQuery] string anio, [FromQuery] string periodo)
        {
            var resultado = _repo.getEvaluacionesPorRubro(curso, rubro, grupo, anio, periodo);
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
        [Route("api/grupo/evaluacion/subgrupos")]
        public IActionResult AgregarSubGrupos([FromBody] List<Subgrupo> subgrupos)
        {
            _repo.agregarSubGrupos(subgrupos);
            _repo.SaveChanges();
            return Ok("SubGrupos asignados correctamente");
        }
    }
}
