
console.log("Executando") //Escreve no console a palavra "Executando"

const url = '/info_medias';
fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    var Dados = data;
    let saida = '';
    Dados.map(function (Dados) {
      //saida += '<strong> '+ `${Dados.max_forca}`+" "+`${Dados.min_forca}`+" "+`${Dados.max_act}`+" "+`${Dados.min_act}`+" "+`${Dados.max_peg}`+" "+`${Dados.min_peg}`+" "+`${Dados.media_valores}`+'</strong>';
    });
    document.getElementById('tabela').innerHTML = saida;
    const table = document.createElement('table');
    var th = document.createElement('th')
    th.innerHTML = "<td>Max Força  |  </td><td>Min Força  |  </td><td>Max Act  |  </td><td>Min Act  |  </td><td>Max Peg   |  </td><td>Min Peg</td>"
    document.getElementById('tabela').appendChild(th); // Alteração aqui

    for (let line of Dados) {
      const tr = document.createElement('tr');
      let td = document.createElement('td');
      td.innerHTML = line.max_forca;
      tr.appendChild(td);

      td = document.createElement('td');
      td.innerHTML = line.min_forca;
      tr.appendChild(td);

      td = document.createElement('td');
      td.innerHTML = line.max_act;
      tr.appendChild(td);

      td = document.createElement('td');
      td.innerHTML = line.min_act;
      tr.appendChild(td);

      td = document.createElement('td');
      td.innerHTML = line.max_peg;
      tr.appendChild(td);

      td = document.createElement('td');
      td.innerHTML = line.min_peg;
      tr.appendChild(td);

      table.appendChild(tr);
    }
    const resultado = document.querySelector('#tabela');
    resultado.appendChild(table);
  })
  .catch((error) => {
    console.log(error);
  });

fetch('http://127.0.0.1:3000/info_M_Vagoes')
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    var Dados = data;
    let saida2 = '';
    Dados.map(function (Dados) {
      //saida2 += '<strong> '+ `${Dados.max_forca}`+" "+`${Dados.min_forca}`+" "+`${Dados.max_act}`+" "+`${Dados.min_act}`+" "+`${Dados.max_peg}`+" "+`${Dados.min_peg}`+" "+`${Dados.media_valores}`+'</strong>';
    });
    document.getElementById('tabela2').innerHTML = saida2;
    const table2 = document.createElement('table');
    var th = document.createElement('th')
    th.innerHTML = "<td>Max Força  |  </td><td>Min Força  |  </td><td>Max Act  |  </td><td>Min Act  |  </td><td>Max Peg   |  </td><td>Min Peg</td>"
    document.getElementById('tabela2').appendChild(th);

    for (let line of Dados) {
      const tr2 = document.createElement('tr');
      let td = document.createElement('td');
      td.innerHTML = line.max_engante;
      tr2.appendChild(td);

      td = document.createElement('td');
      td.innerHTML = line.min_engante;
      tr2.appendChild(td);

      td = document.createElement('td');
      td.innerHTML = line.max_act;
      tr2.appendChild(td);

      td = document.createElement('td');
      td.innerHTML = line.min_act;
      tr2.appendChild(td);

      td = document.createElement('td');
      td.innerHTML = line.max_peg;
      tr2.appendChild(td);

      td = document.createElement('td');
      td.innerHTML = line.min_peg;
      tr2.appendChild(td);

      table2.appendChild(tr2);
    }
    const resultado2 = document.querySelector('#tabela2');
    resultado2.appendChild(table2);
  })
  .catch((error) => {
    console.log(error);
  });