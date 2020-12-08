USE XtecDigitalDB;
GO

CREATE PROCEDURE spGetSemestresProfesor(
@Profesor VARCHAR(9)
)
AS
SELECT P.Anio,
       P.Periodo,
	   P.CodigoCurso,
       P.NumeroGrupo,
	   (C.Nombre + ' GR ' +  CONVERT(varchar(2), P.NumeroGrupo)) AS Nombre
FROM  PROFESOR_GRUPO AS P, CURSO AS C
WHERE P.CodigoCurso = C.Codigo AND 
	  CedulaProfesor = @Profesor
ORDER BY P.Anio,P.Periodo;

GO

EXEC spGetSemestresProfesor @Profesor = '308740651';