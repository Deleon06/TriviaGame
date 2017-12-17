//set up the timer
// window.onload = function() {
// 	$("#Start").click(Start);
// }
var add = $("#choicebox");
var time = 30;

//set up the variables we're going to use for timer

//set up the variables we're going to use for the functions
var questions = [{question: "What's 1 minus 0?", Choices: ["one", "two", "three", "four"], Answer: "one"}, 
				{question: "What's 1 plus 1?", Choices: ["one", "two", "three", "four"], Answer: "two"}, 
				{question: "What's 1 times 1?", Choices: ["one", "two", "three", "four"], Answer: "one"}, 
				{question: "What's 1 divided by 1?", Choices: ["one", "two", "three", "four"], Answer: "one"}, 
				{question: "What's 1 to the 1 power?", Choices: ["one", "two", "three", "four"], Answer: "one"}]

	 console.log(questions);


	//game begins
var countdown;
var game = {

  questions: questions,
  currentQuestion: 0,
  counter: time,
  correct: 0,
  incorrect: 0,

  countdown: function() {
    game.counter--;
    $("#counter").html(game.counter);
    if (game.counter === 0) {
      game.gameover();
    }
  },

  firstquestion: function() {

    countdown = setInterval(game.countdown, 1000);

    add.html("<h2>" + questions[this.currentQuestion].question + "</h2>");

    for (var i = 0; i < questions[this.currentQuestion].Choices.length; i++) {
      add.append("<button class='answer' id='button' data-name='" + questions[this.currentQuestion].Choices[i]
      + "'>" + questions[this.currentQuestion].Choices[i] + "</button>");
    }
  },

  nextquestion: function() {
    game.counter = time;
    $("#counter-number").html(game.counter);
    game.currentQuestion++;
    game.firstquestion();
  },

  gameover: function() {

    clearInterval(countdown);

    $("#counter-number").html(game.counter);

    add.html("<h2>Out of Time!</h2>");
    add.append("<h3>The Correct Answer was: " + questions[this.currentQuestion].Answer);
    

    if (game.currentquestion === questions.length - 1) {
      setTimeout(game.results, 3000);
    }
    else {
      setTimeout(game.nextquestion, 3000);
    }
  },

  results: function() {

    clearInterval(countdown);

    add.html("<h2>Game Over!</h2>");

    $("#counter-number").html(game.counter);

    add.append("<h3>Correct Answers: " + game.correct + "</h3>");
    add.append("<h3>Incorrect Answers: " + game.incorrect + "</h3>");
    add.append("<h3>Unanswered: " + (questions.length - (game.incorrect + game.correct)) + "</h3>");
    add.append("<br><button id='startorrestart'>Try Again</button>");
  },

  clicked: function(clicked) {
    clearInterval(countdown);
    if ($(clicked.target).attr("data-name") === questions[this.currentQuestion].Answer) {
      this.answeredCorrectly();
    }
    else {
      this.answeredIncorrectly();
    }
  },

  answeredIncorrectly: function() {

    game.incorrect++;

    clearInterval(countdown);

    add.html("<h2>Nope!</h2>");
    add.append("<h3>The Correct Answer was: " + questions[game.currentQuestion].Answer + "</h3>");
    
    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3000);
    }
    else {
      setTimeout(game.nextquestion, 3000);
    }
  },

  answeredCorrectly: function() {

    clearInterval(countdown);

    game.correct++;

    add.html("<h2>Correct!</h2>");

    if (game.currentQuestion === questions.length - 1) {
      setTimeout(game.results, 3000);
    }
    else {
      setTimeout(game.nextquestion, 3000);
    }
  },

  reset: function() {
    this.currentQuestion = 0;
    this.counter = time;
    this.correct = 0;
    this.incorrect = 0;
    this.loadQuestion();
  }
};

// CLICK EVENTS

$(document).on("click", "#startorrestart", function() {
  game.reset();
});

$(document).on("click", ".answer", function(clicked) {
  game.clicked(clicked);
});

$(document).on("click", "#Start", function() {
  $("#choicebox").prepend("<h2>Time Remaining: <span id='countdown'>30</span> Seconds</h2>");
  game.firstquestion();
});