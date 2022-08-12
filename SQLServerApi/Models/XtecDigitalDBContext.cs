using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using SQLServerApi.Models.Views;

#nullable disable

namespace SQLServerApi.Models
{
    public partial class XtecDigitalDBContext : DbContext
    {
        public XtecDigitalDBContext()
        {
        }

        public XtecDigitalDBContext(DbContextOptions<XtecDigitalDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Archivo> Archivos { get; set; }
        public virtual DbSet<Carpeta> Carpeta { get; set; }
        public virtual DbSet<Curso> Cursos { get; set; }
        public virtual DbSet<Entregable> Entregables { get; set; }
        public virtual DbSet<EstudianteGrupo> EstudianteGrupos { get; set; }
        public virtual DbSet<EstudianteSubgrupo> EstudianteSubgrupos { get; set; }
        public virtual DbSet<Evaluacion> Evaluacions { get; set; }
        public virtual DbSet<Grupo> Grupos { get; set; }
        public virtual DbSet<Noticia> Noticia { get; set; }
        public virtual DbSet<ProfesorGrupo> ProfesorGrupos { get; set; }
        public virtual DbSet<Rubro> Rubros { get; set; }
        public virtual DbSet<Semestre> Semestres { get; set; }
        public virtual DbSet<Subgrupo> Subgrupos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Archivo>(entity =>
            {
                entity.HasKey(e => new { e.Nombre, e.NombreCarpeta, e.NumeroGrupo, e.CodigoCurso, e.Periodo, e.Anio })
                    .HasName("PK__ARCHIVO__F1117BA3580796FF");

                entity.ToTable("ARCHIVO");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NombreCarpeta)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CodigoCurso)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Periodo)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Anio)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.Archivo1).HasColumnName("Archivo");

                entity.Property(e => e.Tamanio)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.Carpeta)
                    .WithMany(p => p.Archivos)
                    .HasForeignKey(d => new { d.NombreCarpeta, d.NumeroGrupo, d.CodigoCurso, d.Periodo, d.Anio })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ARCHIVO__14270015");
            });

            modelBuilder.Entity<Carpeta>(entity =>
            {
                entity.HasKey(e => new { e.Nombre, e.NumeroGrupo, e.CodigoCurso, e.Periodo, e.Anio })
                    .HasName("PK__CARPETA__87467D8646EAA813");

                entity.ToTable("CARPETA");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CodigoCurso)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Periodo)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Anio)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.Creador)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Grupo)
                    .WithMany(p => p.Carpeta)
                    .HasForeignKey(d => new { d.NumeroGrupo, d.CodigoCurso, d.Periodo, d.Anio })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__CARPETA__123EB7A3");
            });

            modelBuilder.Entity<Curso>(entity =>
            {
                entity.HasKey(e => e.Codigo)
                    .HasName("PK__CURSO__06370DAD7952102A");

                entity.ToTable("CURSO");

                entity.Property(e => e.Codigo)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Carrera)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Nombre)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Entregable>(entity =>
            {
                entity.HasKey(e => new { e.Id, e.CarnetEstudiante })
                    .HasName("PK__ENTREGAB__581711DE42F61EE3");

                entity.ToTable("ENTREGABLE");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.CarnetEstudiante)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Anio)
                    .IsRequired()
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.ArchivoEntregable).IsRequired();

                entity.Property(e => e.CodigoCurso)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.NombreEvaluacion)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NombreRubro)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Observaciones)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.Periodo)
                    .IsRequired()
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.HasOne(d => d.Evaluacion)
                    .WithMany(p => p.Entregables)
                    .HasForeignKey(d => new { d.NombreEvaluacion, d.NombreRubro, d.NumeroGrupo, d.CodigoCurso, d.Periodo, d.Anio })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ENTREGABLE__17F790F9");
            });

            modelBuilder.Entity<EstudianteGrupo>(entity =>
            {
                entity.HasKey(e => new { e.CarnetEstudiante, e.NumeroGrupo, e.CodigoCurso, e.Periodo, e.Anio })
                    .HasName("PK__ESTUDIAN__529A4FDF9CA6CFDC");

                entity.ToTable("ESTUDIANTE_GRUPO");

                entity.Property(e => e.CarnetEstudiante)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.CodigoCurso)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Periodo)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Anio)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.HasOne(d => d.Grupo)
                    .WithMany(p => p.EstudianteGrupos)
                    .HasForeignKey(d => new { d.NumeroGrupo, d.CodigoCurso, d.Periodo, d.Anio })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ESTUDIANTE_GRUPO__160F4887");
            });

            modelBuilder.Entity<EstudianteSubgrupo>(entity =>
            {
                entity.HasKey(e => new { e.IdSubGrupo, e.NombreEvaluacion, e.NombreRubro, e.NumeroGrupo, e.CodigoCurso, e.Periodo, e.Anio, e.CarnetEstudiante })
                    .HasName("PK__ESTUDIAN__527E9FDEA691BD61");

                entity.ToTable("ESTUDIANTE_SUBGRUPO");

                entity.Property(e => e.NombreEvaluacion)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NombreRubro)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CodigoCurso)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Periodo)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Anio)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.CarnetEstudiante)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.Subgrupo)
                    .WithMany(p => p.EstudianteSubgrupos)
                    .HasForeignKey(d => new { d.IdSubGrupo, d.NombreEvaluacion, d.NombreRubro, d.NumeroGrupo, d.CodigoCurso, d.Periodo, d.Anio })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__ESTUDIANTE_SUBGR__2EDAF651");
            });

            modelBuilder.Entity<Evaluacion>(entity =>
            {
                entity.HasKey(e => new { e.Nombre, e.NombreRubro, e.NumeroGrupo, e.CodigoCurso, e.Periodo, e.Anio })
                    .HasName("PK__EVALUACI__7D0D91AA01B1BC7C");

                entity.ToTable("EVALUACION");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NombreRubro)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CodigoCurso)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Periodo)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Anio)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.FechaHoraMax).HasColumnType("datetime");

                entity.Property(e => e.IndividualGrupal)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.HasOne(d => d.Rubro)
                    .WithMany(p => p.Evaluacions)
                    .HasForeignKey(d => new { d.NombreRubro, d.NumeroGrupo, d.CodigoCurso, d.Periodo, d.Anio })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__EVALUACION__1332DBDC");
            });

            modelBuilder.Entity<Grupo>(entity =>
            {
                entity.HasKey(e => new { e.Numero, e.CodigoCurso, e.Periodo, e.Anio })
                    .HasName("PK__GRUPO__25CF782CE8FF36BE");

                entity.ToTable("GRUPO");

                entity.Property(e => e.CodigoCurso)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Periodo)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Anio)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.HasOne(d => d.CodigoCursoNavigation)
                    .WithMany(p => p.Grupos)
                    .HasForeignKey(d => d.CodigoCurso)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__GRUPO__CodigoCur__0F624AF8");

                entity.HasOne(d => d.Semestre)
                    .WithMany(p => p.Grupos)
                    .HasForeignKey(d => new { d.Periodo, d.Anio })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__GRUPO__10566F31");
            });

            modelBuilder.Entity<Noticia>(entity =>
            {
                entity.HasKey(e => new { e.Id, e.NumeroGrupo, e.CodigoCurso, e.Periodo, e.Anio })
                    .HasName("PK__NOTICIA__C0B17E4F855BFA00");

                entity.ToTable("NOTICIA");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.CodigoCurso)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Periodo)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Anio)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.Property(e => e.Autor)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.FechaPublicacion).HasColumnType("datetime");

                entity.Property(e => e.Mensaje)
                    .IsRequired()
                    .HasMaxLength(200)
                    .IsUnicode(false);

                entity.Property(e => e.Titulo)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false);

                entity.HasOne(d => d.Grupo)
                    .WithMany(p => p.Noticia)
                    .HasForeignKey(d => new { d.NumeroGrupo, d.CodigoCurso, d.Periodo, d.Anio })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__NOTICIA__18EBB532");
            });

            modelBuilder.Entity<ProfesorGrupo>(entity =>
            {
                entity.HasKey(e => new { e.CedulaProfesor, e.NumeroGrupo, e.CodigoCurso, e.Periodo, e.Anio })
                    .HasName("PK__PROFESOR__7BC2D722B905FE03");

                entity.ToTable("PROFESOR_GRUPO");

                entity.Property(e => e.CedulaProfesor)
                    .HasMaxLength(9)
                    .IsUnicode(false);

                entity.Property(e => e.CodigoCurso)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Periodo)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Anio)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.HasOne(d => d.Grupo)
                    .WithMany(p => p.ProfesorGrupos)
                    .HasForeignKey(d => new { d.NumeroGrupo, d.CodigoCurso, d.Periodo, d.Anio })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__PROFESOR_GRUPO__17036CC0");
            });

            modelBuilder.Entity<Rubro>(entity =>
            {
                entity.HasKey(e => new { e.Nombre, e.NumeroGrupo, e.CodigoCurso, e.Periodo, e.Anio })
                    .HasName("PK__RUBRO__87467D86E639EC5F");

                entity.ToTable("RUBRO");

                entity.Property(e => e.Nombre)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CodigoCurso)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Periodo)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Anio)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.HasOne(d => d.Grupo)
                    .WithMany(p => p.Rubros)
                    .HasForeignKey(d => new { d.NumeroGrupo, d.CodigoCurso, d.Periodo, d.Anio })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__RUBRO__114A936A");
            });

            modelBuilder.Entity<Semestre>(entity =>
            {
                entity.HasKey(e => new { e.Periodo, e.Anio })
                    .HasName("PK__SEMESTRE__2CA1DAC1817C0E2D");

                entity.ToTable("SEMESTRE");

                entity.Property(e => e.Periodo)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Anio)
                    .HasMaxLength(4)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Subgrupo>(entity =>
            {
                entity.HasKey(e => new { e.Id, e.NombreEvaluacion, e.NombreRubro, e.NumeroGrupo, e.CodigoCurso, e.Periodo, e.Anio })
                    .HasName("PK__SUBGRUPO__D5B544028AE572F7");

                entity.ToTable("SUBGRUPO");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.NombreEvaluacion)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.NombreRubro)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CodigoCurso)
                    .HasMaxLength(10)
                    .IsUnicode(false);

                entity.Property(e => e.Periodo)
                    .HasMaxLength(1)
                    .IsUnicode(false);

                entity.Property(e => e.Anio)
                    .HasMaxLength(4)
                    .IsUnicode(false);

                entity.HasOne(d => d.Evaluacion)
                    .WithMany(p => p.Subgrupos)
                    .HasForeignKey(d => new { d.NombreEvaluacion, d.NombreRubro, d.NumeroGrupo, d.CodigoCurso, d.Periodo, d.Anio })
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__SUBGRUPO__2BFE89A6");
            });

            modelBuilder.Entity<GrupoSemestreView>().HasNoKey().ToView(null);
            modelBuilder.Entity<RubroView>().HasNoKey().ToView(null);
            modelBuilder.Entity<CarpetaView>().HasNoKey().ToView(null);
            modelBuilder.Entity<ArchivoView>().HasNoKey().ToView(null);
            modelBuilder.Entity<DataView>().HasNoKey().ToView(null);
            modelBuilder.Entity<EvaluacionView>().HasNoKey().ToView(null);
            modelBuilder.Entity<EntregableView>().HasNoKey().ToView(null);
            modelBuilder.Entity<NoticiaView>().HasNoKey().ToView(null);
            modelBuilder.Entity<EstudianteGrupoView>().HasNoKey().ToView(null);
            modelBuilder.Entity<EstudianteGrupoView>().HasNoKey().ToView(null);
            modelBuilder.Entity<NotaView>().HasNoKey().ToView(null);
            modelBuilder.Entity<EntregableEstudianteView>().HasNoKey().ToView(null);
            modelBuilder.Entity<CarnetView>().HasNoKey().ToView(null);

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
