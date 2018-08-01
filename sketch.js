var lado;
var ganhouY = 0;
var largura;
var lado;

function setup() {
    preparaInicio();
    document.querySelector('#reset').addEventListener('click', preparaInicio);
}

function draw() {
    animaGanhou();
}

function mousePressed() {
    if(dentroDoCampo() && !jogoAcabou) {
        let celula = celulas[mapCampo(mouseY, linhas)][mapCampo(mouseX, colunas)];
        
        if(primeiroClique) iniciaJogo(celula);
        if(celula.isAberto) return;
        if(mouseButton == RIGHT) {
            celula.addFlag();
        } else {
            if(celula.temFlag) {
                celula.apagaFlag();
            } else {
                abreCelula(celula);
            }
        }
    }
}

function iniciaJogo(celulaClicada) {
    tempo();
    primeiroClique = false;
    carregaMinas(celulaClicada);
    abreCelula(celulaClicada);
}

function abreCelula(celula) {
    if(!celula.isAberto) {
        celulasAbertas++;
        celula.calculaNumero();
        if(celula.numero == 0) {
            celula.percorreAdjacentes(abreCelula);
        } else if(celula.temMina) {
            celulasAbertas--;
            jogoAcabou = true; //uma funcao pode ser melhor... reaproveitando para a vitoria...
            celula.desenha('perdeu');
            mostraMinas();
            clearInterval(intervalo);
        } else {
            celula.mostraNumero();
        }
        if(ganhou()) {
            jogoAcabou = true;
            clearInterval(intervalo);
        }
    }
}

function ganhou() {
    return celulasAbertas >= colunas * linhas - quantidadeMinas;
}

function mostraMinas() {
     for(let i= 0; i < linhas; i++) {
        for(let j = 0; j < colunas; j++) {
            if(celulas[i][j].temMina && !celulas[i][j].temFlag) celulas[i][j].desenhaMina();
            if(celulas[i][j].temFlag && !celulas[i][j].temMina) celulas[i][j].desenhaXis();
        }
    }
}

function dentroDoCampo() {
    let limiteX = lado * colunas + lado;
    let limiteY = lado * linhas + lado;
    if(mouseX < lado || mouseX > limiteX || mouseY < lado || mouseY > limiteY) return false;   
    return true;
}

function mapCampo(coordenada, fila) { //precisa melhorar nome
    let indice = null; //verificar a necessidade de setar o indice como nulo
    
    for(let i = 1; i <= fila; i++) {
        if(coordenada > lado * i && coordenada <= lado * (i+1)) {
            indice = i - 1;
            return indice;
        }
    }
    return indice;
}

function carregaMinas(primeiraCelula) {    
    for(let i = 0; i < quantidadeMinas; i++) {
        let posLinha = floor(random(linhas));
        let posColuna = floor(random(colunas));
        if(celulas[posLinha][posColuna].temMina ||
            (primeiraCelula.linha == posLinha && primeiraCelula.coluna == posColuna)) {
                i--;
        } else {
            celulas[posLinha][posColuna].addMina()            
        }
    }
}

function setCelulas() {
    for(let i= 0; i < linhas; i++) {
        celulas[i] = new Array();
        for(let j = 0; j < colunas; j++) {
            celulas[i].push(new Celula(i,j));
        }
    }
}

function animaGanhou() {
    if(ganhou()) {
        push();
            background(190);
            textAlign(CENTER, CENTER);
            textSize(width/8);
            fill(255, 50, 20);
            stroke(10);
            strokeWeight(4);
            text("PARABÉNS!", width/2, ganhouY);
            textSize(width/14);
            text("Você Venceu!", width/2, ganhouY + width/8);
        pop();
        ganhouY++;
    }
}