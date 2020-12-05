using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Models.Views
{
    public class EvaluacionView
    {
        public string Nombre { get; set; }
        public string IndividualGrupal { get; set; }
        public DateTime FechaHoraMax { get; set; }
        public int Porcentaje { get; set; }
    }
}
