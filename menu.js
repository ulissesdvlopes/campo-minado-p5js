var linhas = 10;
var colunas = 10;
var celulas;
var quantidadeMinas;
var contadorMinas;
var primeiroClique;
var jogoAcabou;
var celulasAbertas;

function pegaNivel() {
    let nivel = document.querySelector('select').value;
    switch(nivel) {
        case 'Médio':
            largura = 600
            linhas = 15;
            colunas = 15;
            lado = largura/(colunas + 3);
            quantidadeMinas = 40;
            contadorMinas = quantidadeMinas;
            break;
        case 'Difícil':
            largura = 1200
            linhas = 15;
            colunas = 30;
            lado = largura/(colunas + 5);
            quantidadeMinas = 90;
            contadorMinas = quantidadeMinas;
            break;
        default:
            largura = 400;
            linhas = 10;
            colunas = 10;
            lado = largura/(colunas + 2);
            quantidadeMinas = 15;
            contadorMinas = quantidadeMinas;
    }
}

function preparaInicio() {
    pegaNivel();
    createCanvas(largura,550);
    background(190);
    
    clearInterval(intervalo);
    zeraTempo();
    clear();
    celulas = [];
    primeiroClique = true;
    jogoAcabou = false;
    celulasAbertas = 0;
    
    setCelulas();
    atualizaMinas();

}

function atualizaMinas() {
    document.querySelector('#qtd-minas').textContent = contadorMinas;
}

var intervalo;
let segText = document.querySelector('#segundos');
let minText = document.querySelector('#minutos');
function tempo() {
    let seg = parseInt(segText.textContent);
    let min = parseInt(minText.textContent);

    intervalo = setInterval(function() {
        seg += 1;
        if(seg > 60) {
          seg = 0;
          min += 1;
        }
        if(seg < 10) {
          segText.textContent = "0" + seg;
        } else {
          segText.textContent = seg;
        }
        if(min < 10) {
          minText.textContent = "0" + min;
        } else {
          minText.textContent = min;
        }
    }, 1000);
}

function zeraTempo() {
    segText.textContent = "00";
    minText.textContent = "00";
}