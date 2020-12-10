USE XtecDigitalDB;
GO

CREATE PROCEDURE spGetSemestresEstudiante(
@Carnet VARCHAR(10)
)
AS
SELECT E.Anio,
       E.Periodo,
	   E.CodigoCurso,
       E.NumeroGrupo,
	   (C.Nombre + ' GR ' +  CONVERT(varchar(2), E.NumeroGrupo)) AS Nombre
FROM  ESTUDIANTE_GRUPO AS E, CURSO AS C
WHERE E.CodigoCurso = C.Codigo AND 
	  E.CarnetEstudiante = @Carnet
ORDER BY E.Anio, E.Periodo;

GO

EXEC spGetSemestresEstudiante @Carnet = '2018143188';