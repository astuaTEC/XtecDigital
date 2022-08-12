using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Models.Views
{
    public class NoticiaView
    {
        public int Id { get; set; }
        public DateTime FechaPublicacion { get; set; }
        public string Titulo { get; set; }
        public string Mensaje { get; set; }
        public string Autor { get; set; }
    }
}
