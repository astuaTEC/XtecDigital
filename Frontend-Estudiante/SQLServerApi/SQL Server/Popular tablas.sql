/*
--------------------------------------------------------------------
© 2020 XTECDIGITAL
--------------------------------------------------------------------
Nombre   : Popular tablas
Version	 : 1.0
--------------------------------------------------------------------
*/

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
VALUES (1, 'CE3101', 'V', '2020'), -- |VERANO| / Bases de datos
	   (2, 'CE3101', 'V', '2020'),
	   (1, 'CE3104', 'V', '2020'), -- Lenguajes compiladores e interpretes
	   (1, 'MA-0103', 'V', '2020'), -- Cálculo y Algebra Lineal
	   (2, 'MA-0103', 'V', '2020'),
	   (1, 'MA-2104', 'V', '2020'), -- Cálculo superior
	   (2, 'MA-2104', 'V', '2020'),
	   (1, 'MA-2105', 'V', '2020'), -- Ecuaciones diferenciales
	   (2, 'MA-2105', 'V', '2020');

-- PROFESOR_GRUPO
INSERT INTO PROFESOR_GRUPO(CedulaProfesor, NumeroGrupo, CodigoCurso, Periodo, Anio)
VALUES ('2222-2222', 1, 'CE3101', 'V', '2021'), -- |VERANO| / Mate General
	   ('1111-1111', 2, 'CE3101', 'V', '2021'),
	   ('1111-1111', 1, 'CE3104', 'V', '2021'), -- Cálculo Diferencial e Integral
	   ('3333-3333', 1, 'CE3104', 'V', '2021');

-- CARPETA
INSERT INTO CARPETA (Nombre, NumeroGrupo, CodigoCurso, Periodo, Anio, Creador)
VALUES ('Presentaciones', 1, 'MA-0101', '1', '2021', 'System'), -- |PRIMER PERIODO| / Mate General
	   ('Quices', 1, 'MA-0101', '1', '2021', 'System'),
	   ('Exámenes', 1, 'MA-0101', '1', '2021', 'System'),
	   ('Proyectos', 1, 'MA-0101', '1', '2021', 'System'),
	   ('Presentaciones', 2, 'MA-0101', '1', '2021', 'System'),
	   ('Quices', 2, 'MA-0101', '1', '2021', 'System'),
	   ('Exámenes', 2, 'MA-0101', '1', '2021', 'System'),
	   ('Proyectos', 2, 'MA-0101', '1', '2021', 'System'),
	   ('Presentaciones', 1, 'MA-0102', '1', '2021', 'System'), -- Cálculo Diferencial e Integral
	   ('Quices', 1, 'MA-0102', '1', '2021', 'System'),
	   ('Exámenes', 1, 'MA-0102', '1', '2021', 'System'),
	   ('Proyectos', 1, 'MA-0102', '1', '2021', 'System'),
	   ('Presentaciones', 2, 'MA-0102', '1', '2021', 'System'),
	   ('Quices', 2, 'MA-0102', '1', '2021', 'System'),
	   ('Exámenes', 2, 'MA-0102', '1', '2021', 'System'),
	   ('Proyectos', 2, 'MA-0102', '1', '2021', 'System'),
	   ('Presentaciones', 1, 'MA-0103', '1', '2021', 'System'), -- Cálculo y Algebra Lineal
	   ('Quices', 1, 'MA-0103', '1', '2021', 'System'),
	   ('Exámenes', 1, 'MA-0103', '1', '2021', 'System'),
	   ('Proyectos', 1, 'MA-0103', '1', '2021', 'System'),
	   ('Presentaciones', 2, 'MA-0103', '1', '2021', 'System'),
	   ('Quices', 2, 'MA-0103', '1', '2021', 'System'),
	   ('Exámenes', 2, 'MA-0103', '1', '2021', 'System'),
	   ('Proyectos', 2, 'MA-0103', '1', '2021', 'System'),
	   ('Presentaciones', 1, 'MA-2104', '1', '2021', 'System'), -- Cálculo superior
	   ('Quices', 1, 'MA-2104', '1', '2021', 'System'),
	   ('Exámenes', 1, 'MA-2104', '1', '2021', 'System'),
	   ('Proyectos', 1, 'MA-2104', '1', '2021', 'System'),
	   ('Presentaciones', 2, 'MA-2104', '1', '2021', 'System'),
	   ('Quices', 2, 'MA-2104', '1', '2021', 'System'),
	   ('Exámenes', 2, 'MA-2104', '1', '2021', 'System'),
	   ('Proyectos', 2, 'MA-2104', '1', '2021', 'System'),
	   ('Presentaciones', 1, 'MA-2105', '1', '2021', 'System'), -- Ecuaciones diferenciales
	   ('Quices', 1, 'MA-2105', '1', '2021', 'System'),
	   ('Exámenes', 1, 'MA-2105', '1', '2021', 'System'),
	   ('Proyectos', 1, 'MA-2105', '1', '2021', 'System'),
	   ('Presentaciones', 2, 'MA-2105', '1', '2021', 'System'),
	   ('Quices', 2, 'MA-2105', '1', '2021', 'System'),
	   ('Exámenes', 2, 'MA-2105', '1', '2021', 'System'),
	   ('Proyectos', 2, 'MA-2105', '1', '2021', 'System'),
	   ('Presentaciones', 1, 'MA-0101', '2', '2021', 'System'), -- |SEGUNDO PERIODO| / Mate General
	   ('Quices', 1, 'MA-0101', '2', '2021', 'System'),
	   ('Exámenes', 1, 'MA-0101', '2', '2021', 'System'),
	   ('Proyectos', 1, 'MA-0101', '2', '2021', 'System'),
	   ('Presentaciones', 2, 'MA-0101', '2', '2021', 'System'),
	   ('Quices', 2, 'MA-0101', '2', '2021', 'System'),
	   ('Exámenes', 2, 'MA-0101', '2', '2021', 'System'),
	   ('Proyectos', 2, 'MA-0101', '2', '2021', 'System'),
	   ('Presentaciones', 1, 'MA-0102', '2', '2021', 'System'), -- Cálculo Diferencial e Integral
	   ('Quices', 1, 'MA-0102', '2', '2021', 'System'),
	   ('Exámenes', 1, 'MA-0102', '2', '2021', 'System'),
	   ('Proyectos', 1, 'MA-0102', '2', '2021', 'System'),
	   ('Presentaciones', 2, 'MA-0102', '2', '2021', 'System'),
	   ('Quices', 2, 'MA-0102', '2', '2021', 'System'),
	   ('Exámenes', 2, 'MA-0102', '2', '2021', 'System'),
	   ('Proyectos', 2, 'MA-0102', '2', '2021', 'System'),
	   ('Presentaciones', 1, 'MA-0103', '2', '2021', 'System'), -- Cálculo y Algebra Lineal
	   ('Quices', 1, 'MA-0103', '2', '2021', 'System'),
	   ('Exámenes', 1, 'MA-0103', '2', '2021', 'System'),
	   ('Proyectos', 1, 'MA-0103', '2', '2021', 'System'),
	   ('Presentaciones', 2, 'MA-0103', '2', '2021', 'System'),
	   ('Quices', 2, 'MA-0103', '2', '2021', 'System'),
	   ('Exámenes', 2, 'MA-0103', '2', '2021', 'System'),
	   ('Proyectos', 2, 'MA-0103', '2', '2021', 'System'),
	   ('Presentaciones', 1, 'MA-2104', '2', '2021', 'System'), -- Cálculo superior
	   ('Quices', 1, 'MA-2104', '2', '2021', 'System'),
	   ('Exámenes', 1, 'MA-2104', '2', '2021', 'System'),
	   ('Proyectos', 1, 'MA-2104', '2', '2021', 'System'),
	   ('Presentaciones', 2, 'MA-2104', '2', '2021', 'System'),
	   ('Quices', 2, 'MA-2104', '2', '2021', 'System'),
	   ('Exámenes', 2, 'MA-2104', '2', '2021', 'System'),
	   ('Proyectos', 2, 'MA-2104', '2', '2021', 'System'),
	   ('Presentaciones', 1, 'MA-2105', '2', '2021', 'System'), -- Ecuaciones diferenciales
	   ('Quices', 1, 'MA-2105', '2', '2021', 'System'),
	   ('Exámenes', 1, 'MA-2105', '2', '2021', 'System'),
	   ('Proyectos', 1, 'MA-2105', '2', '2021', 'System'),
	   ('Presentaciones', 2, 'MA-2105', '2', '2021', 'System'),
	   ('Quices', 2, 'MA-2105', '2', '2021', 'System'),
	   ('Exámenes', 2, 'MA-2105', '2', '2021', 'System'),
	   ('Proyectos', 2, 'MA-2105', '2', '2021', 'System'),
	   ('Presentaciones', 1, 'MA-0101', 'V', '2021', 'System'), -- |VERANO| / Mate General
	   ('Quices', 1, 'MA-0101', 'V', '2021', 'System'),
	   ('Exámenes', 1, 'MA-0101', 'V', '2021', 'System'),
	   ('Proyectos', 1, 'MA-0101', 'V', '2021', 'System'),
	   ('Presentaciones', 2, 'MA-0101', 'V', '2021', 'System'),
	   ('Quices', 2, 'MA-0101', 'V', '2021', 'System'),
	   ('Exámenes', 2, 'MA-0101', 'V', '2021', 'System'),
	   ('Proyectos', 2, 'MA-0101', 'V', '2021', 'System'),
	   ('Presentaciones', 1, 'MA-0102', 'V', '2021', 'System'), -- Cálculo Diferencial e Integral
	   ('Quices', 1, 'MA-0102', 'V', '2021', 'System'),
	   ('Exámenes', 1, 'MA-0102', 'V', '2021', 'System'),
	   ('Proyectos', 1, 'MA-0102', 'V', '2021', 'System'),
	   ('Presentaciones', 2, 'MA-0102', 'V', '2021', 'System'),
	   ('Quices', 2, 'MA-0102', 'V', '2021', 'System'),
	   ('Exámenes', 2, 'MA-0102', 'V', '2021', 'System'),
	   ('Proyectos', 2, 'MA-0102', 'V', '2021', 'System'),
	   ('Presentaciones', 1, 'MA-0103', 'V', '2021', 'System'), -- Cálculo y Algebra Lineal
	   ('Quices', 1, 'MA-0103', 'V', '2021', 'System'),
	   ('Exámenes', 1, 'MA-0103', 'V', '2021', 'System'),
	   ('Proyectos', 1, 'MA-0103', 'V', '2021', 'System'),
	   ('Presentaciones', 2, 'MA-0103', 'V', '2021', 'System'),
	   ('Quices', 2, 'MA-0103', 'V', '2021', 'System'),
	   ('Exámenes', 2, 'MA-0103', 'V', '2021', 'System'),
	   ('Proyectos', 2, 'MA-0103', 'V', '2021', 'System'),
	   ('Presentaciones', 1, 'MA-2104', 'V', '2021', 'System'), -- Cálculo superior
	   ('Quices', 1, 'MA-2104', 'V', '2021', 'System'),
	   ('Exámenes', 1, 'MA-2104', 'V', '2021', 'System'),
	   ('Proyectos', 1, 'MA-2104', 'V', '2021', 'System'),
	   ('Presentaciones', 2, 'MA-2104', 'V', '2021', 'System'),
	   ('Quices', 2, 'MA-2104', 'V', '2021', 'System'),
	   ('Exámenes', 2, 'MA-2104', 'V', '2021', 'System'),
	   ('Proyectos', 2, 'MA-2104', 'V', '2021', 'System'),
	   ('Presentaciones', 1, 'MA-2105', 'V', '2021', 'System'), -- Ecuaciones diferenciales
	   ('Quices', 1, 'MA-2105', 'V', '2021', 'System'),
	   ('Exámenes', 1, 'MA-2105', 'V', '2021', 'System'),
	   ('Proyectos', 1, 'MA-2105', 'V', '2021', 'System'),
	   ('Presentaciones', 2, 'MA-2105', 'V', '2021', 'System'),
	   ('Quices', 2, 'MA-2105', 'V', '2021', 'System'),
	   ('Exámenes', 2, 'MA-2105', 'V', '2021', 'System'),
	   ('Proyectos', 2, 'MA-2105', 'V', '2021', 'System');


-- RUBRO
INSERT INTO RUBRO(Nombre, NumeroGrupo, CodigoCurso, Periodo, Anio, Porcentaje)
VALUES ('Quices', 1, 'MA-0101', '1', '2021', 30), -- |PRIMER PERIODO| / Mate General
	   ('Exámenes', 1, 'MA-0101', '1', '2021', 30),
	   ('Proyectos', 1, 'MA-0101', '1', '2021', 40),
	   ('Quices', 2, 'MA-0101', '1', '2021', 30),
	   ('Exámenes', 2, 'MA-0101', '1', '2021', 30),
	   ('Proyectos', 2, 'MA-0101', '1', '2021', 40),
	   ('Quices', 1, 'MA-0102', '1', '2021', 30), -- Cálculo Diferencial e Integral
	   ('Exámenes', 1, 'MA-0102', '1', '2021', 30),
	   ('Proyectos', 1, 'MA-0102', '1', '2021', 40),
	   ('Quices', 2, 'MA-0102', '1', '2021', 30),
	   ('Exámenes', 2, 'MA-0102', '1', '2021', 30),
	   ('Proyectos', 2, 'MA-0102', '1', '2021', 40),
	   ('Quices', 1, 'MA-0103', '1', '2021', 30), -- Cálculo y Algebra Lineal
	   ('Exámenes', 1, 'MA-0103', '1', '2021', 30),
	   ('Proyectos', 1, 'MA-0103', '1', '2021', 40),
	   ('Quices', 2, 'MA-0103', '1', '2021', 30),
	   ('Exámenes', 2, 'MA-0103', '1', '2021', 30),
	   ('Proyectos', 2, 'MA-0103', '1', '2021', 40), 
	   ('Quices', 1, 'MA-2104', '1', '2021', 30), -- Cálculo superior
	   ('Exámenes', 1, 'MA-2104', '1', '2021', 30),
	   ('Proyectos', 1, 'MA-2104', '1', '2021', 40),
	   ('Quices', 2, 'MA-2104', '1', '2021', 30),
	   ('Exámenes', 2, 'MA-2104', '1', '2021', 30),
	   ('Proyectos', 2, 'MA-2104', '1', '2021', 40),
	   ('Quices', 1, 'MA-2105', '1', '2021', 30), -- Ecuaciones diferenciales
	   ('Exámenes', 1, 'MA-2105', '1', '2021', 30),
	   ('Proyectos', 1, 'MA-2105', '1', '2021', 40),
	   ('Quices', 2, 'MA-2105', '1', '2021', 30),
	   ('Exámenes', 2, 'MA-2105', '1', '2021', 30),
	   ('Proyectos', 2, 'MA-2105', '1', '2021', 40),
	   ('Quices', 1, 'MA-0101', '2', '2021', 30), -- |SEGUNDO PERIODO| / Mate General
	   ('Exámenes', 1, 'MA-0101', '2', '2021', 30),
	   ('Proyectos', 1, 'MA-0101', '2', '2021', 40),
	   ('Quices', 2, 'MA-0101', '2', '2021', 30),
	   ('Exámenes', 2, 'MA-0101', '2', '2021', 30),
	   ('Proyectos', 2, 'MA-0101', '2', '2021', 40),
	   ('Quices', 1, 'MA-0102', '2', '2021', 30), -- Cálculo Diferencial e Integral
	   ('Exámenes', 1, 'MA-0102', '2', '2021', 30),
	   ('Proyectos', 1, 'MA-0102', '2', '2021', 40),
	   ('Quices', 2, 'MA-0102', '2', '2021', 30),
	   ('Exámenes', 2, 'MA-0102', '2', '2021', 30),
	   ('Proyectos', 2, 'MA-0102', '2', '2021', 40),
	   ('Quices', 1, 'MA-0103', '2', '2021', 30), -- Cálculo y Algebra Lineal
	   ('Exámenes', 1, 'MA-0103', '2', '2021', 30),
	   ('Proyectos', 1, 'MA-0103', '2', '2021', 40),
	   ('Quices', 2, 'MA-0103', '2', '2021', 30),
	   ('Exámenes', 2, 'MA-0103', '2', '2021', 30),
	   ('Proyectos', 2, 'MA-0103', '2', '2021', 40), 
	   ('Quices', 1, 'MA-2104', '2', '2021', 30), -- Cálculo superior
	   ('Exámenes', 1, 'MA-2104', '2', '2021', 30),
	   ('Proyectos', 1, 'MA-2104', '2', '2021', 40),
	   ('Quices', 2, 'MA-2104', '2', '2021', 30),
	   ('Exámenes', 2, 'MA-2104', '2', '2021', 30),
	   ('Proyectos', 2, 'MA-2104', '2', '2021', 40),
	   ('Quices', 1, 'MA-2105', '2', '2021', 30), -- Ecuaciones diferenciales
	   ('Exámenes', 1, 'MA-2105', '2', '2021', 30),
	   ('Proyectos', 1, 'MA-2105', '2', '2021', 40),
	   ('Quices', 2, 'MA-2105', '2', '2021', 30),
	   ('Exámenes', 2, 'MA-2105', '2', '2021', 30),
	   ('Proyectos', 2, 'MA-2105', '2', '2021', 40),
	   ('Quices', 1, 'MA-0101', 'V', '2021', 30), -- |VERANO| / Mate General
	   ('Exámenes', 1, 'MA-0101', 'V', '2021', 30),
	   ('Proyectos', 1, 'MA-0101', 'V', '2021', 40),
	   ('Quices', 2, 'MA-0101', 'V', '2021', 30),
	   ('Exámenes', 2, 'MA-0101', 'V', '2021', 30),
	   ('Proyectos', 2, 'MA-0101', 'V', '2021', 40),
	   ('Quices', 1, 'MA-0102', 'V', '2021', 30), -- Cálculo Diferencial e Integral
	   ('Exámenes', 1, 'MA-0102', 'V', '2021', 30),
	   ('Proyectos', 1, 'MA-0102', 'V', '2021', 40),
	   ('Quices', 2, 'MA-0102', 'V', '2021', 30),
	   ('Exámenes', 2, 'MA-0102', 'V', '2021', 30),
	   ('Proyectos', 2, 'MA-0102', 'V', '2021', 40),
	   ('Quices', 1, 'MA-0103', 'V', '2021', 30), -- Cálculo y Algebra Lineal
	   ('Exámenes', 1, 'MA-0103', 'V', '2021', 30),
	   ('Proyectos', 1, 'MA-0103', 'V', '2021', 40),
	   ('Quices', 2, 'MA-0103', 'V', '2021', 30),
	   ('Exámenes', 2, 'MA-0103', 'V', '2021', 30),
	   ('Proyectos', 2, 'MA-0103', 'V', '2021', 40), 
	   ('Quices', 1, 'MA-2104', 'V', '2021', 30), -- Cálculo superior
	   ('Exámenes', 1, 'MA-2104', 'V', '2021', 30),
	   ('Proyectos', 1, 'MA-2104', 'V', '2021', 40),
	   ('Quices', 2, 'MA-2104', 'V', '2021', 30),
	   ('Exámenes', 2, 'MA-2104', 'V', '2021', 30),
	   ('Proyectos', 2, 'MA-2104', 'V', '2021', 40),
	   ('Quices', 1, 'MA-2105', 'V', '2021', 30), -- Ecuaciones diferenciales
	   ('Exámenes', 1, 'MA-2105', 'V', '2021', 30),
	   ('Proyectos', 1, 'MA-2105', 'V', '2021', 40),
	   ('Quices', 2, 'MA-2105', 'V', '2021', 30),
	   ('Exámenes', 2, 'MA-2105', 'V', '2021', 30),
	   ('Proyectos', 2, 'MA-2105', 'V', '2021', 40);