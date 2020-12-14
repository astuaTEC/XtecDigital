using MongoDB.Driver;
using MongoDBApi.Models;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace MongoDBApi.Repositories
{
    public class EstudianteRepo
    {
        private readonly IMongoDatabase _database;
        private IMongoCollection<Estudiante> _estudiantes;

        // se inyecta la conexión a la base de datos
        public EstudianteRepo(IMongoClient client)
        {
            _database = client.GetDatabase("XtecDigitalDB");
            _estudiantes = _database.GetCollection<Estudiante>("Estudiante");
        }

        /// <summary>
        /// Método para acceder a todos los estudiantes de la base de datos
        /// </summary>
        /// <returns>La lista con todos los estudiantes</returns>
        public List<Estudiante> getEstudiantes()
        {
            return _estudiantes.Find(x => true).ToList();
        }

        /// <summary>
        /// Método para obtener todos los carnet de los
        /// estudiantes almacenados en la base de datos
        /// </summary>
        /// <returns>La lista con todos los carnet</returns>
        public List<Estudiante> getCarnets()
        {
            return _estudiantes.Find(x => true).Project<Estudiante>("{carnet: 1}").ToList();
        }

        /// <summary>
        /// Método para acceder a la información personal de
        /// un estudiante en específico (excepto la contraseña)
        /// </summary>
        /// <param name="carnet">El carnet del estudiante a consultar</param>
        /// <returns>La información del estudiante</returns>
        public Estudiante getInfoEstudiante(string carnet)
        {
            return _estudiantes.Find(x => x.Carnet == carnet).
                Project<Estudiante>("{carnet: 1, primerNombre: 1, segundoNombre: 1, " +
                "primerApellido: 1, segundoApellido: 1, email: 1, telefono: 1}").FirstOrDefault();
        }

        /// <summary>
        /// Método para acceder a la información personal
        /// de los estudiantes de la base de datos (excepto contraseña)
        /// </summary>
        /// <returns>La lista de estuidantes con su respectiva información</returns>
        public List<Estudiante> getInfoEstudiantes()
        {
            return _estudiantes.Find(x => true).
                Project<Estudiante>("{carnet: 1, primerNombre: 1, segundoNombre: 1, " +
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
        /// Método para verificar el login de un estudiante
        /// </summary>
        /// <param name="login">El login a validar (usuario y contraseña)</param>
        /// <returns>Un true en caso de éxito, false en caso contrario</returns>
        public bool verificarLogin(Login login)
        {
            var passwordIngresada = MD5Hash(login.password);
            
            var resultado = _estudiantes.Find(x => x.Carnet == login.Usuario && x.Password == passwordIngresada).FirstOrDefault();
            
            if (resultado == null)
                return false;
            return true;
        }
    }
}
