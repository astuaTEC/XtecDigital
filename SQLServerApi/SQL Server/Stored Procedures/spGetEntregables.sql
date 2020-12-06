USE XtecDigitalDB;
GO

ALTER PROCEDURE spGetEntregables(
@Curso VARCHAR(9),
@Rubro VARCHAR(50),
@NombreEvaluacion VARCHAR(50),
@Grupo INT,
@Anio VARCHAR(4),
@Periodo VARCHAR(1)
)
AS
SELECT distinct Id, e.CarnetEstudiante, s.IdSubGrupo
FROM ENTREGABLE AS e
LEFT JOIN ESTUDIANTE_SUBGRUPO AS s 
ON 
e.CarnetEstudiante = s.CarnetEstudiante AND
e.CodigoCurso = s.CodigoCurso AND
e.NombreRubro = s.NombreRubro AND
e.NombreEvaluacion = s.NombreEvaluacion AND
e.NumeroGrupo = s.NumeroGrupo AND
e.Anio = s.Anio AND
e.Periodo = s.Periodo
WHERE @Curso = e.CodigoCurso AND
      @Rubro = e.NombreRubro AND
	  @Grupo = e.NumeroGrupo AND
	  @Anio = e.Anio AND
	  @Periodo = e.Periodo AND
	  @NombreEvaluacion = e.NombreEvaluacion;
GO

EXEC spGetEntregables @Curso = 'MA-2104',@Rubro = 'Quices', @NombreEvaluacion = 'Quiz 1', @Grupo = 1, @Anio = '2021', @Periodo = '1';