USE XtecDigitalDB;
GO

CREATE PROCEDURE spEliminarRubro(
@Curso VARCHAR(9),
@Grupo INT,
@Anio VARCHAR(4),
@Periodo VARCHAR(1),
@Rubro VARCHAR(50)
)
AS
DELETE RUBRO
WHERE @Curso = CodigoCurso AND
	  @Grupo = NumeroGrupo AND
	  @Anio = Anio AND
	  @Periodo = Periodo AND
	  @Rubro = Nombre;
GO

