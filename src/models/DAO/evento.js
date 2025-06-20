import MongoConnection from "../MongoConnection.js";
import { ObjectId } from "mongodb";

class EventoModel {
  constructor() {
    this.db = MongoConnection.db;
  }

  geteventos = async () => {
    return await this.db.collection("eventos").find({}).toArray();
  };

  geteventoPorId = async (id) => {
    return await this.db.collection("eventos").findOne({ _id: ObjectId.createFromHexString(id) });
  };

  postevento = async (nuevo) => {
    return await this.db.collection("eventos").insertOne(nuevo);
  };

  patchevento = async (id, data) => {
    return await this.db.collection("eventos").updateOne(
      { _id: ObjectId.createFromHexString(id) },
      { $set: data }
    );
  };

  putevento = async (id, data) => {
    return await this.db.collection("eventos").replaceOne(
      { _id: ObjectId.createFromHexString(id) },
      data
    );
  };

  deleteevento = async (id) => {
    return await this.db.collection("eventos").deleteOne({ _id: ObjectId.createFromHexString(id) });
  };
}

export default EventoModel;