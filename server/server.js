const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3001;
const SECRET_KEY = 'your-secret-key';

app.use(express.json());

const users = [];

// User registration
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.status(201).json({ message: 'User registered' });
});

// User login
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});