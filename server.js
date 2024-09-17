// USING JSON AS A DATABASE

// const express = require('express');
// const bodyParser = require('body-parser');
// const fs = require('fs');
// const path = require('path');

// const app = express();
// const port = 3000 || env.port;

// app.use(express.static('public'));
// app.use(bodyParser.json());

// const scoresFilePath = path.join(__dirname, 'scores.json');

// let scores = [];
// if (fs.existsSync(scoresFilePath)) {
//     scores = JSON.parse(fs.readFileSync(scoresFilePath));
// }

// app.post('/submit', (req, res) => {
//     const { name, score } = req.body;

//     const existingScoreIndex = scores.findIndex(entry => entry.name === name);
//     if (existingScoreIndex !== -1) {
//         scores[existingScoreIndex].score = score;
//     } else {
//         scores.push({ name, score });
//     }

//     fs.writeFileSync(scoresFilePath, JSON.stringify(scores, null, 2));

//     res.json({ message: 'Score submitted successfully' });
// });

// app.get('/scores', (req, res) => {
//     res.json(scores);
// });

// app.listen(port, () => {
//     console.log(`Quiz app listening at http://localhost:${port}`);
// });

// USING MANGODB AS A DATABASE
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const mongoURI = 'mongodb+srv://rajatpetkar250:Tp26PLRr6Acha09d@quizdel.tkjtg.mongodb.net/';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Error connecting to MongoDB Atlas:', err));

const scoreSchema = new mongoose.Schema({
    name: String,
    score: Number
});
const Score = mongoose.model('Score', scoreSchema);

app.use(express.static('public'));
app.use(bodyParser.json());

app.post('/submit', async (req, res) => {
    const { name, score } = req.body;

    try {
        const existingScore = await Score.findOne({ name });
        if (existingScore) {
            existingScore.score = score;
            await existingScore.save();
        } else {
            const newScore = new Score({ name, score });
            await newScore.save();
        }

        res.json({ message: 'Score submitted successfully' });
    } catch (err) {
        console.error('Error submitting score:', err);
        res.status(500).json({ message: 'Error submitting score' });
    }
});

app.get('/scores', async (req, res) => {
    try {
        const scores = await Score.find();
        res.json(scores);
    } catch (err) {
        console.error('Error fetching scores:', err);
        res.status(500).json({ message: 'Error fetching scores' });
    }
});

app.post('/reset-scores', async (req, res) => {
    try {
        await Score.deleteMany({});
        res.json({ message: 'Scores reset successfully.' });
    } catch (err) {
        console.error('Error resetting scores:', err);
        res.status(500).json({ message: 'Error resetting scores' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
