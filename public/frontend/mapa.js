// Variáveis para guardar os valores da seleção de viagem
var viagem_n = $("#select-viagem").val();

$(document).ready(function() {
    $('#modal-tutorial-mapa').modal('show');
  });

$('#helpButton').on('click', function() {
    $('#modal-tutorial-mapa').modal('show');
});


console.log(viagem_n);

$(document).on('change', '#select-viagem', function() {
    viagem_n = parseInt($("#select-viagem").val());
    console.log(viagem_n);
});

// Variáveis para guardar os valores dos checkboxes
var choque1_url = $("#choque1").val();
var choque2_url = $("#choque2").val();
var pico_url = $("#pico").val();

// Função para a coversão de datas no formato Epoch em datas no formato comum
function date_converter(date_number) {
    // Converte o número serial do Excel em milissegundos
    const excelEpoch = new Date("1900-01-01").getTime(); // Excel epoch in milisegundos
    const milliseconds = (date_number - 1) * 24 * 60 * 60 * 1000; // Converter nossa data para milisegundos

    // Cria uma nova data somando os milisegundos convertidos
    const date = new Date(excelEpoch + milliseconds);

    const formattedDateString = date.toLocaleDateString(); // Formar a data com os dias, meses e anos
    const formattedTimeString = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }); // Formar a hora da data
    
    // Juntar a data e a hora em uma string
    var date_formated = formattedDateString + " " + formattedTimeString;

    return date_formated;
}

// Inicar o mapa
const map = L.map('map').setView([-11.049041, -49.833081], 3.5);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.control.zoom({ position: 'bottomright' }).addTo(map);
map.zoomControl.remove();


var myRenderer = L.canvas({ padding: 0.5 });


const markers = []; // Array para guardar os pontos do mapa
const latAndlng = []; // Array para guardar as latitudes e longitudes dos pontos
const polylines = []; // Array para guardar as linhas do mapa

const markers1 = []; // Array para guardar os pontos do mapa
const latAndlng1 = []; // Array para guardar as latitudes e longitudes dos pontos
const polylines1 = []; // Array para guardar as linhas do mapa

const markers_pico = []; // Array para guardar os pontos do mapa
const latAndlng_pico = []; // Array para guardar as latitudes e longitudes dos pontos
const polylines_pico = []; // Array para guardar as linhas do mapa


// CHOQUE 1

var dados_completo = [];


// Função para buscar os dados do banco de dados
function buscar_dados() {

    // Habilitar o botão de gerar gráfico
    $('#botao-grafico').prop('disabled', false);

    dados_completosplice = dados_completo.splice(0);
    // for (var l = 0; l < markers.length; l++) {
    //     map.removeLayer(markers[j]);
    // }

    // Remover os markers do mapa
    for (var j = 0; j < markers.length; j++) {
        map.removeLayer(markers[j]);
    }

    // Remover as linhas do mapa
    for(var k = 0; k < polylines.length; k++) {
        map.removeLayer(polylines[k]);
    }


    if (viagem_n == "null") {
        console.log("Selecione uma viagem")
    }

    // Se o checkbox do choque 1 estiver marcado, então o fetch para requição dos dados é chamado
    if ( $('#choque1').is(':checked') == true ) {

        $("#choque1").val("/choque1All");
        choque1_url = $("#choque1").val();
        
        const url = `${choque1_url}`;
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            var vagoes_selecionados = "";

            // Verificar quais checkboxes estão marcados para fitrar os dados por tipo de vagão
            if ($('#vagaoE').is(':checked') == true && $('#vagaoF').is(':checked') == true) {
                vagoes_selecionados = "vagoesE e vagoesF";
            } else if ($('#vagaoF').is(':checked') == true) {
                vagoes_selecionados = "F";
            } else if ($('#vagaoE').is(':checked') == true) {
                vagoes_selecionados = "E";
            }

            console.log(vagoes_selecionados);

            // dados_completo = data;

            // desenhargrafico();

            // Variavel para guardar os dados da viagem selecionada do SQL query do backend
            var Dados = [];

            // For para filtrar apenas os dados da viagem selecionada
            for (var i = 0; i < data.length; i++) {
                if (data[i]["id_viagem"] == parseInt(viagem_n) && data[i]["tipo_vagao"] == vagoes_selecionados) {
                    Dados.push(data[i]);
                } else if (data[i]["id_viagem"] == parseInt(viagem_n) && data[i]["tipo_vagao"] == vagoes_selecionados) {
                    Dados.push(data[i]);
                } else if (data[i]["id_viagem"] == parseInt(viagem_n) && vagoes_selecionados == "vagoesE e vagoesF") {
                    Dados.push(data[i]);
                }
            }

            // Get the selected variable from the user
            var variavelSelecionada = $("#variableSelection").val();

            // Get the selected value from the user (greater or smaller)
            var valorSelecionado = $("#valueSelection").val();

            // Get the threshold value entered by the user
            var limite = parseFloat($("#thresholdValue").val());

            // Filter the data based on the selected variable, value, and threshold
            Dados = Dados.filter(function(data) {
                var valorComparartivo;

                // Determine which variable to compare based on the selected variable
                if (variavelSelecionada === "none") {
                    return data;
                } else if (variavelSelecionada === "velocidade") {
                    valorComparartivo = data.velocidade;
                } else if (variavelSelecionada === "f_maxima") {
                    valorComparartivo = data.f_maxima;
                } else if (variavelSelecionada === "act") {
                    valorComparartivo = data.act;
                } else if (variavelSelecionada === "peg") {
                    valorComparartivo = data.peg;
                }

                if (valorSelecionado === "greater") {
                    return valorComparartivo > limite;
                } else if (valorSelecionado === "smaller") {
                    return valorComparartivo < limite;
                }
            });
            
            for (let i = 0; i < Dados.length; i++) {
                dados_completo.push(Dados[i]);
            }

            console.log(Dados);

            
            // Verificar se há dados para a viagem selecionada
            if (Dados.length == 0 && viagem_n == "null"){
                alert("Selecione uma viagem");

                // Desmarcar os checkboxes
                $('#choque1').prop( "checked", false );
                $('#choque2').prop( "checked", false );
                $('#pico').prop( "checked", false );
            } else if (Dados.length == 0) {
                alert("Não há dados para essa viagem");
            }

            // // Criar o mapa com o centro nos valores da latitudes e longitudes da row do meio dos dados
            var mediana = Math.round(Dados.length / 2);

            map.flyTo([Dados[mediana]["latitude"], Dados[mediana]["longitude"]], 7);

        // Criar os markers no mapa baseados nos pontos do banco de dados 
            for (let i = 0; i < Dados.length; i++) {
                var marker = L.marker([Dados[i]["latitude"], Dados[i]["longitude"]]).addTo(map);

                const date_serial_number = Dados[i]["data_hora"];

                const final_date = date_converter(date_serial_number); 

                // Função para abrir o modal e exibir os valores do ponto
                function openModal() {
                    console.log($('#exampleModal').modal('show'))
                    $('#exampleModal').modal('show');
                    document.getElementById('dbresult').innerHTML = `
                        <strong>Ponto</strong><br>
                        Número da viagem: ${Dados[i]["id_viagem"]}<br>
                        Número do choque 1: ${Dados[i]["id_choque1"]} <hr>

                        Tipo vagão: ${Dados[i]["tipo_vagao"]}<br>
                        Data e hora: ${final_date}<br>
                        Velocidade: ${Dados[i]["velocidade"].toFixed(2)} km/h<br>
                        Posição: ${Dados[i]["posicao"].toFixed(2)} km<br>
                        Placa virtual: ${Dados[i]["placa_virtual"]}<br>
                        Trecho: ${Dados[i]["trecho"]}<br>
                        Força Maxima: ${Dados[i]["f_maxima"].toFixed(2)} tf<br>
                        ACT: ${Dados[i]["act"].toFixed(2)} mm<br>
                        Peg: ${Dados[i]["peg"].toFixed(2)} PSI<br>
                    `;
                }

                // Chama a função ao clicar no marker no mapa
                marker.on('click', openModal);

                // Adcionar os markers no array 
                markers.push(marker);

                // Adcionar as latitudes e longitudes no array
                latAndlng.push([Dados[i]["latitude"], Dados[i]["longitude"]]);

                // Adcionar as linhas no mapa
                var polyline = L.polyline(latAndlng, {color: 'red'}).addTo(map);  

                // Adcionar as linhas no array
                polylines.push(polyline);
            }
            
        })
        .catch(function(error) {
            console.log(error);
        });

    } else { // Se o checkbox do choque 1 não estiver marcado, então os markers são removidos do mapa (se não forem removidos, os pontos começam a se sobrepor)

        if ($('#vagaoE').is(':checked') == false){
            console.log("vagão 1 disabled")
        }

        // Remover os markers do mapa
        for (var j = 0; j < markers.length; j++) {
            map.removeLayer(markers[j]);
        }

        // Remover as linhas do mapa
        for(var k = 0; k < polylines.length; k++) {
            map.removeLayer(polylines[k]);
        }
    }
    

// CHOQUE 2

// Define um diferente ícone para os markers
var customIcon = L.icon({
    iconUrl: 'images/marker-icon-yellow.png',  // URL da imagem
    iconSize: [25, 41],  // Mudnaça do tamanho da ícone
    iconAnchor: [12, 41],  // posição da ancora do ícone
  });
  

    // Remover os markers do mapa
    for (var j = 0; j < markers1.length; j++) {
        map.removeLayer(markers1[j]);
    }

    // Remover as linhas do mapa
    for(var k = 0; k < polylines1.length; k++) {
        map.removeLayer(polylines1[k]);
    }

// Detectar alguma mudança nos checkboxes
// $(document).on('change', '.form-check-input', function() {

    // Se o checkbox do choque 2 estiver marcado, então o fetch para requição dos dados é chamado
    if ( $('#choque2').is(':checked') == true ) {

        $("#choque2").val("/choque2");
        choque2_url = $("#choque2").val();
        
        
        const url = `${choque2_url}`;
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            
            var vagoes_selecionados = "";

            // Verificar quais checkboxes estão marcados para fitrar os dados por tipo de vagão
            if ($('#vagaoE').is(':checked') == true && $('#vagaoF').is(':checked') == true) {
                vagoes_selecionados = "vagoesE e vagoesF";
            } else if ($('#vagaoF').is(':checked') == true) {
                vagoes_selecionados = "F";
            } else if ($('#vagaoE').is(':checked') == true) {
                vagoes_selecionados = "E";
            }
 

            // Variavel para guardar os dados da viagem selecionada do SQL query do backend
            var Dados1 = [];

            // For para filtrar apenas os dados da viagem selecionada
            for (var i = 0; i < data.length; i++) {
                if (data[i]["id_viagem"] == parseInt(viagem_n) && data[i]["tipo_vagao"] == vagoes_selecionados) {
                    Dados1.push(data[i]);
                } else if (data[i]["id_viagem"] == parseInt(viagem_n) && data[i]["tipo_vagao"] == vagoes_selecionados) {
                    Dados1.push(data[i]);
                } else if (data[i]["id_viagem"] == parseInt(viagem_n) && vagoes_selecionados == "vagoesE e vagoesF") {
                    Dados1.push(data[i]);
                }
            }

                // Obtenha a variável selecionada do usuário
                var variavelSelecionada = $("#variableSelection").val();

                // Obtém o valor selecionado do usuário (maior ou menor)
                var valorSelecionado = $("#valueSelection").val();
    
                // Obtém o valor limite inserido pelo usuário
                var limite = parseFloat($("#thresholdValue").val());
    
                // Filtre os dados com base na variável, valor e limite selecionados
                Dados1 = Dados1.filter(function(data) {
                    var valorComparartivo;
    
                    // Determine qual variável comparar com base na variável selecionada
                    if (variavelSelecionada === "none") {
                        return data;
                    } else if (variavelSelecionada === "velocidade") {
                        valorComparartivo = data.velocidade;
                    } else if (variavelSelecionada === "f_maxima") {
                        valorComparartivo = data.f_maxima;
                    } else if (variavelSelecionada === "act") {
                        valorComparartivo = data.act;
                    } else if (variavelSelecionada === "peg") {
                        valorComparartivo = data.peg;
                    }
    
                    if (valorSelecionado === "greater") {
                        return valorComparartivo > limite;
                    } else if (valorSelecionado === "smaller") {
                        return valorComparartivo < limite;
                    }
                });
                
                for (let i = 0; i < Dados1.length; i++) {
                    dados_completo.push(Dados1[i]);
                }

                console.log(Dados1);

            // Verificar se há dados para a viagem selecionada
            if (Dados1.length == 0 && viagem_n == "null"){
                alert("Selecione uma viagem");

                // Desmarcar os checkboxes
                $('#choque1').prop( "checked", false );
                $('#choque2').prop( "checked", false );
                $('#pico').prop( "checked", false );

            } else if (Dados1.length == 0) {
                alert("Não há dados para essa viagem");
            }

            console.log(Dados1);

            // Criar o mapa com o centro nos valores da latitudes e longitudes da row do meio dos dados
            var mediana = Math.round(Dados1.length / 2);

            map.flyTo([Dados1[mediana]["latitude"], Dados1[mediana]["longitude"]], 7);

            // Criar os markers no mapa baseados nos pontos do banco de dados 
             for (let i = 0; i < Dados1.length; i++) {
                 let marker1 = L.marker([Dados1[i]["latitude"], Dados1[i]["longitude"]], { icon: customIcon }).addTo(map);
         
                 const date_serial_number = Dados1[i]["data_hora"];
         
                 const final_date = date_converter(date_serial_number); 
         
                 // Função para abrir o modal e exibir os valores do ponto
                 function openModal() {
                    console.log("modal daora");
                    console.log($('#exampleModal-choque2').modal('show'));
                     $('#exampleModal-choque2').modal('show');
                     document.getElementById('dbresult_choque2').innerHTML = `
                         <strong>Ponto</strong><br>
                         Número da viagem: ${Dados1[i]["id_viagem"]}<br>
                         Número do choque 2: ${Dados1[i]["id_choque2"]} <hr>
         
                         Tipo vagão: ${Dados1[i]["tipo_vagao"]}<br>
                         Data e hora: ${final_date}<br>
                         Velocidade: ${Dados1[i]["velocidade"].toFixed(2)} km/h<br>
                         Posição: ${Dados1[i]["posicao"].toFixed(2)} km<br>
                         Placa virtual: ${Dados1[i]["placa_virtual"]}<br>
                         Trecho: ${Dados1[i]["trecho"]}<br>
                         Força Maxima: ${Dados1[i]["f_maxima"].toFixed(2)} tf<br>
                         ACT: ${Dados1[i]["act"].toFixed(2)} mm<br>
                         Peg: ${Dados1[i]["peg"].toFixed(2)} PSI<br>
                     `;
                 }
         
                 // Chama a função ao clicar no marker no mapa
                 marker1.on('click', openModal);
         
                 // Adcionar os markers no array 
                 markers1.push(marker1);
         
                 // Adcionar as latitudes e longitudes no array
                 latAndlng1.push([Dados1[i]["latitude"], Dados1[i]["longitude"]]);

                 // Adcionar as linhas no mapa
                 var polyline = L.polyline(latAndlng1, {color: 'green'}).addTo(map); 
                 
                 // Adcionar as linhas no array
                 polylines1.push(polyline);
             }
         
             
         })
         .catch(function(error) {
             console.log(error);
         });

    } else { // Se o checkbox do choque 2 não estiver marcado, então os markers são removidos do mapa (se não forem removidos, os pontos começam a se sobrepor)

        // Remover os markers do mapa
        for (var j = 0; j < markers1.length; j++) {
            map.removeLayer(markers1[j]);
        }

        // Remover as linhas do mapa
        for(var k = 0; k < polylines1.length; k++) {
            map.removeLayer(polylines1[k]);
        }
    }

// });

// PICOS
    // Remover os markers do mapa
    for (var j = 0; j < markers_pico.length; j++) {
        map.removeLayer(markers_pico[j]);
    }

    // Remover as linha s do mapa
    for(var k = 0; k < polylines_pico.length; k++) {
        map.removeLayer(polylines_pico[k]);
    }

    // Define um diferente ícone para os markers
    var customIcon_pico = L.icon({
        iconUrl: 'images/marker-icon-orange.png',  // URL da imagem
        iconSize: [25, 41],  // Mudnaça do tamanho da ícone
        iconAnchor: [12, 41],  // Posição da ancora do ícone
    });

// Detectar alguma mudança nos checkboxes
    // Se o checkbox do pico estiver marcado, então o fetch para requição dos dados é chamado
    if ( $('#pico').is(':checked') == true ) {

        $("#pico").val("/pico");
        pico_url = $("#pico").val();
        
        
        const url = `${pico_url}`;
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            var vagoes_selecionados = "";

           // Verificar quais checkboxes estão marcados para fitrar os dados por tipo de vagão 
            if ($('#vagaoE').is(':checked') == true && $('#vagaoF').is(':checked') == true) {
                vagoes_selecionados = "vagoesE e vagoesF";
            } else if ($('#vagaoF').is(':checked') == true) {
                vagoes_selecionados = "F";
            } else if ($('#vagaoE').is(':checked') == true) {
                vagoes_selecionados = "E";
            }
 
            // let Dados_pico = data;

            // Variavel para guardar os dados da viagem selecionada do SQL query do backend
            var Dados_pico = [];

            // For para filtrar apenas os dados da viagem selecionada
            for (var i = 0; i < data.length; i++) {
                if (data[i]["id_viagem"] == parseInt(viagem_n) && data[i]["tipo_vagao"] == vagoes_selecionados) {
                    Dados_pico.push(data[i]);
                } else if (data[i]["id_viagem"] == parseInt(viagem_n) && data[i]["tipo_vagao"] == vagoes_selecionados) {
                    Dados_pico.push(data[i]);
                } else if (data[i]["id_viagem"] == parseInt(viagem_n) && vagoes_selecionados == "vagoesE e vagoesF") {
                    Dados_pico.push(data[i]);
                }
            }


            // Obtenha a variável selecionada do usuário
            var variavelSelecionada = $("#variableSelection").val();

            // Obtém o valor selecionado do usuário (maior ou menor)
            var valorSelecionado = $("#valueSelection").val();
            console.log(valorSelecionado);

            // Obtém o valor limite inserido pelo usuário
            var limite = parseFloat($("#thresholdValue").val());
            console.log(limite);

            // Filtre os dados com base na variável, valor e limite selecionados
            Dados_pico = Dados_pico.filter(function(data) {
                var valorComparartivo;

                // Determine qual variável comparar com base na variável selecionada
                if (variavelSelecionada === "none") {
                    return data;
                } else if (variavelSelecionada === "velocidade") {
                    valorComparartivo = data.velocidade;
                } else if (variavelSelecionada === "f_maxima") {
                    valorComparartivo = data.f_maxima;
                } else if (variavelSelecionada === "act") {
                    valorComparartivo = data.act;
                } else if (variavelSelecionada === "peg") {
                    valorComparartivo = data.peg;
                }

                if (valorSelecionado === "greater") {
                    return valorComparartivo > limite;
                } else if (valorSelecionado === "smaller") {
                    return valorComparartivo < limite;
                }
            });

            for (let i = 0; i < Dados_pico.length; i++) {
                dados_completo.push(Dados_pico[i]);
            }

            console.log(Dados_pico);
            
            // Verificar se há dados para a viagem selecionada
            if (Dados_pico.length == 0 && viagem_n == "null"){
                alert("Selecione uma viagem");

                // Desmarcar os checkboxes
                $('#choque1').prop( "checked", false );
                $('#choque2').prop( "checked", false );
                $('#pico').prop( "checked", false );
            } else if (Dados_pico.length == 0) {
                alert("Não há dados para essa viagem");
            }

            console.log(Dados_pico);

            // Criar o mapa com o centro nos valores da latitudes e longitudes da row do meio dos dados
            var mediana = Math.round(Dados_pico.length / 2);

            map.flyTo([Dados_pico[mediana]["latitude"], Dados_pico[mediana]["longitude"]], 7);

            // Criar os markers no mapa baseados nos pontos do banco de dados 
            // for (let i = 0; i < Dados_pico.length; i++)
             for (let i = 0; i < Dados_pico.length; i++) {
                 let marker_pico = L.marker([Dados_pico[i]["latitude"], Dados_pico[i]["longitude"]], { icon: customIcon_pico }).addTo(map);

                 const date_serial_number = Dados_pico[i]["data_hora"];
         
                 const final_date = date_converter(date_serial_number); 
         
                 // Função para abrir o modal e exibir os valores do ponto
                 function openModal() {
                    console.log("modal daora");
                    console.log($('#exampleModal-pico').modal('show'));
                     $('#exampleModal-pico').modal('show');
                     document.getElementById('dbresult-pico').innerHTML = `
                         <strong>Ponto</strong><br>
                         Número da viagem: ${Dados_pico[i]["id_viagem"]}<br>
                         Número do Pico: ${Dados_pico[i]["id_pico"]} <hr>
         
                         Tipo vagão: ${Dados_pico[i]["tipo_vagao"]}<br>
                         Data e hora: ${final_date}<br>
                         Velocidade: ${Dados_pico[i]["velocidade"].toFixed(2)} km/h<br>
                         Posição: ${Dados_pico[i]["posicao"].toFixed(2)} km<br>
                         Placa virtual: ${Dados_pico[i]["placa_virtual"]}<br>
                         Trecho: ${Dados_pico[i]["trecho"]}<br>
                         Engate: ${Dados_pico[i]["engate"].toFixed(2)} tf<br>
                         Delta: ${Dados_pico[i]["delta"].toFixed(2)} T(s)<br>
                         ACT: ${Dados_pico[i]["act"].toFixed(2)} mm<br>
                         Peg: ${Dados_pico[i]["peg"].toFixed(2)} PSI<br>
                     `;
                 }
         
                 // Chama a função ao clicar no marker no mapa
                 marker_pico.on('click', openModal);
         
                 // Adcionar os markers no array 
                 markers_pico.push(marker_pico);
         
                 // Adcionar as latitudes e longitudes no array
                 latAndlng_pico.push([Dados_pico[i]["latitude"], Dados_pico[i]["longitude"]]);

                 // Adcionar as linhas no mapa
                 var polyline_pico = L.polyline(latAndlng_pico, {color: 'purple'}).addTo(map); 
                 
                 // Adcionar as linhas no array
                 polylines_pico.push(polyline_pico);
             }
         
             
         })
         .catch(function(error) {
             console.log(error);
         });

    } else { // Se o checkbox do choque 2 não estiver marcado, então os markers são removidos do mapa (se não forem removidos, os pontos começam a se sobrepor)

        // Remover os markers do mapa
        for (var j = 0; j < markers_pico.length; j++) {
            map.removeLayer(markers_pico[j]);
        }

        // Remover as linha s do mapa
        for(var k = 0; k < polylines_pico.length; k++) {
            map.removeLayer(polylines_pico[k]);
        }
    }

// });
}

// Função para baixar uma imagem do mapa
async function downloadImage(imageSrc) {
    // Pega a imagem gerada pelo leaflet-image
    const image = await fetch(imageSrc)

    // Converte a imagem para blob
    const imageBlog = await image.blob()

    // Cria um URL para a imagem
    const imageURL = URL.createObjectURL(imageBlog)
    
    // Cria um link para baixar a imagem
    const link = document.createElement('a')
    link.href = imageURL
    link.download = 'mapa'
    document.body.appendChild(link)

    // Clica no link para baixar a imagem
    link.click()
    document.body.removeChild(link)
    $('#export-terminou').toast('show');
    console.log("downloaded")
  }

L.DomEvent.on(document.getElementById('export-btn'), 'click', function() {
    $('#export-comecou').toast('show');
    // Função para gerar a imagem do mapa
    leafletImage(map, function(err, canvas) {
        // Cria um elemento de imagem e define a largura e altura para o tamanho da imagem do mapa
        var img = document.createElement('img');
        var dimensions = map.getSize();
        img.width = dimensions.x;
        img.height = dimensions.y;
        img.src = canvas.toDataURL();

        // Chama a função para baixar a imagem gerada
        downloadImage(img.src);
        // window.open("").document.write(img.outerHTML);
    });
});

$('#showToastBtn').click(function() {
    console.log("toast")
    $('#liveToast').toast('show');
  });

////////////////////// GRÁFICO //////////////////////	

function desenhargrafico() {
    // Load the Visualization API and the corechart package.
    google.charts.load('current', {packages: ['corechart', 'line']});

    // Set a callback to run when the Google Visualization API is loaded.
    google.charts.setOnLoadCallback(drawChart);

    // Callback that creates and populates a data table,
    // instantiates the pie chart, passes in the data and
    // draws it.
    function drawChart() {

        var xAxis = $("#grafico-xAxis").val();
        var yAxis = $("#grafico-yAxis").val();

        console.log(xAxis);
        console.log(yAxis);

        var dados_grafico = [];

        console.log(dados_completo)

        for (var i = 0; i < dados_completo.length; i++) {
            console.log("Teste")

            if (xAxis == "data_hora" || yAxis == "data_hora") {
                const date_serial_number = dados_completo[i]["data_hora"];
                const final_date = date_converter(date_serial_number); 
                dados_grafico.push([new Date(final_date), dados_completo[i][`${yAxis}`]]);
            } else {
                dados_grafico.push([dados_completo[i][`${xAxis}`], dados_completo[i][`${yAxis}`]]);
            }
          

            // dados_grafico.push([new Date(final_date), dados_completo[i]["act"]]);
            // console.log(dados_completo[i][`${xAxis}`])
            // console.log(dados_completo[i][`${yAxis}`])
        };

        console.log(dados_grafico)
        

        var data = new google.visualization.DataTable();

        if (xAxis == "data_hora" || yAxis == "data_hora") {
            data.addColumn(`datetime`, `${xAxis}`);
            data.addColumn(`number`, `${yAxis}`);
        } else {
            data.addColumn(`number`, `${xAxis}`);
            data.addColumn(`number`, `${yAxis}`);
        };
  
        // data.addRows([
        //   [0, 0],   [1, 10],  [2, 23],  [3, 17],  [4, 18],  [5, 9],
        //   [6, 11],  [7, 27],  [8, 33],  [9, 40],  [10, 32], [11, 35],
        //   [12, 30], [13, 40], [14, 42], [15, 47], [16, 44], [17, 48],
        //   [18, 52], [19, 54], [20, 42], [21, 55], [22, 56], [23, 57],
        //   [24, 60], [25, 50], [26, 52], [27, 51], [28, 49], [29, 53],
        //   [30, 55], [31, 60], [32, 61], [33, 59], [34, 62], [35, 65],
        //   [36, 62], [37, 58], [38, 55], [39, 61], [40, 64], [41, 65],
        //   [42, 63], [43, 66], [44, 67], [45, 69], [46, 69], [47, 70],
        //   [48, 72], [49, 68], [50, 66], [51, 65], [52, 67], [53, 70],
        //   [54, 71], [55, 72], [56, 73], [57, 75], [58, 70], [59, 68],
        //   [60, 64], [61, 60], [62, 65], [63, 67], [64, 68], [65, 69],
        //   [66, 70], [67, 72], [68, 75], [69, 80]
        // ]);

          
        data.addRows(dados_grafico);
  
        var options = {
          hAxis: {
            title: `${xAxis}`
          },
          vAxis: {
            title: `${yAxis}`
          },
          explorer: {
            actions: ['dragToZoom', 'rightClickToReset'],
            axis: 'horizontal',
            keepInBounds: true,
            maxZoomIn: 10
          }
        };
  
        var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
        var chart2 = new google.visualization.ScatterChart(document.getElementById('chart_div2'));

        chart.draw(data, options);
        chart2.draw(data, options);

    }
}

// Abrir a opções buscar os dados e de filtros ao clicar no botão
const lerMaisBtn = document.getElementById('toggleButton');
const conteudo = document.getElementById('content-botao');

lerMaisBtn.addEventListener('click', function() {
  conteudo.classList.toggle('conteudo-visivel');
});