using System;
using System.Collections.Generic;

#nullable disable

namespace SQLServerApi.Models
{
    public partial class Grupo
    {
        public Grupo()
        {
            Carpeta = new HashSet<Carpeta>();
            EstudianteGrupos = new HashSet<EstudianteGrupo>();
            Noticia = new HashSet<Noticia>();
            ProfesorGrupos = new HashSet<ProfesorGrupo>();
            Rubros = new HashSet<Rubro>();
        }

        public int Numero { get; set; }
        public string CodigoCurso { get; set; }
        public string Periodo { get; set; }
        public string Anio { get; set; }

        public virtual Curso CodigoCursoNavigation { get; set; }
        public virtual Semestre Semestre { get; set; }
        public virtual ICollection<Carpeta> Carpeta { get; set; }
        public virtual ICollection<EstudianteGrupo> EstudianteGrupos { get; set; }
        public virtual ICollection<Noticia> Noticia { get; set; }
        public virtual ICollection<ProfesorGrupo> ProfesorGrupos { get; set; }
        public virtual ICollection<Rubro> Rubros { get; set; }
    }
}
