// const map = L.map('map').setView([-23.55680857344921, -46.734749298708394], 16);

// const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);



// // Ponto que vai receber o modal
// var point2 = L.marker([-23.55620157344921, -46.734249298708394]).addTo(map);


// var oi = "";

// const url = '/choque1All';
// fetch(url)
// .then((response) => {
// return response.json();
// })
// .then((data) => {
// let Dados = data;

// let saida = '';
// let n_choque = '';
// let viagem = '';
// let lat = '';
// let lon = '';
// Dados.map(function(Dados) {
//     viagem = `${Dados.id_viagem}`;
//     n_choque += `${Dados.id_choque1}`;
//     // lat = `${Dados.latitude}`;
//     // lon = `${Dados.longitude}`;
//     saida += `${Dados.act}`;
// });

// for(var i = 0; i < Dados.length; i++){
//     console.log(Dados[i]["id_choque1"])
//     let modal = L.marker([Dados[i]["latitude"], Dados[i]["longitude"]]).addTo(map).bindPopup(`<b>${Dados[i]["id_choque1"]}</b>`);;

// // Manda os dados colhidos do banco a div que está dentro do modal
// document.getElementById('dbresult').innerHTML = `<strong>Ponto</strong> <br> Número da viagem: ${viagem} <br> Número do choque: ${[Dados[i]["id_choque1"]]} <br> ACT: ${[Dados[i]["act"]]} <br>`;
// // É usado o metodo 'on' para detectar o click no ponto e abrir o modal
// }})
// .catch(function(error) {
//     console.log(error);
// });
// modal = 
// modal.on('click', function() {
//     $('#exampleModal').modal('show');
// });


// Versão nova do código

// const map = L.map('map').setView([-23.55680857344921, -46.734749298708394], 16);

// const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// }).addTo(map);

const markers = []; // Array para guardar os pontos do mapa

const url = '/choque1All';
fetch(url)
.then((response) => {
    return response.json();
})
.then((data) => {
    
    let Dados = data;

    // Criar o mapa com o centro nos valores da latitudes e longitudes da row do meio dos dados
    var mediana = Math.round(Dados.length / 2);
    const map = L.map('map').setView([Dados[mediana]["latitude"], Dados[mediana]["longitude"]], 7);

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

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

    const markers = [];
    
   // Criar os markers no mapa baseados nos pontos do banco de dados 
    for (let i = 0; i < Dados.length; i++) {
        let marker = L.marker([Dados[i]["latitude"], Dados[i]["longitude"]]).addTo(map);

        const date_serial_number = Dados[i]["data_hora"];

        const final_date = date_converter(date_serial_number); 

        // Função para abrir o modal e exibir os valores do ponto
        function openModal() {
            $('#exampleModal').modal('show');
            document.getElementById('dbresult').innerHTML = `
                <strong>Ponto</strong><br>
                Número da viagem: ${Dados[i]["id_viagem"]}<br>
                Número do choque: ${Dados[i]["id_choque1"]} <hr>

                Tipo vagão: ${Dados[i]["tipo_vagao"]}<br>
                Data e hora: ${final_date}<br>
                Velocidade: ${Dados[i]["velocidade"]}<br>
                Posição: ${Dados[i]["posicao"]}<br>
                Placa virtual: ${Dados[i]["placa_virtual"]}<br>
                Trecho: ${Dados[i]["trecho"]}<br>
                Força Maxima: ${Dados[i]["f_maxima"]}<br>
                ACT: ${Dados[i]["act"]}<br>
                Peg: ${Dados[i]["peg"]}<br>
            `;
        }

        // Chama a função ao clicar no marker no mapa
        marker.on('click', openModal);

        markers.push(marker);
        
    }
})
.catch(function(error) {
    console.log(error);
});
