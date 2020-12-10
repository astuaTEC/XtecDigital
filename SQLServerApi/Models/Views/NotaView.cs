using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Models.Views
{
    public class NotaView
    {
        public string nombreGrupo { get; set; }
        public string carnetEstudiante { get; set; }
        public string nombreRubro { get; set; }
        public int porcentaje { get; set; }
        public double porcentajeObtenido { get; set; }
    }
}
