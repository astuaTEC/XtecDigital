USE XtecDigitalDB;
GO

CREATE TRIGGER EliminarEvaluacionTrigger
ON EVALUACION
INSTEAD OF DELETE
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @CodigoCurso VARCHAR(10),
			@NombreRubro VARCHAR(50),
			@NumeroGrupo INT,
			@Anio VARCHAR(4),
			@Periodo VARCHAR(1),
			@NombreEvaluacion VARCHAR(50);

	SET @CodigoCurso = (SELECT CodigoCurso from deleted);
	SET @NombreRubro = (SELECT NombreRubro from deleted);
	SET @NumeroGrupo = (SELECT NumeroGrupo from deleted);
	SET @Anio = (SELECT Anio from deleted);
	SET @Periodo = (SELECT Periodo from deleted);
	SET @NombreEvaluacion = (SELECT Nombre from deleted);

	
	--primero se eliminan los entregables de la evaluacion
	DELETE ENTREGABLE
	WHERE NombreEvaluacion = @NombreEvaluacion AND
		  NumeroGrupo = @NumeroGrupo AND
		  CodigoCurso = @CodigoCurso AND
		  Periodo = @Periodo AND
		  Anio = @Anio AND
		  @NombreRubro = NombreRubro;

	--Luego se eliminan los estudiates miembros de una evaluacion
	DELETE ESTUDIANTE_SUBGRUPO
	WHERE NombreEvaluacion = @NombreEvaluacion AND
		  NumeroGrupo = @NumeroGrupo AND
		  CodigoCurso = @CodigoCurso AND
		  Periodo = @Periodo AND
		  Anio = @Anio AND
		  @NombreRubro = NombreRubro;
	
	-- Luego se elimina los subgrupos
	DELETE SUBGRUPO
	WHERE NombreEvaluacion = @NombreEvaluacion AND
		  NumeroGrupo = @NumeroGrupo AND
		  CodigoCurso = @CodigoCurso AND
		  Periodo = @Periodo AND
		  Anio = @Anio AND
		  NombreRubro = @NombreRubro;

	-- se elimina la evaluacion en si
	DELETE EVALUACION
	WHERE Nombre = @NombreEvaluacion AND
		  NumeroGrupo = @NumeroGrupo AND
		  CodigoCurso = @CodigoCurso AND
		  Periodo = @Periodo AND
		  Anio = @Anio AND
		  NombreRubro = @NombreRubro;
	
END
GO