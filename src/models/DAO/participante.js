import MongoConnection from "../connection.js";
import { ObjectId } from "mongodb";

class ParticipanteModel {
  constructor() {
    this.db = MongoConnection.db;
  }

  getparticipantes = async () => {
    return await this.db.collection("participantes").find({}).toArray();
  };

  getparticipantesPorEvento = async (eventoId) => {
    return await this.db.collection("participantes").find({ eventoId: ObjectId.createFromHexString(eventoId) }).toArray();
  };

  postparticipante = async (nuevo) => {
    return await this.db.collection("participantes").insertOne(nuevo);
  };

  patchparticipante = async (id, data) => {
    return await this.db.collection("participantes").updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: data }
    );
  };

  putparticipante = async (id, data) => {
    return await this.db.collection("participantes").replaceOne(
      { _id: ObjectId.createFromHexString(id) },
      data
    );
  };

  deleteparticipante = async (id) => {
    return await this.db.collection("participantes").deleteOne({ _id: ObjectId.createFromHexString(id) });
  };
}

export default ParticipanteModel;