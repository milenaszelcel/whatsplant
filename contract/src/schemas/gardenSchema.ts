import Joi from "joi";

export const gardenValidationSchema = Joi.object({
  name: Joi.string().required(),
  userId: Joi.number().required(),
  plantsId: Joi.array().items(Joi.number()).required(),
})
  .unknown()
  .required();
