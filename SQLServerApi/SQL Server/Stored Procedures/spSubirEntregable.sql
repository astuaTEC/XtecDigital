USE XtecDigitalDB;
GO

CREATE PROCEDURE spSubirEntregable(
@Curso VARCHAR(9),
@Rubro VARCHAR(50),
@Evaluacion VARCHAR(50),
@Grupo INT,
@Anio VARCHAR(4),
@Periodo VARCHAR(1),
@Carnet VARCHAR(10),
@Archivo VARBINARY(MAX)
)
AS
BEGIN
	DECLARE @Elementos INT;

	SET @Elementos = (SELECT COUNT(*)
					  FROM ENTREGABLE
					  WHERE @Curso = CodigoCurso AND
							@Rubro = NombreRubro AND
							@Evaluacion = NombreEvaluacion AND
							@Grupo = NumeroGrupo AND
							@Anio = Anio AND
							@Periodo = Periodo AND
							@Carnet = CarnetEstudiante);
	
	IF(@Elementos = 0)
	BEGIN
		INSERT INTO ENTREGABLE(CarnetEstudiante, NombreEvaluacion, NombreRubro,
							  NumeroGrupo, CodigoCurso, Periodo, Anio, ArchivoEntregable)
		VALUES (@Carnet, @Evaluacion, @Rubro, @Grupo, @Curso, @Periodo, @Anio, @Archivo)
	END
END
GO