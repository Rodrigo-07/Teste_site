const url = '/info_medias';
fetch(url)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    var Dados = data;
    let saida = '';
    document.getElementById('tabela').innerHTML = saida;
    const table = document.createElement('table');
    const th = document.createElement('th');
    th.innerHTML = "<td>Viagem|</td><td>Max Força(tf)|</td><td>Min Força(tf)|</td><td>Max Act(mm)|</td><td>Min Act(mm)|</td><td>Max PEG(PSI)|</td><td>Min PEG(PSI)</td>";
    document.getElementById('tabela').appendChild(th);

    var i = 1

    for (let line of Dados) {   //for para criar a tabela indempendente do tamanho do vetor
      const tr = document.createElement('tr');

      let td = document.createElement('td');
      td.innerHTML = i;
      tr.appendChild(td);

      td = document.createElement('td');
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

      i += 1
      
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
    document.getElementById('tabela2').innerHTML = saida2;
    const table2 = document.createElement('table');
    var th = document.createElement('th')
    th.innerHTML ="<td>Viagem</td>|<td>Max Engate(tf)|  </td><td>Min Engate(tf)|  </td><td>Max Act(mm)|  </td><td>Min Act(mm)|  </td><td>Max PEG(PSI)|  </td><td>Min PEG(PSI)</td>"
    document.getElementById('tabela2').appendChild(th);

    let i = 1; // move i initialization outside the loop

    for (let line of Dados) {
      const tr2 = document.createElement('tr'); // create a new row for each record

      let td = document.createElement('td');
      td.innerHTML = i;
      tr2.appendChild(td);

      td = document.createElement('td');
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

      table2.appendChild(tr2); // append the row to the table

      i += 1; // increment i
    }
    const resultado2 = document.querySelector('#tabela2');
    resultado2.appendChild(table2);
  })
  .catch((error) => {
    console.log(error);
  });

  
  window.onload = function () {  //espera o carregamento da pagina para executar o codigo
    const vagao = document.getElementById('menu_vagao');
    const viagem = document.getElementById('menu_viagem');
    const graficoSelecionado1 = document.getElementById('grafico_selecionado1');
    const graficoSelecionado2 = document.getElementById('grafico_selecionado2');
    viagem.addEventListener('change', () => {
    const viagemSelecionada = viagem.value;
    changeViagem(viagemSelecionada);
    document.getElementById('menu_vagao').value = "VagaoE"
  });

  function changeViagem(viagem) { //função para mudar os graficos de acordo com a viagem selecionada
    if (viagem === "Viagem1") {
      graficoSelecionado1.src = "graficos/Markov - Viagem 1 - E - act.bmp";
      graficoSelecionado2.src = "graficos/Markov - Viagem 1 - E - forca.bmp";

    } else if (viagem === "Viagem2") {
      graficoSelecionado1.src = "graficos/Markov -  Viagem 2 - E - act.bmp";
      graficoSelecionado2.src = "graficos/Markov - Viagem 2 - E - forca.bmp";
      // ...
    } else if (viagem === "Viagem3") {
      graficoSelecionado1.src = "graficos/Markov - Viagem 3 - E - act.bmp";
      graficoSelecionado2.src = "graficos/Markov - Viagem 3 - E - forca.bmp";
    } else if (viagem === "Viagem4") {
      graficoSelecionado1.src = "graficos/Markov - Viagem 4 - E - act.bmp";
      graficoSelecionado2.src = "graficos/Markov - Viagem 4 - E - forca.bmp";
    } else if (viagem === "Viagem5") {
      graficoSelecionado1.src = "graficos/Markov - Viagem 5 - E - act.bmp";
      graficoSelecionado2.src = "graficos/Markov - Viagem 5 - E - forca.bmp";
    }
  }

  viagem.addEventListener('change', () => { //eventlistener para detectar a mudança de viagens
    const viagemSelecionada = viagem.value;
    vagao.addEventListener('change', () => {
      const vagaoSelecionado = vagao.value;

      if (viagemSelecionada === "Viagem1" && vagaoSelecionado === "VagaoE") {
        graficoSelecionado1.src = "graficos/Markov - Viagem 1 - E - act.bmp";
        graficoSelecionado2.src = "graficos/Markov - Viagem 1 - E - forca.bmp";
      } else if (viagemSelecionada === "Viagem1" && vagaoSelecionado === "VagaoF") {
        graficoSelecionado1.src = "graficos/Markov - Viagem 1 - F - act.bmp";
        graficoSelecionado2.src = "graficos/Markov - Viagem 1- F - forca.bmp";
      } else if (viagemSelecionada === "Viagem2" && vagaoSelecionado === "VagaoE") {
        graficoSelecionado1.src = "graficos/Markov -  Viagem 2 - E - act.bmp";
        graficoSelecionado2.src = "graficos/Markov - Viagem 2 - E - forca.bmp";
      } else if (viagemSelecionada === "Viagem2" && vagaoSelecionado === "VagaoF") {
        graficoSelecionado1.src = "graficos/Markov - Viagem 2 - F - act.bmp";
        graficoSelecionado2.src = "graficos/Markov - Viagem 2 - F - forca.bmp";
      } else if (viagemSelecionada === "Viagem3" && vagaoSelecionado === "VagaoE") {
        graficoSelecionado1.src = "graficos/Markov - Viagem 3 - E - act.bmp";
        graficoSelecionado2.src = "graficos/Markov - Viagem 3 - E - forca.bmp";
      } else if (viagemSelecionada === "Viagem3" && vagaoSelecionado === "VagaoF") {
        graficoSelecionado1.src = "graficos/Markov - Viagem 3- F - act.bmp";
        graficoSelecionado2.src = "graficos/Markov - Viagem 3 - F - forca.bmp";
      } else if (viagemSelecionada === "Viagem4" && vagaoSelecionado === "VagaoE") {
        graficoSelecionado1.src = "graficos/Markov - Viagem 4 - E - act.bmp";
        graficoSelecionado2.src = "graficos/Markov - Viagem 4 - E - forca.bmp";
      } else if (viagemSelecionada === "Viagem4" && vagaoSelecionado === "VagaoF") {
        graficoSelecionado1.src = "graficos/Markov - Viagem 4 - F - act.bmp";
        graficoSelecionado2.src = "graficos/Markov - Viagem 4 - F - forca.bmp";
      } else if (viagemSelecionada === "Viagem5" && vagaoSelecionado === "VagaoE") {
        graficoSelecionado1.src = "graficos/Markov - Viagem 5 - E - act.bmp";
        graficoSelecionado2.src = "graficos/Markov - Viagem 5 - E - forca.bmp";
      } else if (viagemSelecionada === "Viagem5" && vagaoSelecionado === "VagaoF") {
        graficoSelecionado1.src = "graficos/Markov - Viagem 5 - F - act.bmp";
        graficoSelecionado2.src = "graficos/Markov - Viagem 5 - F - forca.bmp";
      } else if (viagemSelecionada === "nada" && vagaoSelecionado === "nada") {
        graficoSelecionado1.src = "graficos/EmBranco.png";
        graficoSelecionado2.src = "graficos/EmBranco.png";
      }
    });
  });
;}