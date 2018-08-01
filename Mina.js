class Mina {
    
    constructor(celula) {
        this.x = celula.x + lado/2;
        this.y = celula.y + lado/2;
        this.diametro = 20;
        this.comprimentoPontas = 25;
        this.larguraPontas = 3;
    }
    
    desenha() {
        push();
            noStroke();
            fill(30);
            ellipse(this.x,this.y,this.diametro,this.diametro);
            rectMode(CENTER);
            rect(this.x,this.y,this.larguraPontas,this.comprimentoPontas);
            rect(this.x, this.y, this.comprimentoPontas, this.larguraPontas);
            push()
                translate(this.x,this.y);
                push();
                    rotate(PI/4);
                    rect(0,0,this.larguraPontas,this.comprimentoPontas);
                pop();
                push();
                    rotate(-PI/4);
                    rect(0,0,this.larguraPontas,this.comprimentoPontas);
                pop();
            pop();
        pop();
    }
}