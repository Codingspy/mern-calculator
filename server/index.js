// server/index.js

const express = require('express');
const cors = require('cors');
const { evaluate } = require('mathjs');

const app = express();
app.use(cors({
  origin: 'https://mern-calculator-mauve.vercel.app',
  methods: ['GET', 'POST'],
}));

app.use(express.json());

app.post('/calculate', (req, res) => {
  const { expression } = req.body;

  try {
    const result = evaluate(expression);
    res.json({ result });
  } catch (err) {
    res.status(400).json({ error: 'Invalid expression' });
  }
});

app.get('/', (req, res) => {
  res.send('Server is running!');
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
