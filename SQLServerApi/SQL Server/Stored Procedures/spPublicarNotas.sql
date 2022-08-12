USE XtecDigitalDB;
GO

alter PROCEDURE spPublicarNotas(
@Curso VARCHAR(9),
@Rubro VARCHAR(50),
@NombreEvaluacion VARCHAR(50),
@Grupo INT,
@Anio VARCHAR(4),
@Periodo VARCHAR(1),
@Profesor VARCHAR(100)
)
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE ENTREGABLE 
	SET Publico = 1
	WHERE @Curso = CodigoCurso AND
		  @Rubro = NombreRubro AND
		  @Grupo = NumeroGrupo AND
		  @Anio = Anio AND
		  @Periodo = Periodo AND
		  @NombreEvaluacion = NombreEvaluacion AND
		  Evaluado = 1;
	
	INSERT INTO EvaluacionLog(Profesor, NombreEvaluacion, NombreRubro, NumeroGrupo, CodigoCurso, Periodo, Anio)
	VALUES(@Profesor, @NombreEvaluacion, @Rubro, @Grupo, @Curso, @Periodo, @Anio)
	
END
GO


EXEC spPublicarNotas @Curso = 'MA-2104', @Rubro = 'Quices', @NombreEvaluacion = 'Quiz 1', 
	 @Grupo = 1, @Anio = '2021', @Periodo = '1', @Profesor = 'LD Noguera';