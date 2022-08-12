USE XtecDigitalDB;
GO

CREATE PROCEDURE spGetSemestresProfesor(
@Profesor VARCHAR(9)
)
AS
SELECT Anio,
       Periodo,
	   CodigoCurso,
       NumeroGrupo,
	   NombreGrupo AS Nombre
FROM  CursosProfesoresView
WHERE CedulaProfesor = @Profesor
ORDER BY Anio, Periodo;

GO

EXEC spGetSemestresProfesor @Profesor = '1111-1111';