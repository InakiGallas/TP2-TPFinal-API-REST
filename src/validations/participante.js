import Joi from "joi";

const participanteSchema = Joi.object({
    nombre: Joi.string().required(),
    email: Joi.string().email().required(),
    eventoId: Joi.string().required()
});

export default participanteSchema;