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
- HTML, Js y Css (Front)
- CORS
- Chai, Mocha y SuperTest (tests)
- NodeMailer

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
├── test                      # Test con Chai, Mocha y SuperTest
│   └── integration.test.js
├── validations/              # Validaciones con Joi
│   ├── evento.js
│   └── participante.js
├── index.js                  # Entrada principal de la app
```

---

## 🔌 Requisitos previos

- Node.js 18+ instalado
- Tener una cuenta en [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Crear un cluster y un usuario de base de datos o Pedir que se agregue tu usuario

---

## 📦 Instalación

1. Clonar el repositorio:

```bash
git clone https://github.com/InakiGallas/TP2-TPFinal-API-REST.git
cd tp2-api
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear un archivo `.env` con la siguiente estructura:

```
PORT=8000
MONGO_URL=mongodb+srv://<usuario>:<contraseña>@taskmanagerdb.pprzr8w.mongodb.net/tp2?retryWrites=true&w=majority&appName=taskManagerDB

MAIL_USER=jmvillarroel2000@gmail.com
MAIL_PASS=ugkdjxsmqtsmpkvc
```

> 🔐 Este archivo **NO debe subirse** al repositorio (está en `.gitignore`).

---

## ▶️ Ejecutar el proyecto

```bash
npm start 
npm run watch
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
## ✅ Tests 

El proyecto incluye un módulo de tests de integración para verificar que las rutas principales (GET, GET x ID, POST, PATCH, PUT, DELETE) funcionen correctamente tanto para eventos como para participantes. Los tests están hechos con Mocha, Chai y Supertest.

## 🌐 Vista

Esta API REST está pensada para ser consumida por un Frontend que puede estar corriendo en otro puerto o dominio. Para permitir la comunicación entre ambos sin restricciones del navegador, se configuró CORS (Cross-Origin Resource Sharing).
El proyecto incluye una carpeta con una vista (index.html) para probar la conexión de forma simple. Se recomienda abrirla con Live Server para visualizar los cambios.

## 📧 Envío de mail con Nodemailer

El proyecto incluye funcionalidad de envío de mails usando Nodemailer.
Para probarla localmente, asegurate de tener estas variables en tu archivo .env:
MAIL_USER=jmvillarroel2000@gmail.com  
MAIL_PASS=ugkdjxsmqtsmpkvc

🔗 Ruta de prueba desde Postman o navegador:
GET http://localhost:8000/api/eventos?email=jmvillarroel2000@gmail.com

## ✍️ Autores

- Iñaki Gallastegui
- Melany Meichtri
- Gloria Michelena
- Juan Villaroel
