/*
--------------------------------------------------------------------
© 2020 XTECDIGITAL
--------------------------------------------------------------------
Nombre   : Popular tablas
Version	 : 2.0
--------------------------------------------------------------------
*/
USE XtecDigitalDB;
GO

-- SEMESTRE
INSERT INTO SEMESTRE (Periodo, Anio)
VALUES ('V', '2020');

-- CURSO
INSERT INTO CURSO (Codigo, Creditos, Carrera, Nombre, Habilitado)
VALUES ('MA-0101', 4, 'Matemática', 'Matemática General', 1),
	   ('MA-0102', 4, 'Matemática', 'Cálculo Diferencial e Integral', 1),
	   ('MA-0103', 4, 'Matemática', 'Cálculo y Algebra Lineal', 1),
	   ('MA-2105', 4, 'Matemática', 'Ecuaciones diferenciales', 1),
	   ('MA-2104', 4, 'Matemática', 'Cálculo superior', 1),
	   ('CE3101', 4, 'Ing. Computadores', 'Bases de Datos', 1),
	   ('CE3104', 4, 'Ing. Computadores', 'Lenguajes compiladores e interpretes', 1),
	   ('CE4101', 4, 'Ing. Computadores', 'Especificacion y Diseno de Software', 1);

-- GRUPO 
INSERT INTO GRUPO(Numero, CodigoCurso, Periodo, Anio)
VALUES (1, 'CE3101', 'V', '2020'); -- |VERANO| / Bases de datos gr 1

	   -- GRUPO 
INSERT INTO GRUPO(Numero, CodigoCurso, Periodo, Anio)
VALUES (2, 'CE3101', 'V', '2020'); -- |VERANO| / Bases de datos gr 2

-- GRUPO 
INSERT INTO GRUPO(Numero, CodigoCurso, Periodo, Anio)
VALUES (1, 'CE3104', 'V', '2020'); -- Lenguajes compiladores e interpretes


-- PROFESOR_GRUPO
INSERT INTO PROFESOR_GRUPO(CedulaProfesor, NumeroGrupo, CodigoCurso, Periodo, Anio)
VALUES ('2222-2222', 1, 'CE3101', 'V', '2020'), -- |VERANO| / Bases de datos
	   ('1111-1111', 2, 'CE3101', 'V', '2020'),
	   ('1111-1111', 1, 'CE3104', 'V', '2020'), -- Lenguajes compiladores e interpretes
	   ('3333-3333', 1, 'CE3104', 'V', '2020'); 


-- ESTUDIANTE_GRUPO
INSERT INTO ESTUDIANTE_GRUPO(CarnetEstudiante, NumeroGrupo, CodigoCurso, Periodo, Anio)
VALUES ('2018117463', 1, 'CE3101', 'V', 2020), -- BASES DE DATOS GR 1
	   ('2018148661', 1, 'CE3101', 'V', 2020),
	   ('2018143188', 1, 'CE3101', 'V', 2020),
	   ('2019B0032', 2, 'CE3101', 'V', 2020), -- BASES DE DATOS GR 2
	   ('2019B0022', 2, 'CE3101', 'V', 2020),
	   ('2019A0041', 2, 'CE3101', 'V', 2020),
	   ('2019A0026', 1, 'CE3104', 'V', 2020), -- LENGUAJES COMPILADORES E INTERPRETES GR 1
	   ('2019A0021', 1, 'CE3104', 'V', 2020),
	   ('2019B0042', 1, 'CE3104', 'V', 2020);

GO