const url = '/info_medias';
fetch(url) //essa chamada fetch cria uma tabela na página analise.html, adicionando uma linha com a descrição das informações adicionadas (incluíndo a unidade de medida) e adiciona abaixo os dados buscados do banco de dados que correspondem às informações citadas no html
  .then((response) => {
    return response.json(); //retorna a resposta como json
  })
  .then((data) => {
    var Dados = data;
    let saida = '';
    document.getElementById('tabela').innerHTML = saida; //adiciona "saida" ao elemento 'tabela' no html
    const table = document.createElement('table');
    const th = document.createElement('th');
    th.innerHTML = "<td>Viagem|</td><td>Max Força(tf)|</td><td>Min Força(tf)|</td><td>Max Act(mm)|</td><td>Min Act(mm)|</td><td>Max PEG(PSI)|</td><td>Min PEG(PSI)</td>"; //Descreve os elementos que vão ser adicionados no início da tabela
    document.getElementById('tabela').appendChild(th); //adiciona 'th' ao elemtento 'tabela', do html

    var i = 1

    for (let line of Dados) {   //cria uma nova linha na tabela para cada linha de dados presente na variável Dados
      const tr = document.createElement('tr');

      let td = document.createElement('td');
      td.innerHTML = i;
      tr.appendChild(td);

      // pega os dados do banco de dados para incluir na tabela 
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

      table.appendChild(tr); // adiciona a linha tr criada acima na tabela

      i += 1 //incrementa i

    }
    const resultado = document.querySelector('#tabela');
    resultado.appendChild(table); //adiciona os dados ao elemento com id "tabela" em analise.html
  })
  .catch((error) => {
    console.log(error);
  });

fetch('/info_Vagoes_E') //essa chamada fetch faz praticamente a mesma que a acima, mas seleciona apenas os dados específicos ao vagão E e os traz do banco de dados para uma nova tabela criada 
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    var Dados = data;
    let saida2 = '';
    document.getElementById('tabela2').innerHTML = saida2;
    const table2 = document.createElement('table');
    var th = document.createElement('th')
    th.innerHTML = "<td>Viagem</td>|<td>Max Engate(tf)|  </td><td>Min Engate(tf)|  </td><td>Max Act(mm)|  </td><td>Min Act(mm)|  </td><td>Max PEG(PSI)|  </td><td>Min PEG(PSI)</td>" //Descreve os elementos que vão ser adicionados no início da tabela
    document.getElementById('tabela2').appendChild(th);

    let i = 1;

    for (let line of Dados) { // cria uma nova linha na tabela para cada linha registrada no banco de dados 
      const tr2 = document.createElement('tr');

      let td = document.createElement('td');
      td.innerHTML = i;
      tr2.appendChild(td);

      // pega os dados do banco de dados para incluir na tabela 
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

      table2.appendChild(tr2); // adiciona a linha tr2 criada acima na tabela

      i += 1; // incrementa i
    }
    const resultado2 = document.querySelector('#tabela2');
    resultado2.appendChild(table2); //adiciona os dados ao elemento com id "tabela2" em analise.html
  })
  .catch((error) => {
    console.log(error);
  });

fetch('/info_Vagoes_F') //essa chamada fetch faz praticamente a mesma que a acima, mas seleciona apenas os dados específicos ao vagão F e os traz do banco de dados para uma nova tabela criada 
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    var Dados = data;
    let saida3 = '';
    document.getElementById('tabela3').innerHTML = saida3;
    const table3 = document.createElement('table');
    var th = document.createElement('th')
    th.innerHTML = "<td>Viagem</td>|<td>Max Engate(tf)|  </td><td>Min Engate(tf)|  </td><td>Max Act(mm)|  </td><td>Min Act(mm)|  </td><td>Max PEG(PSI)|  </td><td>Min PEG(PSI)</td>" //Descreve os elementos que vão ser adicionados no início da tabela
    document.getElementById('tabela3').appendChild(th);

    let i = 1;

    for (let line of Dados) { // cria uma nova linha na tabela para cada linha registrada no banco de dados 
      const tr3 = document.createElement('tr');

      let td = document.createElement('td');
      td.innerHTML = i;
      tr3.appendChild(td);

      // pega os dados do banco de dados para incluir na tabela 
      td = document.createElement('td');
      td.innerHTML = line.max_engante;
      tr3.appendChild(td);

      td = document.createElement('td');
      td.innerHTML = line.min_engante;
      tr3.appendChild(td);

      td = document.createElement('td');
      td.innerHTML = line.max_act;
      tr3.appendChild(td);

      td = document.createElement('td');
      td.innerHTML = line.min_act;
      tr3.appendChild(td);

      td = document.createElement('td');
      td.innerHTML = line.max_peg;
      tr3.appendChild(td);

      td = document.createElement('td');
      td.innerHTML = line.min_peg;
      tr3.appendChild(td);

      table3.appendChild(tr3); // adiciona a linha tr2 criada acima na tabela

      i += 1; // incrementa i
    }
    const resultado3 = document.querySelector('#tabela3');
    resultado3.appendChild(table3); //adiciona os dados ao elemento com id "tabela3" em analise.html
  })
  .catch((error) => {
    console.log(error);
  });


window.onload = function () {  //essa função espera o carregamento da pagina para executar o codigo, ela endende as mudanças de valor na barra dropdown de viagem e retorna o valor selecionado
  const vagao = document.getElementById('menu_vagao');
  const viagem = document.getElementById('menu_viagem');
  const graficoSelecionado1 = document.getElementById('grafico_selecionado1');
  const graficoSelecionado2 = document.getElementById('grafico_selecionado2');
  viagem.addEventListener('change', () => {
    const viagemSelecionada = viagem.value;
    changeViagem(viagemSelecionada);
    document.getElementById('menu_vagao').value = "VagaoE"
  });

  function changeViagem(viagem) { //essa função muda os graficos de acordo com a viagem selecionada pelo usuário na barra dropdown
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

  viagem.addEventListener('change', () => { //esse eventlistener detecta a mudança do valor selecionado na barra dropdown de viagens e retorna a opção escolida
    const viagemSelecionada = viagem.value;
    vagao.addEventListener('change', () => { //esse eventlistener detecta a mudança do valor selecionado na barra dropdown de vagões e retorna a opção escolida
      const vagaoSelecionado = vagao.value;
      // a partir desse instante, o código compara as duas opções selecionadas no eventListener e devolve ao usuário os graficos de marlov compativeis com os valores de viagem e vagão coerentes
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
  ;
}