CREATE DATABASE [TESTDB]
go
USE [TESTDB]
GO
CREATE TABLE [dbo].[Products](
	[ProductId] [BIGINT] IDENTITY(1000000000,1) NOT NULL,
	[ProductName] [NVARCHAR](100) NOT NULL,
	[ProductPrice] [DECIMAL](18, 2) NOT NULL,
	[Description] NVARCHAR(50) NOT NULL,
	[Status] NVARCHAR(50) NOT NULL
) ON [PRIMARY]
GO

CREATE PROC [dbo].[Usp_InsertProduct] (@ProductName NVARCHAR(50), @ProductPrice DECIMAL(18,2), @Description NVARCHAR(50), @Status NVARCHAR(50))
AS
BEGIN
INSERT INTO [dbo].[Products] VALUES (@ProductName, @ProductPrice, @Description, @Status)
END
go

CREATE PROC [dbo].[Usp_UpdateProduct] (@ProductId bigint, @ProductPrice DECIMAL(18,2), @Description NVARCHAR(50), @Status NVARCHAR(50))
AS
BEGIN
UPDATE [dbo].[Products] SET [ProductPrice]=@ProductPrice, [Description]=@Description, [Status]=@Status WHERE ProductId=@ProductId;
END
go

CREATE PROC Usp_DeleteProduct (@ProductId bigint)
AS
BEGIN
DELETE FROM  [dbo].[Products] WHERE ProductId=@ProductId;
END
