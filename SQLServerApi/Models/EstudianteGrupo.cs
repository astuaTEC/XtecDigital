using System;
using System.Collections.Generic;

#nullable disable

namespace SQLServerApi.Models
{
    public partial class EstudianteGrupo
    {
        public string CarnetEstudiante { get; set; }
        public int NumeroGrupo { get; set; }
        public string CodigoCurso { get; set; }
        public string Periodo { get; set; }
        public string Anio { get; set; }

        public virtual Grupo Grupo { get; set; }
    }
}
