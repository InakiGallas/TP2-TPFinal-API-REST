# 🧾 TP2 - API de Eventos y Participantes

API RESTful desarrollada con **Node.js**, **Express** y **MongoDB Atlas**, que permite gestionar eventos y sus participantes. El proyecto sigue una arquitectura por capas aplicando el patrón **DAO + Factory**.

---

## 🚀 Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB (Atlas)
- Joi (validaciones)
- Dotenv
- MongoDB Native Driver (`mongodb`)

---

## 📁 Estructura del proyecto

```
src/
├── controllers/              # Lógica de cada endpoint
│   ├── eventoController.js
│   └── participanteController.js
├── models/
│   ├── DAO/                  # Clases DAO (Data Access Object)
│   │   ├── evento.js
│   │   └── participante.js
│   ├── connection.js         # Conexión a Mongo Atlas
│   └── Factory.js            # Retorna instancias de DAOs
├── routes/
│   └── router.js             # Define todas las rutas
├── services/                 # Lógica intermedia de negocio
│   ├── eventoService.js
│   └── participanteService.js
├── validations/              # Validaciones con Joi
│   ├── evento.js
│   └── participante.js
│   └── index.js
├── index.js                  # Entrada principal de la app
```

---

## 🔌 Requisitos previos

- Node.js 18+ instalado
- Tener una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Crear un cluster y un usuario de base de datos

---

## 📦 Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/tp2-api.git
cd tp2-api
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear un archivo `.env` con la siguiente estructura:

```
PORT=8000
MONGO_URL=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<base>?retryWrites=true&w=majority&appName=<appName>
```

> 🔐 Este archivo **NO debe subirse** al repositorio (está en `.gitignore`).

---

## ▶️ Ejecutar el proyecto

```bash
npm start
```

Si todo está correcto, verás:

```
Mongo conectado
Servidor corriendo en http://localhost:8000
```

---

## 📮 Endpoints disponibles

### Eventos
- `GET /api/eventos`
- `GET /api/eventos/:id`
- `POST /api/eventos`
- `PATCH /api/eventos/:id`
- `PUT /api/eventos/:id`
- `DELETE /api/eventos/:id`

### Participantes
- `GET /api/participantes`
- `GET /api/participantes/evento/:eventoId`
- `POST /api/participantes`
- `PATCH /api/participantes/:id`
- `PUT /api/participantes/:id`
- `DELETE /api/participantes/:id`

---

## 🧠 Sobre la arquitectura

- **DAO (Data Access Object):** Encapsula el acceso a la base de datos.
- **Factory:** Desacopla la creación del DAO del resto de la aplicación.
- **Service Layer:** Contiene la lógica de negocio, aislada de Express.
- **Controller:** Atiende las peticiones HTTP y delega al service.
- **Validaciones:** Uso de Joi para validar la entrada antes de guardar en la base.

---

## ✍️ Autores

- Iñaki Gallastegui
- 
- 
- 
