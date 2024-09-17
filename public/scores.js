function fetchScores() {
    fetch('/scores')
        .then(response => response.json())
        .then(data => {
            const sortedScores = data.sort((a, b) => b.score - a.score);

            const allScoresContainer = document.getElementById('allScores');
            allScoresContainer.innerHTML = ''; 

            sortedScores.forEach(scoreEntry => {
                const scoreBlock = document.createElement('div');
                scoreBlock.classList.add('score-block');
                scoreBlock.innerHTML = `
                    <strong>${scoreEntry.name}</strong><br>
                    Score: ${scoreEntry.score}
                `;
                allScoresContainer.appendChild(scoreBlock);
            });
        });
}

fetchScores();
