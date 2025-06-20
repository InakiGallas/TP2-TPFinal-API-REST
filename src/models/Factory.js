import EventoModel from "./DAO/evento.js";
import ParticipanteModel from "./DAO/participante.js";

class FactoryDAO {
  static getEventoDAO() {
    return new EventoModel();
  }

  static getParticipanteDAO() {
    return new ParticipanteModel();
  }
}

export default FactoryDAO;
