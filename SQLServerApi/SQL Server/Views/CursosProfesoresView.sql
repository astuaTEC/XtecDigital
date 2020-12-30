USE XtecDigitalDB;
GO


CREATE VIEW CursosProfesoresView
AS

SELECT 
	P.NumeroGrupo, P.CodigoCurso, P.Periodo, P.Anio, 
	(C.Nombre + ' GR ' +  CONVERT(varchar(2), P.NumeroGrupo)) AS NombreGrupo,
	P.CedulaProfesor
	FROM PROFESOR_GRUPO AS P
	INNER JOIN
	CURSO AS C
	ON P.CodigoCurso = C.Codigo;
GO

SELECT * FROM CursosProfesoresView