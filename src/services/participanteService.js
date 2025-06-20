import FactoryDAO from "../models/Factory.js";

class ParticipanteService {
  constructor() {
    this.model = FactoryDAO.getParticipanteDAO();
  }

  getParticipantes = async () => await this.model.getparticipantes();
  crearParticipante = async (nuevo) => await this.model.postparticipante(nuevo);
  getPorEvento = async (eventoId) => await this.model.getparticipantesPorEvento(eventoId);
  actualizarParticipante = async (id, data) => await this.model.patchparticipante(id, data);
  reemplazarParticipante = async (id, data) => await this.model.putparticipante(id, data);
  eliminarParticipante = async (id) => await this.model.deleteparticipante(id);
}

export default ParticipanteService;

