using System;
using System.Collections.Generic;

#nullable disable

namespace SQLServerApi.Models
{
    public partial class EstudianteSubgrupo
    {
        public int IdSubGrupo { get; set; }
        public string NombreEvaluacion { get; set; }
        public string NombreRubro { get; set; }
        public int NumeroGrupo { get; set; }
        public string CodigoCurso { get; set; }
        public string Periodo { get; set; }
        public string Anio { get; set; }
        public string CarnetEstudiante { get; set; }

        public virtual Subgrupo Subgrupo { get; set; }
    }
}
