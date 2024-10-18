import Joi from "joi";

export const gardenValidationSchema = Joi.object({
  name: Joi.string().required(),
  userId: Joi.string().required(),
  plantsId: Joi.array().items(Joi.number()),
})
  .unknown()
  .required();
