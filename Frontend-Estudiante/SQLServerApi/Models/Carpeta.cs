using System;
using System.Collections.Generic;

#nullable disable

namespace SQLServerApi.Models
{
    public partial class Carpeta
    {
        public Carpeta()
        {
            Archivos = new HashSet<Archivo>();
        }

        public string Nombre { get; set; }
        public int NumeroGrupo { get; set; }
        public string CodigoCurso { get; set; }
        public string Periodo { get; set; }
        public string Anio { get; set; }
        public string Creador { get; set; }

        public virtual Grupo Grupo { get; set; }
        public virtual ICollection<Archivo> Archivos { get; set; }
    }
}
