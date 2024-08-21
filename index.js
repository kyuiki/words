const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const app = express();

app.use(express.json());

let words = [];

async function loadWords() {
  try {
    const data = await fs.readFile(path.join(__dirname, 'words.txt'), 'utf8');
    words = data.split('\n').map(word => word.trim().toLowerCase());
    console.log('Words loaded successfully');
  } catch (error) {
    console.error('Error loading words:', error);
  }
}

app.post('/api/check-word', async (req, res) => {
  if (words.length === 0) {
    await loadWords();
  }
  const { word } = req.body;
  const isValid = words.includes(word.toLowerCase());
  res.json({ isValid });
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// For Vercel
module.exports = app;
