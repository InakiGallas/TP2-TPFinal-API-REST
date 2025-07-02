import supertest from "supertest"
import { expect } from "chai"

const url = supertest("http://localhost:8000")

describe("Test entidad EVENTO", () =>{
  let eventoId

    it ("GET", async () => {
        const response = await url.get("/api/eventos")

      //  console.log("Data: ", response)

        expect(response.status).to.equal(200)
        expect(response.body).to.be.an("array")
    })

  it ("POST", async () => {
    const nuevoEvento = {
      titulo: "Clase de Yoga",
      fecha: "2025-07-01",
      lugar: "Gimnasio Central"
    };

      const response = await url.post("/api/eventos").send(nuevoEvento);

    expect(response.status).to.equal(201);
   expect(response.body).to.have.property("insertedId").that.is.a("string");
});


     it ("GET x ID conocido", async () => {
     const idConocido = "68549d34fc7d3700f1dceefc"; 

  const response = await url.get(`/api/eventos/${idConocido}`);

  expect(response.status).to.equal(200);
  expect(response.body).to.have.property("_id");
  expect(response.body._id).to.equal(idConocido);

    })

         it ("PATCH - otro nombre", async () => {
  const response = await url.patch(`/api/eventos/${eventoId}`).send({
    lugar: "Club Norte"
  });
  console.log("Respuesta error PATCH:", response.body); 
  expect(response.status).to.equal(500);
  expect(response.body).to.have.property("error");


});

         it ("PUT", async () => { 
      const idFijo = "6854a073fd6062011d23e87e"; 

  const datosActualizados = {
    titulo: "Nuevo título simple",
    fecha: "2025-07-10",
    lugar: "Lugar simple"
  };

  const response = await url.put(`/api/eventos/${idFijo}`).send(datosActualizados);

  expect(response.status).to.equal(200);
    })
         it ("DELETE con POST nuevo", async () => {
            const nuevoEvento = {
    titulo: "Evento nuevo",
    fecha: "2025-07-10",
    lugar: "Sala Test"
  };

  const resPost = await url.post("/api/eventos").send(nuevoEvento);
  expect(resPost.status).to.equal(201);
  const eventoId = resPost.body.insertedId 

  const resDelete = await url.delete(`/api/eventos/${eventoId}`);
  console.log("Respuesta DELETE:", resDelete.body);

  expect(resDelete.status).to.equal(200);
});
})
/
describe("Test entidad participantes", ()=>{
    it("GET PARTICIPANTES",async ()=>{
        const response = await url.get("/api/participantes")
        expect(response.status).to.equal(200)
        expect(response.body).to.be.an("array")
        response.body.forEach(participante => {
            console.log(participante)
            expect(participante).to.have.property("_id")
            })
    })

    it("GET PARTICIPANTES POR EVENTO", async() =>{
        const evento = await url.get("/api/eventos")
        console.log(evento.body[0]._id)
        expect(evento.status).to.equal(200)
        const eventoId = evento.body[0]._id
        const participante1 = await url.post("/api/participantes").send({nombre: "Sergio",email: "sergio@gmail.com",eventoId: eventoId})
        console.log("Participante creado:", participante1.body)
        expect(participante1.status).to.equal(201)
        expect(participante1.body).to.have.property("insertedId")
        const participante2 = await url.post("/api/participantes").send({nombre: "Hernan",email: "hernan@gmail.com",eventoId: eventoId})
        console.log("Participante creado:", participante2.body)
        expect(participante2.status).to.equal(201)
        expect(participante2.body).to.have.property("insertedId")
        const response = await url.get(`/api/participantes/evento/${eventoId}`)
        console.log('Participantes por evento ', response.body)
        expect(response.status).to.equal(200)
    })

    it("GET PARTICIPANTES POR EVENTO - eventoId inexistente", async () => {
        const fakeEventoId = "000000000000000000000000" 

        const response = await url.get(`/api/participantes/evento/${fakeEventoId}`)
        expect(response.body).to.be.an("array").that.is.empty
        })

    it("PATCH", async ()=>{
        const evento = await url.get("/api/eventos")
        console.log(evento.body[0]._id)
        expect(evento.status).to.equal(200)
        const participantes = await url.get("/api/participantes")
        const participanteId = participantes.body[0]._id
        const update = await url.patch(`/api/participantes/${participanteId}`).send({email: "updTest@gmail.com"})
        console.log('Parcipante actualizado ', update.body)
        expect(update.status).to.equal(200)
        expect(update.body).to.have.property("matchedCount", 1)
        expect(update.body).to.have.property("modifiedCount").that.is.greaterThan(0)
        expect(update.body.upsertedId).to.be.null
    })

    it("PUT", async()=>{
        const evento = await url.get("/api/eventos")
        expect(evento.status).to.equal(200)
        const participantes = await url.get("/api/participantes")
        expect(participantes.status).to.equal(200)
        const participante = participantes.body[participantes.body.length - 1]._id;
        const putParticipante = await url.put(`/api/participantes/${participante}`).send({email: "putTest@gmail.com"})
        console.log("Participante actualizado:", putParticipante.body)
        expect(putParticipante.status).to.equal(200)
        expect(putParticipante.body).to.have.property("modifiedCount").equal(1)

    })

    it("DELETE", async()=>{
        const participantes = await url.get("/api/participantes")
        expect(participantes.status).to.equal(200)
        const deleteParitipante = participantes.body[participantes.body.length - 1]._id
        console.log(deleteParitipante)
        const deleteParticipante = await url.delete(`/api/participantes/${deleteParitipante}`).send()
        expect(deleteParticipante.status).to.equal(200)
        expect(deleteParticipante.body).to.have.property("deletedCount").equal(1)
    })
})

