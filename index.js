//Variables
var score = 0;
var timer = 60;
var highScores = [];
const quizQuestions = [
  {
    question: "What does the 'DOM' stand for in JavaScript?",
    options: ["Document Object Model", "Data Output Method", "Dynamic Object Manipulation", "Direct Output Mechanism"],
    answer: "Document Object Model"
  },
  {
    question: "What is the correct syntax for a 'for' loop in JavaScript?",
    options: ["for (i = 0; i < 10; i++)", "for (i < 10; i++;)", "for (i++; i < 10;)", "for (i = 10; i > 0; i--)"],
    answer: "for (i = 0; i < 10; i++)"
  },
  {
    question: "Which of the following is NOT a data type in JavaScript?",
    options: ["Boolean", "Integer", "String", "Object"],
    answer: "Integer"
  },
  {
    question: "What does the 'typeof' operator do in JavaScript?",
    options: ["It returns the type of a variable", "It compares two variables", "It assigns a value to a variable", "It creates a new variable"],
    answer: "It returns the type of a variable"
  },
  {
    question: "What is the correct way to define a function in JavaScript?",
    options: ["function myFunction()", "myFunction()", "var myFunction = function()", "All of the above"],
    answer: "function myFunction()"
  },
  {
    question: "What does the '+' operator do in JavaScript?",
    options: ["It adds two numbers together", "It concatenates two strings", "It converts a string to a number", "All of the above"],
    answer: "All of the above"
  }
];
// Selectors
const startButton = document.querySelector("#start-button");
const highScoresButton = document.querySelector("#high-scores-button");
const quizContainer = document.querySelector("#quiz-container");
const questionElement = document.querySelector("#question")
const optionsElement = document.querySelector("#options")
const scoreElement = document.querySelector("#score");

// Listeners
startButton.addEventListener(click, startQuiz)
highScoresButton.addEventListener(click, scoreScreen)