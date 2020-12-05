using SQLServerApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Reposotories
{
    public class EstudianteRepo
    {
        private readonly XtecDigitalDBContext _context;

        // Inject the Data Base Context
        public EstudianteRepo(XtecDigitalDBContext context)
        {
            _context = context;
        }

        /*public List<ProfesorGrupoView> getGrupos(string cedulaProfesor, string anio, string periodo)
        {
            return _context.Set<ProfesorGrupoView>().FromSqlRaw($"EXEC spGetCursosProfesor " +
                            $"@Profesor = {cedulaProfesor}, @Anio = {anio}, @Periodo = {periodo}").ToList();
        }*/
    }
}
