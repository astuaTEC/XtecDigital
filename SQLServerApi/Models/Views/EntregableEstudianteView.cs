using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Models.Views
{
    public class EntregableEstudianteView
    {
        public int Id { get; set; }
        public string CarnetEstudiante { get; set; }
        public int Nota { get; set; }
        public string Observaciones { get; set; }
        public bool Publico { get; set; }
        public bool Evaluado { get; set; }
    }
}
