USE XtecDigitalDB;
GO

CREATE PROCEDURE spGetCursosProfesor(@Profesor VARCHAR(9))
AS
SELECT P.CodigoCurso,
       P.NumeroGrupo,
	   P.Periodo,
	   P.Anio,
	   (C.Nombre + ' ' +  CONVERT(varchar(2), P.NumeroGrupo)) AS Nombre
FROM PROFESOR_GRUPO AS P, CURSO AS C
WHERE P.CodigoCurso = C.Codigo AND 
	  CedulaProfesor = @Profesor;

GO
	
EXEC spGetCursosProfesor @Profesor = '701450456';