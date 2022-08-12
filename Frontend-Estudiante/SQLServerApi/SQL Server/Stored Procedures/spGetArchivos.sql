USE XtecDigitalDB;
GO

CREATE PROCEDURE spGetArchivos(
@Curso VARCHAR(9),
@Carpeta VARCHAR(50),
@Grupo INT,
@Anio VARCHAR(4),
@Periodo VARCHAR(1)
)
AS
SELECT Nombre, Tamanio, Fecha
FROM ARCHIVO
WHERE @Curso = CodigoCurso AND
      @Carpeta = NombreCarpeta AND
	  @Grupo = NumeroGrupo AND
	  @Anio = Anio AND
	  @Periodo = Periodo;
GO

EXEC spGetArchivos @Curso = 'MA-0101',@Carpeta = 'Quices', @Grupo = 2, @Anio = '2021', @Periodo = '2';
