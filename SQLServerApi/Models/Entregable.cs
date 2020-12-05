using System;
using System.Collections.Generic;

#nullable disable

namespace SQLServerApi.Models
{
    public partial class Entregable
    {
        public int Id { get; set; }
        public string CarnetEstudiante { get; set; }
        public int? Nota { get; set; }
        public string Observaciones { get; set; }
        public byte[] ArchivoRetroAlimentacion { get; set; }
        public byte[] ArchivoEntregable { get; set; }
        public bool? Publico { get; set; }
        public bool? Evaluado { get; set; }
        public string NombreEvaluacion { get; set; }
        public string NombreRubro { get; set; }
        public int NumeroGrupo { get; set; }
        public string CodigoCurso { get; set; }
        public string Periodo { get; set; }
        public string Anio { get; set; }

        public virtual Evaluacion Evaluacion { get; set; }
    }
}
