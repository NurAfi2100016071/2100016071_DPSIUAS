const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Lakukan validasi username dan password di sini
  if (username === 'admin' && password === 'password') {
    // Jika valid, buat token
    const token = jwt.sign({ id_user: 1, role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '1h' // Token berlaku selama 1 jam
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

module.exports = router;
