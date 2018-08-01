class Celula {
    
    constructor(linha, coluna) {
        
        this.linha = linha;
        this.coluna = coluna;
        
        this.temMina = false;
        this.mina;
        
        this.x = lado + (coluna * lado);
        this.y = lado + (linha * lado);
        
        this.numero = null;
        this.temFlag = false;
        this.isAberto = false;
        
        this.desenha();
        
    }
    
    desenha(situacao) {
        push();
        switch(situacao) {
            case 'clicou':
                fill(255, 175, 165);
                break;
            case 'perdeu':
                fill(255, 92, 70);
                break;
            default:
                fill(255, 140, 130);
        }
            rect(this.x, this.y, lado, lado);
        pop();
    }
    
    desenhaXis() {
        line(this.x, this.y, this.x + lado, this.y + lado);
        line(this.x + lado, this.y, this.x, this.y + lado);
    }
    
    addMina() {
        this.mina = new Mina(this);
        this.temMina = true;
    }
    
    desenhaMina() {
        this.mina.desenha();
    }
    
    addFlag() {
        if(!this.temFlag) {
            contadorMinas--;
            atualizaMinas();
            this.temFlag = true;
            let altura = 20;
            let centroX = this.x + 10;
            let centroY =  this.y + lado/2;
            let topoX = centroX;
            let topoY = centroY - altura/2;
            let meioX = centroX + 15;
            let meioY = centroY - altura/4;
            push();
                rectMode(CENTER);
                fill(0);
                rect(centroX, centroY, 1, altura);
                triangle(centroX, centroY, topoX, topoY, meioX, meioY);
            pop();
        }
    }
    
    apagaFlag() {
        contadorMinas++;
        atualizaMinas();
        this.temFlag = false;
        this.desenha();
    }
    
    mostraNumero() {
        fill(0);
        textSize(2 * (lado/3));
        textAlign(CENTER, CENTER);
        text(`${this.numero}`, this.x + 2, this.y, lado, lado);
    }
    
    //posso usar a função 'dentroDoCampo' do sketch!!!! ou não haha
    existeCelula(linha,coluna) {
        if(linha < 0) return false;
        if(coluna < 0) return false;
        if(linha >= linhas) return false;
        if(coluna >= colunas) return false;
        return true;
    }
    
    percorreAdjacentes(cb) {
        for(let linhaAtual = this.linha - 1; linhaAtual <= this.linha + 1; linhaAtual++) {
            for(let colunaAtual = this.coluna - 1; colunaAtual <= this.coluna + 1; colunaAtual++) {
               if((linhaAtual != this.linha || colunaAtual != this.coluna) && this.existeCelula(linhaAtual,colunaAtual)) {
                    cb(celulas[linhaAtual][colunaAtual]);
                }
            }
        }
    }
    
    calculaNumero() {
        this.isAberto = true;
        if(!this.temMina) {
            this.numero = 0;
            this.percorreAdjacentes(celula => {
                if(celula.temMina) this.numero++;
            });
        }
        this.desenha('clicou');
    }
}