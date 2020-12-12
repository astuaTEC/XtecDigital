using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Models.DTO
{
    public class SemestreExcel
    {
        public int Id { get; set; }
        public string Anio { get; set; }
        public string Periodo { get; set; }
        public string CodigoCurso { get; set; }
        public int NumeroGrupo { get; set; }
        public string CarnetEstudiante { get; set; }
        public string Profesor1 { get; set; }
        public string Profesor2 { get; set; }
    }
}
