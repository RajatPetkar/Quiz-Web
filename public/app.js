const questions = [
    {
        question: "What does CMOS stand for?",
        options: [
            "Complementary Metal-Oxide-Semiconductor",
            "Complex Metal-Oxide System",
            "Conductive Metal-Oxide Semiconductor",
            "Current Mode Oscillation System"
        ],
        answer: 0
    },
    {
        question: "What is a primary advantage of CMOS technology in digital circuits?",
        options: [
            "High power consumption",
            "Low power consumption",
            "High frequency operation",
            "Simple circuit design"
        ],
        answer: 1
    },
    {
        question: "Which component in a MOS transistor acts as the gate?",
        options: [
            "Metal layer",
            "Oxide layer",
            "Semiconductor layer",
            "Substrate"
        ],
        answer: 0
    },
    {
        question: "What are the two main types of MOS transistors?",
        options: [
            "NMOS and CMOS",
            "PMOS and NMOS",
            "CMOS and BMOS",
            "DMOS and CMOS"
        ],
        answer: 1
    },
    {
        question: "In a PMOS transistor, which type of charge carriers are responsible for conduction?",
        options: [
            "Electrons",
            "Holes",
            "Neutrons",
            "Protons"
        ],
        answer: 1
    },
    {
        question: "In an NMOS transistor, what type of charge carriers are responsible for current conduction?",
        options: [
            "Electrons",
            "Holes",
            "Neutrons",
            "Protons"
        ],
        answer: 0
    },
    {
        question: "Which transistors are used in a CMOS inverter?",
        options: [
            "Two NMOS transistors",
            "Two PMOS transistors",
            "One NMOS and one PMOS transistor",
            "Three NMOS transistors"
        ],
        answer: 2
    },
    {
        question: "In a basic CMOS inverter, what happens when the input is HIGH?",
        options: [
            "Both transistors turn ON.",
            "The P-channel MOSFET turns ON and the N-channel MOSFET turns OFF.",
            "The P-channel MOSFET turns OFF and the N-channel MOSFET turns ON.",
            "Both transistors turn OFF."
        ],
        answer: 2
    },
    {
        question: "Which of the following is true about the operation of a CMOS inverter?",
        options: [
            "The P-channel MOSFET is OFF when its gate is at 0 V relative to its source.",
            "The N-channel MOSFET is OFF when its gate is at + VDD relative to its source.",
            "Both transistors are ON when the input is LOW.",
            "The output is always at 0 V when the input is HIGH."
        ],
        answer: 3
    },
    {
        question: "What is the role of the N-channel MOSFET in the CMOS inverter when the input is HIGH?",
        options: [
            "It pulls the output to + VDD.",
            "It pulls the output to 0 V.",
            "It is in the cutoff region.",
            "It is in the saturation region and remains off."
        ],
        answer: 1
    },
    {
        question: "What is one of the primary advantages of CMOS technology?",
        options: [
            "High power consumption",
            "Low power consumption",
            "High heat generation",
            "Complex manufacturing process"
        ],
        answer: 1
    },
    {
        question: "Which of the following is a disadvantage of CMOS technology?",
        options: [
            "High noise immunity",
            "Susceptibility to static electricity",
            "High switching speed",
            "Low density of integration"
        ],
        answer: 1
    },
    {
        question: "CMOS circuits can integrate both analog and digital functions on the same chip.",
        options: ["True", "False"],
        answer: 0
    },
    {
        question: "CMOS circuits produce significant heat during operation.",
        options: ["True", "False"],
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
