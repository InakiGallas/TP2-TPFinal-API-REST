import express from "express";
import EventoController from "../controllers/eventoController.js";
import ParticipanteController from "../controllers/participanteController.js";

class Router {
    constructor() {
        this.router = express.Router();
        this.eventos = new EventoController();
        this.participantes = new ParticipanteController();
    }

    start() {
        this.router.get("/eventos", this.eventos.getEventos);
        this.router.post("/eventos", this.eventos.crearEvento);
        this.router.get("/eventos/:id", this.eventos.getPorId);
        this.router.patch("/eventos/:id", this.eventos.actualizarEvento);
        this.router.put("/eventos/:id", this.eventos.reemplazarEvento);
        this.router.delete("/eventos/:id", this.eventos.eliminarEvento);

        this.router.get("/participantes", this.participantes.getParticipantes);
        this.router.post("/participantes", this.participantes.crearParticipante);
        this.router.get("/participantes/evento/:eventoId", this.participantes.getPorEvento);
        this.router.patch("/participantes/:id", this.participantes.actualizarParticipante);
        this.router.put("/participantes/:id", this.participantes.reemplazarParticipante);
        this.router.delete("/participantes/:id", this.participantes.eliminarParticipante);

        return this.router;
    }
}

export default Router;