var express = require('express');
var app = express();
var port = process.env.port || 1337;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var productController = require('./Controller/ProductController')();
app.use("/api/products", productController);

app.listen(port, function () {
    var datetime = new Date();
    var message = "Server runnning on Port:- " + port + ", Started at :- " + datetime;
    console.log(message);
});