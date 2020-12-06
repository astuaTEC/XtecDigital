USE XtecDigitalDB;
GO

CREATE PROCEDURE spGetDataEntregable(
@Curso VARCHAR(9),
@Rubro VARCHAR(50),
@Evaluacion VARCHAR(50),
@Grupo INT,
@Anio VARCHAR(4),
@Periodo VARCHAR(1),
@Carnet VARCHAR(10),
@Id int
)
AS
SELECT ArchivoEntregable AS Archivo
FROM ENTREGABLE
WHERE @Curso = CodigoCurso AND
	  @Rubro = NombreRubro AND
      @Evaluacion = NombreEvaluacion AND
	  @Grupo = NumeroGrupo AND
	  @Anio = Anio AND
	  @Periodo = Periodo AND
	  @Carnet = CarnetEstudiante AND
	  @Id = Id;
GO

EXEC spGetDataEntregable @Curso = 'MA-2104',@Rubro = 'Quices', @Evaluacion = 'Quiz 1', @Grupo = 1, 
	@Anio = '2021', @Periodo = '1', @Carnet = '2018143188', @Id = '11' ;