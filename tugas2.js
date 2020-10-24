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
app.use(bParser.urlencoded({extended:false}));

app.get('/', function(req, res){;
    res.sendFile(__dirname+'/search.html');
});

app.post('/', function(req, res){
    let harga_min = req.body.harga_min;
    let harga_max = req.body.harga_max;
    let q1 = 'SELECT * FROM items WHERE harga >= ? AND harga <= ?';
    data = [harga_min, harga_max];
    db.query(q1, data, (err, results) =>{
        if(err) throw err;
        else {
            res.end(JSON.stringify(results));
        }
    })
})

//Server listening
app.listen(5000, function() {
    console.log('Server started ...');
});