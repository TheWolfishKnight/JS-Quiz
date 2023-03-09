//Variables
var score = 0;
var timeLeft = 60;
var highScores = [];
var questionIndex = 0;
var timeLeftInterval;

const finalScoreElement = document.querySelector("#final-score");
const highScoreElement = document.querySelector("#high-score");
const resultsContainer = document.querySelector("#results-container");

const quizQuestions = [
  {
    question: "What does the 'DOM' stand for in JavaScript?",
    options: [
      "Document Object Model",
      "Data Output Method",
      "Dynamic Object Manipulation",
      "Direct Output Mechanism",
    ],
    answer: "Document Object Model",
  },
  {
    question: "What is the correct syntax for a 'for' loop in JavaScript?",
    options: [
      "for (i = 0; i < 10; i++)",
      "for (i < 10; i++;)",
      "for (i++; i < 10;)",
      "for (i = 10; i > 0; i--)",
    ],
    answer: "for (i = 0; i < 10; i++)",
  },
];
// Selectors
const startButton = document.querySelector("#start-button");
const highScoresButton = document.querySelector("#high-scores-button");
const quizContainer = document.querySelector("#quiz-container");
const questionElement = document.querySelector("#question");
const optionsElement = document.querySelector("#options");
const scoreElement = document.querySelector("#score");
const timerElement = document.querySelector("#timer"); // Added timer element selector

// Listeners
startButton.addEventListener("click", startTime);
highScoresButton.addEventListener("click", scoreScreen);
let quizActive = false;
//Functions

function startTime() {
  quizActive = true;
  // Start the countdown timer
  timeLeftInterval = setInterval(countdown, 1000);
  displayQuestion();
}

function displayQuestion() {
  const currentQuestion = quizQuestions[questionIndex];

  // Hide the start quiz and high scores buttons
  startButton.classList.add("hidden");
  highScoresButton.classList.add("hidden");

  // Start the countdown timer
  timeLeftInterval = setInterval(countdown(timeLeftInterval), 1000);
// timeLeftInterval = setInterval(function(){code here}, 1000);
  // Update the question element with the text of the current question
  questionElement.textContent = currentQuestion.question;

  // Clear the options element
  optionsElement.innerHTML = "";

  // Loop through the options array of the current question, and create an HTML input element and a label element for each option
  currentQuestion.options.forEach(function (option, index) {
    // For each answer option in the current question...

    const optionId = "option-" + index;
    // Create a unique ID for the answer option, based on its index in the options array.

    const inputElement = document.createElement("input");
    // Create a new HTML input element.

    inputElement.type = "radio";
    inputElement.name = "answer";
    inputElement.id = optionId;
    // Set the type, name, and ID attributes of the input element.

    const labelElement = document.createElement("label");
    // Create a new HTML label element.

    labelElement.htmlFor = optionId;
    // Set the "for" attribute of the label element to the ID of the corresponding input element.

    labelElement.textContent = option;
    // Set the text content of the label element to the current answer option.

    optionsElement.appendChild(inputElement);
    optionsElement.appendChild(labelElement);
    // Add the input and label elements to the options container element.
  });

  // Add an event listener to the options element that will call the checkAnswer() function when an answer is selected
  optionsElement.addEventListener("change", checkAnswer);
}

function countdown(tl) {
  // Decrement the timeLeft variable by 1
  timeLeft--;

  // Update the timer element with the new timeLeft value
  timerElement.textContent = "Time left: " + timeLeft;

  // If the timer reaches 0 or less, call the endQuiz function to end the quiz
  if (timeLeft <= 0) {
    endQuiz(tl);
  }
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="answer"]:checked');
  // Get the selected answer option from the optionsElement.

  if (
    selectedOption &&
    quizQuestions[questionIndex] &&
    selectedOption.value === quizQuestions[questionIndex].answer
  ) {
    // If the selected answer matches the correct answer for the current question, increment the score by 10.
    score += 10;
  } else {
    // If the selected answer is incorrect, subtract 8 seconds from the timer.
    timeLeft -= 8;
  }

  questionIndex++;
  // Increment the questionIndex by 1 to move to the next question.

  if (questionIndex < quizQuestions.length) {
    // If there are more questions left, call the displayQuestion() function again to display the next question.
    displayQuestion();
  } else {
    // If there are no more questions left, call the endQuiz() function to end the quiz.
    endQuiz();
  }
}

function getHighScore() {
  const highScore = localStorage.getItem("highScore");
  if (highScore) {
    return JSON.parse(highScore);
  } else {
    return { name: "", score: 0 };
  }
}

function endQuiz(tl) {
  quizActive = false;
  clearInterval(tl);
  // Decrement the timeLeft variable by 1
  timeLeft = 0;

  // Update the timer element with the new timeLeft value
  timerElement.textContent = "Time left: " + timeLeft;
  // Stops the countdown timer.

  const highScore = getHighScore();
  // Gets the current high score from local storage.

  if (score > highScore.score) {
    // If the user's score is higher than the current high score...

    const name = prompt(
      "Congratulations! You set a new high score! Enter your name:"
    );
    // Prompts the user to enter their name for the new high score.

    setHighScore(name, score);
    // Saves the new high score to local storage with the user's name.
  }

  finalScoreElement.textContent = "Final Score: " + score;
  // Displays the user's final score.

  highScoreElement.textContent =
    "High Score: " + highScore.score + " by " + highScore.name;
  // Displays the current high score and the name of the user who set it.

  document.querySelector("#quiz-container").classList.add("hidden");
  resultsContainer.classList.remove("hidden");
  // Hides the quiz container and shows the results container.
}

function scoreScreen() {
  // Show the high scores page
  quizContainer.classList.add("hidden");
  resultsContainer.classList.add("hidden");
  highScoresContainer.classList.remove("hidden");

  // Clear out the existing high scores
  highScoresList.innerHTML = "";

  // Get the high scores from local storage and add them to the high scores list
  highScores = getHighScores();
  highScores.forEach(function (highScore) {
    const highScoreListItem = document.createElement("li");
    highScoreListItem.textContent = highScore.name + ": " + highScore.score;
    highScoresList.appendChild(highScoreListItem);
  });
  quizContainer.classList.add("hidden");
  resultsContainer.classList.add("hidden");
  highScoresContainer.classList.remove("hidden");
}

// {
//   question: "Which of the following is NOT a data type in JavaScript?",
//   options: ["Boolean", "Integer", "String", "Object"],
//   answer: "Integer"
// },
// {
//   question: "What does the 'typeof' operator do in JavaScript?",
//   options: ["It returns the type of a variable", "It compares two variables", "It assigns a value to a variable", "It creates a new variable"],
//   answer: "It returns the type of a variable"
// },
// {
//   question: "What is the correct way to define a function in JavaScript?",
//   options: ["function myFunction()", "myFunction()", "var myFunction = function()", "All of the above"],
//   answer: "function myFunction()"
// },
// {
//   question: "What does the '+' operator do in JavaScript?",
//   options: ["It adds two numbers together", "It concatenates two strings", "It converts a string to a number", "All of the above"],
//   answer: "All of the above"
// }
