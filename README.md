<p align="center">
  <img src="src/public/banner.jpeg" alt="KillerCore API Banner" width="100%" />
</p>

<h1 align="center">🚀 KillerCore API</h1>

<p align="center">
  <strong>Backend centralizado y API RESTful para autenticación y gestión completa de usuarios.</strong>
</p>

<p align="center">
  <kbd>🟢 Node.js</kbd> &nbsp;
  <kbd>⚡ Express.js</kbd> &nbsp;
  <kbd>🍃 MongoDB Atlas</kbd> &nbsp;
  <kbd>🔑 JWT</kbd> &nbsp;
  <kbd>🚀 Render</kbd>
</p>

---

## 📖 Descripción

**KillerCore API** es un servicio RESTful desarrollado con **Node.js**, **Express** y **Mongoose**, diseñado para servir como núcleo de identidad y gestión de usuarios para aplicaciones web. Cuenta con almacenamiento persistente en **MongoDB Atlas**, encriptación de contraseñas y despliegue continuo en **Render**.

* 🌐 **URL Base (Producción):** `https://dk59-crud-api.onrender.com/`

---

## 🛠️ Tecnologías Utilizadas

* **Node.js & Express.js** — Arquitectura del servidor y enrutamiento modular.
* **MongoDB Atlas & Mongoose** — Base de datos NoSQL en la nube con validaciones y modelado de esquemas.
* **JSON Web Tokens (JWT)** — Autenticación y protección de rutas privadas.
* **Bcrypt.js** — Encriptación segura de contraseñas mediante hashing.
* **CORS & Dotenv** — Control de acceso entre orígenes y gestión segura de variables de entorno.

---

## 📋 Características Principales

* **Arquitectura Modular:** Separación clara entre rutas de autenticación (`/api/auth`) y gestión de usuarios (`/api/users`).
* **Operaciones CRUD Completas:** Creación, consulta (general, por ID o por `username`), actualización parcial/total y eliminación de registros.
* **Seguridad de Credenciales:** Exclusión automática del campo `password` en las respuestas de consulta y re-encriptación segura únicamente cuando se actualiza la contraseña.
* **Timestamps Automatizados:** Registro automático de fechas de creación (`createdAt`) y última modificación (`updatedAt`).
* **Interfaz de Estado:** Portada web integrada con estado en tiempo real de conexión al servidor y a la base de datos.

---

## 🛣️ Endpoints de la API

### 🔐 Autenticación (`/api/auth`)

| Método | Endpoint | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Registra un nuevo usuario y devuelve su token JWT. | Público |
| `POST` | `/api/auth/login` | Autentica credenciales (`email` y `password`) y genera un token. | Público |
| `GET` | `/api/auth/profile` | Obtiene los datos del perfil del usuario autenticado. | 🔑 Privado (JWT) |

### 👥 Usuarios (`/api/users`)

| Método | Endpoint | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/users` | Obtiene la lista completa de usuarios registrados. | Público |
| `GET` | `/api/users/:id` | Obtiene un usuario específico filtrado por su ID. | Público |
| `GET` | `/api/users/username/:username` | Busca un usuario por su `username` (insensible a mayúsculas). | Público |
| `PUT` | `/api/users/:id` | Actualiza los datos de un usuario existente. | Público |
| `DELETE` | `/api/users/:id` | Elimina permanentemente un usuario del sistema por su ID. | Público |

---

## ⚙️ Instalación y Uso Local

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/devKiller59/KillerCoreAPI
   cd tu-repositorio-api
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto con las siguientes claves:
   ```env
   PORT=4000
   MONGO_URI=tu_cadena_de_conexion_mongodb
   JWT_SECRET=tu_clave_secreta_jwt
   ```

4. **Inicia el servidor:**
   ```bash
   npm run dev
   ```

---

## 👤 Autor

Desarrollado con dedicación por **[DevKiller59](https://github.com/devkiller59)**.  
*¡Proyecto listo para seguir escalando a nuevos módulos y servicios!*