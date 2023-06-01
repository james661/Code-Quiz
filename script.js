// Stored the questions in a variable to grab from later.
var quizData = [
  {
    question: "Commonly used data types DO NOT include?",
    choices: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "alerts",
  },
  {
    question:
      "The condition in an if / else statement is enclosed within ____.",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correctAnswer: "parentheses",
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    choices: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    correctAnswer: "all of the above",
  },
  {
    question:
      "String values must be enclosed within ____ when being assigned to variables.",
    choices: ["commas", "curly brackets", "quotes", "parentheses"],
    correctAnswer: "quotes",
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    correctAnswer: "console.log",
  },
];
// Set a variable to begin the questions from the first one.
var currentQuestion = 0;
// Set a variable to keep trap of the user's score, starting at 0.
var score = 0;
// Set a variable for the total time at the start of the quiz.
var timeLeft = 60;
// Sets a variable to grab the start element and store it.
var startButton = document.getElementById("start");
// Grabs the quiz container and stores it in a variable.
var quizContainer = document.getElementById("quiz-container");
// Grabs the question element and stores it in a variable.
var questionEl = document.getElementById("question");
// Grabs all the choices button elements and stores them as an array in a variable.
var choicesEl = Array.from(document.querySelectorAll("#choices button"));
// Grabs the timer element and stores it in a variable.
var timerEl = document.getElementById("timer");
// Set a variable to keep track of the timer within the function that starts the timer.
var timerId;
// Function that begins the timer and shows the first question.
function startQuiz() {
  startButton.style.display = "none";
  quizContainer.style.display = "block";
  displayQuestion();
  startTimer();
}

// Function that starts the timer and ends the game when it reaches 0. It drops by 1000 milliseconds per second.
function startTimer() {
  timerId = setInterval(() => {
    timeLeft--;
    timerEl.innerText = timeLeft;
    if (timeLeft === 0) {
      endGame();
    }
  }, 1000);
}

// Function that displays each question, then switches to the next question once one is answered.
function displayQuestion() {
  var question = quizData[currentQuestion];
  questionEl.innerText = question.question;

  choicesEl.forEach((choice, index) => {
    choice.innerText = question.choices[index];
    choice.addEventListener("click", () => {
      checkAnswer(choice.innerText);
    });
  });
}

// Function that checks if the user chose the correct answer and adds a point to the score if so.
function checkAnswer(answer) {
  var question = quizData[currentQuestion];
  if (answer === question.correctAnswer) {
    score++;
  }
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    displayQuestion();
  } else {
    endGame();
  }
}

// Function that ends the game and displays the final score.
function endGame() {
  clearInterval(timerId);

  questionEl.innerText = `Good job! Your score is ${score}/5`;
  choicesEl.forEach((choice) => {
    choice.style.display = "none";
  });
}

// Adds event listener for when the start button is clicked to start the quiz.
startButton.addEventListener("click", startQuiz);
