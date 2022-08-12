USE XtecDigitalDB;
GO

alter PROCEDURE spNotasGrupo(
@Curso VARCHAR(9),
@Grupo INT,
@Anio VARCHAR(4),
@Periodo VARCHAR(1)
)
AS
BEGIN
	 SELECT V.NombreGrupo, V.CarnetEstudiante, V.NombreRubro, V.Porcentaje, 
	 SUM(V.PorcentajeObtenido) AS PorcentajeObtenido
	 FROM dbo.NotasEstudiantesView AS V
	 WHERE V.Anio = @Anio AND
	       V.Periodo = @Periodo AND
		   V.CodigoCurso = @Curso AND
		   V.NumeroGrupo = @Grupo
	GROUP BY V.NombreGrupo, V.CarnetEstudiante, V.NombreRubro, V.Porcentaje
END
GO

EXEC spNotasGrupo @Curso = 'MA-2104', @Grupo = 1, @Anio = '2021', @Periodo = '1';