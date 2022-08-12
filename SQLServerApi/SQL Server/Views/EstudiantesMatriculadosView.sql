USE XtecDigitalDB;
GO


CREATE VIEW EstudiantesMatriculadosView
AS

SELECT 
	ES.NumeroGrupo, ES.CodigoCurso, ES.Periodo, ES.Anio, 
	(C.Nombre + ' GR ' +  CONVERT(varchar(2), ES.NumeroGrupo)) AS NombreGrupo,
	ES.CarnetEstudiante
	FROM ESTUDIANTE_GRUPO AS ES
	INNER JOIN
	CURSO AS C
	ON ES.CodigoCurso = C.Codigo;
GO

SELECT * FROM EstudiantesMatriculadosView