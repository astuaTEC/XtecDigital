USE XtecDigitalDB;
GO

CREATE TRIGGER InicializarGrupoTrigger
ON GRUPO
AFTER INSERT
AS
BEGIN
	DECLARE @CodigoCurso VARCHAR(10),
			@NumeroGrupo INT,
			@Anio VARCHAR(4),
			@Periodo VARCHAR(1);
	
	SET @CodigoCurso = (SELECT CodigoCurso from inserted);
	SET @NumeroGrupo = (SELECT Numero from inserted);
	SET @Anio = (SELECT Anio from inserted);
	SET @Periodo = (SELECT Periodo from inserted);

	INSERT INTO CARPETA (Nombre, NumeroGrupo, CodigoCurso, Periodo, Anio, Creador)
    VALUES ('Presentaciones', @NumeroGrupo, @CodigoCurso, @Periodo, @Anio, 'System'),
	       ('Quices', @NumeroGrupo, @CodigoCurso, @Periodo, @Anio, 'System'),
		   ('Exámenes', @NumeroGrupo, @CodigoCurso, @Periodo, @Anio, 'System'),
		   ('Proyectos', @NumeroGrupo, @CodigoCurso, @Periodo, @Anio, 'System');

	INSERT INTO RUBRO(Nombre, NumeroGrupo, CodigoCurso, Periodo, Anio, Porcentaje)
	VALUES ('Quices', @NumeroGrupo, @CodigoCurso, @Periodo, @Anio, 30),
		   ('Exámenes', @NumeroGrupo, @CodigoCurso, @Periodo, @Anio, 30),
		   ('Proyectos', @NumeroGrupo, @CodigoCurso, @Periodo, @Anio, 40);
END
GO