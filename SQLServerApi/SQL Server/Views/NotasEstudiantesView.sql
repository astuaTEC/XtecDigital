USE XtecDigitalDB;
GO


Alter VIEW NotasEstudiantesView
AS

SELECT 
	ES.NumeroGrupo, ES.CodigoCurso, ES.Periodo, ES.Anio, (C.Nombre + ' GR ' +  CONVERT(varchar(2), ES.NumeroGrupo)) AS NombreGrupo,
	ES.CarnetEstudiante, R.Nombre as NombreRubro, R.Porcentaje, 
	E.Nombre as NombreEvaluacion,
	ISNULL(dbo.ValorPorcentual(E.Porcentaje, ISNULL(EN.Nota, 0)), 0) as PorcentajeObtenido
	FROM ESTUDIANTE_GRUPO AS ES
	INNER JOIN
	RUBRO AS R
	ON ES.NumeroGrupo = R.NumeroGrupo AND
	   ES.CodigoCurso = R.CodigoCurso AND
	   ES.Periodo = R.Periodo AND
	   ES.Anio = R.Anio
	LEFT JOIN
	EVALUACION AS E
	ON E.NumeroGrupo = R.NumeroGrupo AND
	   E.CodigoCurso = R.CodigoCurso AND
	   E.Periodo = R.Periodo AND
	   E.Anio = R.Anio AND
	   E.NombreRubro = R.Nombre
	LEFT JOIN 
	ENTREGABLE AS EN
	ON EN.NumeroGrupo = E.NumeroGrupo AND
	   EN.CodigoCurso = E.CodigoCurso AND
	   EN.Periodo = E.Periodo AND
	   EN.Anio = E.Anio AND
	   EN.NombreRubro = E.NombreRubro AND
	   EN.NombreEvaluacion = E.Nombre AND
	   EN.CarnetEstudiante = ES.CarnetEstudiante
	INNER JOIN
	CURSO AS C
	ON ES.CodigoCurso = C.Codigo;

GO

SELECT * FROM NotasEstudiantesView