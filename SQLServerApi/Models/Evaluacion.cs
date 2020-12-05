using System;
using System.Collections.Generic;

#nullable disable

namespace SQLServerApi.Models
{
    public partial class Evaluacion
    {
        public Evaluacion()
        {
            Entregables = new HashSet<Entregable>();
            Subgrupos = new HashSet<Subgrupo>();
        }

        public string Nombre { get; set; }
        public string NombreRubro { get; set; }
        public int NumeroGrupo { get; set; }
        public string CodigoCurso { get; set; }
        public string Periodo { get; set; }
        public string Anio { get; set; }
        public string Creador { get; set; }
        public string IndividualGrupal { get; set; }
        public DateTime FechaHoraMax { get; set; }
        public byte[] Archivo { get; set; }
        public int? Porcentaje { get; set; }

        public virtual Rubro Rubro { get; set; }
        public virtual ICollection<Entregable> Entregables { get; set; }
        public virtual ICollection<Subgrupo> Subgrupos { get; set; }
    }
}
