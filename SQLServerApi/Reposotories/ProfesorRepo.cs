using Microsoft.EntityFrameworkCore;
using SQLServerApi.Models;
using SQLServerApi.Models.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SQLServerApi.Reposotories
{
    public class ProfesorRepo
    {
        private readonly XtecDigitalDBContext _context;

        // Inject the Data Base Context
        public ProfesorRepo(XtecDigitalDBContext context)
        {
            _context = context;
        }

        public List<ProfesorGrupoView> getGrupos(string cedulaProfesor)
        {
            return _context.Set<ProfesorGrupoView>().FromSqlRaw($"EXEC spGetCursosProfesor @Profesor = {cedulaProfesor}").ToList();
        }
    }
}
