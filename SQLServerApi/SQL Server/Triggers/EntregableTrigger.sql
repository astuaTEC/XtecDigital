USE XtecDigitalDB;
GO

CREATE TRIGGER EntregableTrigger
ON ENTREGABLE
AFTER INSERT
AS
BEGIN

	SET NOCOUNT ON;

	DECLARE @Carnet VARCHAR(10),
	        @Count INT,
	        @CodigoCurso VARCHAR(10),
			@NombreEvaluacion VARCHAR(50),
			@NumeroGrupo INT,
			@NombreRubro varchar(50),
			@Anio VARCHAR(4),
			@Periodo VARCHAR(1),
			@Nota INT,
			@Observaciones VARCHAR(100),
			@ArchivoEntregable VARBINARY(MAX),
			@ArchivoRetroAlimentacion VARBINARY(MAX),
			@Publico BIT,
			@Evaluado BIT;

	DECLARE @Tabla TABLE(carnet VARCHAR(10));

	SET @Carnet = (SELECT CarnetEstudiante from inserted);
	INSERT INTO @Tabla  SELECT CarnetEstudiante
						FROM SUBGRUPO AS s, inserted as i
						WHERE s.CodigoCurso = i.CodigoCurso AND
							  s.NombreEvaluacion = i.NombreEvaluacion AND
						      s.NumeroGrupo = i.NumeroGrupo AND
							  s.NombreRubro = i.NombreRubro AND
							  s.Anio = i.Anio AND
							  s.Periodo = i.Periodo;
	

	IF(@Carnet IN (SELECT carnet from @Tabla))
		BEGIN
			SET @Count = (SELECT COUNT(*) from @Tabla);
			SET @CodigoCurso = (SELECT CodigoCurso from inserted);
			SET @NombreEvaluacion = (SELECT NombreEvaluacion from inserted);
			SET @NumeroGrupo = (SELECT NumeroGrupo from inserted);
			SET @NombreRubro = (SELECT NombreRubro from inserted);
			SET @Anio = (SELECT Anio from inserted);
			SET @Periodo = (SELECT Periodo from inserted);
			SET @Nota = (SELECT Nota from inserted);
			SET @Observaciones = (SELECT Observaciones from inserted);
			SET @ArchivoEntregable = (SELECT ArchivoEntregable from inserted);
			SET @ArchivoRetroAlimentacion = (SELECT ArchivoRetroAlimentacion from inserted);
			SET @Publico = (SELECT Publico from inserted);
			SET @Evaluado = (SELECT Evaluado from inserted);

			WHILE @Count > 0
			 BEGIN
				DECLARE @Carnet1 VARCHAR(10) = (SELECT TOP(1) carnet from @Tabla)
				
				INSERT INTO ENTREGABLE (CarnetEstudiante, Nota, Observaciones, ArchivoRetroAlimentacion, 
			                       ArchivoEntregable, Publico, Evaluado, NombreEvaluacion, NombreRubro,
								   NumeroGrupo, CodigoCurso, Periodo, Anio)
				VALUES (@Carnet1, @Nota, @Observaciones, @ArchivoRetroAlimentacion,
				        @ArchivoEntregable, @Publico, @Evaluado, @NombreEvaluacion, @NombreRubro,
						@NumeroGrupo, @CodigoCurso, @Periodo, @Anio);

				DELETE @Tabla where carnet = @Carnet1
				SET @Count = (SELECT COUNT(*) from @Tabla);
			END
		END

END;
GO