using Microsoft.EntityFrameworkCore;
using SQLServerApi.Models;
using SQLServerApi.Models.DTO;
using SQLServerApi.Models.Views;
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
            if (evaluacionDTO == null)
                throw new ArgumentNullException(nameof(evaluacionDTO));

            var evaluacion = new Evaluacion
            {
                Nombre = evaluacionDTO.Nombre,
                NombreRubro = evaluacionDTO.NombreRubro,
                NumeroGrupo = evaluacionDTO.NumeroGrupo,
                CodigoCurso = evaluacionDTO.CodigoCurso,
                Periodo = evaluacionDTO.Periodo,
                Anio = evaluacionDTO.Anio,
                IndividualGrupal = evaluacionDTO.IndividualGrupal,
                FechaHoraMax = evaluacionDTO.FechaHoraMax,
                Porcentaje = evaluacionDTO.Porcentaje
            };

            // si viene un recibo en base64 hay que parsearlo a byte array
            if (evaluacionDTO.Archivo != null)
                evaluacion.Archivo = Convert.FromBase64String(evaluacionDTO.Archivo);

            _context.Evaluacions.Add(evaluacion);
        }

        public void agregarSubGrupos(List<Subgrupo> subgrupos)
        {
            if (subgrupos.Count == 0)
                throw new ArgumentNullException(nameof(subgrupos));
            
            foreach(var subgrupo in subgrupos)
            {
                _context.Subgrupos.Add(subgrupo);
            }
        }

        public List<EvaluacionView> getEvaluacionesPorRubro(string codigoCurso, string rubro, int grupo, string anio, string periodo)
        {
            return _context.Set<EvaluacionView>().FromSqlRaw($"EXEC spGetEvaluaciones " +
                           $"@Curso = {codigoCurso}, @Rubro = {rubro}, @Grupo = {grupo}, @Anio = {anio}, @Periodo = {periodo}").ToList();
        }
        public bool SaveChanges()
        {
            return (_context.SaveChanges() >= 0);
        }

    }
}
