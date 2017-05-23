function showFight(warrior1, warrior2, glad1, glad2) {
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
	
	let fighter = new Fighter (warrior1.name, warrior1.power, warrior1.health);
	let improvedFighter = new ImprovedFighter(warrior2.name, warrior2.power, warrior2.health);
	
	let round = 1;
	
	
	function fight(fighter, improvedFighter, ...point) {
		point = (point && point.length)? point: [2];   
		for (var i = 0; i < point.length; i++) {
			if (!((fighter.health > 0) && (improvedFighter.health > 0))) {
			
				let winner = (fighter.health > 0)? fighter: improvedFighter;
				let loser = (fighter.health <= 0)? fighter: improvedFighter;
				glad1.style.top = "40%";
				glad2.style.top = "40%";
				glad1.style.opacity = "0.3";
				glad2.style.opacity = "0.3";
				return statistics(winner, loser, round-1)
			};
			
			console.log('lap#' + round);
			round++;
			
			if (round % 2 == 0) {
				glad1.style.left = "40%";
				glad2.style.background = "red";
				fighter.hit(improvedFighter, point[i]);
				hpDiv(glad2, improvedFighter)
				setTimeout(function () {glad1.style.left = "28%";
				glad2.style.background = ""}, 500);
			} else {
				glad2.style.right = "40%";
				glad1.style.background = "red";
				improvedFighter.hit(fighter, point[i]);
				hpDiv(glad1, fighter)
				setTimeout(function () {glad2.style.right = "28%";
				glad1.style.background = ""}, 500)
			}
		
		};
		setTimeout(function () { 
			fight(fighter, improvedFighter) 
		}, 1000)
	}
	
	fight(fighter, improvedFighter)
	
	function statistics(winner, loser, round) {
		var result = document.createElement('div')
		result.innerHTML = `Congratulations!!!<br>
		In ${round} round - ${winner.name} is win!<br>
		*******************************<br>
		Final statistic:<br>
		1. ${winner.name}: ${winner.health}<br>
		2. ${loser.name}: ${loser.health}`;
		result.style.textAlign = "center";
		result.style.color = "#626262";
		result.style.fontSize = "20px";
		result.style.fontWeight = "700";
		
		document.getElementById("arena").after(result);
	}
	
	function hpDiv(glad, war) {
		var hp = document.createElement('span');
		hp.style.color = "red";
		hp.style.top = "3px";
		hp.style.transition = "1s";
		hp.style.fontSize = "20px";
		hp.innerHTML = war.health;
		glad.append(hp);
		setTimeout(function () {hp.style.display = "none"}, 800)
	}
}