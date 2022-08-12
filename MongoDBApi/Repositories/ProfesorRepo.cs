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

        // se inyecta la conexión a la base de datos
        public ProfesorRepo(IMongoClient client)
        {
            _database = client.GetDatabase("XtecDigitalDB");
            _profesores = _database.GetCollection<Profesor>("Profesor");
        }

        /// <summary>
        /// Método para acceder a todas las cédulas pertenecientes
        /// a profesores guardados en la base de datos
        /// </summary>
        /// <returns>La lista de cédulas pertenecientes a los profesores</returns>
        public List<Profesor> getCedulas()
        {
            return _profesores.Find(x => true).Project<Profesor>("{cedula: 1}").ToList();
        }

        /// <summary>
        /// Método para acceder la información personal de un profesor
        /// específico (excepto la contraseña)
        /// </summary>
        /// <param name="cedula">La cédula del profesor a consultar</param>
        /// <returns>La información correspondiente</returns>
        public Profesor getInfoProfesor(string cedula)
        {
            return _profesores.Find(x => x.Cedula == cedula).
                Project<Profesor>("{cedula: 1, primerNombre: 1, segundoNombre: 1, " +
                "primerApellido: 1, segundoApellido: 1, email: 1, telefono: 1}").FirstOrDefault();
        }

        /// <summary>
        /// Método para acceder a la información personal de todos
        /// los profesores guardados en la base de datos (excepto la contraseña)
        /// </summary>
        /// <returns>La lista de profesores con su respectiva información</returns>
        public List<Profesor> getInfoProfesores()
        {
            return _profesores.Find(x => true).
                Project<Profesor>("{cedula: 1, primerNombre: 1, segundoNombre: 1, " +
                "primerApellido: 1, segundoApellido: 1, email: 1, telefono: 1}").ToList();
        }

        /// <summary>
        /// Método para encriptar una contraseña
        /// usando encriptado MD5
        /// </summary>
        /// <param name="text"></param>
        /// <returns></returns>
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

        /// <summary>
        /// Método para verificar el login de un profesor
        /// </summary>
        /// <param name="login">El login a validar (usuario y contraseña)</param>
        /// <returns>Un true en caso de éxito, false en caso contrario</returns>
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
