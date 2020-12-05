using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SQLServerApi.Models;
using SQLServerApi.Reposotories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Controllers
{
    [ApiController]
    public class NoticiaController : ControllerBase
    {
        private readonly NoticiaRepo _repo;

        public NoticiaController(NoticiaRepo repo)
        {
            _repo = repo;
        }

        [HttpPost]
        [Route("api/grupo/noticia/new")]
        public IActionResult NuevaNoticia([FromBody] Noticia notica)
        {
            _repo.Create(notica);
            _repo.SaveChanges();
            return Ok("Noticia agregada correctamente");
        }
    }
}
