USE XtecDigitalDB;
GO

ALTER TRIGGER ActualizarNotasTrigger
ON ENTREGABLE
AFTER UPDATE
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
			@Evaluado BIT,
			@Id INT;

		DECLARE @Tabla TABLE(carnet VARCHAR(10));

		SET @Carnet = (SELECT CarnetEstudiante from inserted);

		SET @Id  = (SELECT IdSubGrupo
					FROM ESTUDIANTE_SUBGRUPO
					WHERE @Carnet = CarnetEstudiante);

		INSERT INTO @Tabla  SELECT s.CarnetEstudiante
							FROM ESTUDIANTE_SUBGRUPO AS s, inserted as i
							WHERE s.CodigoCurso = i.CodigoCurso AND
								  s.NombreEvaluacion = i.NombreEvaluacion AND
								  s.NumeroGrupo = i.NumeroGrupo AND
								  s.NombreRubro = i.NombreRubro AND
								  s.Anio = i.Anio AND
								  s.Periodo = i.Periodo AND
								  @Id is not NULL AND
								  @Id = s.IdSubGrupo;

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
				SET @Evaluado = (SELECT Evaluado from inserted);
				SET @Publico = (SELECT Publico from inserted);

				WHILE @Count > 0
				 BEGIN
					DECLARE @Carnet1 VARCHAR(10) = (SELECT TOP(1) carnet from @Tabla order by carnet)
					IF @Carnet != @Carnet1
						BEGIN
							UPDATE ENTREGABLE
							SET   Nota = @Nota,
							Observaciones = @Observaciones,
							ArchivoRetroAlimentacion = @ArchivoRetroAlimentacion,
							Evaluado = @Evaluado,
							Publico = @Publico
							WHERE	CarnetEstudiante = @Carnet1 AND
									@NombreRubro = NombreRubro AND
									@NombreEvaluacion = NombreEvaluacion AND
									@NumeroGrupo = NumeroGrupo AND
									@Anio = Anio AND
									@Periodo = Periodo AND
									@Carnet1 = CarnetEstudiante;
						END
					DELETE @Tabla where carnet = @Carnet1
					SET @Count = (SELECT COUNT(*) from @Tabla);
				END
			END
END
GO