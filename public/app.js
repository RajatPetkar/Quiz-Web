const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: 2
    },
    {
        question: "Which language is primarily used for web development?",
        options: ["Python", "C++", "JavaScript", "Java"],
        answer: 2
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: 1
    }
];

const questionContainer = document.getElementById('questions');
questions.forEach((q, index) => {
    const questionElement = document.createElement('div');
    questionElement.innerHTML = `
        <p>${q.question}</p>
        ${q.options.map((option, i) => `
            <input type="radio" name="question${index}" value="${i}" required> ${option}<br>
        `).join('')}
    `;
    questionContainer.appendChild(questionElement);
});

document.getElementById('quizForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    let score = 0;

    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedOption && parseInt(selectedOption.value) === q.answer) {
            score++;
        }
    });

    fetch('/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, score })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('result').innerText = `Thank you, ${name}. Your score is: ${score}`;
        window.location.href = 'scores.html';
    });
});
