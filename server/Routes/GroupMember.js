const express = require('express');
const router = express.Router();
const fs = require('fs');
const data = fs.readFileSync('./database/database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host,
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
})
connection.connect();

router.post('/inviteMember', function (req, res) {

    let sql = `INSERT INTO moidagroup_member values (?,?,0)`;
    let user_id = req.query.master_realid;
    let group_id = req.body.params.group_id;
    let params = [user_id, group_id];

    connection.query(sql, params, function (err, rows, fields) {
        if(!err){
            res.send({code : 0, rows});
        }else{
            res.send({code: 102, errorMessage: err })
        }
    })
})

module.exports = router;