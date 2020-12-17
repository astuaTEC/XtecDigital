USE XtecDigitalDB;
GO

CREATE PROCEDURE spGetNoticias(
@Curso VARCHAR(9),
@Grupo INT,
@Anio VARCHAR(4),
@Periodo VARCHAR(1)
)
AS
SELECT FechaPublicacion, Titulo, Mensaje, Autor, Id
FROM NOTICIA
WHERE @Curso = CodigoCurso AND
	  @Grupo = NumeroGrupo AND
	  @Anio = Anio AND
	  @Periodo = Periodo
ORDER BY FechaPublicacion DESC;

GO

EXEC spGetNoticias @Curso = 'MA-2104', @Grupo = 1, @Anio = '2021', @Periodo = '1';