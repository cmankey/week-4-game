$(document).ready(function() {

	var userCharacter;
	var userCharacterHealthPoints;
	var currentDefender;
	var defenderHealthPoints;
	var attackNumber = 1;
	var round = 0;
	var enemies = [];

	$("#restartButton").prop("hidden", true);

	$("button").click(function(){
		$("#message").empty();
	});

	$(".characterButton").click(function(){
		if (userCharacter == undefined) {
			userCharacter = $(this).data();
			userCharacterHealthPoints = userCharacter.baselineHealthPoints;
			$(this).addClass("userCharacter");
			$(".userCharacter").prop("disabled", true);
			$(".characterButton").not(this).addClass("remainingEnemies");
			$(".remainingEnemies").appendTo($("#enemies"));
		} else {
			currentDefender = $(this).data();
			defenderHealthPoints = currentDefender.baselineHealthPoints; 
			$(this).appendTo("#defender");
			$(this).removeClass("remainingEnemies");
			$(this).addClass("defender");
			$(".characterButton").prop("disabled", true);
		}
		
	});

	$("#attackButton").click(function(){
		if (currentDefender == undefined) {
			$("#message").append("<p>No enemy here.</p>");
		} else {
	 		defenderHealthPoints -= userCharacter.attackPower * attackNumber;
			$(".defender > p").empty();
	 		$(".defender > p").append("<p>" + defenderHealthPoints + "</p>");
			if (defenderHealthPoints <= 0) {
				$(".defender > p").empty();
	 			$(".defender > p").append("<p>" + currentDefender.baselineHealthPoints + "</p>");
				enemies[round] = $(".defender").detach();
				if (round < 2) {
					$("#message").append("<p>You have defeated " + currentDefender.name +". You may choose to fight another enemy.</p>");
					$(".remainingEnemies").prop("disabled", false);
				} else {
					$("#message").append("<p>You Won! Game Over!</p>");
	 				$("#restartButton").prop("hidden", false);
	 			}
	 			round++;
	 			currentDefender = undefined;
		 	} else { 
					userCharacterHealthPoints -= currentDefender.counterAttackPower;
					$(".userCharacter > p").empty();
	 				$(".userCharacter > p").append("<p>" + userCharacterHealthPoints + "</p>");
					if (userCharacterHealthPoints <= 0) {
						$("#message").append("<p>You have been defeated. Game Over.</p>");
						$("#restartButton").prop("hidden", false);
						$(".defender > p").empty();
	 					$(".defender > p").append("<p>" + defender.baselineHealthPoints + "</p>");
					} else {
					$("#message").append("<p>You attacked " + currentDefender.name + " for " + userCharacter.attackPower * attackNumber + " damage. He attacked you back for " + currentDefender.counterAttackPower + " damage.</p>");
	}

			}
		attackNumber++;
		}
	});

	$("#restartButton").click(function(){
			$(this).prop("hidden", true);
			for (var i = 0; i < 3; i++) {
				$(enemies[i]).appendTo($("#characters"));
			}
			$(".userCharacter").appendTo($("#characters"));
			$(".userCharacter > p").empty();
	 		$(".userCharacter > p").append("<p>" + userCharacter.baselineHealthPoints + "</p>");
			$(".characterButton").prop("disabled", false);
			$(".characterButton").removeClass("userCharacter");
			$(".characterButton").removeClass("defender");
			$(".characterButton").removeClass("remainingEnemies");
			userCharacter = undefined;
			attackNumber = 1;
			round = 0;

	});

	
});