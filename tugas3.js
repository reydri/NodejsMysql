const mysql = require('mysql2');
const express = require("express");
const bParser = require('body-parser');

//Konfigurasi koneksi
const db = mysql.createConnection({
    host: 'localhost',
    user: 'fin',
    password: '123',
    database: 'finance'
})
//konek ke database
db.connect(function(err) {
    if(err) throw err;
    console.log('Mysql Connected');
})
//Reyhan Alkadri
const app = express();
// app.use(bParser.json());
app.use(bParser.urlencoded({extended:false}));

app.get('/', function(req, res){;
    res.sendFile(__dirname+'/update.html');
});

app.post('/', function(req, res) {
    let json = {}
    let id = req.body.id;
    let name = req.body.nama;
    let harga = req.body.harga;
    if (name == '' || name == ' ') {
        let q = `UPDATE items SET harga = ? WHERE id = ?`
        data = [harga, id]
        db.query(q, data, (err, results) => {
        if (err) throw err;
        else {
            console.log("record updated");
            json.updated = id;
            res.end(JSON.stringify(json))
        }
        });
    }else {
        let q = `UPDATE items SET harga = ?, name = ? WHERE id = ?`
        data = [harga, name, id]
        db.query(q, data, (err, results) => {
        if (err) throw err;
        else {
            console.log("record updated");
            json.updated = results.affectedRows;
            res.end(JSON.stringify(json))
        }
        });
    }
})

//Server listening
app.listen(3000, function() {
    console.log('Server started ...');
});