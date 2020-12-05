const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySQLroot@123",
    database: "ASD_APP"
});

exports.mypatients=(req, res) => {

    // console.log(req);
    con.query(`SELECT username, name, dob 
                FROM patient p, patdoc pd
                where p.username=pd.patname and
                pd.docname='${req.query.username}'`, (err, rows, fields) => {
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