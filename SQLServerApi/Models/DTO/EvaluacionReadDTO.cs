using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Models.DTO
{
    public class EvaluacionReadDTO
    {
        public string Nombre { get; set; }
        public string NombreRubro { get; set; }
        public int NumeroGrupo { get; set; }
        public string CodigoCurso { get; set; }
        public string Periodo { get; set; }
        public string Anio { get; set; }
        public string IndividualGrupal { get; set; }
        public DateTime FechaHoraMax { get; set; }
        public string Archivo { get; set; }
        public int Porcentaje { get; set; }
    }
}
