const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

let words = [];

async function loadWords() {
  try {
    const data = await fs.readFile('words.txt', 'utf8');
    words = data.split('\n').map(word => word.trim().toLowerCase());
    console.log('Words loaded successfully');
  } catch (error) {
    console.error('Error loading words:', error);
  }
}

loadWords();

app.post('/check-word', (req, res) => {
  const { word } = req.body;
  const isValid = words.includes(word.toLowerCase());
  res.json({ isValid });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
