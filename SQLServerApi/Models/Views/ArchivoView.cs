using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Models.Views
{
    public class ArchivoView
    {
        public string Nombre { get; set; }
        public string Tamanio { get; set; }
        public DateTime Fecha { get; set; }
    }
}
