CREATE DATABASE [TESTDB]
go
USE [TESTDB]
GO
CREATE TABLE [dbo].[Products](
	[ProductId] [BIGINT] IDENTITY(1000000000,1) NOT NULL,
	[ProductName] [NVARCHAR](100) NOT NULL,
	[ProductPrice] [DECIMAL](18, 2) NOT NULL
) ON [PRIMARY]
GO
CREATE PROC Usp_InsertProduct (@ProductName NVARCHAR(50), @ProductPrice DECIMAL(18,2))
AS
BEGIN
INSERT INTO [dbo].[Products] VALUES (@ProductName, @ProductPrice)
END
go
CREATE PROC Usp_UpdateProduct (@ProductId bigint, @ProductPrice DECIMAL(18,2))
AS
BEGIN
UPDATE [dbo].[Products] SET ProductPrice=@ProductPrice WHERE ProductId=@ProductId;
END
go
CREATE PROC Usp_DeleteProduct (@ProductId bigint)
AS
BEGIN
DELETE FROM  [dbo].[Products] WHERE ProductId=@ProductId;
END
