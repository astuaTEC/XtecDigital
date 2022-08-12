using System;
using System.Collections.Generic;

#nullable disable

namespace SQLServerApi.Models
{
    public partial class Semestre
    {
        public Semestre()
        {
            Grupos = new HashSet<Grupo>();
        }

        public string Periodo { get; set; }
        public string Anio { get; set; }

        public virtual ICollection<Grupo> Grupos { get; set; }
    }
}
