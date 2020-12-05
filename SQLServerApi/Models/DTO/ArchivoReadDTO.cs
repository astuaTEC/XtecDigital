using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Models.DTO
{
    public class ArchivoReadDTO
    {
        public string Nombre { get; set; }
        public string NombreCarpeta { get; set; }
        public int NumeroGrupo { get; set; }
        public string CodigoCurso { get; set; }
        public string Periodo { get; set; }
        public string Anio { get; set; }
        public string Archivo { get; set; }
        public string Tamanio { get; set; }
        public TimeSpan Fecha { get; set; }
    }
}
