using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Models.Views
{
    public class EntregableView
    {
        public int Id { get; set; }
        public string CarnetEstudiante { get; set; }
        public int? IdSubGrupo { get; set; }
    }
}
