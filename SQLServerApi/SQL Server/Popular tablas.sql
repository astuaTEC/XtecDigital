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
VALUES ('1', '2021'),
	   ('2', '2021'),
	   ('V', '2021');

-- CURSO
INSERT INTO CURSO (Codigo, Creditos, Carrera, Nombre, Habilitado)
VALUES ('MA-0101', 4, 'Matemática', 'Matemática General', 1),
	   ('MA-0102', 4, 'Matemática', 'Cálculo Diferencial e Integral', 1),
	   ('MA-0103', 4, 'Matemática', 'Cálculo y Algebra Lineal', 1),
	   ('MA-2105', 4, 'Matemática', 'Ecuaciones diferenciales', 1),
	   ('MA-2104', 4, 'Matemática', 'Cálculo superior', 1);

-- GRUPO 
INSERT INTO GRUPO(Numero, CodigoCurso, Periodo, Anio)
VALUES (1, 'MA-0101', '1', '2021'), -- |PRIMER PERIODO| / Mate general
	   (2, 'MA-0101', '1', '2021'),
	   (1, 'MA-0102', '1', '2021'), -- Cálculo Diferencial e Integral
	   (2, 'MA-0102', '1', '2021'),
	   (1, 'MA-0103', '1', '2021'), -- Cálculo y Algebra Lineal
	   (2, 'MA-0103', '1', '2021'),
	   (1, 'MA-2104', '1', '2021'), -- Cálculo superior
	   (2, 'MA-2104', '1', '2021'),
	   (1, 'MA-2105', '1', '2021'), -- Ecuaciones diferenciales
	   (2, 'MA-2105', '1', '2021'),
	   (1, 'MA-0101', '2', '2021'), -- |SEGUNDO PERIODO| / Mate general
	   (2, 'MA-0101', '2', '2021'),
	   (1, 'MA-0102', '2', '2021'), -- Cálculo Diferencial e Integral
	   (2, 'MA-0102', '2', '2021'),
	   (1, 'MA-0103', '2', '2021'), -- Cálculo y Algebra Lineal
	   (2, 'MA-0103', '2', '2021'),
	   (1, 'MA-2104', '2', '2021'), -- Cálculo superior
	   (2, 'MA-2104', '2', '2021'),
	   (1, 'MA-2105', '2', '2021'), -- Ecuaciones diferenciales
	   (2, 'MA-2105', '2', '2021'),
	   (1, 'MA-0101', 'V', '2021'), -- |VERANO| / Mate general
	   (2, 'MA-0101', 'V', '2021'),
	   (1, 'MA-0102', 'V', '2021'), -- Cálculo Diferencial e Integral
	   (2, 'MA-0102', 'V', '2021'),
	   (1, 'MA-0103', 'V', '2021'), -- Cálculo y Algebra Lineal
	   (2, 'MA-0103', 'V', '2021'),
	   (1, 'MA-2104', 'V', '2021'), -- Cálculo superior
	   (2, 'MA-2104', 'V', '2021'),
	   (1, 'MA-2105', 'V', '2021'), -- Ecuaciones diferenciales
	   (2, 'MA-2105', 'V', '2021');

-- PROFESOR_GRUPO
INSERT INTO PROFESOR_GRUPO(CedulaProfesor, NumeroGrupo, CodigoCurso, Periodo, Anio)
VALUES ('106540871', 1, 'MA-0101', '1', '2021'), -- |PRIMER PERIODO| / Mate General
	   ('308740651', 2, 'MA-0101', '1', '2021'),
	   ('103480774', 1, 'MA-0102', '1', '2021'), -- Cálculo Diferencial e Integral
	   ('701450456', 2, 'MA-0102', '1', '2021'),
	   ('106540871', 1, 'MA-0103', '1', '2021'), -- Cálculo y Algebra Lineal
	   ('308740651', 2, 'MA-0103', '1', '2021'),
	   ('103480774', 1, 'MA-2104', '1', '2021'), -- Cálculo superior
	   ('701450456', 2, 'MA-2104', '1', '2021'),
	   ('106540871', 1, 'MA-2105', '1', '2021'), -- Ecuaciones diferenciales
	   ('308740651', 2, 'MA-2105', '1', '2021'),
	   ('106540871', 1, 'MA-0101', '2', '2021'), -- |SEGUNDO PERIODO| / Mate General
	   ('308740651', 2, 'MA-0101', '2', '2021'),
	   ('103480774', 1, 'MA-0102', '2', '2021'), -- Cálculo Diferencial e Integral
	   ('701450456', 2, 'MA-0102', '2', '2021'),
	   ('106540871', 1, 'MA-0103', '2', '2021'), -- Cálculo y Algebra Lineal
	   ('308740651', 2, 'MA-0103', '2', '2021'),
	   ('103480774', 1, 'MA-2104', '2', '2021'), -- Cálculo superior
	   ('701450456', 2, 'MA-2104', '2', '2021'),
	   ('106540871', 1, 'MA-2105', '2', '2021'), -- Ecuaciones diferenciales
	   ('308740651', 2, 'MA-2105', '2', '2021'),
	   ('106540871', 1, 'MA-0101', 'V', '2021'), -- |VERANO| / Mate General
	   ('308740651', 2, 'MA-0101', 'V', '2021'),
	   ('103480774', 1, 'MA-0102', 'V', '2021'), -- Cálculo Diferencial e Integral
	   ('701450456', 2, 'MA-0102', 'V', '2021'),
	   ('106540871', 1, 'MA-0103', 'V', '2021'), -- Cálculo y Algebra Lineal
	   ('308740651', 2, 'MA-0103', 'V', '2021'),
	   ('103480774', 1, 'MA-2104', 'V', '2021'), -- Cálculo superior
	   ('701450456', 2, 'MA-2104', 'V', '2021'),
	   ('106540871', 1, 'MA-2105', 'V', '2021'), -- Ecuaciones diferenciales
	   ('308740651', 2, 'MA-2105', 'V', '2021');

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