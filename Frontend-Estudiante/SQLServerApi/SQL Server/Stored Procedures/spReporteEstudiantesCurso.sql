USE XtecDigitalDB;
GO

CREATE PROCEDURE spReporteEstudiantesCurso(
@Curso VARCHAR(9),
@Grupo INT,
@Anio VARCHAR(4),
@Periodo VARCHAR(1)
)
AS
BEGIN
	 SELECT E.NombreGrupo, E.CarnetEstudiante, E.CodigoCurso
	 FROM dbo.EstudiantesMatriculadosView AS E
	 WHERE E.Anio = @Anio AND
	       E.Periodo = @Periodo AND
		   E.CodigoCurso = @Curso AND
		   E.NumeroGrupo = @Grupo;
END
GO

EXEC spReporteEstudiantesCurso @Curso = 'MA-2104', @Grupo = 1, @Anio = '2021', @Periodo = '1';