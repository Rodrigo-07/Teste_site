// requere o express, define a porta do site, requere o sqlite3 para uso do banco de dados, define qual banco de dados usar
const express = require('express')
const app = express()
const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
const sqlite3 = require('sqlite3').verbose();
const DBPATH = 'src/Banco_de_dados/dbProjeto.db';
const multer = require('multer');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// define a variavel db como o banco de dados sqlite 
var db = new sqlite3.Database(DBPATH);
app.use(express.static(process.cwd()+'/src/public/frontend'));

//variáveis e constantes necessárias para o pleno funcionamento do projeto, além
//de outras definições.

app.get('/', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile( process.cwd() + '/src/public/frontend/paghome.html');
}); //define o arquivo paghome como default quando se acessa o url do site, demonstrando-o.

app.get('/analise', (req, res) => {
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

app.get('/info_Vagoes_E', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var sql = `SELECT * FROM Resumo_vagoes WHERE tipo_dados="completo" AND tipo_vagao="E"`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows)
    })
}) // pega os dados da tabela Resumo_vagoes, os quais o tipo de dados é completo e o tipo de vagão é E.

app.get('/info_Vagoes_F', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    var sql = `SELECT * FROM Resumo_vagoes WHERE tipo_dados="completo" AND tipo_vagao="F"`
    db.all(sql, [], (err, rows) => {
        if (err) {
            throw err;
        }
        res.send(rows)
    })
})// pega os dados da tabela Resumo_vagoes, os quais o tipo de dados é completo e o tipo de vagão é F.


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
    var sql = `SELECT * FROM Choque1 ORDER BY data_hora ASC`;
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



// upload de arquivos

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const upload = multer({ storage: storage });
  
app.post('/upload1', upload.single('file'), function (req, res) {
    // Aqui você pode acessar o arquivo enviado usando req.file
    res.send('Arquivo enviado com sucesso!');
  });
app.get('/upload1', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req.body);
});


app.get('/upload', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile(__dirname + '/public/frontend/alimentacao.html');
});

app.listen(port, hostname, () => {
    console.log('Servidor rodando em http://' + hostname + ':' + port);
}); //escreve no console o "link" de acesso para a aplicação.


// app.listen(port, "0.0.0.0", function() {
//     console.log("Listening on Port 3000");
//     });

