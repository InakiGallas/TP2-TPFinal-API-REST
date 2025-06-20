import ParticipanteService from "../services/participanteService.js";
import participanteSchema from "../validations/participante.js";

class ParticipanteController {
    constructor() {
        this.participanteService = new ParticipanteService();
    }

    getParticipantes = async (req, res) => {
        try {
            const participantes = await this.participanteService.getParticipantes();
            res.json(participantes);
        } catch (err) {
            res.status(500).json({ error: "Error al obtener participantes" });
        }
    };

    crearParticipante = async (req, res) => {
        try {
            const { error } = participanteSchema.validate(req.body);
            if (error) return res.status(400).json({ error: error.details[0].message });

            const nuevo = await this.participanteService.crearParticipante(req.body);
            res.status(201).json(nuevo);
        } catch (err) {
            res.status(500).json({ error: "Error al crear participante" });
        }
    };

    getPorEvento = async (req, res) => {
        try {
            const lista = await this.participanteService.getPorEvento(req.params.eventoId);
            res.json(lista);
        } catch (err) {
            res.status(500).json({ error: "Error al buscar participantes por evento" });
        }
    };

    actualizarParticipante = async (req, res) => {
        try {
            const actualizado = await this.participanteService.actualizarParticipante(req.params.id, req.body);
            res.json(actualizado);
        } catch (err) {
            res.status(500).json({ error: "Error al actualizar participante" });
        }
    };

    reemplazarParticipante = async (req, res) => {
        try {
            const reemplazado = await this.participanteService.reemplazarParticipante(req.params.id, req.body);
            res.json(reemplazado);
        } catch (err) {
            res.status(500).json({ error: "Error al reemplazar participante" });
        }
    };

    eliminarParticipante = async (req, res) => {
        try {
            const eliminado = await this.participanteService.eliminarParticipante(req.params.id);
            res.json(eliminado);
        } catch (err) {
            res.status(500).json({ error: "Error al eliminar participante" });
        }
    };
}

export default ParticipanteController;