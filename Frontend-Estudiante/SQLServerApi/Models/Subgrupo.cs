using System;
using System.Collections.Generic;

#nullable disable

namespace SQLServerApi.Models
{
    public partial class Subgrupo
    {
        public Subgrupo()
        {
            EstudianteSubgrupos = new HashSet<EstudianteSubgrupo>();
        }

        public int Id { get; set; }
        public string NombreEvaluacion { get; set; }
        public string NombreRubro { get; set; }
        public int NumeroGrupo { get; set; }
        public string CodigoCurso { get; set; }
        public string Periodo { get; set; }
        public string Anio { get; set; }

        public virtual Evaluacion Evaluacion { get; set; }
        public virtual ICollection<EstudianteSubgrupo> EstudianteSubgrupos { get; set; }
    }
}
