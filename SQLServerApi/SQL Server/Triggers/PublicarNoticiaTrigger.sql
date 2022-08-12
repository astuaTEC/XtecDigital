USE XtecDigitalDB;
GO

CREATE TRIGGER PublicarNoticiaTrigger
ON EvaluacionLog
AFTER INSERT
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @Profesor VARCHAR(100),
	        @CodigoCurso VARCHAR(10),
			@NombreEvaluacion VARCHAR(50),
			@NumeroGrupo INT,
			@NombreRubro varchar(50),
			@Anio VARCHAR(4),
			@Periodo VARCHAR(1),
			@Evaluacion VARCHAR(50);
	
	SET @CodigoCurso = (SELECT CodigoCurso from inserted);
	SET @NombreEvaluacion = (SELECT NombreEvaluacion from inserted);
	SET @NumeroGrupo = (SELECT NumeroGrupo from inserted);
	SET @NombreRubro = (SELECT NombreRubro from inserted);
	SET @Anio = (SELECT Anio from inserted);
	SET @Periodo = (SELECT Periodo from inserted);
	SET @Profesor = (SELECT Profesor from inserted);
	SET @Evaluacion = (SELECT NombreEvaluacion from inserted);

	INSERT INTO NOTICIA(NumeroGrupo, CodigoCurso, Periodo, Anio, FechaPublicacion, Titulo, Mensaje, Autor)
	VALUES (@NumeroGrupo, @CodigoCurso, @Periodo, @Anio, GETDATE(), 
	'Publicación de nota', 'Se le informa que la nota correspondiente a: ' + @Evaluacion + ' ya está disponible',
	@Profesor)

END
GO