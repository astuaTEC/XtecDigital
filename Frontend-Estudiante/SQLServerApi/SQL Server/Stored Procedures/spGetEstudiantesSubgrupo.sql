USE XtecDigitalDB;
GO

ALTER PROCEDURE spGetEstudiantesSubgrupo(
@Curso VARCHAR(9),
@Grupo INT,
@Anio VARCHAR(4),
@Periodo VARCHAR(1),
@Carnet VARCHAR(10),
@Rubro VARCHAR(50),
@Evaluacion VARCHAR(50)
)
AS
BEGIN
	DECLARE @Id INT = (SELECT IdSubGrupo
						FROM ESTUDIANTE_SUBGRUPO
						WHERE @Curso = CodigoCurso AND 
							  @Grupo = NumeroGrupo AND
							  @Anio = Anio AND
							  @Periodo = Periodo AND
							  @Evaluacion = NombreEvaluacion AND
							  @Rubro = NombreRubro) ;
	
	SELECT CarnetEstudiante
	FROM ESTUDIANTE_SUBGRUPO
	WHERE @Curso = CodigoCurso AND 
		  @Grupo = NumeroGrupo AND
		  @Anio = Anio AND
		  @Periodo = Periodo AND
		  @Evaluacion = NombreEvaluacion AND
		  @Id = IdSubGrupo AND
		  @Rubro = NombreRubro;
END
GO

