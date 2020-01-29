var triviaQuestions = [
  {
    question: "The Sound of Music was released in",
    answerList: ["a. 1965", "b. 1959", "c. 1963", "d. 1970"],
    correctAnswer: 0
  },
  {
    question: "Hello, Dolly! features a cameo of what famous brass musician",
    answerList: [
      "a. Dizzy Gillespie",
      "b. Miles Davis",
      "c. Louis Armstrong",
      "d. Snooky Young"
    ],
    correctAnswer: 2
  },
  {
    question: "In West Side Story, when you're a jet, you're a jet",
    answerList: [
      "a. On Sunday",
      "b. For a Day",
      "c. All the Way",
      "d. Just in May"
    ],
    correctAnswer: 2
  },
  {
    question: "Tzeitel's true love in Fiddler on the Roof",
    answerList: ["a. Motel", "b. Tevye", "c. Perchik", "d. Lazar Wolf"],
    correctAnswer: 0
  }
];

var currentQuestion = 0;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;
var rightAnswerIndex;
var rightAnswerText;
var setIntervalId;
var messages = {
  correct: "Yep!",
  incorrect: "No, dum dum.",
  endTime: "Time is up!",
  finished: "Let's see how well you did."
};

$("#startBtn").on("click", function () {
  $(this).hide();
  newGame();
});

$("#startOverBtn").on("click", function () {
  $(this).hide();
  newGame();
});

function newGame() {
  $("#finalMessage").empty();
  $("#correctAnswers").empty();
  $("#incorrectAnswers").empty();
  $("#unanswered").empty();
  correctAnswer = 0;
  incorrectAnswer = 0;
  unanswered = 0;
  $(".answerList").empty();
  $("#currentQuestion").empty();
  $(".thisChoice").empty(); //Clears question page
  $(".question").empty();
  newQuestion();
}

function newQuestion() {
  $("#message").empty();
  $("#correctedAnswer").empty();
  $("#gif").empty();
  clearInterval(time);
  answered = true;

  console.log(currentQuestion);
  //sets up new questions & answerList

  if (currentQuestion < triviaQuestions.length) {
    var questionNumber = currentQuestion + 1;
    $("#currentQuestion").html(
      "Question #" + questionNumber + "/" + triviaQuestions.length
    );
    $(".question").html(
      "<h2>" + triviaQuestions[currentQuestion].question + "</h2>"
    );
    for (var i = 0; i < triviaQuestions[currentQuestion].answerList.length; i++) {
      var choices = $("<div>");
      choices.text(triviaQuestions[currentQuestion].answerList[i]);
      choices.attr({ "data-index": i });
      choices.attr("data-answerIndex", triviaQuestions[currentQuestion].correctAnswer);
      choices.addClass("thisChoice");
      $(".answerList").append(choices);
    }
    countdown();
    //clicking an answer will pause the time and setup answerPage
    $(".thisChoice").on("click", function () {
      answerPage(this);
    
    });
  }
}

function countdown() {
  seconds = 15;
  $("#timeLeft").empty();
  $("#timeLeft").append("<h3>Time Remaining: " + seconds + "</h3>");
  answered = true;
  //sets timer to go down
  time = setInterval(showCountdown, 1000);
}

function showCountdown() {
  seconds--;


  console.log(seconds);
  if (seconds === 0) {
    currentQuestion++;
    newGame();
  }

  if (seconds < 1) {
    clearInterval(time);
    answered = false;
    // answerPage();
  }
}

function answerPage(selector) {

  $("#currentQuestion").empty();
      $(".thisChoice").empty(); //Clears question page
      $(".question").empty();
      if (currentQuestion < triviaQuestions.length) {
        rightAnswerIndex = triviaQuestions[currentQuestion].correctAnswer;
        rightAnswerText =
          triviaQuestions[currentQuestion].answerList[rightAnswerIndex];
    
      }
      userSelect = $(selector).data("index")
      var answerSelect = $(selector).data("answerIndex")

      clearInterval(time);
      if (userSelect === answerSelect) {
        answerPage();

        correctAnswer++
    
      }
      else {
        incorrectAnswer++;
      }
      $("#correctedAnswer").html("The correct answer was: " + rightAnswerText);
      currentQuestion++
      setTimeout(newGame, 5000);
}