var express = require('express');
const cors = require('cors');
var app = express();
var port = process.env.port || 1337;

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200, // For legacy browser support
    methods: "GET,POST,OPTIONS,DELETE,PUT"
}

app.use(cors(corsOptions));

var productController = require('./Controller/ProductController')();
app.use("/api/products", productController);

app.listen(port, function () {
    var datetime = new Date();
    var message = "Server runnning on Port:- " + port + ", Started at :- " + datetime;
    console.log(message);
});