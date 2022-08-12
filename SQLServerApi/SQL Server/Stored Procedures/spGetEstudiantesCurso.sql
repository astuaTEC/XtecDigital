USE XtecDigitalDB;
GO

CREATE PROCEDURE spGetEstudiantesCurso(
@Curso VARCHAR(9),
@Grupo INT,
@Anio VARCHAR(4),
@Periodo VARCHAR(1)
)
AS
SELECT CarnetEstudiante
FROM ESTUDIANTE_GRUPO
WHERE @Curso = CodigoCurso AND 
	  @Grupo = NumeroGrupo AND
	  @Anio = Anio AND
	  @Periodo = Periodo;

GO
	
EXEC spGetEstudiantesCurso @Curso = 'MA-2104', @Grupo = 1, @Anio = '2021', @Periodo = '1';