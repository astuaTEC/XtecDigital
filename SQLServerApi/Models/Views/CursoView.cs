using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Models.Views
{
    public class CursoView
    {
        public string Codigo { get; set; }
        public int Creditos { get; set; }
        public string Carrera { get; set; }
        public string Nombre { get; set; }
    }
}
