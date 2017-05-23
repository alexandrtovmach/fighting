class Fighter {
	constructor(name, power = 5, health = 100) {
		this.name = name;
		this.health = health;
		this.power = power;
	}
	
	setDamage(damage) {
		this.health -= damage;
		//console.log(this.health)
	}
	
	hit(enemy, point) {
		enemy.setDamage(point * this.power)
	}
};

class ImprovedFighter extends Fighter {
	doubleHit(enemy, point) {
		this.hit(enemy, point*2)
	}
}

let fighter = new Fighter ("Maximus", 1, 150);
let improvedFighter = new ImprovedFighter("Spartacus", 2, 110);

let round = 0;


function fight(fighter, improvedFighter, ...point) {
  point = (point && point.length)? point: [2];   
  for (var i = 0; i < point.length; i++) {
	  //console.log('lap#' + round);
	  round++;
    if (!((fighter.health > 0) && (improvedFighter.health > 0))) {
      
      let winner = (fighter.health > 0)? fighter: improvedFighter;
      let loser = (fighter.health < 0)? fighter: improvedFighter;
      return statistics(winner, loser, round-2)
    };
    
    if (round % 2 == 0) {
      fighter.hit(improvedFighter, point[i])
      
    } else {
      improvedFighter.hit(fighter, point[i])
      
    }
    
  };
  
  fight(fighter, improvedFighter, ...point)
  
}

function statistics(winner, loser, round) {
  console.log(`Congratulations!!!
  In ${round} round - ${winner.name} is win!
  *******************************
  Statistic:
  1. ${winner.name}: ${winner.health}
  2. ${loser.name}: ${loser.health}`)
}

fight(fighter, improvedFighter)