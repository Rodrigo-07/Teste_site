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
app.use(express.static('public/frontend'));

//variáveis e constantes necessárias para o pleno funcionamento do projeto, além
//de outras definições.

// app.use('Backend/', express.static(__dirname + '/src/Backend'));

app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile(__dirname + '/public/frontend/paghome.html');
}); //define o arquivo paghome como default quando se acessa o url do site, demonstrando-o.

app.get('/analise', (req, res) => {
    //console.log('/Frontend');
    res.sendFile(__dirname + '/public/analise.html');
}); //envia o arquivo "análise.html" quando se realiza a requisição /analise, demonstrando-o e o lendo.

app.get('/info_medias', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var sql = `SELECT * FROM Viagem`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
}); //demonstra as arrays contendo os valores medios das viagens quando requisitado.

app.get('/info_M_Vagoes', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var sql = `SELECT * FROM Resumo_vagoes WHERE tipo_dados="completo"`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows)
    })
})


app.get('/info', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var sql = `SELECT * FROM Viagem`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
}); //seleciona todos os dados da tabela viagem

app.get('/choque1', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var id_choque1 = req.query.id;
    var sql = `SELECT * FROM Choque1 WHERE id_choque1=${id_choque1}`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
}); //seleciona todos os dados da tabela choque 1 nos quais o id_choque1 tem valor igual a um selecionado anteriormente.

app.get('/choque1All', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var sql = `SELECT * FROM Choque1`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
}); //seleciona todos os dados da tabela choque1.

app.get('/choque2', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var id_choque2 = req.query.id;
    var sql = `SELECT * FROM Choque2`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
}); //seleciona todos os dados da tabela choque 2.

app.get('/pico', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var id_pico = req.query.id;
    var sql = `SELECT * FROM Pico WHERE id_pico <= 60`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
}); //lê o banco de dados selecionando todos os arquivos da tabela Pico os quais tem id_pico tem valor igual a um selecionado anteriormente.

app.get('/viagens', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var id_viagem = req.query.id;
    var sql = `SELECT * FROM Viagem WHERE id_viagem=${id_viagem}`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows);
    });
}); //seleciona todos os dados da tabela Viagem nos quais o id_viagem tem valor igual a um selecionado anteriormente. 



app.get('/relatorio', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile(__dirname + '/public/relatorio.html');
}); //mostra o relatório da viagem.

app.listen(port, hostname, () => {
    console.log('Servidor rodando em http://' + hostname + ':' + port);
}); //escreve no console o "link" de acesso para a aplicação.


// app.listen(port, "0.0.0.0", function() {
//     console.log("Listening on Port 3000");
//     });
