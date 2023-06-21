// !!!!!!!!!!!! Código para transferir os dados do choque 1 e choque 2 !!!!!!!!!!!!!!!

const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();

// Define of caminho do arquivo CSV e do banco de dados
const csvFilePath = 'Choque2.csv';
const dbFilePath = 'dbProjeto.db';

// Read the CSV file
const csvData = fs.readFileSync(csvFilePath, 'utf-8');

// Separa as informacoses do CSV em arrays
const rows = csvData.trim().split('\n').slice(1);

const db = new sqlite3.Database(dbFilePath);

// Prepare the INSERT statement for the Choque1 table SQL query para inserir os valores no banco de dados
// !!!!!! Mudar o nome da tabela que os dados vao ser inseridos !!!!!!!!!!
const insertStatement = db.prepare(`
  INSERT INTO Choque2 (
    id_viagem,
    tipo_vagao,
    data_hora,
    latitude,
    longitude,
    velocidade,
    posicao,
    placa_virtual,
    trecho,
    f_maxima,
    act,
    peg
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
`);

// Iterar sobre as linhas CSV e inserir os dados na tabela Pico
rows.forEach((row) => {
  // Quebra as linhas quando tem ;
  const values = row.split(';');
  console.log(values);

  // !!!!!!! Mudar o id_viagem e o tipo de vagao que o arquivo CSV contem !!!!!!!!!
  const id_viagem = 2; 
  const tipo_vagao = 'E';

  // Armazena os dados da array nas variaveis
  const data_hora = parseFloat(values[0].replace(',', '.')); 
  const latitude = parseFloat(values[1].replace(',', '.')); 
  const longitude = parseFloat(values[2].replace(',', '.')); 
  const velocidade = parseFloat(values[3].replace(',', '.')); 
  const posicao = parseFloat(values[4].replace(',', '.'));
  const placa_virtual = values[5];
  const trecho = values[6];
  const f_maxima = parseFloat(values[7].replace(',', '.')); 
  const act = parseFloat(values[8].replace(',', '.')); 
  const peg = parseFloat(values[9].replace(',', '.')); 

  // Roda o query de insert
  insertStatement.run(
    id_viagem,
    tipo_vagao,
    data_hora,
    latitude,
    longitude,
    velocidade,
    posicao,
    placa_virtual,
    trecho,
    f_maxima,
    act,
    peg
  );
});

// Retorna o feedback
insertStatement.finalize(() => {
  db.close((err) => {
    if (err) {
      console.error('Error closing the database:', err);
    } else {
      console.log('Data imported successfully.');
    }
  });
});