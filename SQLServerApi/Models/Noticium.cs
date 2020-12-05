using System;
using System.Collections.Generic;

#nullable disable

namespace SQLServerApi.Models
{
    public partial class Noticium
    {
        public int Id { get; set; }
        public int NumeroGrupo { get; set; }
        public string CodigoCurso { get; set; }
        public string Periodo { get; set; }
        public string Anio { get; set; }
        public DateTime FechaPublicacion { get; set; }
        public string Titulo { get; set; }
        public string Mensaje { get; set; }
        public string Autor { get; set; }

        public virtual Grupo Grupo { get; set; }
    }
}
