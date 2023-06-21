// requer o sqlite3, por que é a ferramenta que estamos usando para o banco de dados
const sqlite3 = require('sqlite3').verbose();

// define o aquivo do banco de dados para ser usado
const db = new sqlite3.Database('Banco_de_dados/dbProjeto.db');

//função que pega o maximo, minimo das viagens e adiciona no banco de dados. Tem que mudar as viagens a mão, mudando id_viagem em todos os db.all,
//e também no VALUE do INSERT no final da função
async function getMaxMinValue() {
    const [maxFRow1, maxFRow2, minFRow1, minFRow2, maxPRow1, maxPRow2, minPRow1, minPRow2, maxARow1, maxARow2, minARow1, minARow2] = await Promise.all([
        // pega o máximo de força  da tabela Choque1
        new Promise((resolve, reject) => {
            db.all(`SELECT MAX(f_maxima) as maxf1 FROM Choque1 WHERE id_viagem=1`, function (err, row) {
                if (err) {
                    reject(err);
                } else {
                    console.log("Max F Row 1:", row);
                    resolve(row);
                }
            });
        }),
        new Promise((resolve, reject) => {
            // pega o máximo de força  da tabela Choque2
            db.all(`SELECT MAX(f_maxima) as maxf2 FROM Choque2 WHERE id_viagem=1`, function (err, row) {
                if (err) {
                    reject(err);
                } else {
                    console.log("Max F Row 2:", row);
                    resolve(row);
                }
            });
        }),
        new Promise((resolve, reject) => {
            // pega o minimo de força  da tabela Choque1
            db.all(`SELECT MIN(f_maxima) as minf1 FROM Choque1 WHERE id_viagem=1`, function (err, row) {
                if (err) {
                    reject(err);
                } else {
                    console.log("Min F Row 1:", row);
                    resolve(row);
                }
            });
        }),
        new Promise((resolve, reject) => {
            // pega o minimo de força  da tabela Choque2
            db.all(`SELECT MIN(f_maxima) as minf2 FROM Choque2 WHERE id_viagem=1`, function (err, row) {
                if (err) {
                    reject(err);
                } else {
                    console.log("Min F Row 2:", row);
                    resolve(row);
                }
            });
        }),
        new Promise((resolve, reject) => {
            // pega o máximo de peg  da tabela Choque1
            db.all(`SELECT MAX(peg) as maxp1 FROM Choque1 WHERE id_viagem=1`, function (err, row) {
                if (err) {
                    reject(err);
                } else {
                    console.log("Max P Row 1:", row);
                    resolve(row);
                }
            });
        }),
        new Promise((resolve, reject) => {
            // pega o máximo de peg  da tabela Choque2
            db.all(`SELECT MAX(peg) as maxp2 FROM Choque2 WHERE id_viagem=1`, function (err, row) {
                if (err) {
                    reject(err);
                } else {
                    console.log("Max P Row 2:", row);
                    resolve(row);
                }
            });
        }),
        new Promise((resolve, reject) => {
            // pega o minimo de peg  da tabela Choque1
            db.all(`SELECT MIN(peg) as minp1 FROM Choque1 WHERE id_viagem=1`, function (err, row) {
                if (err) {
                    reject(err);
                } else {
                    console.log("Min P Row 1:", row);
                    resolve(row);
                }
            });
        }),
        new Promise((resolve, reject) => {
            // pega o minimo de peg  da tabela Choque2
            db.all(`SELECT MIN(peg) as minp2 FROM Choque2 WHERE id_viagem=1`, function (err, row) {
                if (err) {
                    reject(err);
                } else {
                    console.log("Min P Row 2:", row);
                    resolve(row);
                }
            });
        }),
        new Promise((resolve, reject) => {
            // pega o máximo de ACT da tabela Choque1
            db.all(`SELECT MAX(act) as maxa1 FROM Choque1 WHERE id_viagem=1`, function (err, row) {
                if (err) {
                    reject(err);
                } else {
                    console.log("Max A Row 1:", row);
                    resolve(row);
                }
            });
        }),
        new Promise((resolve, reject) => {
            // pega o máximo de ACT da tabela Choque2
            db.all(`SELECT MAX(act) as maxa2 FROM Choque2 WHERE id_viagem=1`, function (err, row) {
                if (err) {
                    reject(err);
                } else {
                    console.log("Max A Row 2:", row);
                    resolve(row);
                }
            });
        }),
        new Promise((resolve, reject) => {
            // pega o minimo de ACT da tabela Choque1
            db.all(`SELECT MIN(act) as mina1 FROM Choque1 WHERE id_viagem=1`, function (err, row) {
                if (err) {
                    reject(err);
                } else {
                    console.log("Min A Row 1:", row);
                    resolve(row);
                }
            });
        }),
        new Promise((resolve, reject) => {
            // pega o minimo de ACT da tabela Choque2
            db.all(`SELECT MIN(act) as mina2 FROM Choque2 WHERE id_viagem=1`, function (err, row) {
                if (err) {
                    reject(err);
                } else {
                    console.log("Min A Row 2:", row);
                    resolve(row);
                }
            });
        }),
    ]);

    //guarda os dados em constantes
    const maxF1 = maxFRow1[0].maxf1;
    const maxF2 = maxFRow2[0].maxf2;
    const minF1 = minFRow1[0].minf1;
    const minF2 = minFRow2[0].minf2;
    const maxP1 = maxPRow1[0].maxp1;
    const maxP2 = maxPRow2[0].maxp2;
    const minP1 = minPRow1[0].minp1;
    const minP2 = minPRow2[0].minp2;
    const maxA1 = maxARow1[0].maxa1;
    const maxA2 = maxARow2[0].maxa2;
    const minA1 = minARow1[0].mina1;
    const minA2 = minARow2[0].mina2;

    let maxF, minF, maxP, minP, maxA, minA;

    //compara os dados das duas tabelas para ver quem é maior/menor e quarda em uma variável
    if (parseFloat(maxF1) > parseFloat(maxF2)) {
        maxF = parseFloat(maxF1.toFixed(2));
    } else {
        maxF = parseFloat(maxF2.toFixed(2));
    }

    if (parseFloat(minF1) < parseFloat(minF2)) {
        minF = parseFloat(minF1.toFixed(2));
    } else {
        minF = parseFloat(minF2.toFixed(2));
    }

    if (parseFloat(maxP1) > parseFloat(maxP2)) {
        maxP = parseFloat(maxP1.toFixed(2));
    } else {
        maxP = parseFloat(maxP2.toFixed(2));
    }

    if (parseFloat(minP1) < parseFloat(minP2)) {
        minP = parseFloat(minP1.toFixed(2));
    } else {
        minP = parseFloat(minP2.toFixed(2));
    }

    if (parseFloat(maxA1) > parseFloat(maxA2)) {
        maxA = parseFloat(maxA1.toFixed(2));
    } else {
        maxA = parseFloat(maxA2.toFixed(2));
    }

    if (parseFloat(minA1) < parseFloat(minA2)) {
        minA = parseFloat(minA1.toFixed(2));
    } else {
        minA = parseFloat(minA2.toFixed(2));
    }

    // mostra no console as variáveis 
    console.log("Max F:", maxF);
    console.log("Min F:", minF);
    console.log("Max P:", maxP);
    console.log("Min P:", minP);
    console.log("Max A:", maxA);
    console.log("Min A:", minA);

    //insere os dados no banco de dados usando as variáveis 
    db.all(`INSERT INTO Viagem (id_viagem, max_forca, min_forca, max_act, min_act, max_peg, min_peg) VALUES (6, ${maxF}, ${minF}, ${maxA}, ${minA}, ${maxP}, ${minP})`, function (err, row) {
        if (err) {
            throw (err);
        } else {
            console.log("inserido com sucesso!");
        }
    });

    // retorna as variáveis 
    return {
        maxF: maxF,
        minF: minF,
        maxP: maxP,
        minP: minP,
        maxA: maxA,
        minA: minA,
    };
}

//roda a função
getMaxMinValue()