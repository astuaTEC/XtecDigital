using MongoDB.Driver;
using MongoDBApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace MongoDBApi.Repositories
{
    public class ProfesorRepo
    {
        private readonly IMongoDatabase _database;
        private IMongoCollection<Profesor> _profesores;
        public ProfesorRepo(IMongoClient client)
        {
            _database = client.GetDatabase("XtecDigitalDB");
            _profesores = _database.GetCollection<Profesor>("Profesor");
        }

        public List<Profesor> getCedulas()
        {
            return _profesores.Find(x => true).Project<Profesor>("{cedula: 1}").ToList();
        }

        public Profesor getInfoProfesor(string cedula)
        {
            return _profesores.Find(x => x.Cedula == cedula).
                Project<Profesor>("{cedula: 1, primerNombre: 1, segundoNombre: 1, " +
                "primerApellido: 1, segundoApellido: 1, email: 1, telefono: 1}").FirstOrDefault();
        }

        public List<Profesor> getInfoProfesores()
        {
            return _profesores.Find(x => true).
                Project<Profesor>("{cedula: 1, primerNombre: 1, segundoNombre: 1, " +
                "primerApellido: 1, segundoApellido: 1, email: 1, telefono: 1}").ToList();
        }

        public static string MD5Hash(string text)
        {
            var md5 = new MD5CryptoServiceProvider();

            //compute hash from the bytes of text  
            md5.ComputeHash(ASCIIEncoding.ASCII.GetBytes(text));

            //get hash result after compute it  
            byte[] result = md5.Hash;

            StringBuilder strBuilder = new StringBuilder();
            for (int i = 0; i < result.Length; i++)
            {
                //change it into 2 hexadecimal digits  
                //for each byte  
                strBuilder.Append(result[i].ToString("x2"));
            }

            return strBuilder.ToString();
        }
        public bool verificarLogin(Login login)
        {
            var passwordIngresada = MD5Hash(login.password);

            var resultado = _profesores.Find(x => x.Cedula == login.Usuario && x.Password == passwordIngresada).FirstOrDefault();

            if (resultado == null)
                return false;
            return true;
        }

    }
}
