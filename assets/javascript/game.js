$(document).ready(function() {

	var characters = [{id: "hansSolo", name: "Hans Solo", image: "<img src='assets/images/HansSolo.jpeg' height='100px'>", healthPoints: 100, attackPower: 9, counterAttackPower: 10}, {id: "princessLeia", name: "Princess Leia", image: "<img src='assets/images/princessLeia.jpeg' height='100px'>", healthPoints: 110, attackPower: 7, counterAttackPower: 12}, {id: "yoda", name: "Yoda", image: "<img src='assets/images/Yoda.jpeg' height='100px'>", healthPoints: 115, attackPower: 8, counterAttackPower: 15}, {id: "R2D2", name: "R2-D2", image: "<img src='assets/images/R2-D2.jpeg' height='100px'>", healthPoints: 122, attackPower: 6, counterAttackPower: 20}];

	var hero;
	var enemy;
	var heroHealthPoints;
	var enemyHealthPoints;
	var attackNumber = 1;
	var enemyNumber = 0;

	function addClickListeners() {
	$('.character').click(assignCharacter);
	}

	function assignCharacter() {
		if (hero && enemy) return;
		if (hero) {
			$(this).appendTo('#enemy');
			$(this).addClass('enemy');
			enemy = characters[this.getAttribute('value')];
			enemyHealthPoints = enemy.healthPoints;
			$("#attack").show();
		} else {
			$(this).appendTo('#hero');
			$(this).addClass('hero');
			hero = characters[this.getAttribute('value')];
			heroHealthPoints = hero.healthPoints;
			$(".character").not(this).appendTo("#enemies");
			$(".character").not(this).css("background-color", "#a19e97");
		}
	}

	function buildCharacters() {
	for (var i = 0; i < characters.length; i++) {
		var currentCharacter = characters[i];
		$('#characters').append('<div class="character" id=' + currentCharacter.id + ' value=' + i +' ><p class="characterName">' + currentCharacter.name + '</p>' + currentCharacter.image + '<p class="healthPoints">' + currentCharacter.healthPoints + '</p></div>')

	}

	}

	 $("#attack").click(function() {
	 		enemyHealthPoints -= hero.attackPower * attackNumber;
	 		$(".enemy > .healthPoints").html('<p>' + enemyHealthPoints + '</p>');
 			if (enemyHealthPoints <= 0) {
				$(".enemy").detach();
				if (enemyNumber < (characters.length - 2)) {
					$("#message").html("<p>You have defeated " + enemy.name + ". You may choose to fight another enemy.</p>");
					$("#attack").hide();
				} else {
					$("#message").html("<p>You Won! Game Over!</p>");
					$("#attack").hide();
	 				$("#restart").show();
	 			}
	 			enemyNumber++;
	 			enemy = undefined;
		 	} else { 
					heroHealthPoints -= enemy.counterAttackPower;
	 				$(".hero > .healthPoints").html("<p>" + heroHealthPoints + "</p>");
					if (heroHealthPoints <= 0) {
						$(".hero").detach();
						$("#message").html("<p>You have been defeated. Game Over.</p>");
						$("#attack").hide();
						$("#restart").show();
					} else {
					$("#message").html("<p>You attacked " + enemy.name + " for " + hero.attackPower * attackNumber + " damage. He attacked you back for " + enemy.counterAttackPower + " damage.</p>");
				}
			}

			attackNumber++;
	});

	$("#restart").click(function() {
			$(this).hide();
			$(".character").detach();
			buildCharacters();
			addClickListeners(); 
			hero = undefined;
			enemy = undefined;
			attackNumber = 1;
			enemyNumber = 0;
	});

	buildCharacters();
	addClickListeners(); 

});


