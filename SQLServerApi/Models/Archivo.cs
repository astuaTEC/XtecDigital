using System;
using System.Collections.Generic;

#nullable disable

namespace SQLServerApi.Models
{
    public partial class Archivo
    {
        public string Nombre { get; set; }
        public string NombreCarpeta { get; set; }
        public int NumeroGrupo { get; set; }
        public string CodigoCurso { get; set; }
        public string Periodo { get; set; }
        public string Anio { get; set; }
        public byte[] Archivo1 { get; set; }
        public string Tamanio { get; set; }
        public TimeSpan? Fecha { get; set; }

        public virtual Carpeta Carpeta { get; set; }
    }
}
