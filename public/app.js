const questions = [
    {
        question: "What is the capital of France?",
        choices: ["Berlin", "Madrid", "Paris", "Lisbon"],
        correct: 2
    },
    {
        question: "What is 2 + 2?",
        choices: ["3", "4", "5", "6"],
        correct: 1
    }
];

const quizForm = document.getElementById('quizForm');
const questionsContainer = document.getElementById('questions');
const resultContainer = document.getElementById('result');
const allScoresContainer = document.getElementById('allScores');

function loadQuestions() {
    questions.forEach((q, index) => {
        const questionHTML = `
            <p>${index + 1}. ${q.question}</p>
            ${q.choices.map((choice, i) => `
                <label>
                    <input type="radio" name="q${index}" value="${i}" required>
                    ${choice}
                </label><br>`).join('')}
        `;
        questionsContainer.innerHTML += questionHTML;
    });
}

loadQuestions();

function fetchAllScores() {
    fetch('/scores')
        .then(response => response.json())
        .then(data => {
            allScoresContainer.innerHTML = ''; 
            data.forEach((entry, index) => {
                allScoresContainer.innerHTML += `<p>${index + 1}. ${entry.name}: ${entry.score}</p>`;
            });
        });
}

quizForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    let score = 0;

    questions.forEach((q, index) => {
        const selectedAnswer = document.querySelector(`input[name="q${index}"]:checked`);
        if (selectedAnswer && parseInt(selectedAnswer.value) === q.correct) {
            score++;
        }
    });

    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, score: score }),
    })
    .then(response => response.json())
    .then(data => {
        resultContainer.innerHTML = `Thank you, ${name}! Your score is: ${score}/${questions.length}`;
        fetchAllScores(); 
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

window.onload = fetchAllScores;
