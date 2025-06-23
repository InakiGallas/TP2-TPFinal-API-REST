import express from "express";
import dotenv from "dotenv";
import MongoConnection from "./models/connection.js";
import Router from "./routes/router.js";
import cors from "cors";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/api", new Router().start());

app.use((req, res) => res.status(404).json({ message: "Not Found" }));

app.listen(PORT, async () => {
    await MongoConnection.connect();
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});