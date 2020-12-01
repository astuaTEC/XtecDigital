/*
--------------------------------------------------------------------
© 2020 XTECDIGITAL
--------------------------------------------------------------------
Nombre   : Crear tablas
Version	 : 1.0
--------------------------------------------------------------------
*/

-- SE CREAN TODAS LAS TABLAS

CREATE TABLE SEMESTRE(
	Periodo		VARCHAR(1)		NOT NULL,
	Anio		VARCHAR(4)		NOT NULL,
	PRIMARY KEY (Periodo, Anio)
);

CREATE TABLE CURSO(
	Codigo		VARCHAR(10)		NOT NULL,
	Creditos	INT				NOT NULL,
	Carrera		VARCHAR(50)		NOT NULL,
	Nombre		VARCHAR(50)		NOT NULL,
	Habilitado  BIT,
	PRIMARY KEY (Codigo)
);

CREATE TABLE GRUPO(
	Numero			INT				NOT NULL,
	CodigoCurso		VARCHAR(10)		NOT NULL,
	Periodo			VARCHAR(1)		NOT NULL,
	Anio			VARCHAR(4)		NOT NULL,
	PRIMARY KEY (Numero, CodigoCurso, Periodo, Anio)
);


CREATE TABLE RUBRO(
	Nombre			VARCHAR(50)		NOT NULL,
	NumeroGrupo		INT				NOT NULL,
	CodigoCurso		VARCHAR(10)		NOT NULL,
	Periodo			VARCHAR(1)		NOT NULL,
	Anio			VARCHAR(4)		NOT NULL,
	Porcentaje		INT,
	PRIMARY KEY (Nombre, NumeroGrupo, CodigoCurso, Periodo, Anio)
);

CREATE TABLE CARPETA(
	Nombre			VARCHAR(50)		NOT NULL,
	NumeroGrupo		INT				NOT NULL,
	CodigoCurso		VARCHAR(10)		NOT NULL,
	Periodo			VARCHAR(1)		NOT NULL,
	Anio			VARCHAR(4)		NOT NULL,
	Creador			VARCHAR(20)		NOT NULL,
	PRIMARY KEY (Nombre, NumeroGrupo, CodigoCurso, Periodo, Anio)
);

CREATE TABLE EVALUACION(
	Nombre				VARCHAR(50)		NOT NULL,
	NombreRubro			VARCHAR(50)		NOT NULL,
	NumeroGrupo			INT				NOT NULL,
	CodigoCurso			VARCHAR(10)		NOT NULL,
	Periodo				VARCHAR(1)		NOT NULL,
	Anio				VARCHAR(4)		NOT NULL,
	Creador				VARCHAR(20)		NOT NULL,
	IndividualGrupal	VARCHAR(10)		NOT NULL,
	FechaHoraMax		DATETIME		NOT NULL,
	Archivo				VARBINARY(MAX),
	Porcentaje			INT,
	PRIMARY KEY (Nombre, NombreRubro, NumeroGrupo, CodigoCurso, Periodo, Anio)
);

CREATE TABLE ARCHIVO(
	Nombre				VARCHAR(50)		NOT NULL,
	NombreCarpeta		VARCHAR(50)		NOT NULL,
	NumeroGrupo			INT				NOT NULL,
	CodigoCurso			VARCHAR(10)		NOT NULL,
	Periodo				VARCHAR(1)		NOT NULL,
	Anio				VARCHAR(4)		NOT NULL,
	Archivo				VARBINARY(MAX),
	Tamanio				VARCHAR(10),
	Fecha				TIME,
	PRIMARY KEY (Nombre, NombreCarpeta, NumeroGrupo, CodigoCurso, Periodo, Anio)
);

CREATE TABLE NOTICIA(
	Id					INT IDENTITY(1,1)	NOT NULL,
	NumeroGrupo			INT					NOT NULL,
	CodigoCurso			VARCHAR(10)			NOT NULL,
	Periodo				VARCHAR(1)			NOT NULL,
	Anio				VARCHAR(4)			NOT NULL,
	FechaPublicacion	DATETIME			NOT NULL,
	Titulo				VARCHAR(20)			NOT NULL,
	Mensaje				VARCHAR(200)		NOT NULL,
	Autor				VARCHAR(100),
	PRIMARY KEY (Id, NumeroGrupo, CodigoCurso, Periodo, Anio)
);


CREATE TABLE ENTREGABLE(
	Id							INT IDENTITY(1,1)	NOT NULL,
	CarnetEstudiante			VARCHAR(10)			NOT NULL,
	Nota						INT,
	Observaciones				VARCHAR(100),
	ArchivoRetroAlimentacion	VARBINARY(MAX),
	ArchivoEntregable			VARBINARY(MAX)      NOT NULL,
	Publico						BIT,
	Evaluado					BIT,

	NombreEvaluacion			VARCHAR(50)			NOT NULL,
	NombreRubro					VARCHAR(50)			NOT NULL,
	NumeroGrupo					INT					NOT NULL,
	CodigoCurso					VARCHAR(10)			NOT NULL,
	Periodo						VARCHAR(1)			NOT NULL,
	Anio						VARCHAR(4)			NOT NULL,
	PRIMARY KEY(Id, CarnetEstudiante)
);


CREATE TABLE ESTUDIANTE_GRUPO(
	CarnetEstudiante			VARCHAR(10)			NOT NULL,
	NumeroGrupo					INT					NOT NULL,
	CodigoCurso					VARCHAR(10)			NOT NULL,
	Periodo						VARCHAR(1)			NOT NULL,
	Anio						VARCHAR(4)			NOT NULL,
	PRIMARY KEY (CarnetEstudiante, NumeroGrupo, CodigoCurso, Periodo, Anio)
);

CREATE TABLE PROFESOR_GRUPO(
	CedulaProfesor				VARCHAR(9)			NOT NULL,
	NumeroGrupo					INT					NOT NULL,
	CodigoCurso					VARCHAR(10)			NOT NULL,
	Periodo						VARCHAR(1)			NOT NULL,
	Anio						VARCHAR(4)			NOT NULL,
	PRIMARY KEY (CedulaProfesor, NumeroGrupo, CodigoCurso, Periodo, Anio)
);


CREATE TABLE ESTUDIANTE_EVALUACION(
	CarnetEstudiante			VARCHAR(10)			NOT NULL,
	NombreEvaluacion			VARCHAR(50)			NOT NULL,
	NombreRubro					VARCHAR(50)			NOT NULL,
	NumeroGrupo					INT					NOT NULL,
	CodigoCurso					VARCHAR(10)			NOT NULL,
	Periodo						VARCHAR(1)			NOT NULL,
	Anio						VARCHAR(4)			NOT NULL,
	PRIMARY KEY (CarnetEstudiante, NombreEvaluacion, NombreRubro, NumeroGrupo, CodigoCurso, Periodo, Anio)
);

-- SE AGREGAN LAS LLAVES FORÁNEAS

--GRUPO
ALTER TABLE GRUPO
ADD FOREIGN KEY (CodigoCurso) REFERENCES CURSO(Codigo),
	FOREIGN KEY (Periodo, Anio) REFERENCES SEMESTRE(Periodo, Anio);

-- RUBRO
ALTER TABLE RUBRO
ADD FOREIGN KEY (NumeroGrupo, CodigoCurso,Periodo, Anio) 
REFERENCES GRUPO(Numero, CodigoCurso, Periodo, Anio);

-- CARPETA
ALTER TABLE CARPETA
ADD FOREIGN KEY (NumeroGrupo, CodigoCurso,Periodo, Anio) 
REFERENCES GRUPO(Numero, CodigoCurso, Periodo, Anio);

--EVALUACION
ALTER TABLE EVALUACION
ADD FOREIGN KEY (NombreRubro, NumeroGrupo, CodigoCurso,Periodo, Anio) 
REFERENCES RUBRO(Nombre, NumeroGrupo, CodigoCurso, Periodo, Anio);

--ARCHIVO
ALTER TABLE ARCHIVO
ADD FOREIGN KEY (NombreCarpeta, NumeroGrupo, CodigoCurso,Periodo, Anio) 
REFERENCES CARPETA(Nombre, NumeroGrupo, CodigoCurso, Periodo, Anio);

--ESTUDIANTE_EVALUACION
ALTER TABLE ESTUDIANTE_EVALUACION
ADD FOREIGN KEY (NombreEvaluacion, NombreRubro, NumeroGrupo, CodigoCurso,Periodo, Anio) 
REFERENCES EVALUACION(Nombre, NombreRubro, NumeroGrupo, CodigoCurso, Periodo, Anio);

--ESTUDIANTE_GRUPO
ALTER TABLE ESTUDIANTE_GRUPO
ADD FOREIGN KEY (NumeroGrupo, CodigoCurso,Periodo, Anio) 
REFERENCES GRUPO(Numero, CodigoCurso, Periodo, Anio);

--PROFESOR_GRUPO
ALTER TABLE PROFESOR_GRUPO
ADD FOREIGN KEY (NumeroGrupo, CodigoCurso,Periodo, Anio) 
REFERENCES GRUPO(Numero, CodigoCurso, Periodo, Anio);

--ENTREGABLE
ALTER TABLE ENTREGABLE
ADD FOREIGN KEY (NombreEvaluacion, NombreRubro, NumeroGrupo, CodigoCurso, Periodo, Anio) 
REFERENCES EVALUACION(Nombre, NombreRubro, NumeroGrupo, CodigoCurso, Periodo, Anio);

-- NOTICIA
ALTER TABLE NOTICIA
ADD FOREIGN KEY (NumeroGrupo, CodigoCurso, Periodo, Anio) 
REFERENCES GRUPO(Numero, CodigoCurso, Periodo, Anio);