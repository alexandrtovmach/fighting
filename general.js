function startFight() {
	var infoObj1 = {
		name: document.getElementById("name1").value,
		power: document.getElementById("power1").value,
		health: document.getElementById("health1").value
	};
	var infoObj2 = {
		name: document.getElementById("name2").value,
		power: document.getElementById("power2").value,
		health: document.getElementById("health2").value
	};
	
	var coeficient = document.getElementById("coeficient").value;
	coeficient = (coeficient == '')? [3,2,1,2,3]: coeficient.split(',');
	//console.log(coeficient)
	
	document.getElementById("info1").style.display = "none";
	document.getElementById("info2").style.display = "none";
	document.getElementById("button").style.display = "none";
	document.getElementById("hide").style.display = "none";
	
	document.getElementById("showName1").innerHTML = infoObj1.name;
	document.getElementById("showName2").innerHTML = infoObj2.name;
	
	var gladiator1 = document.getElementById("glad_1")
	var gladiator2 = document.getElementById("glad_2")
	gladiator1.style.left = "28%";
	gladiator2.style.right = "28%";
	
	
	setTimeout(function () {
		showFight(infoObj1, infoObj2, gladiator1, gladiator2, coeficient)
	}, 5000);
}

function showFight(warrior1, warrior2, glad1, glad2, coeficient) {
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
	
	let round = 0;
	let i = 0;
	let maxHealthWar1 = fighter.health;
	let maxHealthWar2 = improvedFighter.health;
	
	function fight(fighter, improvedFighter, ...point) {
		point = point[0];
		if (i >= point.length) { i = 0 };
		
		if (!((fighter.health > 0) && (improvedFighter.health > 0))) {
		
			let winner = (fighter.health > 0)? fighter: improvedFighter;
			let loser = (fighter.health <= 0)? fighter: improvedFighter;
			glad1.style.top = "35%";
			glad2.style.top = "35%";
			glad1.style.opacity = "0.3";
			glad2.style.opacity = "0.3";
			return statistics(winner, loser, round)
		};
		
		//console.log('lap#' + round);
		round++;
		
		if (round % 2 == 0) {
			glad1.style.left = "40%";
			glad2.style.background = "red";
			fighter.hit(improvedFighter, point[i]);
			//console.log(point[i]);
			hpDiv(glad2, improvedFighter)
			setTimeout(function () {glad1.style.left = "28%";
			glad2.style.background = ""}, 500);
		} else {
			glad2.style.right = "40%";
			glad1.style.background = "red";
			improvedFighter.hit(fighter, point[i]);
			//console.log(point[i]);
			hpDiv(glad1, fighter)
			setTimeout(function () {glad2.style.right = "28%";
			glad1.style.background = ""}, 500)
		}
		if ((fighter.health / maxHealthWar1 < 0.75) && (fighter.health/maxHealthWar1 >= 0.5)) {
			glad1.getElementsByTagName('img')[0].src = "glad_1(75%).png";
		} else if ((fighter.health / maxHealthWar1 < 0.5) && (fighter.health/maxHealthWar1 >= 0.25)) {
			glad1.getElementsByTagName('img')[0].src = "glad_1(50%).png";
		} else if (fighter.health / maxHealthWar1 < 0.25) {
			glad1.getElementsByTagName('img')[0].src = "glad_1(25%).png";
		};
		if ((improvedFighter.health / maxHealthWar2 < 0.75) && (improvedFighter.health/maxHealthWar2 >= 0.5)) {
			glad2.getElementsByTagName('img')[0].src = "glad_2(75%).png";
		} else if ((improvedFighter.health / maxHealthWar2 < 0.5) && (improvedFighter.health/maxHealthWar2 >= 0.25)) {
			glad2.getElementsByTagName('img')[0].src = "glad_2(50%).png";
		} else if (improvedFighter.health / maxHealthWar2 < 0.25) {
			glad2.getElementsByTagName('img')[0].src = "glad_2(25%).png";
		};
		i++;
		setTimeout(function () { 
			fight(fighter, improvedFighter, point) 
		}, 1000)
	}
	
	fight(fighter, improvedFighter, coeficient)
	
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
