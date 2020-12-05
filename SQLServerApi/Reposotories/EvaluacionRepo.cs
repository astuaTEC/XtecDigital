using SQLServerApi.Models;
using SQLServerApi.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Reposotories
{
    public class EvaluacionRepo
    {
        private readonly XtecDigitalDBContext _context;

        // Inject the Data Base Context
        public EvaluacionRepo(XtecDigitalDBContext context)
        {
            _context = context;
        }

        /**
       * ------------------------------
       *         MÉTODOS CRUD
       * ------------------------------
       */

        public void Create(EvaluacionReadDTO evaluacionDTO)
        {
            /*if (evaluacionDTO == null)
                throw new ArgumentNullException(nameof(evaluacionDTO));

            var evaluacion = new Archivo
            {
                Nombre = evaluacionDTO.Nombre,
                NombreCarpeta = evaluacionDTO.NombreCarpeta,
                NumeroGrupo = evaluacionDTO.NumeroGrupo,
                CodigoCurso = evaluacionDTO.CodigoCurso,
                Periodo = evaluacionDTO.Periodo,
                Anio = evaluacionDTO.Anio,
                Tamanio = evaluacionDTO.Tamanio,
                Fecha = evaluacionDTO.Fecha
            };

            // si viene un recibo en base64 hay que parsearlo a byte array
            if (archivoDTO.Archivo != null)
                archivo.Archivo1 = Convert.FromBase64String(archivoDTO.Archivo);

            _context.Archivos.Add(archivo);*/
        }

    }
}
