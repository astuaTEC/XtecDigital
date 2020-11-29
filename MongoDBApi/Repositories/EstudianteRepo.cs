using MongoDB.Driver;
using MongoDBApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MongoDBApi.Repositories
{
    public class EstudianteRepo
    {
        private readonly IMongoDatabase _database;
        private IMongoCollection<Estudiante> _estudiantes;
        public EstudianteRepo(IMongoClient client)
        {
            _database = client.GetDatabase("XtecDigitalDB");
            _estudiantes = _database.GetCollection<Estudiante>("Estudiante");
        }

        public List<Estudiante> getEstudiantes()
        {
            return _estudiantes.Find(x => true).ToList();
        }
    }
}
