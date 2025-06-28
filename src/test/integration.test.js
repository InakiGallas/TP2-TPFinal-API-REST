import supertest from "supertest"
import { expect } from "chai"

const url = supertest("http://localhost:8000")

describe("Test entidad participantes", ()=>{
    it("GET PARTICIPANTES",async ()=>{
        const token = "asdas"
        const response = await url.get("/api/participantes")
        console.log("Data: ", response)
        expect(response.status).to.equal(200)
        expect(response.body).to.be.an("array")
        response.body.forEach(participante => {
            console.log(participante)
            expect(participante).to.have.property("_id")
            })
    })

    it("GET PARTICIPANTES POR EVENTO", async() =>{
        const evento = await url.post("/api/eventos").send({ fecha: "2025-06-29", lugar: "plaza", titulo: "paseo" })
        expect(evento.status).to.equal(201) 
        expect(evento.body).to.have.property("insertedId")
        const participante1 = await url.post("/api/participantes").send({nombre: "Test",email: "test@gmail.com",eventoId: evento.body.insertedId})
        console.log("Participante creado:", participante1.body)
        expect(participante1.status).to.equal(201)
        expect(participante1.body).to.have.property("insertedId")
        const participante2 = await url.post("/api/participantes").send({nombre: "Test2",email: "test2@gmail.com",eventoId: evento.body.insertedId})
        console.log("Participante creado:", participante2.body)
        expect(participante2.status).to.equal(201)
        expect(participante2.body).to.have.property("insertedId")
        const response = await url.get(`/api/participantes/evento/${evento.body.insertedId}`)
        console.log('Participantes por evento ', response.body)
        expect(response.status).to.equal(200)
    })

    it("GET PARTICIPANTES POR EVENTO - eventoId inexistente", async () => {
        const fakeEventoId = "000000000000000000000000" 

        const response = await url.get(`/api/participantes/evento/${fakeEventoId}`)
        expect(response.status).to.equal(200)
        expect(response.body).to.be.an("array").that.is.empty
        })

    it("PATCH", async ()=>{
        const evento = await url.post("/api/eventos").send({ fecha: "2025-06-29", lugar: "plaza", titulo: "paseo" })
        expect(evento.status).to.equal(201) 
        expect(evento.body).to.have.property("insertedId")
        const participante = await url.post("/api/participantes").send({nombre: "Test",email: "test2@gmail.com",eventoId: evento.body.insertedId})
        console.log("Participante creado:", participante.body)
        expect(participante.status).to.equal(201)
        expect(participante.body).to.have.property("insertedId")
        const update = await url.patch(`/api/participantes/${participante.body.insertedId}`).send({nombre: "Test",email: "updateTest@gmail.com",eventoId: evento.body.insertedId})
        console.log('Parcipante actualizado ', update.body)
        expect(update.status).to.equal(200)
        expect(update.body).to.have.property("matchedCount", 1)
        expect(update.body).to.have.property("modifiedCount").that.is.greaterThan(0)
        expect(update.body.upsertedId).to.be.null
    })

    it("PUT", async()=>{
        const evento = await url.post("/api/eventos").send({ fecha: "2025-06-29", lugar: "plaza", titulo: "paseo" })
        expect(evento.status).to.equal(201) 
        expect(evento.body).to.have.property("insertedId")
        const participante = await url.post("/api/participantes").send({nombre: "Test",email: "test2@gmail.com",eventoId: evento.body.insertedId})
        console.log("Participante creado:", participante.body.insertedId)
        expect(participante.status).to.equal(201)
        expect(participante.body).to.have.property("insertedId")
        console.log(participante.body.insertedId)
        const putParticipante = await url.put(`/api/participantes/${participante.body.insertedId}`).send({email: "putTest@gmail.com"})
        console.log("Participante actualizado:", putParticipante.body)
        expect(putParticipante.status).to.equal(200)
        expect(putParticipante.body).to.have.property("modifiedCount").equal(1)

    })

    it("DELETE", async()=>{
        const evento = await url.post("/api/eventos").send({ fecha: "2025-06-29", lugar: "plaza", titulo: "paseo" })
        expect(evento.status).to.equal(201) 
        expect(evento.body).to.have.property("insertedId")
        const participante = await url.post("/api/participantes").send({nombre: "Test",email: "test@gmail.com",eventoId: evento.body.insertedId})
        expect(participante.status).to.equal(201)
        expect(participante.body).to.have.property("insertedId")
        const deleteParticipante = await url.delete(`/api/participantes/${participante.body.insertedId}`).send()
        expect(deleteParticipante.status).to.equal(200)
        expect(deleteParticipante.body).to.have.property("deletedCount").equal(1)
    })
})