import Joi from "joi";

const eventoSchema = Joi.object({
    titulo: Joi.string().min(3).required(),
    fecha: Joi.string().required(),
    lugar: Joi.string().min(2).required()
});

export default eventoSchema;