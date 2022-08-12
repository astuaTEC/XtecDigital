USE XtecDigitalDB;
GO

CREATE PROCEDURE spGetArchivoEvaluacion(
@Curso VARCHAR(9),
@Rubro VARCHAR(50),
@Nombre VARCHAR(50),
@Grupo INT,
@Anio VARCHAR(4),
@Periodo VARCHAR(1)
)
AS
SELECT Archivo
FROM EVALUACION
WHERE @Curso = CodigoCurso AND
	  @Nombre = Nombre AND
      @Rubro = NombreRubro AND
	  @Grupo = NumeroGrupo AND
	  @Anio = Anio AND
	  @Periodo = Periodo;
GO

EXEC spGetArchivoEvaluacion @Curso = 'MA-2104', @Rubro = 'Quices', @Nombre = 'Quiz 1', @Grupo = 1, @Anio = '2021', @Periodo = '1';