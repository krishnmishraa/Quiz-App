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

let currentQuestionIndex = 0;
let userScore = 0; // Initialize user score

function renderQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsContainer.innerHTML = ''; // Clear previous options

    currentQuestion.options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-button');
        button.addEventListener('click', (e) => {
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
    if (selectedOption === currentQuestion.correctAnswer) {
        userScore++;
    }
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        renderQuestion();
    } else {
        questionElement.textContent = `Quiz Finished! Your score: ${userScore}/${quizQuestions.length}`;
        optionsContainer.innerHTML = '';
        nextButton.style.display = 'none'; // Hide the next button
    }
});

renderQuestion();
