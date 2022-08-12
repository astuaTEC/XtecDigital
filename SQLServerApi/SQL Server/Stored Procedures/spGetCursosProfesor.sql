USE XtecDigitalDB;
GO

CREATE PROCEDURE spGetCursosProfesor(
@Profesor VARCHAR(9),
@Anio VARCHAR(4),
@Periodo VARCHAR(1)
)
AS
SELECT P.CodigoCurso,
       P.NumeroGrupo,
	   P.Periodo,
	   P.Anio,
	   (C.Nombre + ' GR ' +  CONVERT(varchar(2), P.NumeroGrupo)) AS Nombre
FROM PROFESOR_GRUPO AS P, CURSO AS C
WHERE P.CodigoCurso = C.Codigo AND 
	  @Anio = P.Anio AND
	  @Periodo = P.Periodo AND
	  CedulaProfesor = @Profesor;

GO
	
EXEC spGetCursosProfesor @Profesor = '308740651', @Anio = '2021',@Periodo = '1';