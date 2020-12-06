class simplegui {
    constructor(width,height){
        this.width = width;
        this.height = height;
        
    }

    create(){
        let canvas = document.createElement("canvas");
        canvas.height = this.height;
        canvas.width = this.width;
        canvas.setAttribute('id','frame')
        document.getElementById("gamearea").appendChild(canvas);
                     
    }
    draw(){
        let font = "15px sans-serif" ;
        let canvas = document.getElementById('frame')
        let ctx = canvas.getContext("2d");
       
        ctx.beginPath();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.rect(0,0,canvas.width,canvas.height);
        ctx.fillStyle = "green";
        ctx.fill();
       
        //ctx.font = "35px sans-serif";
        ctx.font = "20px sans-serif"
        ctx.fillStyle = "Aquamarine"
       
       // ctx.fillText("Blackjack", 60, 70);
     //  ctx.fillText("Blackjack", 60, 40); 

       // ctx.font = "25px sans-serif";
       ctx.font = font;
        ctx.fillStyle = "Black";
       // ctx.fillText("Score: " + score.toString(), 400,70)
       // ctx.fillText("La Casa",60,150);
       // ctx.fillText(outcome,220,150);
       // dealer.draw(ctx,[96,200]);
       // ctx.fillText("Jugador",60,400);
       // player.draw(ctx,[96,450]);
      
      //  ctx.fillText("Score: " + score.toString(), 200,40)
      
       // ctx.fillText("Casa",60,90);
        ctx.fillText(outcome,220,90);
        dealer.draw(ctx,[16,90]);
       // ctx.fillText("Jugador",60,340);
        player.draw(ctx,[16,300]);
        
        if (in_play){
            
           // ctx.drawImage(card_back,72, 0,CARD_WIDTH,CARD_HEIGHT ,96,200,CARD_WIDTH ,CARD_HEIGHT );
           ctx.drawImage(card_back,72, 0,CARD_WIDTH,CARD_HEIGHT ,16,90,CARD_WIDTH * 0.7,CARD_HEIGHT * 0.7);
        } 
        
    }
    
}

class Card {
    constructor(suit,rank){
        this.suit = suit;
        this.rank = rank;
    }

    get_suit(){
        return this.suit;
    }

    get_rank(){
        return this.rank;
    }

    draw(ctx,pos){
       ctx.drawImage(card_image,
                      CARD_WIDTH * RANKS.indexOf(this.rank),
                      CARD_HEIGHT * SUITS.indexOf(this.suit),
                      CARD_WIDTH , CARD_HEIGHT ,pos[0],pos[1],
                      CARD_WIDTH * 0.7,CARD_HEIGHT * 0.7);             
    }
}

class Hand {
    constructor(){
        this.hand = [];
    }
    
    add_card(card){
        this.hand.push(card);
    }

    get_value(){
        let sum = 0
        let aces = false;

        for (var i=0;i<this.hand.length; i++){
            let card = this.hand[i];
            sum+=VALUES[card.rank];
            if (!aces){
                aces = (card.rank == 'A');
            }
        }

        
        if (!aces){
            return sum
        }else{
            if ((sum + 10) <= 21){
                return (sum + 10);
            } else{
                return sum
            }
        }
    }

    draw(ctx,pos){
        
        for (var i=0;i<this.hand.length;i++){
            let card = this.hand[i];
            card.draw(ctx,pos);
            pos[0]+=55;
           // pos[0]+=100;
        }

    }
}

class Deck{
    constructor(){
        this.deck = [];
        for (let suit in SUITS){
            for (let rank in RANKS){
                 this.deck.push(new Card(SUITS[suit],RANKS[rank]));
            }
        }
    }

    shuffle(){
        for(let i = this.deck.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = this.deck[i]
            this.deck[i] = this.deck[j]
            this.deck[j] = temp
          }
    }

    deal_card(){
        return this.deck.pop();
    }
}

