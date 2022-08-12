USE XtecDigitalDB;
GO

CREATE TRIGGER EliminarCarpetaTrigger
ON CARPETA
INSTEAD OF DELETE
AS
BEGIN
	SET NOCOUNT ON;

	DECLARE @CodigoCurso VARCHAR(10),
			@NombreCarpeta VARCHAR(50),
			@NumeroGrupo INT,
			@Anio VARCHAR(4),
			@Periodo VARCHAR(1);

	SET @CodigoCurso = (SELECT CodigoCurso from deleted);
	SET @NombreCarpeta = (SELECT Nombre from deleted);
	SET @NumeroGrupo = (SELECT NumeroGrupo from deleted);
	SET @Anio = (SELECT Anio from deleted);
	SET @Periodo = (SELECT Periodo from deleted);

	--primero se eliminan los archivos dentro de la carpeta
	DELETE ARCHIVO
	WHERE NombreCarpeta = @NombreCarpeta AND
		  NumeroGrupo = @NumeroGrupo AND
		  CodigoCurso = @CodigoCurso AND
		  Periodo = @Periodo AND
		  Anio = @Anio;
	
	-- Luego se elimina la carpeta en sí
	DELETE CARPETA
	WHERE Nombre = @NombreCarpeta AND
		  NumeroGrupo = @NumeroGrupo AND
		  CodigoCurso = @CodigoCurso AND
		  Periodo = @Periodo AND
		  Anio = @Anio;
	
END
GO