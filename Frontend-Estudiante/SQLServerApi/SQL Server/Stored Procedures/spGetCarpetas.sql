USE XtecDigitalDB;
GO

CREATE PROCEDURE spGetCarpetas(
@Curso VARCHAR(9),
@Grupo INT,
@Anio VARCHAR(4),
@Periodo VARCHAR(1)
)
AS
SELECT Nombre, Creador
FROM CARPETA
WHERE @Curso = CodigoCurso AND
	  @Grupo = NumeroGrupo AND
	  @Anio = Anio AND
	  @Periodo = Periodo;
GO

EXEC spGetCarpetas @Curso = 'MA-0101', @Grupo = 2, @Anio = '2021', @Periodo = '2';