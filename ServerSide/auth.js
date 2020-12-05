const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySQLroot@123",
    database: "ASD_APP"
});

exports.docAuth=(req, res) => {

    // console.log(req);
    con.query(`SELECT * FROM doctor where username='${req.query.username}' and password='${req.query.password}'`, (err, rows, fields) => {
        if (!err)
        {
            console.log("req.query : ",req.query)
            console.log("rows : ",rows.length);
            res.send(rows);
        }
        else
            res.status(400);
    })
}

exports.patAuth=(req, res) => {

    con.query(`SELECT * FROM patient where username='${req.query.username}' and password='${req.query.password}'`, (err, rows, fields) => {
        if (!err)
        {
            // console.log("req.query : ",req.query.username)
            console.log("rows : ",rows.length);
            res.send(rows);
        }
        else
            res.status(400);
    })
};