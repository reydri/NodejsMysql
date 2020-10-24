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
    res.sendFile(__dirname+'/add.html');
});

app.post('/', function(req, res){;
    let json = {};
    let id = req.body.id;
    let name = req.body.name;
    let harga = req.body.harga;
    let q1 = 'SELECT id FROM items WHERE id = ?';
    let q2 = 'INSERT INTO items(id,name,harga) VALUES(?,?,?)';
    data = [id,name,harga];
    db.query(q2,data, (err,results) => {
        if(err){
            if(err.code == 'ER_DUP_ENTRY' || err.errno == 1062){
                json.error = "id sudah ada";
                res.end(JSON.stringify(json));
                console.log('duplicate entry'); 
            }else{
                throw err;
            }
        }else {
            console.log("record inserted");
            json.id = id;
            json.name = name;
            json.harga = harga;
            res.end(JSON.stringify(json));
        }
    });
})

//Server listening
app.listen(4000, function() {
    console.log('Server started ...');
});