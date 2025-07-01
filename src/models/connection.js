import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config(); 


class MongoConnection {
  static client = new MongoClient(process.env.MONGO_URL);
  static db = this.client.db("test"); 
  static connect = async () => {
    try {
      await this.client.connect();
      console.log("Mongo conectado");
    } catch (err) {
      console.error("Error de conexión MongoDB", err);
    }
  };
}

export default MongoConnection;
