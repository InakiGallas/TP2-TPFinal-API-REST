import FactoryDAO from "../models/Factory.js";

class EventoService {
  constructor() {
    this.model = FactoryDAO.getEventoDAO();
  }

  getEventos = async () => await this.model.geteventos();
  crearEvento = async (nuevo) => await this.model.postevento(nuevo);
  getEventoPorId = async (id) => await this.model.geteventoPorId(id);
  actualizarEvento = async (id, data) => await this.model.patchevento(id, data);
  reemplazarEvento = async (id, data) => await this.model.putevento(id, data);
  eliminarEvento = async (id) => await this.model.deleteevento(id);
}

export default EventoService;
