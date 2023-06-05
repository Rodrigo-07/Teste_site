const express = require('express')
const app = express()
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'Banco_de_dados/dbProjeto.db';
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var db = new sqlite3.Database(DBPATH);
app.use(express.static('public'));

// app.use('Backend/', express.static(__dirname + '/src/Backend'));

app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile(__dirname + '/public/paghome.html');
});

app.get('/analise', (req, res) => {
    //console.log('/Frontend');
    res.sendFile(__dirname + '/public/analise.html');
});
app.get('/info_medias', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var sql = `SELECT * FROM Viagem`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});


app.get('/info', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    // res.sendFile(__dirname + '/src/Frontend/analise.html');
    var sql = `SELECT * FROM Viagem`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

app.get('/choque1', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  //res.sendFile(__dirname+'/src/Frontend/choques.html');
  var id_choque1 = req.query.id;
  var sql = `SELECT * FROM Choque1 WHERE id_choque1=${id_choque1}`;
  db.all(sql, [], (err, rows) => {
      if (err) {
          throw err;
      }
      res.send(rows);
  });
});

app.get('/choque1All', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    //res.sendFile(__dirname+'/src/Frontend/choques.html');
    var sql = `SELECT * FROM Choque1`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
  });

app.get('/choque2', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    //res.sendFile(__dirname+'/src/Frontend/choques.html');
    var id_choque2 = req.query.id;
    var sql = `SELECT * FROM Choque2`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

app.get('/pico', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    //res.sendFile(__dirname+'/src/Frontend/choques.html');
    var id_pico = req.query.id;
    var sql = `SELECT * FROM Pico`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

app.get('/viagens', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    //res.sendFile(__dirname+'/src/Frontend/choques.html');
    var id_viagem = req.query.id;
    var sql = `SELECT * FROM Viagem WHERE id_viagem=${id_viagem}`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
});

app.post('/inserePico', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var id_pico = req.body.id_pico;
    var id_viagem = req.body.id_viagem;
    var tipo_vagao = req.body.tipo_vagao;
    var data_hora = req.body.data_hora;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var velocidade = req.body.velocidade;
    var posicao = req.body.posicao;
    var placa_virtual = req.body.placa_virtual;
    var trecho = req.body.trecho;
    var engate = req.body.engate;
    var delta = req.body.delta;
    var act = req.body.act;
    var peg = req.body.peg;
    sql = `INSERT INTO Pico VALUES (${id_pico}, ${id_viagem}, "${tipo_vagao}", ${data_hora}, ${latitude}, ${longitude}, ${velocidade}, ${posicao}, "${placa_virtual}", "${trecho}", ${engate}, ${delta}, ${act}, ${peg})`;
    db.run(sql, [], err => {
        if (err) {
            res.send("Erro na gravação: " + err);
        }
        else {
            res.send("Pico cadastrado com sucesso");
        }
    });
});


app.post("/deletPico", (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var id_pico = parseInt(req.body.id_pico);
    console.log(parseInt(id_pico))
    var sql = `DELETE FROM Pico WHERE id_pico = ${id_pico}`;
    //console.log(sql,'hahahahah');
    db.run(sql, [], (err,rows) => {
        if(err){
            throw err;  
        }
        console.log("Registro deletado com sucesso");
        console.log(rows)
    });
});

app.put('/atualizaPico', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-Control-Allow-Origin', '*');
    var id_pico = req.body.id_pico
    var tipo_vagao = req.body.tipo_vagao;
    var data_hora = req.body.data_hora;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;
    var velocidade = req.body.velocidade;
    var posicao = req.body.posicao;
    var placa_virtual = req.body.placa_virtual;
    var trecho = req.body.trecho;
    var engate = req.body.engate;
    var delta = req.body.delta;
    var act = req.body.act;
    var peg = req.body.peg;
    var sql = `UPDATE Pico SET tipo_vagao="${tipo_vagao}", data_hora=${data_hora}, latitude=${latitude}, longitude=${longitude}, velocidade=${velocidade}, posicao=${posicao}, placa_virtual="${placa_virtual}", trecho="${trecho}", engate=${engate}, delta=${delta}, act=${act}, peg=${peg} WHERE id_pico = ${id_pico}`;
    db.run(sql, [], (err,rows) => {
        if (err) {
            res.send("Erro na atualização: " + err);
        }
        else {
            res.send("Pico atualizado com sucesso")
            console.log(rows);
        }
    });
});

app.get('/relatorio', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile(__dirname + '/public/relatorio.html');
});

app.listen(port, hostname, () => {
    console.log('Servidor rodando em http://' + hostname + ':' + port);
});
