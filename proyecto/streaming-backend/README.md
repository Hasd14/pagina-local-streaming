# Streaming Backend

Backend local para gestión y cobros de cuentas de streaming (Netflix, Disney Plus, Spotify).

## Instalación

1. Instala dependencias:
   ```
   npm install
   ```
2. Inicia el servidor:
   ```
   npm start
   ```

El backend estará disponible en `http://localhost:3000/api`.

## Endpoints principales
- POST `/api/register` — Registro de usuario
- POST `/api/login` — Login de usuario
- GET `/api/services` — Listar servicios de streaming

Puedes expandir los endpoints en `routes.js` para pagos, cuentas y administración.

## Base de datos
- Se usa SQLite y se crea automáticamente el archivo `streaming.db`.

## Seguridad
- Autenticación JWT
- Contraseñas encriptadas con bcrypt
