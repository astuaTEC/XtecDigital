using System;
using System.Collections.Generic;

#nullable disable

namespace SQLServerApi.Models
{
    public partial class Rubro
    {
        public Rubro()
        {
            Evaluacions = new HashSet<Evaluacion>();
        }

        public string Nombre { get; set; }
        public int NumeroGrupo { get; set; }
        public string CodigoCurso { get; set; }
        public string Periodo { get; set; }
        public string Anio { get; set; }
        public int? Porcentaje { get; set; }

        public virtual Grupo Grupo { get; set; }
        public virtual ICollection<Evaluacion> Evaluacions { get; set; }
    }
}
