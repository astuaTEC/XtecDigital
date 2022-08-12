USE XtecDigitalDB;
GO

ALTER FUNCTION ValorPorcentual(@Total FLOAT, @NotaObtenida FLOAT)
RETURNS FLOAT
AS
BEGIN
	RETURN ( (@NotaObtenida/100) * @Total)
END

GO

PRINT dbo.ValorPorcentual(30, 80);