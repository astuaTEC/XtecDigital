USE XtecDigitalDB;
GO

CREATE PROCEDURE spGetDataArchivo(
@Curso VARCHAR(9),
@Carpeta VARCHAR(50),
@Nombre VARCHAR(50),
@Grupo INT,
@Anio VARCHAR(4),
@Periodo VARCHAR(1)
)
AS
SELECT Archivo
FROM ARCHIVO
WHERE @Curso = CodigoCurso AND
	  @Nombre = Nombre AND
      @Carpeta = NombreCarpeta AND
	  @Grupo = NumeroGrupo AND
	  @Anio = Anio AND
	  @Periodo = Periodo;
GO

EXEC spGetDataArchivo @Curso = 'MA-0101', @Carpeta = 'Quices', @Nombre = 'archivo.pdf', @Grupo = 2, @Anio = '2021', @Periodo = '2';