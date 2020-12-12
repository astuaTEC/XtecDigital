USE XtecDigitalDB;
GO

Alter PROCEDURE spGetEntregableEstudiante(
@Curso VARCHAR(9),
@Rubro VARCHAR(50),
@NombreEvaluacion VARCHAR(50),
@Grupo INT,
@Anio VARCHAR(4),
@Periodo VARCHAR(1),
@Carnet VARCHAR(10)
)
AS
SELECT Id, e.CarnetEstudiante, e.Publico, e.Evaluado, e.Nota, e.Observaciones
FROM ENTREGABLE AS e
WHERE e.CodigoCurso = @Curso AND
	  e.NumeroGrupo = @Grupo AND
	  e.NombreRubro = @Rubro AND
	  e.NombreEvaluacion = @NombreEvaluacion AND
	  e.Anio = @Anio AND
	  e.Periodo = @Periodo AND
	  e.CarnetEstudiante = @Carnet;
GO

EXEC spGetEntregableEstudiante @Curso = 'MA-2104',@Rubro = 'Quices',
@NombreEvaluacion = 'Quiz 1', @Grupo = 1, @Anio = '2021', @Periodo = '1',
@Carnet = '2018143188';