import EventoService from "../services/eventoService.js";
import eventoSchema from "../validations/evento.js";

class EventoController {
    constructor() {
        this.eventoService = new EventoService();
    }

    getEventos = async (req, res) => {
        try {
            const eventos = await this.eventoService.getEventos();
            res.json(eventos);
        } catch (err) {
            res.status(500).json({ error: "Error al obtener eventos" });
        }
    };

    crearEvento = async (req, res) => {
        try {
            const { error } = eventoSchema.validate(req.body);
            if (error) return res.status(400).json({ error: error.details[0].message });

            const nuevo = await this.eventoService.crearEvento(req.body);
            res.status(201).json(nuevo);
        } catch (err) {
            res.status(500).json({ error: "Error al crear evento" });
        }
    };

    getPorId = async (req, res) => {
        try {
            const evento = await this.eventoService.getEventoPorId(req.params.id);
            if (!evento) return res.status(404).json({ error: "Evento no encontrado" });
            res.json(evento);
        } catch (err) {
            console.error("Error getPorId:", err);
            res.status(500).json({ error: "Error al buscar evento" });
        }
    };
   

    actualizarEvento = async (req, res) => {
        try {
            const actualizado = await this.eventoService.actualizarEvento(req.params.id, req.body);
            res.json(actualizado);
        } catch (err) {
            res.status(500).json({ error: "Error al actualizar evento" });
        }
    };

    reemplazarEvento = async (req, res) => {
        try {
            const reemplazado = await this.eventoService.reemplazarEvento(req.params.id, req.body);
            res.json(reemplazado);
        } catch (err) {
            res.status(500).json({ error: "Error al reemplazar evento" });
        }
    };

    eliminarEvento = async (req, res) => {
        try {
            const eliminado = await this.eventoService.eliminarEvento(req.params.id);
            res.json(eliminado);
        } catch (err) {
            res.status(500).json({ error: "Error al eliminar evento" });
        }
    };
}

export default EventoController;