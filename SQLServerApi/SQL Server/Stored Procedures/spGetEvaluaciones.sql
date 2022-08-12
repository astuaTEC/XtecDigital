USE XtecDigitalDB;
GO

CREATE PROCEDURE spGetEvaluaciones(
@Curso VARCHAR(9),
@Rubro VARCHAR(50),
@Grupo INT,
@Anio VARCHAR(4),
@Periodo VARCHAR(1)
)
AS
SELECT Nombre, FechaHoraMax, IndividualGrupal, Porcentaje
FROM EVALUACION
WHERE @Curso = CodigoCurso AND
      @Rubro = NombreRubro AND
	  @Grupo = NumeroGrupo AND
	  @Anio = Anio AND
	  @Periodo = Periodo;
GO

EXEC spGetEvaluaciones @Curso = 'MA-2104',@Rubro = 'Quices', @Grupo = 1, @Anio = '2021', @Periodo = '1';