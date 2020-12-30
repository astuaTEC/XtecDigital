USE XtecDigitalDB;
GO

CREATE PROCEDURE spSemestreExcel
(
@TablaE SemestreExcel READONLY
)
AS
BEGIN
	-- se declara la tabla temporal
	DECLARE @Tabla AS TABLE (
			Id int  NOT NULL,
			Anio VARCHAR(4),
			Periodo VARCHAR(1),
			CodigoCurso VARCHAR(10),
			NumeroGrupo int,
			CarnetEstudiante VARCHAR(10),
			Profesor1 VARCHAR(9)
			);
	
	-- se hace una copia temporal de la tabla recibida para poder recorrerla
	INSERT INTO @Tabla SELECT Id, Anio, Periodo, CodigoCurso, NumeroGrupo, CarnetEstudiante, Profesor1
	FROM @TablaE;
	
	DECLARE @Count INT = (SELECT COUNT(*) from @Tabla);

	WHILE @Count > 0
	BEGIN
		DECLARE @Id INT = (SELECT TOP(1) Id from @Tabla order by Id),
				@Anio VARCHAR(4) = (SELECT TOP(1) Anio from @Tabla order by Id),
				@Periodo VARCHAR(1) = (SELECT TOP(1) Periodo from @Tabla order by Id),
				@CodigoCurso VARCHAR(10) = (SELECT TOP(1) CodigoCurso from @Tabla order by Id),
				@NumeroGrupo int = (SELECT TOP(1) NumeroGrupo from @Tabla order by Id),
				@CarnetEstudiante VARCHAR(10) = (SELECT TOP(1) CarnetEstudiante from @Tabla order by Id),
				@Profesor1 VARCHAR(9) = (SELECT TOP(1) Profesor1 from @Tabla order by Id),
				
				@ContadorSemestre INT, -- contadores
				@ContadorGrupo INT,
				@ContadorEstudiante INT,
				@ContadorProfesor INT;
		
		-- se accede a la tabla semestre
		SET @ContadorSemestre = (SELECT COUNT(*) FROM SEMESTRE
								WHERE @Periodo = Periodo AND
								      @Anio = Anio);
		
		-- se verifica que no exista un semestre en ese a�o y periodo
		IF(@ContadorSemestre = 0)
		BEGIN
			INSERT INTO SEMESTRE(Anio, Periodo)
			VALUES (@Anio, @Periodo);
		END

		-- se accede a la tabla GRUPO
		SET @ContadorGrupo = (SELECT COUNT(*) FROM GRUPO
							 WHERE @Periodo = Periodo AND
							       @Anio = Anio AND
								   @NumeroGrupo = Numero AND
								   @CodigoCurso = CodigoCurso);

		-- se verifica que el grupo no exista
		IF(@ContadorGrupo = 0)
		BEGIN
			INSERT INTO GRUPO(Numero, CodigoCurso, Periodo, Anio)
			VALUES (@NumeroGrupo, @CodigoCurso, @Periodo, @Anio);
		END

		SET @ContadorProfesor = (SELECT COUNT(*) FROM PROFESOR_GRUPO
								WHERE @Periodo = Periodo AND
									  @Anio = Anio AND
									  @NumeroGrupo = NumeroGrupo AND
									  @CodigoCurso = CodigoCurso AND
									  @Profesor1 = CedulaProfesor);

		-- se revisa que el profesor no exista
		IF(@ContadorProfesor = 0)
		BEGIN
			INSERT INTO PROFESOR_GRUPO(CedulaProfesor, NumeroGrupo, CodigoCurso, Periodo, Anio)
			VALUES (@Profesor1, @NumeroGrupo, @CodigoCurso, @Periodo, @Anio);
		END
		

		SET @ContadorEstudiante = (SELECT COUNT(*) FROM ESTUDIANTE_GRUPO
								   WHERE @Periodo = Periodo AND
										 @Anio = Anio AND
										 @NumeroGrupo = NumeroGrupo AND
										 @CodigoCurso = CodigoCurso AND
										 @CarnetEstudiante = CarnetEstudiante);
		
		-- se revisa que el estudiante no exista en ese grupo
		IF(@ContadorEstudiante = 0)
		BEGIN
			-- se insertan los estudiantes en su grupo respectivo
			INSERT INTO ESTUDIANTE_GRUPO(CarnetEstudiante, NumeroGrupo, CodigoCurso, Periodo, Anio)
			VALUES (@CarnetEstudiante, @NumeroGrupo, @CodigoCurso, @Periodo, @Anio);
		END

		DELETE @Tabla where Id = @Id;
		SET @Count = (SELECT COUNT(*) from @Tabla);
	END
END