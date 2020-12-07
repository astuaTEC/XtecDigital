using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Models.DTO
{
    public class EntregableReadDTO
    {
        public int Id { get; set; }
        public string CarnetEstudiante { get; set; }
        public int Nota { get; set; }
        public string Observaciones { get; set; }
        public string ArchivoRetroAlimentacion { get; set; }
        public string ArchivoEntregable { get; set; }
        public string NombreEvaluacion { get; set; }
        public string NombreRubro { get; set; }
        public int NumeroGrupo { get; set; }
        public string CodigoCurso { get; set; }
        public string Periodo { get; set; }
        public string Anio { get; set; }
        public bool? Publico { get; set; }
        public bool? Evaluado { get; set; }
    }
}
