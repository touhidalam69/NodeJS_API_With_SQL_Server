var express = require('express');
var router = express.Router();
var sql = require('mssql');
var conn = require('../connection/Connect')();

var routes = function () {
    router.route('')
        .get(function (req, res) {			
			// res.setHeader("Access-Control-Allow-Origin", "*");
			// res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
            conn.connect().then(function () {
                var sqlQuery = "select top 100 * from Products";
                var req = new sql.Request(conn);
                req.query(sqlQuery).then(function (recordset) {					
                    res.json(recordset.recordset);
                    conn.close();
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send(err);
                });
            }).catch(function (err) {
                conn.close();
                res.status(400).send(err);
            });
        });
    router.route('/')
        .post(function (req, res) {
            conn.connect().then(function () {
                var transaction = new sql.Transaction(conn);
                transaction.begin().then(function () {
                    var request = new sql.Request(transaction);
                    request.input("ProductName", sql.VarChar(50), req.body.ProductName);
                    request.input("ProductPrice", sql.Decimal(18, 0), req.body.ProductPrice);
					request.input("Description", sql.VarChar(50), req.body.Description);
					request.input("Status", sql.VarChar(50), req.body.Status);
                    request.execute("Usp_InsertProduct").then(function () {
                        transaction.commit().then(function (recordSet) {
                            conn.close();
                            res.status(200).send(req.body);
                        }).catch(function (err) {
                            conn.close();
                            res.status(400).send(err);
                        });
                    }).catch(function (err) {
                        conn.close();
                        res.status(400).send(err);
                    });
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send(err);
                });
            }).catch(function (err) {
                conn.close();
                res.status(400).send(err);
            });
        });
    router.route('/:id')
        .put(function (req, res) {
            var _productID = req.params.id;
            conn.connect().then(function () {
                var transaction = new sql.Transaction(conn);
                transaction.begin().then(function () {
                    var request = new sql.Request(transaction);
                    request.input("ProductID", sql.Int, _productID);
                    request.input("ProductPrice", sql.Decimal(18, 0), req.body.ProductPrice);
					request.input("Description", sql.VarChar(50), req.body.Description);
					request.input("Status", sql.VarChar(50), req.body.Status);
                    request.execute("Usp_UpdateProduct").then(function () {
                        transaction.commit().then(function (recordSet) {
                            conn.close();
                            res.status(200).send(req.body);
                        }).catch(function (err) {
                            conn.close();
                            res.status(400).send(err);
                        });
                    }).catch(function (err) {
                        conn.close();
                        res.status(400).send(err);
                    });
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send(err);
                });
            }).catch(function (err) {
                conn.close();
                res.status(400).send(err);
            });
        });
    router.route('/:id')
        .delete(function (req, res) {
            var _productID = req.params.id;
            conn.connect().then(function () {
                var transaction = new sql.Transaction(conn);
                transaction.begin().then(function () {
                    var request = new sql.Request(transaction);
                    request.input("ProductID", sql.Int, _productID);
                    request.execute("Usp_DeleteProduct").then(function () {
                        transaction.commit().then(function (recordSet) {
                            conn.close();
                            res.status(200).json("ProductID:" + _productID);
                        }).catch(function (err) {
                            conn.close();
                            res.status(400).send(err);
                        });
                    }).catch(function (err) {
                        conn.close();
                        res.status(400).send(err);
                    });
                }).catch(function (err) {
                    conn.close();
                    res.status(400).send(err);
                });
            });
        });
    return router;
};
module.exports = routes;