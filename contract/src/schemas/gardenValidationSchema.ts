import Joi from "joi";

export const gardenValidationSchema = Joi.object({
  name: Joi.string().required(),
  type: Joi.string().required(),
  userId: Joi.string(),
  plants: Joi.array()
    .items(
      Joi.object({
        plantId: Joi.number().required(),
        waterValue: Joi.number().default(0),
      })
    )
    .default([]),
})
  .unknown()
  .required();
