const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = 3000;
const SECRET = 'supersecretkey';

app.use(express.json());

// Inicializar base de datos SQLite
const db = new sqlite3.Database('./streaming.db', (err) => {
  if (err) throw err;
  console.log('Conectado a la base de datos SQLite');
});

// Crear tablas si no existen
const initDb = () => {
  // Usuarios
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    fecha_registro TEXT
  )`);

  // Administradores
  db.run(`CREATE TABLE IF NOT EXISTS administrators (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
  )`);

  // Servicios
  db.run(`CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    logo TEXT
  )`);

  // Métodos de pago
  db.run(`CREATE TABLE IF NOT EXISTS payment_methods (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    details TEXT
  )`);

  // Inventario de cuentas maestras
  db.run(`CREATE TABLE IF NOT EXISTS master_accounts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_id INTEGER,
    email TEXT,
    password TEXT,
    profiles INTEGER,
    notes TEXT,
    FOREIGN KEY(service_id) REFERENCES services(id)
  )`);

  // Suscripciones (compra individual)
  db.run(`CREATE TABLE IF NOT EXISTS subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    service_id INTEGER,
    payment_method_id INTEGER,
    admin_id INTEGER,
    estado_pago TEXT,
    fecha_solicitud TEXT,
    fecha_aprobacion TEXT,
    fecha_vencimiento TEXT,
    credencial_usuario TEXT,
    credencial_contrasena TEXT,
    credencial_perfil TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(service_id) REFERENCES services(id),
    FOREIGN KEY(payment_method_id) REFERENCES payment_methods(id),
    FOREIGN KEY(admin_id) REFERENCES administrators(id)
  )`);
};
initDb();

// Integrar rutas
const routes = require('./routes');
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
