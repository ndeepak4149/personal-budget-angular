// Budget API

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(cors());

app.get('/budget', (req, res) => {
    // Read the content of the JSON file
    fs.readFile('exercise01.json', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        try {
            const budgetData = JSON.parse(data);
            res.json(budgetData);
        } catch (parseError) {
            console.error(parseError);
            res.status(500).json({ error: 'Error parsing JSON data' });
        }
    });
});

app.listen(port, () => {
    console.log(`API served at http://localhost:${port}`);
});