var triviaQuestions = [{
	question: "What is the best selling Nintendo exclusive game of all time?",
	answerList: ["Duck Hunt", "Super Mario Bros", "Mario Kart", "Wii Sports"],
	answer: 3
},{
	question: "Which of the following games did Mario creator Shigeru Miyamoto NOT design?",
	answerList: ["Donkey Kong", "Kid Icarus", "Excitebike", "The Legend of Zelda"],
	answer: 1
},{
	question: "What is the first game with Princess Zelda as a playable character?",
	answerList: ["Zelda: Wand of Gamelon", "The Legend of Zelda: Ocarina of Time", "Super Smash Bros Melee", "Super Smash Bros Brawl"],
	answer: 0
},{
	question: "What is the best selling Nintendo handheld of all time?",
	answerList: ["GameBoy", "Game Boy Advance", "DS", "3DS"],
	answer: 2
},{
	question: "Which pro baseball team did Nintendo become majority owner of in 1992?",
	answerList: ["Seattle Mariners", "Oakland Athletics", "Kansas City Royals", "Tampa Bay Rays"],
	answer: 0
},{
	question: "Which Nintendo game caused enough injuries in children to result in a $80M settlement?",
	answerList: ["Tony Hawk's Pro Skater", "Super Smash Bros", "Mario Kart 64", "Mario Party"],
	answer: 3
},{
	question: "What is the first Nintendo game to feature Mario in it?",
	answerList: ["Mario Bros", "Tennis", "Donkey Kong", "Wrecking Crew"],
	answer: 2
},{
	question: "What is the name of Nintendo's first-ever 'Game & Watch' title?",
	answerList: ["Ball", "Oil Panic", "Egg", "Mario Bros"],
	answer: 0
},{
	question: "Which film inspired the enemies in Nintendo's Metroid series?",
	answerList: ["Star Wars", "Galaxy of Terror", "Predator", "Alien"],
	answer: 3
},{
	question: "What was the first NES game to use the Konami Code?",
	answerList: ["Contra", "Life Force", "Gradius", "R-Type"],
	answer: 2
},{
	question: "What was Nintendo's original line of business when the company was founded in 1889?",
	answerList: ["Hotels", "Instant Rice", "Taxi Company", "Playing Cards"],
	answer: 3
},{
	question: "What was the first SNES game to use the Super FX chip?",
	answerList: ["Pilotwings", "Star Fox", "Doom", "Super Mario World 2: Yoshi's Island"],
	answer: 1
},{
	question: "What was the first Nintendo game to have a save game feature?",
	answerList: ["Dragon Warrior", "Final Fantasy", "Metroid", "The Legend of Zelda"],
	answer: 3
},{
	question: "What was Mario's original name?",
	answerList: ["Jumpman", "Big Red", "Luigi", "Wario"],
	answer: 0
},{
	question: "What was Final Fantasy 6 relased as in the United States?",
	answerList: ["Final Fantasy 2", "Final Fantasy Mystic Quest", "Final Fantasy 3", "Final Fantasy 4"],
	answer: 2
}];

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
var currentQuestion; var correctAnswer; var incorrectAnswer; var unanswered; var seconds; var time; var answered; var userSelect;
var messages = {
	correct: "It's dangerous to go alone. Take this correct answer with you.",
	incorrect: "Sorry, your answer is in another castle",
	endTime: "You're out of time!",
	finished: "Let's see how well you did!"
}

$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});

function newGame(){
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;
	
	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/'+ gifArray[currentQuestion] +'.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}
	
	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}	
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}