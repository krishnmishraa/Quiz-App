const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic", "Indian", "Arctic", "Pacific"],
        correctAnswer: "Pacific"
    }
];

const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-button');
const timerElement = document.getElementById('timer');

let currentQuestionIndex = 0;
let userScore = 0; // Initialize user score
let timeLeft = 15; // Initial time for each question
let timer;

function renderQuestion() {
    clearInterval(timer); // Clear any existing timer
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = ''; // Clear previous options

    startTimer(); // Start timer for the new question

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        button.addEventListener('click', (e) => {
            clearInterval(timer); // Clear timer when an option is selected
            checkAnswer(option);
            // Disable all option buttons after an answer is selected
            Array.from(optionsContainer.children).forEach(btn => {
                btn.disabled = true;
            });
            nextButton.disabled = false; // Enable next button
        });
        optionsContainer.appendChild(button);
    });
    nextButton.disabled = true; // Disable next button until an option is selected
}

function checkAnswer(selectedOption) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const optionButtons = Array.from(optionsContainer.children);

    optionButtons.forEach(button => {
        if (button.textContent === currentQuestion.correctAnswer) {
            button.classList.add('correct');
        } else if (button.textContent === selectedOption) {
            button.classList.add('incorrect');
        }
    });

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            renderQuestion();
        } else {
            questionElement.textContent = `Quiz Finished! Your score: ${userScore}/${quizQuestions.length}`;
            optionsContainer.innerHTML = '';
            nextButton.style.display = 'none';
            timerElement.style.display = 'none'; // Hide timer at the end
        }
    }, 1000); // Highlight for 1 second

    if (selectedOption === currentQuestion.correctAnswer) {
        userScore++;
    }
}

function startTimer() {
    timeLeft = 15; // Reset timer for each question
    timerElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestionIndex++;
            if (currentQuestionIndex < quizQuestions.length) {
                renderQuestion();
            } else {
                questionElement.textContent = `Quiz Finished! Your score: ${userScore}/${quizQuestions.length}`;
                optionsContainer.innerHTML = '';
                nextButton.style.display = 'none';
            }
        }
    }, 1000);
}

nextButton.addEventListener('click', () => {
    clearInterval(timer); // Clear timer if next button is clicked
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        renderQuestion();
    } else {
        questionElement.textContent = `Quiz Finished! Your score: ${userScore}/${quizQuestions.length}`;
        optionsContainer.innerHTML = '';
        nextButton.style.display = 'none';
        timerElement.style.display = 'none';
    }
});

renderQuestion();
