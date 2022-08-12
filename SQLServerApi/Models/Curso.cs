using System;
using System.Collections.Generic;

#nullable disable

namespace SQLServerApi.Models
{
    public partial class Curso
    {
        public Curso()
        {
            Grupos = new HashSet<Grupo>();
        }

        public string Codigo { get; set; }
        public int Creditos { get; set; }
        public string Carrera { get; set; }
        public string Nombre { get; set; }
        public bool? Habilitado { get; set; }

        public virtual ICollection<Grupo> Grupos { get; set; }
    }
}
