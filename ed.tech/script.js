// Variables
const startScreen = document.querySelector('.start-screen');
const quizScreen = document.querySelector('.quiz');
const endScreen = document.querySelector('.end-screen');
const startButton = document.querySelector('.start');
const submitButton = document.querySelector('.submit');
const nextButton = document.querySelector('.next');
const restartButton = document.querySelector('.restart');
const questionEl = document.querySelector('.question');
const answersEl = document.querySelectorAll('.answer');
const currentQuestionEl = document.querySelector('.current');
const totalQuestionsEl = document.querySelector('.total');
const finalScoreEl = document.querySelector('.final-score');
const totalScoreEl = document.querySelector('.total-score');
const timerEl = document.querySelector('.progress-text');
const progressBarEl = document.querySelector('.progress-bar');
const numQuestionsEl = document.getElementById('num-questions');
const categoryEl = document.getElementById('category');
const difficultyEl = document.getElementById('difficulty');
const timeLimitEl = document.getElementById('time');

// Sample questions (In actual use, fetch dynamically)
const quizQuestions = {
    C: [
        {
            question: "What does 'C' stand for?",
            answers: ["Code", "Control", "Compile", "Computer"],
            correct: 2
        },
        {
            question: "Which operator is used for pointer in C?",
            answers: ["&", "*", "#", "!"],
            correct: 1
        }
    ],
    Python: [
        {
            question: "Who developed Python?",
            answers: ["Guido van Rossum", "Dennis Ritchie", "James Gosling", "Bjarne Stroustrup"],
            correct: 0
        },
        {
            question: "Which keyword is used to create a function in Python?",
            answers: ["function", "fun", "def", "lambda"],
            correct: 2
        }
    ],
    Java: [
        {
            question: "Which company developed Java?",
            answers: ["Microsoft", "Sun Microsystems", "Apple", "Google"],
            correct: 1
        },
        {
            question: "Which keyword is used to inherit a class in Java?",
            answers: ["extends", "implements", "inherits", "derives"],
            correct: 0
        }
    ]
};

let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLimit = 10;
let timer;

// Initialize Quiz
function startQuiz() {
    const selectedCategory = categoryEl.value;
    const numQuestions = parseInt(numQuestionsEl.value);
    timeLimit = parseInt(timeLimitEl.value);

    // Get questions based on the selected category and difficulty (not implemented in this basic version)
    currentQuiz = quizQuestions[selectedCategory].slice(0, numQuestions);

    // Hide start screen and show quiz screen
    startScreen.classList.add('hide');
    quizScreen.classList.remove('hide');
    
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
    startTimer();
}

// Load Question
function loadQuestion() {
    const currentQuestion = currentQuiz[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    answersEl.forEach((answerEl, index) => {
        answerEl.querySelector('.text').textContent = currentQuestion.answers[index];
        answerEl.classList.remove('correct', 'wrong', 'selected');
    });
    currentQuestionEl.textContent = currentQuestionIndex + 1;
    totalQuestionsEl.textContent = currentQuiz.length;
    submitButton.disabled = true;
}

// Handle Answer Selection
answersEl.forEach((answerEl, index) => {
    answerEl.addEventListener('click', () => {
        answersEl.forEach(a => a.classList.remove('selected'));
        answerEl.classList.add('selected');
        submitButton.disabled = false;
    });
});

// Submit Answer
submitButton.addEventListener('click', () => {
    const selectedAnswer = document.querySelector('.answer.selected');
    const answerIndex = Array.from(answersEl).indexOf(selectedAnswer);

    // Check answer
    if (answerIndex === currentQuiz[currentQuestionIndex].correct) {
        selectedAnswer.classList.add('correct');
        score++;
    } else {
        selectedAnswer.classList.add('wrong');
        answersEl[currentQuiz[currentQuestionIndex].correct].classList.add('correct');
    }

    nextButton.disabled = false;
    submitButton.disabled = true;
    clearInterval(timer);
});

// Move to Next Question
nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < currentQuiz.length) {
        loadQuestion();
        nextButton.disabled = true;
        startTimer();
    } else {
        showEndScreen();
    }
});

// Show End Screen
function showEndScreen() {
    quizScreen.classList.add('hide');
    endScreen.classList.remove('hide');
    finalScoreEl.textContent = score;
    totalScoreEl.textContent = currentQuiz.length;
}

// Restart Quiz
restartButton.addEventListener('click', () => {
    endScreen.classList.add('hide');
    startScreen.classList.remove('hide');
});

// Timer Functionality
function startTimer() {
    let timeLeft = timeLimit;
    timerEl.textContent = timeLeft;
    progressBarEl.style.width = '100%';
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = timeLeft;
        progressBarEl.style.width = `${(timeLeft / timeLimit) * 100}%`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextButton.disabled = false;
        }
    }, 1000);
}

// Start quiz event listener
startButton.addEventListener('click', startQuiz);
