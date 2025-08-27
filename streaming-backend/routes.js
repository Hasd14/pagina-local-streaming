const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const router = express.Router();
const SECRET = 'supersecretkey';

const db = new sqlite3.Database('./streaming.db');

// Middleware para verificar JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Registro de usuario
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Campos requeridos' });
  const hash = bcrypt.hashSync(password, 10);
  db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hash], function(err) {
    if (err) return res.status(400).json({ error: 'Email ya registrado' });
    res.json({ id: this.lastID, name, email });
  });
});

// Login de usuario
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], (err, user) => {
    if (err || !user) return res.status(400).json({ error: 'Usuario no encontrado' });
    if (!bcrypt.compareSync(password, user.password)) return res.status(401).json({ error: 'Contraseña incorrecta' });
    const token = jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, SECRET, { expiresIn: '1d' });
    res.json({ token });
  });
});

// Obtener servicios de streaming
router.get('/services', (req, res) => {
  db.all('SELECT * FROM services', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Error al obtener servicios' });
    res.json(rows);
  });
});

// ...más endpoints para pagos, cuentas, admin, etc...

module.exports = router;
