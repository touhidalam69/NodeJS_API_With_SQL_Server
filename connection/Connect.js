var sql = require("mssql");
var connect = function () {
    var conn = new sql.ConnectionPool({
        user: 'sa',
        password: 'touhid123',
        server: '192.168.1.138\\SQL2014',
        database: 'TESTDB',
        port: 1433,
        "options": {
            "encrypt": true,
            "enableArithAbort": true
        }
    });

    return conn;
};

module.exports = connect;