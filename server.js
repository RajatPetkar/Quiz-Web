const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

const scoresFilePath = path.join(__dirname, 'scores.json');

let scores = [];
if (fs.existsSync(scoresFilePath)) {
    scores = JSON.parse(fs.readFileSync(scoresFilePath));
}

app.post('/submit', (req, res) => {
    const { name, score } = req.body;

    const existingScoreIndex = scores.findIndex(entry => entry.name === name);
    if (existingScoreIndex !== -1) {
        scores[existingScoreIndex].score = score;
    } else {
        scores.push({ name, score });
    }

    fs.writeFileSync(scoresFilePath, JSON.stringify(scores, null, 2));

    res.json({ message: 'Score submitted successfully' });
});

app.get('/scores', (req, res) => {
    res.json(scores);
});

app.listen(port, () => {
    console.log(`Quiz app listening at http://localhost:${port}`);
});
