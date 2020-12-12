USE XtecDigitalDB;
GO

CREATE TYPE SemestreExcel AS TABLE(
	Id int  NOT NULL,
	Anio VARCHAR(4),
	Periodo VARCHAR(1),
	CodigoCurso VARCHAR(10),
	NumeroGrupo int,
	CarnetEstudiante VARCHAR(10),
	Profesor1 VARCHAR(9),
	Profesor2 VARCHAR(10),
	PRIMARY KEY (Id)
);

GO